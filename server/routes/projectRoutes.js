const express = require('express');
const { getFreelancerProjects, getClientProjects, getProjectDetails, updateProjectProgress, updateProjectStatus, getPendingUpdates } = require('../controllers/projectController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

// Get freelancer's projects
router.get('/freelancer/projects', authMiddleware, getFreelancerProjects);

// Get client's projects
router.get('/client/projects', authMiddleware, getClientProjects);

// Get project details
router.get('/:projectId', authMiddleware, getProjectDetails);

// Freelancer - Update project progress
router.post('/:projectId/progress', authMiddleware, updateProjectProgress);

// Update project status
router.put('/:projectId/status', authMiddleware, updateProjectStatus);

// Get pending updates (for reminders)
router.get('/pending-updates', authMiddleware, getPendingUpdates);

module.exports = router;
