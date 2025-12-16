const express = require('express');
const { protectPage } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', (req, res) => res.render('index'));

router.get('/login', (req, res) => res.render('login'));

router.get('/dashboard', protectPage, (req, res) => res.render('dashboard', { user: req.user }));

router.get('/cases', protectPage, (req, res) => res.render('cases', { user: req.user }));

router.get('/evidence', protectPage, (req, res) => res.render('evidence', { user: req.user }));

router.get('/users', protectPage, (req, res) => res.render('users', { user: req.user }));

router.get('/logs', protectPage, async (req, res) => {
  const LogService = require('../services/LogService');
  const logs = await new LogService().getAll();
  res.render('logs', { user: req.user, logs });
});

router.get('/logout', (req, res) => {
  res.clearCookie('jwt');
  res.redirect('/login');
});

module.exports = router;


