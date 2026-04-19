const express = require('express');
const { postJob, getAllJobs, getClientJobs, getJobDetails, getJobProposals, updateJobStatus } = require('../controllers/jobController');
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

// Client - Post a job
router.post('/post', authMiddleware, roleMiddleware(['Client']), postJob);

// Get all open jobs (for freelancers)
router.get('/all', getAllJobs);

// Client - Get their jobs
router.get('/my-jobs', authMiddleware, roleMiddleware(['Client']), getClientJobs);

// Get job details
router.get('/:jobId', getJobDetails);

// Client - Get proposals for their job
router.get('/:jobId/proposals', authMiddleware, roleMiddleware(['Client']), getJobProposals);

// Client - Update job status
router.put('/:jobId/status', authMiddleware, roleMiddleware(['Client']), updateJobStatus);

module.exports = router;
