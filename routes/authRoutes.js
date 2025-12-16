const router = require('express').Router();
const AuthController = require('../controllers/AuthController');
const ctrl = new AuthController();

router.post('/login', ctrl.login.bind(ctrl));
router.get('/logout', ctrl.logout.bind(ctrl));

module.exports = router;



