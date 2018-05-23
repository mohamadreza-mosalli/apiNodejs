const express = require('express');
const router = require('express-promise-router')();

//controllers
const registerController = require('./../controllers/auth/registerController');

//helpers
const { validateBody , schemas } = require('./../helpers/routersHelper');

router.route('/register')
    .post(validateBody(schemas.authSchema) , registerController.proccess);

module.exports = router;