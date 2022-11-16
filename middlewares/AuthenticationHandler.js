const jwt = require('jsonwebtoken')



const isAuth = (req, res, next) => {
    //req.userId = null
    const authHeader = req.get("Authorization");
    if (!authHeader) {
        return res.status(401).json({ message: 'not authenticated', success: false });
    };
    const token = authHeader.split(' ')[0];
    let decodedToken; 
    try {
        decodedToken = jwt.verify(token, 'secret');
    } catch (err) {
        return res.status(500).json({ message: err.message || 'could not decode the token' });
    };
    if (!decodedToken) {
        res.status(401).json({ message: 'unauthorized' });
    } else {
        req.userId = decodedToken.id
        next();
    };
};

module.exports = isAuth