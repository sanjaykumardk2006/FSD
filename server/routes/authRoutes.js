const express = require('express');
const rateLimit = require('express-rate-limit');
const { signup, login, getUserProfile, updateUserProfile } = require('../controllers/authController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

// Rate limiter to prevent brute-force attacks on login
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per window
  message: { message: 'Too many login attempts from this IP, please try again after 15 minutes.' }
});

router.post('/signup', signup);
router.post('/login', loginLimiter, login);
router.get('/profile', authMiddleware, getUserProfile);
router.put('/profile', authMiddleware, updateUserProfile);

module.exports = router;
