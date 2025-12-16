const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
exports.hashPassword = (password) => bcrypt.hash(password, 12);
exports.comparePassword = (plain, hash) => bcrypt.compare(plain, hash);
exports.generateToken = (payload) => jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });