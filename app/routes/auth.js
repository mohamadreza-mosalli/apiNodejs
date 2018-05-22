const express = require('express');
const router = require('express-promise-router')();

//controllers
const registerController = require('./../controllers/v1/auth/registerController');

router.route('/register')
    .post(registerController.proccess);

module.exports = router;