const Message = require('../models/Message');
const { body, validationResult } = require('express-validator');

// Send message
exports.sendMessage = [
  body('projectId').notEmpty().withMessage('Project ID is required'),
  body('receiverId').notEmpty().withMessage('Receiver ID is required'),
  body('message').trim().notEmpty().withMessage('Message cannot be empty'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { projectId, receiverId, message } = req.body;

      const newMessage = new Message({
        projectId,
        senderId: req.user.userId,
        receiverId,
        message,
      });

      await newMessage.save();
      res.status(201).json({ message: 'Message sent', data: newMessage });
    } catch (error) {
      console.error('Send message error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },
];

// Get messages for a project
exports.getProjectMessages = async (req, res) => {
  try {
    const messages = await Message.find({ projectId: req.params.projectId })
      .populate('senderId', 'username email profile')
      .sort({ createdAt: 1 });

    res.status(200).json({ messages });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Mark message as read
exports.markAsRead = async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.messageId,
      { isRead: true },
      { new: true }
    );

    res.status(200).json({ message: 'Message marked as read', data: message });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get unread message count
exports.getUnreadCount = async (req, res) => {
  try {
    const count = await Message.countDocuments({
      receiverId: req.user.userId,
      isRead: false,
    });

    res.status(200).json({ unreadCount: count });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
