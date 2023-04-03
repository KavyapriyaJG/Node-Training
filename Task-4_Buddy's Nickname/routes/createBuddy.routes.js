const express = require('express');
const router = express.Router();
const createBuddyControllers = require('../controllers/createBuddy.controllers');

router.post('/', createBuddyControllers.createBuddy);

module.exports = router;