const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  sendMessage,
  getMessagesForGig
} = require('../controllers/messageController');

const router = express.Router();

router.post('/', protect, sendMessage);
router.get('/:gigId/:userId', protect, getMessagesForGig);

module.exports = router;
