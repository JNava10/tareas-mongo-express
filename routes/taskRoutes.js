const { TaskController } = require('../controllers/taskController');
const middleware = require('../middlewares/middleware');
const {Router } = require('express');
const router = Router();

router.post('/task',  TaskController.save);
router.get('/task',  TaskController.find);
router.put('/task',  TaskController.modify);
router.delete('/task',  TaskController.delete);
// app.get('/task/:id',  TaskController.find);

module.exports = router;
