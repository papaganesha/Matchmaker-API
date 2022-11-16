const jwt = require('jsonwebtoken')

const initializeCometchat = (UID) => {
    //VARIAVEIS AMBIENTE DA APLICAÇÃO
    const appID = '22363314d6b05de2';
    const region = 'us';
    const authKey = 'cefa05028acbf59fc97a08e61ad0f14765251514';
  
  
  
    //PARAMETROS DE CONFIGURAÇÃO PRÉDEFINIDOS
    const appSetting = new CometChat.AppSettingsBuilder()
        .subscribePresenceForAllUsers()
        .setRegion(region)
        .build()
  
    //INICIALIZANDO COMETCHAT COM OS PARAMETROS 
    CometChat.init(appID, appSetting).then(
        () => {
            console.log('Initialization completed successfully');
            // You can now call login function.
        },
        (error) => {
            console.log('Initialization failed with error:', error);
            // Check the reason for error and take appropriate action.
        },
    );
  
    loginCometchat(UID, authKey)
  
  }

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
        initializeCometchat(decodedToken.id)
        next();
    };
};

module.exports = isAuth