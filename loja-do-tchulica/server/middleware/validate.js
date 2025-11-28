const { validationResult } = require('express-validator');

function validate(req, res, next) {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();
  const formatted = errors.array().map(e => ({ field: e.param, msg: e.msg }));
  return res.status(400).json({ errors: formatted });
}

module.exports = validate;
