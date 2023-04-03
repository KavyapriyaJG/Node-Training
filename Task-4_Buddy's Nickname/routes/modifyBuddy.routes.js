const express = require('express');
const router = express.Router();
const modifyBuddyControllers = require('../controllers/modifyBuddy.controllers');

router.put('/:id', modifyBuddyControllers.modifyBuddy);

module.exports = router;