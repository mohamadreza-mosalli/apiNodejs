const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');

//controllers
const userController = require('./../controllers/userController');

//passport jwt
const jwtStrategy = require('../passport/passportJwt');
const passportJWT = passport.authenticate('jwt', { session: false });

router.route('/profile')
    .get(passportJWT , userController.profile);

module.exports = router;