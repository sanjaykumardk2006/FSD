const express = require('express');
const { submitProposal, getFreelancerProposals, acceptProposal, rejectProposal, deleteProposal } = require('../controllers/proposalController');
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

// Freelancer - Submit proposal
router.post('/submit', authMiddleware, roleMiddleware(['Freelancer']), submitProposal);

// Freelancer - Get their proposals
router.get('/my-proposals', authMiddleware, roleMiddleware(['Freelancer']), getFreelancerProposals);

// Client - Accept proposal
router.put('/:proposalId/accept', authMiddleware, roleMiddleware(['Client']), acceptProposal);

// Client - Reject proposal
router.put('/:proposalId/reject', authMiddleware, roleMiddleware(['Client']), rejectProposal);

// Freelancer - Delete proposal
router.delete('/:proposalId', authMiddleware, roleMiddleware(['Freelancer']), deleteProposal);

module.exports = router;
