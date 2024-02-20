const app = express();
const Router = require('express-group-router');
const router = new Router();
const middleware = require('../middlewares/middleware');
const userController = require("../controllers/userController");
const userValidation = require("../middlewares/validations/userValidation");
const Validator = require("../helpers/validator");
const {body} = require("express-validator");
const {AuthController} = require("../controllers/authController");
const express = require("express");

router.group('/user', [middleware.middleware], router => {
    router.post('/', userController.createUser);
    router.get('/', userController.listUser);
    router.put('/', userController.modifyUser);
    router.delete('/', userController.modifyUser);
});

const listRoutes = router.init();

app.use(listRoutes);

module.exports = listRoutes;