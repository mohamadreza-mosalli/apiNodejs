const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
const passportLocal = require('./../passport/passportLocal');

//controllers
const registerController = require('./../controllers/auth/registerController');
const loginController = require('./../controllers/auth/loginController');

//helpers
const { validateBody , schemas } = require('./../helpers/routersHelper');

//passport
const passportLogin = passport.authenticate('local', { session: false });

router.route('/register')
    .post(validateBody(schemas.registerSchema) , registerController.proccess);

router.route('/login')
    .post(validateBody(schemas.loginSchema) , passportLogin , loginController.proccess);

module.exports = router;