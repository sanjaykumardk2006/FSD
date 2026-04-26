const express = require('express');
const { submitContactForm, testSMTPConfig } = require('../controllers/contactController');

const router = express.Router();

router.get('/test-smtp', testSMTPConfig);
// Submit contact form
router.post('/submit', submitContactForm);

module.exports = router;
