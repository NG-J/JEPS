// routes/users.js
const router = require('express').Router();
const UserController = require('../controllers/UserController');
const { protectApi } = require('../middlewares/authMiddleware');
const controller = new UserController();

router.get('/', protectApi, (req, res, next) => controller.getAll(req, res, next));
router.post('/', protectApi, (req, res, next) => controller.add(req, res, next));
router.delete('/:id', protectApi, (req, res, next) => controller.delete(req, res, next));

module.exports = router;




