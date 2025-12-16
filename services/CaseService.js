const CaseRepository = require('../repositories/CaseRepository');

class CaseService {
  constructor() {
    this.repo = new CaseRepository();
  }

  async getAll() {
    return this.repo.getAll();
  }

  async getById(id) {
    return this.repo.getById(id);
  }

  async add(data) {
    return this.repo.add(data);
  }

  async delete(id) {
    
    await this.repo.deleteEvidenceByCaseId(id);
    return this.repo.delete(id);
  }
}

module.exports = CaseService;



