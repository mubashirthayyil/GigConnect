const express = require('express');
const { getGigs, getGigById, createGig, updateGig, deleteGig, applyToGig } = require('../controllers/gigController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();
const { roleCheck } = require('../middleware/roleMiddleware');
const { getApplicationsForClient, updateApplicationStatus } = require('../controllers/gigController');

router.get('/', getGigs);
router.get('/:id', getGigById);
router.post('/', protect, createGig);

router.put('/:id', protect, updateGig);
router.delete('/:id', protect, deleteGig);

router.post('/', protect, roleCheck(['client']), createGig);
router.delete('/:id', protect, roleCheck(['admin', 'client']), deleteGig);

router.get('/client/applications', protect, getApplicationsForClient);
router.put('/applications/:id', protect, updateApplicationStatus);

module.exports = router;
