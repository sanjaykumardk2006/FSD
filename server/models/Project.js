const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: true,
    },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    freelancerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['Active', 'On Hold', 'Completed', 'Cancelled'],
      default: 'Active',
    },
    progress: [
      {
        stage: String,
        description: String,
        updatedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    lastUpdateDate: {
      type: Date,
      default: Date.now,
    },
    completionDate: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);
