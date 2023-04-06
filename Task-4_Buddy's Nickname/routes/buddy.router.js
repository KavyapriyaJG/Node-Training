const express = require('express');
const buddyController = require('../controllers/buddy.controller');
const router = express.Router();

//Routes
router.get('/:id', buddyController.listBuddyByID);
router.get('/', buddyController.listAllBuddies);
router.post('/', buddyController.createBuddy);
router.put('/:id', buddyController.modifyBuddy);
router.delete('/:id', buddyController.deleteBuddy);


module.exports = router;