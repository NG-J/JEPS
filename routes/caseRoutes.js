const router = require('express').Router();
const CaseService = require('../services/CaseService');
const { protectApi, restrictTo } = require('../middlewares/authMiddleware');
const service = new CaseService();

router.get('/', protectApi, async (req, res) => res.json(await service.getAll()));
router.post('/', protectApi, async (req, res) => {
  const c = await service.add({
    title: req.body.title,
    description: req.body.description,
    status: req.body.status || 'Pending',
    created_by: req.user.id
  });

  res.json(c);
});

router.get('/:id', protectApi, async (req, res) => {
  const c = await service.getById(req.params.id);
  res.json(c);
});

router.delete('/:id', protectApi, restrictTo('admin'), async (req, res) => {
  await service.delete(req.params.id, req.user.id);
  res.sendStatus(204);
});

module.exports = router;




