const LogService = require('../services/LogService');

class LogController {
  constructor() {
    this.logService = new LogService();
  }

  async getLogsByCase(req, res, next) {
    try {
      const logs = await this.logService.getAll();
      res.json(logs.filter(l => l.case_id == req.params.caseId));
    } catch (err) {
      next(err);
    }
  }

  async createLog(req, res, next) {
    try {
      const { case_id, action, performed_by } = req.body;
      await this.logService.log(performed_by, action, 'case', case_id);
      res.status(201).json({ message: 'Log created' });
    } catch (err) {
      next(err);
    }
  }

  async deleteLog(req, res, next) {
    try {
      await this.logService.delete(req.params.id);
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = LogController;
