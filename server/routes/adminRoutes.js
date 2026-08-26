const express = require('express');
const router = express.Router();
const { 
  getMetrics, 
  getAllUsers, 
  toggleUserStatus, 
  getDisputes, 
  resolveDispute 
} = require('../controllers/adminController');
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware');

// All admin routes are protected and require 'Admin' role
router.use(authMiddleware, roleMiddleware(['Admin']));

// Metrics
router.get('/metrics', getMetrics);

// Users
router.get('/users', getAllUsers);
router.put('/users/:id/status', toggleUserStatus);

// Disputes
router.get('/disputes', getDisputes);
router.put('/projects/:id/resolve-dispute', resolveDispute);

module.exports = router;
