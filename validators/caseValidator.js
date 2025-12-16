const { body } = require('express-validator');
exports.createCaseValidator = [
  body('title').notEmpty().withMessage('Title required')
];