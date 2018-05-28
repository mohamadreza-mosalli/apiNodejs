const jwt = require('jsonwebtoken');
const User = require('./../../models/user');


module.exports = {

    proccess : async (req , res , next) => {
        res.json('login');
    }

};