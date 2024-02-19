const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { HttpError } = require('../utils/errors');

const User = require('../models/User');

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET;

exports.register = async (req, res, next) => {
  const { email, username, password } = req.body;
  const existingUser = await User.findOne({ email }).exec();
  if (existingUser) {
    const error = new HttpError('User already exists.', 409);
    return next(error);
  }
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  const newUser = new User({ email, username, hashedPassword });
  await newUser.save();
  res.status(201).json({
    user: {
      id: newUser._id,
      email: newUser.email,
      username: newUser.username,
    },
  });
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).exec();
  if (!user || !(await bcrypt.compare(password, user.hashedPassword))) {
    const error = new HttpError('Invalid credentials.', 401);
    return next(error);
  }
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      username: user.username,
    },
    JWT_SECRET,
    { expiresIn: '1h' }
  );
  res.status(200).json({
    user: {
      id: user._id,
      email: user.email,
      username: user.username,
    },
    token: token,
  });
};

exports.verifyAuth = (req, res, next) => {
  const token = req.headers['authorization'].split(' ')[1];
  if (!token) {
    const error = new HttpError('Authentication failed.', 401);
    return next(error);
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = {
      id: decoded.id,
      email: decoded.email,
      username: decoded.username,
    };
    next();
  } catch (err) {
    const error = new HttpError('Authentication failed.', 401);
    return next(error);
  }
};