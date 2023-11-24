const express = require('express');
const authController = require('../controllers/authController'); 
const { Wit } = require('node-wit');


const router = express.Router();


router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.post('/verify-email', authController.verifyEmail);
router.post('/reset-password', authController.resetPassword);
router.get('/logout', authController.logout);
router.post('/chat', authController.chat);

// New routes for Google authentication
router.get('/google-login', authController.googleLogin);
router.get('/google-callback', authController.googleCallback);
router.get('/google-callback-success', authController.googleCallbackSuccess);


module.exports = router;
