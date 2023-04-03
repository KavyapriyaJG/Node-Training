const express = require('express');
const router = express.Router();
const deleteBuddyController = require('../controllers/deleteBuddy.controllers');

router.delete('/:id', deleteBuddyController.deleteBuddy);

module.exports = router;