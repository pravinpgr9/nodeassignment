const { validationResult } = require('express-validator');

const fileValidator = (req, res, next) => {
  if (!req.file) {
    return res.status(400).send({ message: 'No file uploaded.' });
  }
  next();
};

module.exports = fileValidator;