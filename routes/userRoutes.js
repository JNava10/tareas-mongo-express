const middleware = require('../middlewares/middleware');
const {Router } = require('express');
const {UserController} = require("../controllers/userController");
const router = Router();

router.post('/user',  UserController.save);
router.get('/user',  UserController.find);
router.put('/user',  UserController.modify);
router.delete('/user',  UserController.delete);

module.exports = router;
