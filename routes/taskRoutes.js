const {Router} = require('express');
const router = Router();
const { TaskController } = require('../controllers/taskController');
const middleware = require('../middlewares/middleware');

module.exports = router;