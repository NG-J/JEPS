const CaseService = require('../services/CaseService');
const LogService = require('../services/LogService');

class CaseController {
  constructor() {
    this.caseService = new CaseService();
    this.logService = new LogService();
  }

  async getAll(req, res) {
    const cases = await this.caseService.getAll();
    res.json(cases);
  }

  async add(req, res) {
    const c = await this.caseService.add({ ...req.body, created_by: req.user.id });
    await this.logService.log(req.user.id, 'Added Case', 'case', c.id);
    res.status(201).json(c);
  }

  async delete(req, res) {
    await this.caseService.delete(req.params.id); // only repo
    await this.logService.log(req.user.id, 'Deleted Case', 'case', req.params.id); // logging in controller
    res.sendStatus(204);
  }
}

module.exports = CaseController;



