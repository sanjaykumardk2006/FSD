const Project = require('../models/Project');
const Job = require('../models/Job');
const Proposal = require('../models/Proposal');
const Notification = require('../models/Notification');
const { sendProjectUpdateReminder } = require('../utils/emailUtils');
const { body, validationResult } = require('express-validator');

// Get freelancer's active projects
exports.getFreelancerProjects = async (req, res) => {
  try {
    const projects = await Project.find({ freelancerId: req.user.userId })
      .populate('jobId', 'title description')
      .populate('clientId', 'username email');
    res.status(200).json({ projects });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get client's projects
exports.getClientProjects = async (req, res) => {
  try {
    const projects = await Project.find({ clientId: req.user.userId })
      .populate('jobId', 'title description')
      .populate('freelancerId', 'username email profile');
    res.status(200).json({ projects });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get project details
exports.getProjectDetails = async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId)
      .populate('jobId', 'title description budget')
      .populate('clientId', 'username email')
      .populate('freelancerId', 'username email profile');

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Verify user has access to this project
    if (
      project.clientId._id.toString() !== req.user.userId &&
      project.freelancerId._id.toString() !== req.user.userId
    ) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    res.status(200).json({ project });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Freelancer - Update project progress
exports.updateProjectProgress = [
  body('stage').trim().notEmpty().withMessage('Stage is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg, errors: errors.array() });
    }

    try {
      const { stage, description } = req.body;
      const project = await Project.findById(req.params.projectId);

      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }

      // Verify freelancer owns this project
      if (project.freelancerId.toString() !== req.user.userId) {
        return res.status(403).json({ message: 'Unauthorized' });
      }

      // Add progress update
      project.progress.push({
        stage,
        description,
        updatedAt: new Date(),
      });

      project.lastUpdateDate = new Date();
      await project.save();

      // Create notification for client
      const notification = await Notification.create({
        userId: project.clientId,
        type: 'project_update',
        title: 'Project Update',
        message: `Project progress updated: ${stage}`,
        relatedId: project._id,
      });

      if (req.io) {
        req.io.to(project.clientId.toString()).emit('new_notification', notification);
      }

      res.status(200).json({ message: 'Project progress updated', project });
    } catch (error) {
      console.error('Update project progress error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },
];

// Update project status
exports.updateProjectStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const project = await Project.findById(req.params.projectId);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Verify user is the client (usually clients approve completion)
    if (project.clientId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Only the client can update the project status' });
    }

    project.status = status;
    if (status === 'Completed') {
      project.completionDate = new Date();
    }
    await project.save();

    res.status(200).json({ message: 'Project status updated', project });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get pending project updates (for reminders)
exports.getPendingUpdates = async (req, res) => {
  try {
    const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);
    const projects = await Project.find({
      freelancerId: req.user.userId,
      status: 'Active',
      lastUpdateDate: { $lt: twoDaysAgo },
    }).populate('jobId', 'title');

    res.status(200).json({ projects });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Raise a dispute for a project
exports.raiseDispute = async (req, res) => {
  try {
    const { reason } = req.body;
    const { projectId } = req.params;
    
    if (!reason || !reason.trim()) {
      return res.status(400).json({ message: 'Reason is required for raising a dispute.' });
    }

    const project = await Project.findById(projectId);
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Verify user is part of the project
    if (project.clientId.toString() !== req.user.userId && project.freelancerId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    if (project.status === 'Completed' || project.status === 'Cancelled') {
      return res.status(400).json({ message: `Cannot dispute a project that is already ${project.status.toLowerCase()}` });
    }
    
    if (project.status === 'Disputed') {
      return res.status(400).json({ message: 'Project is already under dispute' });
    }

    project.status = 'Disputed';
    project.dispute = {
      isDisputed: true,
      disputerId: req.user.userId,
      reason: reason.trim(),
      dateRaised: new Date()
    };
    
    await project.save();

    // Determine the other party for notification
    const otherPartyId = project.clientId.toString() === req.user.userId 
      ? project.freelancerId 
      : project.clientId;

    // Create notification for the other party
    const notification = await Notification.create({
      userId: otherPartyId,
      type: 'project_dispute',
      title: 'Project Disputed',
      message: 'A dispute has been raised on your active project. Actions are frozen until moderation completes.',
      relatedId: project._id,
    });

    if (req.io) {
      req.io.to(otherPartyId.toString()).emit('new_notification', notification);
    }

    res.status(200).json({ message: 'Dispute raised successfully', project });
  } catch (error) {
    console.error('Raise dispute error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
