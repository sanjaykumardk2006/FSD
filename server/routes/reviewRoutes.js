const express = require('express');
const { createReview, getProjectReviews, getUserReviews } = require('../controllers/reviewController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

// Create a review
router.post('/submit', authMiddleware, createReview);

// Get reviews for a specific project
router.get('/project/:projectId', authMiddleware, getProjectReviews);

// Get reviews for a specific user
router.get('/user/:userId', authMiddleware, getUserReviews);

module.exports = router;
