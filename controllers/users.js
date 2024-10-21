const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
                        // users? vv
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const SALT_ROUNDS = 12;

// // Sign-Up w/o Sign-in
// router.post('/signup', async (req, res) => {
    
//     try {
//         const userInDatabase = await User.findOne({ username: req.body.username });
//             if (userInDatabase) {
//                 return res.status(400).json({error:'Username already taken.'});
//             };

//         const user = await User.create({
//             username: req.body.username,
//             hashedPassword: bcrypt.hashSync(req.body.password, SALT_ROUNDS)
//         });

//         res.status(201).json({ user });
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// });

// Sign-up w/ Sign-in
router.post('/signup', async (req, res) => {
    try {
      // Check if the username is already taken
      const userInDatabase = await User.findOne({ username: req.body.username });
      if (userInDatabase) {
        return res.json({ error: 'Username already taken.' });
      }
      // Create a new user with hashed password
      const user = await User.create({
        username: req.body.username,
        hashedPassword: bcrypt.hashSync(req.body.password, SALT_ROUNDS),
      });

    //   ^^^^^^^^^ Added ^^^^^^^^^ 
      const token = jwt.sign(
        { username: user.username, _id: user._id },
        process.env.JWT_SECRET
      );
    //   ^^^^^^^^^^^^^^^^^^^^^^^^^^^

      res.status(201).json({ user, token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
// Sign-In
router.post('/signin', async (req, res) => {
    try {
        // vv Checks if the user exist
        const user = await User.findOne({ username: req.body.username });

        // If user is (true) it proceeds and compares the passwrod to hashed password
        // HOW? It re-hasehes the entered password in the SAME WAY. Applying the same logic
        // to scramble strings. vv vv vv vv vv vv vv vv vv vv vv 
        if (user && bcrypt.compareSync(req.body.password, user.hashedPassword)) {
            const token = jwt.sign(
                { 
                    username: user.username,
                    _id: user._id
                },
                process.env.JWT_SECRET
            );
            res.status(200).json({ token })
        } else {
            res.json({ message: "Unauthorized"})
        }

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
});
module.exports = router;
