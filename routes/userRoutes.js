const {Router} = require('express');
const router = Router();
const middleware = require('../middlewares/middleware');
const {UserController} = require("../controllers/userController");
const userValidation = require("../helpers/validations/userValidation");
const Validator = require("../helpers/validator");
const {body} = require("express-validator");


router.route('/user')
    .get([
            body('name').exists().isString(),
            body('email').exists().isEmail(),
            body('password').exists().isString(),
            body('firstLastName').exists().isString(),
            body('secondLastName').exists().isString(),
            Validator.validateFields
        ],
        UserController.find
    )
    .post(userValidation.userInsertFields, UserController.save);
// .get(middleware.test, TaskController.find)
// .post(middleware.test, TaskController.save)
// .put(middleware.test, TaskController.update)
// .delete(middleware.test, TaskController.delete)

module.exports = router;