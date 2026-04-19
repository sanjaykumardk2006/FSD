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
      return res.status(400).json({ errors: errors.array() });
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
      await Notification.create({
        userId: project.clientId,
        type: 'project_update',
        title: 'Project Update',
        message: `Project progress updated: ${stage}`,
        relatedId: project._id,
      });

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
    const project = await Project.findByIdAndUpdate(
      req.params.projectId,
      {
        status,
        ...(status === 'Completed' && { completionDate: new Date() }),
      },
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

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
