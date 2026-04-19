const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: ['proposal_accepted', 'proposal_rejected', 'project_update', 'reminder', 'new_proposal'],
      required: true,
    },
    title: String,
    message: {
      type: String,
      required: true,
    },
    relatedId: mongoose.Schema.Types.ObjectId, // Job/Proposal/Project ID
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Notification', notificationSchema);
