const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/register', async (req, res) => {

  try{

    const { username, email, password } = req.body;
  const user = new User({ username, email, password: bcrypt.hashSync(password, 10) });
  await user.save();
  res.status(201).send({ message: 'User registered successfully!', user }); 
  

  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyValue) {
      // Handle duplicate key error
      return res.status(400).json({ message: 'Username or email already exists.' });
    }
    console.error(error);
    res.status(500).send('Server error');
  }
  
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || bcrypt.compareSync(password, user.password) === false) {
    return res.status(400).send({ message: 'Invalid email or password.' });
  }
  const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: '1h' });
  res.status(200).send({ message: 'Logged in successfully!', token });
});

module.exports = router;