const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();

module.exports = class App {
    constructor() {
        this.setExpress();
        this.setMiddlewares();
        this.setRoutes();
    }

    setExpress(){
        const port = process.env.PORT || 3000;
        app.listen(port , console.log(`server listening at ${port}`));
    }

    setMiddlewares(){
        app.use(morgan('dev'));
        app.use(bodyParser.json());
    }

    setRoutes(){
        app.use('/api',require('./routes'));
    }
}