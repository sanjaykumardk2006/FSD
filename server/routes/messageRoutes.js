const express = require('express');
const { sendMessage, getProjectMessages, markAsRead, getUnreadCount, editMessage, deleteMessage, getInbox } = require('../controllers/messageController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

// Send message
router.post('/send', authMiddleware, sendMessage);

// Get global inbox
router.get('/inbox', authMiddleware, getInbox);

// Get messages for a project
router.get('/:projectId', authMiddleware, getProjectMessages);

// Mark message as read
router.put('/:messageId/read', authMiddleware, markAsRead);

// Edit message
router.put('/:messageId', authMiddleware, editMessage);

// Delete message
router.delete('/:messageId', authMiddleware, deleteMessage);

// Get unread count
router.get('/unread/count', authMiddleware, getUnreadCount);

module.exports = router;
