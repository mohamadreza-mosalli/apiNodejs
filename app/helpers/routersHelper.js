const joi = require('joi');

module.exports = {

    validateBody : (schema) => {
        return (req , res , next) => {
            const result = joi.validate(req.body , schema);
            if(result.error){
                return res.status(422).json(result.error);
            }

            if(! req.value){ req.value = {}; }
            req.value['body'] = result.value;
            next();
        }
    },

    schemas : {

        registerSchema: joi.object().keys({
            email: joi.string().email().required(),
            password: joi.string().length(8).required()
        }),

        loginSchema: joi.object().keys({
            email: joi.string().email().required(),
            password: joi.string().required()
        })
        
    }


}