const express = require('express');
const { registerUser, loginUser, getMe } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/me', protect, getMe);

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, async (req, res) => {
  res.json(req.user);
});

module.exports = router;
