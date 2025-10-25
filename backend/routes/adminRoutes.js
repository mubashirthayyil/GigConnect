const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { roleCheck } = require('../middleware/roleMiddleware');
const { getAllUsers, getUserById, updateUser, deleteUser } = require('../controllers/adminController');

// Only Admins allowed
router.use(protect, roleCheck(['admin']));

router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

module.exports = router;
