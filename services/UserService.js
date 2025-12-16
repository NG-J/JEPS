const UserRepository = require('../repositories/UserRepository');
const bcrypt = require('bcryptjs');

class UserService {
  constructor() { this.repo = new UserRepository(); }

  getAll() { return this.repo.getAll(); }

  async create(data) {
    data.password = await bcrypt.hash(data.password, 12);
    return this.repo.create(data);
  }

  delete(id) { return this.repo.delete(id); }
}

module.exports = UserService;

