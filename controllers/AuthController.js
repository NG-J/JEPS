const UserRepository = require('../repositories/UserRepository');
const { signToken } = require('../utils/jwt');
const bcrypt = require('bcryptjs');

class AuthController {
  constructor() { this.repo = new UserRepository(); }

  async login(req, res) {
    const { email, password } = req.body;
    const user = await this.repo.getByEmail(email);
    if (!user) return res.status(401).send('Invalid credentials');
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).send('Invalid credentials');
    const token = signToken({ id: user.id, role: user.role, name: user.name });
    res.cookie('jwt', token, { httpOnly: true });
    res.redirect('/dashboard');
  }

  logout(req, res) {
    res.clearCookie('jwt');
    res.redirect('/login');
  }

}

module.exports = AuthController;




