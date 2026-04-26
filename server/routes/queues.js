const express = require('express');
const router = express.Router();
const queueController = require('../controllers/queueController');
const auth = require('../middleware/auth');

// Public routes for customers
router.post('/:queueId/join', queueController.joinQueue);
router.get('/:queueId/entries', queueController.getQueue);

// Protected routes for businesses
router.post('/', auth, queueController.createQueue);
router.patch('/entries/:entryId', auth, queueController.updateEntryStatus);

module.exports = router;
