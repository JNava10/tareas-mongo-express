const {Router} = require('express');
const router = Router();
const { TaskController } = require('../controllers/taskController');
const middleware = require('../middlewares/middleware');
const {body} = require("express-validator");
const {User} = require("../models/User");


// router.post('/register', middleware.test, User.save)

module.exports = router;