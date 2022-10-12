const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

require('dotenv/config')

class AppController {
    constructor() {
        this.app = express();

        this.middlewares()
        this.routes()
    }
    middlewares() {
        this.app.use(express.json())
        // MOSTRAR LOG REQUESTS
        this.app.use(morgan('tiny'))
        this.app.use(cors())
        this.app.options('*', cors())
    }
    routes() {
        this.app.use(require('./routes/Users'))
    }
}

module.exports = new AppController().app