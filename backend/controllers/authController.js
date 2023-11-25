  const User = require('../models/User');
  const sendEmail = require('../utils/sendEmail');
  const otpGenerator = require('otp-generator');
  const bcrypt = require('bcrypt');
  const jwt = require('jsonwebtoken');
  const JWT_SECRET = process.env.JWT_SECRET;
  const uuid = require('uuid');
  const passport = require('passport'); 
  const GoogleStrategy = require('passport-google-oauth20').Strategy;
  const { Wit } = require('node-wit');
  const witClient = new Wit({ accessToken: process.env.WIT_AI_ACCESS_TOKEN });


  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        return done(null, existingUser);
      }

      const newUser = await User.create({
        googleId: profile.id,
        email: profile.emails[0].value,
      });

      return done(null, newUser);
    } catch (error) {
      return done(error, null);
    }
  }));

  const authController = {
    signup: async (req, res) => {
        try {
    
          console.log('Received request body:', req.body);
          const { email, password } = req.body;

          console.log('Email:', email);
          console.log('Password:', password);
          
    
          // Check if the user already exists
          const existingUser = await User.findOne({ email });
          if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this email.' });
          }
              
          // Check if the password is provided
          if (!password) {
            console.log('Password is missing!');
            return res.status(400).json({ message: 'Password is required.' });
          }
                        
          // Hash the password
          console.log('Password before hashing:', password);
          const hashedPassword = await bcrypt.hash(password, 10);
          console.log('Password after hashing:', hashedPassword);
    
          // Create a new user in the database with email verification status set to false
          const newUser = await User.create({
            email,
            password: hashedPassword,
            isVerified: false, // Set to false initially
            emailVerificationOTP: otpGenerator.generate(6, { upperCase: false, specialChars: false }),
          });
    
          // Send email verification OTP
          await sendEmail(email, 'Email Verification OTP', `Your OTP is: ${newUser.emailVerificationOTP}`);
    
          res.status(201).json({ message: 'Signup successful. Check your email for verification.' });
        } catch (error) {
          console.error('Error during signup:', error);
          res.status(500).json({ message: 'Internal Server Error during signup' });
        }
      },


    login: async (req, res) => {
      try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }

        // Check the password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
          return res.status(401).json({ message: 'Invalid password' });
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
      

        // Send the token in the response
        res.json({ token, message: 'Login successful' });
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    },

    forgotPassword: async (req, res) => {
      try {
        const { email } = req.body;

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }

        // Generate a password reset token
        const passwordResetToken = uuid.v4();

        // Save the password reset token and its expiration time in the user document
        user.passwordResetToken = passwordResetToken;
        user.passwordResetTokenExpiration = Date.now() + 3600000; // Token expires in 1 hour

        await user.save();

        // Send the password reset email with the token link
        const resetLink = `http://your-frontend-url/reset-password?token=${passwordResetToken}`;
        const emailText = `Click on the following link to reset your password: ${resetLink}`;
        await sendEmail(email, 'Password Reset', emailText);

        res.status(200).json({ message: 'Password reset instructions sent. Check your email.' });
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    },

    resetPassword: async (req, res) => {
      try {
        const { token, newPassword, confirmPassword } = req.body;

        // Find the user by the reset token
        const user = await User.findOne({ passwordResetToken: token });

        // Check if the token is valid and not expired
        if (!user || user.passwordResetTokenExpiration < Date.now()) {
          return res.status(401).json({ message: 'Invalid or expired token' });
        }

        // Check if passwords match
        if (newPassword !== confirmPassword) {
          return res.status(400).json({ message: 'Passwords do not match' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password and clear the reset token fields
        user.password = hashedPassword;
        user.passwordResetToken = undefined;
        user.passwordResetTokenExpiration = undefined;

        await user.save();

        res.status(200).json({ message: 'Password reset successful' });
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    },

    logout: async(req, res) => {
      try {
        // For example, using Passport.js:
        req.logout();
    
        // Redirect to the home page or any other page after logout
        res.status(200).json({ message: 'Logout successful' });
      } catch (error) {
        console.error('Error during logout:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    },
    

    verifyEmail: async (req, res) => {
      try {
        // Implement your email verification logic here
        // Example: compare the received OTP with the stored OTP
        const { email, otp } = req.body;
    
        // Retrieve the stored OTP from your database or any storage mechanism
        // Example: Fetch the user from the database
        const user = await User.findOne({ email });
    
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        // Retrieve the stored OTP from the user document in the database
        const storedEmailVerificationOTP = user.emailVerificationOTP;
    
        if (otp === storedEmailVerificationOTP) {
          // Update the user's email verification status in the database
          // For example: await User.updateOne({ email }, { isVerified: true });
          user.isVerified = true;
          await user.save();
    
          res.status(200).json({ message: 'Email verified successfully.' });
        } else {  
          res.status(401).json({ message: 'Invalid OTP. Email verification failed.' });
        }
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }

    },


    chat: async (req, res) => {
      try {
        const { message } = req.body;
    
        console.log('Received message:', message);
    
        // Process the user's message using Wit.ai
        const witResponse = await witClient.message(message);
        console.log('Wit.ai response:', witResponse);
    
        // Extract relevant information from Wit.ai response
        const intent = (witResponse.intents && witResponse.intents.length > 0) ? witResponse.intents[0].name : 'unknown';
        const entities = witResponse.entities;
    
        // Log the detected intent and entities
        console.log('Detected Intent:', intent);
        console.log('Detected Entities:', entities);
    
        // Perform actions based on the detected intent and entities
        let responseMessage = 'I\'m sorry, I didn\'t understand that.';
    
        // Example: Handle a "health_issue" intent
        if (intent === 'health_issue' && entities && entities['health_condition'] && entities['health_condition'].length > 0) {
          const condition = entities['health_condition'][0].value;
          // Perform logic to provide information or remedy for the health condition
          responseMessage = `It seems you are concerned about ${condition}. Here is some information and advice...`;
        }
    
        // Send the response back to the user
        res.status(200).json({ message: responseMessage });
      } catch (error) {
        console.error('Error during chat processing:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    },
  };


  module.exports = authController;
