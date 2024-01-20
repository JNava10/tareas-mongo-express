const {Router} = require('express');
const router = Router();
const { TaskController } = require('../controllers/taskController');
const middleware = require('../middlewares/middleware');


router.route('/tasks')
    .get(middleware.middleware, TaskController.find);
    // .get(middleware.test, TaskController.find)
    // .post(middleware.test, TaskController.save)
    // .put(middleware.test, TaskController.update)
    // .delete(middleware.test, TaskController.delete)

module.exports = router;