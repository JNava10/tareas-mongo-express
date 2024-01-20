const {Router} = require('express');
const router = Router();
const { TaskController } = require('../controllers/taskController');
const middleware = require('../middlewares/middleware');
const {body} = require("express-validator");
const {User} = require("../models/User");
const {UserController} = require("../controllers/userController");
const {AuthController} = require("../controllers/authController");
const userValidation = require("../middlewares/validations/userValidation");


router.post('/register', userValidation.userInsert, UserController.save)
router.post('/login', middleware.middleware, AuthController.login)

module.exports = router;