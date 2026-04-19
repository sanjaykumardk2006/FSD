const express = require('express');
const { getNotifications, markAsRead, getUnreadCount, deleteNotification } = require('../controllers/notificationController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

// Get notifications
router.get('/', authMiddleware, getNotifications);

// Mark notification as read
router.put('/:notificationId/read', authMiddleware, markAsRead);

// Get unread count
router.get('/unread/count', authMiddleware, getUnreadCount);

// Delete notification
router.delete('/:notificationId', authMiddleware, deleteNotification);

module.exports = router;
