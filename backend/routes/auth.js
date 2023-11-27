const express = require('express');
const authController = require('../controllers/authController'); 
const { Wit } = require('node-wit');
const passport = require('passport');
const extractUserId = require('../middleware/extractUserId');
const checkTokenExpiration = require('../middleware/checkTokenExpiration');


const router = express.Router();


router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.post('/verify-email', authController.verifyEmail);
router.post('/reset-password', authController.resetPassword);
router.get('/logout', authController.logout);
router.post('/chat', authController.chat);
router.get('/chat/history', authController.getChatHistory);
router.patch('/chat/edit', authController.editMessage);
router.post('/resend-otp', authController.resendOTP);
router.get('/user', extractUserId, authController.getUser);
router.get('/users/:userId', authController.getUser);


// New routes for Google authentication
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback route after successful Google Sign-In
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  // Redirect to the desired page after successful Google Sign-In
  res.redirect('/chat');
});

// Apply the checkTokenExpiration middleware to every route
router.use(checkTokenExpiration);


module.exports = router;
