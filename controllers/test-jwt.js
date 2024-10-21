const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
// const User = require('../models/user.js');

router.get('/sign-token', (req, res) => {
  // Mock user Object
  const user = {
    _id: 1,
    username: '1amTestname69',
    password: 'abc123'
  };

  // token creation
  const token = jwt.sign({ user }, process.env.JWT_SECRET);

  res.json({ token })
});

router.post('/verify-token', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  res.json({ token });
});

module.exports = router;