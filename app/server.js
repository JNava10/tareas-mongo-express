const express = require('express');
const constants = require('../helpers/constants');
const cors = require('cors');

class Server {
    constructor() {
        this.app = express();
        this.baseRoute = constants.baseRoute;

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes(){
        this.app.use(this.baseRoute, require('../routes/taskRoutes'));
        this.app.use(this.baseRoute, require('../routes/userRoutes'));
        this.app.use(this.baseRoute, require('../routes/authRoutes'));
    }

    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`Servidor escuchando en: ${process.env.PORT}`);
        })
    }
}

module.exports = Server;