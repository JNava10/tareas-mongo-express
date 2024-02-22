const { TaskController } = require('../controllers/taskController');
const middleware = require('../middlewares/middleware');
const {Router } = require('express');
const router = Router();

router.post('/task',  TaskController.save);
// app.get('/task/:id',  TaskController.find);

module.exports = router;
