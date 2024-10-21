const profilesRouter = require('./controllers/profiles');
const testJWTRouter = require('./controllers/test-jwt');
const userRouter = require('./controllers/users');
const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors')
dotenv.config();
const app = express();

mongoose.connect(process.env.MONGODB_URI);

app.use(express.json());
app.use(cors())

// ^^^^^ Routes ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
app.use('/auth', testJWTRouter);
app.use('/users', userRouter);
app.use('/profiles', profilesRouter);
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
      app.listen(3000, () => {
        console.log('The express app is ready!');
      });
});
