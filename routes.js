const router = require('express').Router();
const apiUrl = process.env.API_URL
const RegisterUser = require('../controllers/RegisterUser')



//DEFININDO ROTAS
router.get(`${apiUrl}/`, (req,res) => {
    res.status(200).json({online: true})
})

