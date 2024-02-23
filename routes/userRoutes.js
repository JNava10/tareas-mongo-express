const middleware = require('../middlewares/middleware');
const {Router } = require('express');
const {UserController} = require("../controllers/userController");
const {TaskController} = require("../controllers/taskController");
const router = Router();

router.post('/user',  UserController.save);
router.get('/user',  UserController.find);
router.put('/user',  UserController.modify);
router.delete('/user',  UserController.delete);

router.get('/user/realized',  UserController.find);
router.get('/user/pending',  TaskController.getPendingTasks);
router.get('/user/ranking',  UserController.getRanking);


module.exports = router;
