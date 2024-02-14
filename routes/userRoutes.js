const {Router} = require('express');
const router = Router();
const middleware = require('../middlewares/middleware');
const userController = require("../controllers/userController");
const userValidation = require("../middlewares/validations/userValidation");
const Validator = require("../helpers/validator");
const {body} = require("express-validator");
const {AuthController} = require("../controllers/authController");

router.post('/create-user', userController.createUser)

module.exports = router;