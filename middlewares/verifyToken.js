const jwt = require('jsonwebtoken');
const { HttpError } = require('../utils/errors');

module.exports = (req, res, next) => {
  const token = req.headers['authorization'].split(' ')[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.SECRET);
  } catch (err) {
    const error = new HttpError('Authentication failed.', 401);
    return next(error);
  }
  req.user = decodedToken;
  next();
};