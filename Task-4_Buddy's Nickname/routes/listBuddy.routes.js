const express = require('express');
const router = express.Router();
const { listAllBuddy, listBuddyByID } = require('../controllers/listBuddy.controllers');

router.get('/:id', listBuddyByID);
router.get('/', listAllBuddy);

module.exports = router;