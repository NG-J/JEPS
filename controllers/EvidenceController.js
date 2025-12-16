const EvidenceService = require('../services/EvidenceService');
const LogService = require('../services/LogService');

class EvidenceController {
  constructor() {
    this.evidenceService = new EvidenceService();
    this.logService = new LogService();
  }

  async getAll(req, res, next) {
    try {
      const evidence = await this.evidenceService.getAll();
      res.json(evidence);
    } catch (err) {
      next(err);
    }
  }

  async add(req, res, next) {
  try {
    const e = await this.evidenceService.add({ ...req.body, uploader_id: req.user.id });
    // Log properly
    await this.logService.log(req.user.id, 'Added Evidence', 'Evidence', e.id);
    res.status(201).json(e);
  } catch (err) {
    next(err);
  }
}


  async delete(req, res, next) {
  try {
    const evidenceId = Number(req.params.id);
    console.log('Deleting Evidence ID:', evidenceId);

    await this.evidenceService.delete(evidenceId);

    await this.logService.log(req.user.id, 'Deleted Evidence', 'Evidence', evidenceId);

    res.sendStatus(204); // success
  } catch (err) {
    console.error('Error deleting evidence:', err);
    res.status(500).json({ message: err.message }); // send actual error
  }
}



}
module.exports = EvidenceController;
