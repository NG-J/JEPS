// routes/evidenceRoutes.js
const router = require('express').Router();
const { protectApi, restrictTo } = require('../middlewares/authMiddleware');
const EvidenceController = require('../controllers/EvidenceController');

const controller = new EvidenceController();

// GET all evidence
router.get(
  '/',
  protectApi,
  (req, res, next) => controller.getAll(req, res, next)
);

// POST new evidence (admin or forensic)
router.post(
  '/',
  protectApi,
  restrictTo('admin','forensic'),
  (req, res, next) => controller.add(req, res, next)
);

// DELETE evidence by id (admin only)
router.delete(
  '/:id',
  protectApi,
  restrictTo('admin'),
  (req, res, next) => controller.delete(req, res, next)
);

module.exports = router;




