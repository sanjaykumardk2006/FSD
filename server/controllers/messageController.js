const Message = require('../models/Message');
const Project = require('../models/Project');
const { body, validationResult } = require('express-validator');

// Send message
exports.sendMessage = [
  body('projectId').notEmpty().withMessage('Project ID is required'),
  body('receiverId').notEmpty().withMessage('Receiver ID is required'),
  body('message').trim().notEmpty().withMessage('Message cannot be empty'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg, errors: errors.array() });
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

      // Populate sender information so frontend has what it needs immediately
      await newMessage.populate('senderId', 'username email profile');

      // Emit the message in real-time to the project room
      if (req.io) {
        req.io.to(projectId).emit('receive_message', newMessage);
      }

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

// Get global inbox (latest message per project)
exports.getInbox = async (req, res) => {
  try {
    const userId = req.user.userId;
    // Find all active projects for the user
    const projects = await Project.find({
      $or: [{ clientId: userId }, { freelancerId: userId }]
    }).populate('clientId', 'username profile').populate('freelancerId', 'username profile').populate('jobId', 'title');

    const inbox = await Promise.all(projects.map(async (project) => {
      const latestMessage = await Message.findOne({ projectId: project._id })
        .sort({ createdAt: -1 })
        .populate('senderId', 'username profile');
      
      const unreadCount = await Message.countDocuments({
        projectId: project._id,
        receiverId: userId,
        isRead: false
      });

      const otherUser = project.clientId._id.toString() === userId.toString() ? project.freelancerId : project.clientId;

      return {
        project: {
          _id: project._id,
          title: project.jobId?.title || 'Unknown Project',
          status: project.status
        },
        otherUser: {
          _id: otherUser._id,
          username: otherUser.username,
          profileImage: otherUser.profile?.profileImage
        },
        latestMessage,
        unreadCount
      };
    }));

    // Sort inbox by latest message date (descending)
    inbox.sort((a, b) => {
      const dateA = a.latestMessage ? new Date(a.latestMessage.createdAt).getTime() : 0;
      const dateB = b.latestMessage ? new Date(b.latestMessage.createdAt).getTime() : 0;
      return dateB - dateA;
    });

    res.status(200).json({ inbox });
  } catch (error) {
    console.error('Get inbox error:', error);
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

// Edit message
exports.editMessage = [
  body('message').trim().notEmpty().withMessage('Message cannot be empty'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg, errors: errors.array() });
    }

    try {
      const message = await Message.findById(req.params.messageId);
      
      if (!message) {
        return res.status(404).json({ message: 'Message not found' });
      }

      // Verify the user is the sender
      if (message.senderId.toString() !== req.user.userId) {
        return res.status(403).json({ message: 'Unauthorized to edit this message' });
      }

      message.message = req.body.message;
      message.isEdited = true;
      await message.save();

      await message.populate('senderId', 'username email profile');

      if (req.io) {
        req.io.to(message.projectId.toString()).emit('edit_message', message);
      }

      res.status(200).json({ message: 'Message updated', data: message });
    } catch (error) {
      console.error('Edit message error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
];

// Delete message
exports.deleteMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.messageId);
    
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    // Verify the user is the sender
    if (message.senderId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Unauthorized to delete this message' });
    }

    await Message.findByIdAndDelete(req.params.messageId);

    if (req.io) {
      req.io.to(message.projectId.toString()).emit('delete_message', { messageId: req.params.messageId });
    }

    res.status(200).json({ message: 'Message deleted successfully' });
  } catch (error) {
    console.error('Delete message error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
