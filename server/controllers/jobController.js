const Job = require('../models/Job');
const Proposal = require('../models/Proposal');
const { body, validationResult } = require('express-validator');

// Client - Post a new job
exports.postJob = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('requiredSkills').isArray().withMessage('Required skills must be an array'),
  body('budget').isNumeric().withMessage('Budget must be a number'),
  body('deadline').isISO8601().withMessage('Valid deadline date is required'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, description, requiredSkills, budget, deadline } = req.body;

      const job = new Job({
        title,
        description,
        requiredSkills,
        budget,
        deadline,
        clientId: req.user.userId,
      });

      await job.save();
      res.status(201).json({ message: 'Job posted successfully', job });
    } catch (error) {
      console.error('Post job error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },
];

// Get all jobs
exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ status: 'Open' }).populate('clientId', 'username email profile');
    res.status(200).json({ jobs });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Client - Get their posted jobs
exports.getClientJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ clientId: req.user.userId });
    res.status(200).json({ jobs });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get job details
exports.getJobDetails = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId).populate('clientId', 'username email profile');
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json({ job });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Client - Get proposals for their job
exports.getJobProposals = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Verify client owns this job
    if (job.clientId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const proposals = await Proposal.find({ jobId: req.params.jobId }).populate('freelancerId', 'username email profile');
    res.status(200).json({ proposals });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Client - Update job status
exports.updateJobStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const job = await Job.findByIdAndUpdate(
      req.params.jobId,
      { status },
      { new: true }
    );

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.status(200).json({ message: 'Job status updated', job });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Client - Delete job
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Verify client owns this job
    if (job.clientId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // Delete associated proposals
    await Proposal.deleteMany({ jobId: req.params.jobId });

    // Delete the job
    await Job.findByIdAndDelete(req.params.jobId);

    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Delete job error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
