const express = require('express');
const { applyToGig, getApplications } = require('../controllers/applicationController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/apply', protect, applyToGig);
router.get('/:gigId/applications', protect, getApplications);

module.exports = router;
