const express = require('express');
const { sendMessage, getProjectMessages, markAsRead, getUnreadCount } = require('../controllers/messageController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

// Send message
router.post('/send', authMiddleware, sendMessage);

// Get messages for a project
router.get('/:projectId', authMiddleware, getProjectMessages);

// Mark message as read
router.put('/:messageId/read', authMiddleware, markAsRead);

// Get unread count
router.get('/unread/count', authMiddleware, getUnreadCount);

module.exports = router;
