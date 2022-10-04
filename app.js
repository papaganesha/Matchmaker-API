const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const session = require('express-session')

require('dotenv/config')

class AppController {
    constructor(){
        this.app = express();

        this.middlewares()
        this.routes()
    }
    middlewares(){
        this.app.use(express.json())
        this.app.use(session({secret: 'secret pass', resave: true, saveUninitialized: true}))
        // MOSTRAR LOG REQUESTS
        this.app.use(morgan('tiny'))
        this.app.use(cors())
        this.app.options('*', cors())
    }
    routes(){
        this.app.use(require('./routes/Users'))
    }
}

module.exports  = new AppController().app