const { param, body } = require('express-validator');


exports.getLogsByCaseValidator = [
  param('caseId')
    .notEmpty()
    .withMessage('Case ID is required')
    .isInt()
    .withMessage('Case ID must be an integer')
];

exports.createLogValidator = [
  body('case_id')
    .notEmpty()
    .withMessage('Case ID is required')
    .isInt()
    .withMessage('Case ID must be an integer'),

  body('action')
    .notEmpty()
    .withMessage('Action is required')
    .isString()
    .withMessage('Action must be a string'),

  body('performed_by')
    .notEmpty()
    .withMessage('Performed by is required')
    .isInt()
    .withMessage('Performed by must be a user ID')
];


exports.deleteLogValidator = [
  param('id')
    .notEmpty()
    .withMessage('Log ID is required')
    .isInt()
    .withMessage('Log ID must be an integer')
];
