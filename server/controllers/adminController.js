const User = require('../models/User');
const Job = require('../models/Job');
const Project = require('../models/Project');
const Proposal = require('../models/Proposal');

// Get overall platform metrics
const getMetrics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalJobs = await Job.countDocuments();
    const totalProjects = await Project.countDocuments();
    const activeDisputes = await Project.countDocuments({ status: 'Disputed' });

    res.status(200).json({
      totalUsers,
      totalJobs,
      totalProjects,
      activeDisputes
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching metrics', error: error.message });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};

// Toggle user active status
const toggleUserStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Don't allow admins to deactivate themselves
    if (user._id.toString() === req.user.id) {
       return res.status(400).json({ message: 'Cannot deactivate your own account' });
    }

    user.isActive = !user.isActive;
    await user.save();
    
    res.status(200).json({ message: `User ${user.isActive ? 'activated' : 'deactivated'} successfully`, user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user status', error: error.message });
  }
};

// Get all disputes
const getDisputes = async (req, res) => {
  try {
    const disputes = await Project.find({ status: 'Disputed' })
      .populate('clientId', 'username email')
      .populate('freelancerId', 'username email')
      .populate('jobId', 'title')
      .sort({ 'dispute.dateRaised': -1 });
      
    res.status(200).json(disputes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching disputes', error: error.message });
  }
};

// Resolve dispute
const resolveDispute = async (req, res) => {
  try {
    const { status, resolutionNotes } = req.body;
    
    // Ensure status is valid
    if (!['Active', 'Completed', 'Cancelled'].includes(status)) {
      return res.status(400).json({ message: 'Invalid resolution status' });
    }

    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (project.status !== 'Disputed') {
      return res.status(400).json({ message: 'Project is not currently disputed' });
    }

    project.status = status;
    project.dispute.isDisputed = false;
    // We could save resolution notes if we added a field, for now just changing status
    // Maybe add to progress
    project.progress.push({
      stage: 'Dispute Resolved',
      description: `Dispute resolved by Admin. Status set to ${status}. Notes: ${resolutionNotes || 'None'}`,
    });
    project.lastUpdateDate = Date.now();
    
    await project.save();

    res.status(200).json({ message: 'Dispute resolved successfully', project });
  } catch (error) {
    res.status(500).json({ message: 'Error resolving dispute', error: error.message });
  }
};

// Get all jobs
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate('clientId', 'username email').sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching jobs', error: error.message });
  }
};

// Delete a job
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    // Also delete proposals related to this job to prevent orphaned records
    await Proposal.deleteMany({ jobId: req.params.id });
    res.status(200).json({ message: 'Job and related proposals deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting job', error: error.message });
  }
};

// Get all proposals
const getAllProposals = async (req, res) => {
  try {
    const proposals = await Proposal.find()
      .populate('freelancerId', 'username email')
      .populate('jobId', 'title')
      .sort({ createdAt: -1 });
    res.status(200).json(proposals);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching proposals', error: error.message });
  }
};

// Delete a proposal
const deleteProposal = async (req, res) => {
  try {
    const proposal = await Proposal.findByIdAndDelete(req.params.id);
    if (!proposal) {
      return res.status(404).json({ message: 'Proposal not found' });
    }
    res.status(200).json({ message: 'Proposal deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting proposal', error: error.message });
  }
};

module.exports = {
  getMetrics,
  getAllUsers,
  toggleUserStatus,
  getDisputes,
  resolveDispute,
  getAllJobs,
  deleteJob,
  getAllProposals,
  deleteProposal
};
