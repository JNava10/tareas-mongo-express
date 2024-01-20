const {Router} = require('express');
const router = Router();
const middleware = require('../middlewares/middleware');
const {UserController} = require("../controllers/userController");
const userValidation = require("../middlewares/validations/userValidation");
const Validator = require("../helpers/validator");
const {body} = require("express-validator");


router.route('/user')
    .get(middleware.middleware, UserController.find)
    .post([
        userValidation.userInsertFields
    ], UserController.save);
// .get(middleware.test, TaskController.find)
// .post(middleware.test, TaskController.save)
// .put(middleware.test, TaskController.update)
// .delete(middleware.test, TaskController.delete)

module.exports = router;