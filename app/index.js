const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

module.exports = class App {
    constructor() {
        this.setExpress();
        this.setDatabase();
        this.setMiddlewares();
        this.setRoutes();
    }

    setExpress(){
        const port = process.env.PORT || 3000;
        app.listen(port , console.log(`server listening at ${port}`));
    }

    setDatabase(){
        mongoose.Promise = global.Promise;
        mongoose.connect(process.env.DATABASE ,
            (err) => err ? console.log(err) : console.log('Database Connected'));
    }

    setMiddlewares(){
        app.use(morgan('dev'));
        app.use(bodyParser.json());
    }

    setRoutes(){
        app.use('/api',require('./routes'));
    }
}