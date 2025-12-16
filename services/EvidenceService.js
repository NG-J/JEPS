const EvidenceRepository = require('../repositories/EvidenceRepository');

class EvidenceService {
  constructor() {
    this.repo = new EvidenceRepository();
  }

  getAll() {
    return this.repo.getAll();   // NEW
  }

  getAllByCase(caseId) {
    return this.repo.getAllByCase(caseId);
  }

  async add(data) {
    return this.repo.create(data);
  }

  async delete(id) {
    return this.repo.delete(id);
  }
}

module.exports = EvidenceService;


