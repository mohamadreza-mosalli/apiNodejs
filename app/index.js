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
        this.handleErrors();
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

    handleErrors(){
        // catch 404 errors and forward them to error handler
        app.use((req , res , next) => {
            const err = new Error('Not Found');
            err.status(404);
            next(err);
        });

        // error handler function
        app.use((err , req , res , next) => {
            const error = app.get('env') === 'development';
            const status = err.status || 500;

            // response handler client
            res.status(status).json({
                error : {
                    message : error.message
                }
            });
        });
    }
}