const express = require('express');
const authController = require('../controllers/authController'); 
const { Wit } = require('node-wit');
const passport = require('passport');
const extractUserId = require('../middleware/extractUserId');


const router = express.Router();


router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.post('/verify-email', authController.verifyEmail);
router.post('/reset-password', authController.resetPassword);
router.get('/logout', authController.logout);
router.post('/chat', authController.chat);
router.post('/resend-otp', authController.resendOTP);
router.get('/user', extractUserId, authController.getUser);


// New routes for Google authentication
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback route after successful Google Sign-In
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  // Redirect to the desired page after successful Google Sign-In
  res.redirect('/chat');
});


module.exports = router;
