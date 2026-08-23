const Review = require('../models/Review');
const Project = require('../models/Project');
const User = require('../models/User');

exports.createReview = async (req, res) => {
  try {
    const { projectId, revieweeId, rating, comment } = req.body;
    const reviewerId = req.user.userId;

    // Check if project exists and is completed
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    if (project.status !== 'Completed') {
      return res.status(400).json({ message: 'Can only review completed projects' });
    }

    // Verify users are part of the project
    const isClient = project.clientId.toString() === reviewerId;
    const isFreelancer = project.freelancerId.toString() === reviewerId;
    
    if (!isClient && !isFreelancer) {
      return res.status(403).json({ message: 'Unauthorized to review this project' });
    }

    const expectedReviewee = isClient ? project.freelancerId.toString() : project.clientId.toString();
    if (revieweeId !== expectedReviewee) {
      return res.status(400).json({ message: 'Invalid reviewee for this project' });
    }

    // Check if review already exists
    const existingReview = await Review.findOne({ projectId, reviewerId, revieweeId });
    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this user for this project' });
    }

    // Create review
    const review = await Review.create({
      projectId,
      reviewerId,
      revieweeId,
      rating: Number(rating),
      comment
    });

    // Update user's average rating
    const allReviews = await Review.find({ revieweeId });
    const totalReviews = allReviews.length;
    const sumRatings = allReviews.reduce((sum, r) => sum + r.rating, 0);
    const averageRating = totalReviews > 0 ? (sumRatings / totalReviews) : 0;

    await User.findByIdAndUpdate(revieweeId, {
      averageRating,
      totalReviews
    });

    res.status(201).json({ message: 'Review submitted successfully', review });
  } catch (error) {
    console.error('Create review error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getProjectReviews = async (req, res) => {
  try {
    const { projectId } = req.params;
    const reviews = await Review.find({ projectId })
      .populate('reviewerId', 'username profile.profileImage')
      .populate('revieweeId', 'username');
    
    res.status(200).json({ reviews });
  } catch (error) {
    console.error('Get project reviews error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getUserReviews = async (req, res) => {
  try {
    const { userId } = req.params;
    const reviews = await Review.find({ revieweeId: userId })
      .populate('reviewerId', 'username profile.profileImage')
      .populate('projectId', 'jobId') // populate project info if needed
      .sort({ createdAt: -1 });
      
    res.status(200).json({ reviews });
  } catch (error) {
    console.error('Get user reviews error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
