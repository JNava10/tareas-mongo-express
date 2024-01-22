const {Router} = require('express');
const router = Router();
const middleware = require('../middlewares/middleware');
const {UserController} = require("../controllers/userController");
const userValidation = require("../middlewares/validations/userValidation");
const Validator = require("../helpers/validator");
const {body} = require("express-validator");
const {AuthController} = require("../controllers/authController");


router.route('/user')
    .get(middleware.middleware, UserController.find)
    .post([
        userValidation.userInsert
    ], UserController.save)
    .put([
        userValidation.userUpdate
    ], UserController.modify)
    .delete([

    ], UserController.delete)

router.post('/login', userValidation.userLogin, AuthController.login);
// .get(middleware.test, TaskController.find)
// .post(middleware.test, TaskController.save)
// .put(middleware.test, TaskController.update)
// .delete(middleware.test, TaskController.delete)

module.exports = router;