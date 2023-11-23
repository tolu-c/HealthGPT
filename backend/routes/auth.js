const express = require('express');
const authController = require('../controllers/authController'); 

const router = express.Router();

// Existing routes
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.post('/verify-email', authController.verifyEmail);

// New route for resetting the password
router.post('/reset-password', authController.resetPassword);

module.exports = router;
