const jwt = require('jsonwebtoken');

exports.protectPage = (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) return res.redirect('/login');
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.redirect('/login');
  }
};

exports.protectApi = (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

exports.restrictTo = (...roles) => (req, res, next) => {
  const userRole = req.user.role.toLowerCase(); // normalize to lowercase
  const allowedRoles = roles.map(r => r.toLowerCase());
  if (!allowedRoles.includes(userRole)) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  next();
};
