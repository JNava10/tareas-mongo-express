const {Router} = require('express');
const router = Router();
const { TaskController } = require('../controllers/taskController');
const middleware = require('../middlewares/middleware');


router.route('/task')
    .get(middleware.middleware, TaskController.find)
    .post(middleware.middleware, TaskController.save)
    .put(middleware.middleware, TaskController.modify)
    .delete(middleware.middleware, TaskController.delete)

module.exports = router;