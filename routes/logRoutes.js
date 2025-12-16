const router = require('express').Router();
const LogController = require('../controllers/LogController');
const { protectApi } = require('../middlewares/authMiddleware');

const controller = new LogController();

router.get('/case/:caseId', protectApi, controller.getLogsByCase.bind(controller));
router.post('/', protectApi, controller.createLog.bind(controller));
router.delete('/:id', protectApi, controller.deleteLog.bind(controller));

module.exports = router;

