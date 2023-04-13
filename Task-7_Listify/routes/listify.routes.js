const express = require('express');
const tasksRouter = require('./tasks.routes');
const { signUpController, loginController } = require('../controllers/listify.controllers');
const listifyRouter = express.Router();
const { verifyUser } = require('../middlewares/authentication');

// Routes to Create user account and Login user
listifyRouter.post('/signUp', signUpController);
listifyRouter.post('/login', loginController);

// Tasks Route
// User needs to pass JWT Auth middleware to access Tasks
listifyRouter.use('/tasks', verifyUser, tasksRouter);

module.exports = listifyRouter;