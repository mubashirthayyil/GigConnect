const express = require('express');
const { createGig, getGigs } = require('../controllers/gigController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();
const roleCheck = require('../middleware/roleMiddleware');

router.get('/', getGigs);
router.post('/', protect, createGig);

router.post('/', protect, roleCheck(['client']), createGig);


module.exports = router;
