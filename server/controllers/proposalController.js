const Proposal = require('../models/Proposal');
const Job = require('../models/Job');
const Notification = require('../models/Notification');
const { sendProposalRejectionEmail } = require('../utils/emailUtils');
const { body, validationResult } = require('express-validator');

// Freelancer - Submit proposal
exports.submitProposal = [
  body('jobId').notEmpty().withMessage('Job ID is required'),
  body('skills').isArray().withMessage('Skills must be an array'),
  body('experience').trim().notEmpty().withMessage('Experience is required'),
  body('proposedCost').isNumeric().withMessage('Proposed cost must be a number'),
  body('proposedDeadline').isISO8601().withMessage('Valid deadline date is required'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { jobId, skills, experience, proposedCost, proposedDeadline, coverLetter } = req.body;

      // Check if job exists
      const job = await Job.findById(jobId);
      if (!job) {
        return res.status(404).json({ message: 'Job not found' });
      }

      // Check if freelancer already submitted proposal
      const existingProposal = await Proposal.findOne({
        jobId,
        freelancerId: req.user.userId,
      });
      if (existingProposal) {
        return res.status(400).json({ message: 'You already submitted a proposal for this job' });
      }

      const proposal = new Proposal({
        jobId,
        freelancerId: req.user.userId,
        skills,
        experience,
        proposedCost,
        proposedDeadline,
        coverLetter,
      });

      await proposal.save();

      // Create notification for client
      await Notification.create({
        userId: job.clientId,
        type: 'new_proposal',
        title: 'New Proposal Received',
        message: `A freelancer submitted a proposal for "${job.title}"`,
        relatedId: proposal._id,
      });

      res.status(201).json({ message: 'Proposal submitted successfully', proposal });
    } catch (error) {
      console.error('Submit proposal error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },
];

// Freelancer - Get their proposals
exports.getFreelancerProposals = async (req, res) => {
  try {
    const proposals = await Proposal.find({ freelancerId: req.user.userId })
      .populate('jobId', 'title description budget')
      .populate('freelancerId', 'username email');
    res.status(200).json({ proposals });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Client - Accept proposal
exports.acceptProposal = async (req, res) => {
  try {
    const proposal = await Proposal.findById(req.params.proposalId);
    if (!proposal) {
      return res.status(404).json({ message: 'Proposal not found' });
    }

    const job = await Job.findById(proposal.jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Verify client owns this job
    if (job.clientId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // Update proposal status
    proposal.status = 'Accepted';
    await proposal.save();

    // Update job with assigned freelancer
    job.assignedFreelancerId = proposal.freelancerId;
    job.status = 'In Progress';
    await job.save();

    // Create notification for freelancer
    await Notification.create({
      userId: proposal.freelancerId,
      type: 'proposal_accepted',
      title: 'Proposal Accepted',
      message: `Your proposal for "${job.title}" was accepted!`,
      relatedId: proposal._id,
    });

    res.status(200).json({ message: 'Proposal accepted', proposal });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Client - Reject proposal
exports.rejectProposal = [
  body('rejectionReason').trim().notEmpty().withMessage('Rejection reason is required'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { rejectionReason } = req.body;
      const proposal = await Proposal.findById(req.params.proposalId).populate('freelancerId', 'email username');

      if (!proposal) {
        return res.status(404).json({ message: 'Proposal not found' });
      }

      const job = await Job.findById(proposal.jobId);
      if (!job) {
        return res.status(404).json({ message: 'Job not found' });
      }

      // Verify client owns this job
      if (job.clientId.toString() !== req.user.userId) {
        return res.status(403).json({ message: 'Unauthorized' });
      }

      // Update proposal status
      proposal.status = 'Rejected';
      proposal.rejectionReason = rejectionReason;
      await proposal.save();

      // Send email to freelancer
      await sendProposalRejectionEmail(proposal.freelancerId.email, job.title, rejectionReason);

      // Create notification for freelancer
      await Notification.create({
        userId: proposal.freelancerId._id,
        type: 'proposal_rejected',
        title: 'Proposal Rejected',
        message: `Your proposal for "${job.title}" was rejected.\nReason: ${rejectionReason}`,
        relatedId: proposal._id,
      });

      res.status(200).json({ message: 'Proposal rejected', proposal });
    } catch (error) {
      console.error('Reject proposal error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },
];
