const middleware = require('../middlewares/middleware');
const {Router } = require('express');
const {UserController} = require("../controllers/userController");
const router = Router();

router.post('/user',  UserController.save);
// app.get('/task/:id',  TaskController.find);

module.exports = router;
