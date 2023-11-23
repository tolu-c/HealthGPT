const User = require('../models/User');
const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const uuid = require('uuid');



// Function to send an email
const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to,
      subject,
      text,
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

const authController = {
  signup: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists with this email.' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user in the database
      const newUser = await User.create({ email, password: hashedPassword });

      // Send email verification OTP
      const emailVerificationOTP = otpGenerator.generate(6, { upperCase: false, specialChars: false });
      await sendEmail(email, 'Email Verification OTP', `Your OTP is: ${emailVerificationOTP}`);

      res.status(201).json({ message: 'Signup successful. Check your email for verification.' });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
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
};

module.exports = authController;
