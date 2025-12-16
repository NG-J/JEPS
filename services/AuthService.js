const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserRepository = require('../repositories/UserRepository');
const AppError = require('../utils/AppError');

class AuthService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async register(data) {
    const existing = await this.userRepository.getByEmail(data.email);
    if (existing) {
      throw new AppError('User already exists', 400);
    }
    return this.userRepository.add(data);
  }

  async login(email, password) {
    const user = await this.userRepository.getByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
  throw new AppError('Invalid email or password', 401);
}

   const token = jwt.sign(
  { id: user.user_id, role: user.role.toLowerCase() }, 
  process.env.JWT_SECRET,
  { expiresIn: '1h' }
);

    delete user.password;
    return { user, token };
  }
}

module.exports = AuthService;
