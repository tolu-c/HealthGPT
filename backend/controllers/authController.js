const { Message, User } = require("../models/User");
const { Response } = require("../models/User");
const sendEmail = require("../utils/sendEmail");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const uuid = require("uuid");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const axios = require("axios");
const openaiApiKey = process.env.OPENAI_API_KEY;
const extractUserId = require("../middleware/extractUserId");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
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
    }
  )
);

const authController = {
  signup: async (req, res) => {
    try {
      console.log("Received request body:", req.body);
      // const { email, password, fullName } = req.body;
      const email = req.body.email;
      const password = req.body.password;
      const fullName = req.body.fullName;

      console.log("Email:", email);
      console.log("Password:", password);
      console.log("Full Name:", fullName);

      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "User already exists with this email." });
      }

      // Check if the password is provided
      if (!password) {
        console.log("Password is missing!");
        return res.status(400).json({ message: "Password is required." });
      }

      // Hash the password
      console.log("Password before hashing:", password);
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log("Password after hashing:", hashedPassword);

      // Create a new user in the database with email verification status set to false
      const newUser = await User.create({
        email,
        password: hashedPassword,
        isVerified: false,
        emailVerificationOTP: otpGenerator.generate(6, {
          upperCase: false,
          specialChars: false,
        }),
        fullName,
      });

      // Send email verification OTP
      await sendEmail(
        email,
        "Email Verification OTP",
        `Your OTP is: ${newUser.emailVerificationOTP}`
      );

      res.status(201).json({
        message: "Signup successful. Check your email for verification.",
      });
    } catch (error) {
      console.error("Error during signup:", error);
      res.status(500).json({ message: "Internal Server Error during signup" });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Check the password
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ message: "Invalid password" });
      }

      // Check if the user is verified
      if (!user.isVerified) {
        return res.status(401).json({
          message:
            "User not verified. Please check your email for verification.",
        });
      }

      // Generate a JWT token with expiration time set to 1 day
      const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
        expiresIn: "1d",
      });

      // Send the token in the response
      res.json({ token, message: "Login successful" });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },

  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;

      // Check if the user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Generate a password reset token
      const passwordResetToken = uuid.v4();

      // Save the password reset token and its expiration time in the user document
      user.passwordResetToken = passwordResetToken;
      user.passwordResetTokenExpiration = Date.now() + 3600000; // Token expires in 1 hour

      await user.save();

      // Send the password reset email with the token link
      const resetLink = `https://health-gpt-blush.vercel.app/change-password?token${passwordResetToken}`;
      const emailText = `Click on the following link to reset your password: ${resetLink}`;
      await sendEmail(email, "Password Reset", emailText);

      res.status(200).json({
        message: "Password reset instructions sent. Check your email.",
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },

  resetPassword: async (req, res) => {
    try {
      const { token, newPassword, confirmPassword } = req.body;

      // Find the user by the reset token
      const user = await User.findOne({ passwordResetToken: token });

      // Check if the token is valid and not expired
      if (!user || user.passwordResetTokenExpiration < Date.now()) {
        return res.status(401).json({ message: "Invalid or expired token" });
      }

      // Check if passwords match
      if (newPassword !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
      }

      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update the user's password and clear the reset token fields
      user.password = hashedPassword;
      user.passwordResetToken = undefined;
      user.passwordResetTokenExpiration = undefined;

      await user.save();

      res.status(200).json({ message: "Password reset successful" });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },

  logout: (req, res) => {
    try {
      // For Passport.js logout with a callback
      req.logout((err) => {
        if (err) {
          console.error("Error during logout:", err);
          res.status(500).json({ message: "Internal Server Error" });
        } else {
          // Redirect to the home page or any other page after logout
          res.status(200).json({ message: "Logout successful" });
        }
      });
    } catch (error) {
      console.error("Error during logout:", error);
      res.status(500).json({ message: "Internal Server Error" });
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
        return res.status(404).json({ message: "User not found" });
      }

      // Retrieve the stored OTP from the user document in the database
      const storedEmailVerificationOTP = user.emailVerificationOTP;

      if (otp === storedEmailVerificationOTP) {
        // Update the user's email verification status in the database
        // For example: await User.updateOne({ email }, { isVerified: true });
        user.isVerified = true;
        await user.save();

        res.status(200).json({ message: "Email verified successfully." });
      } else {
        res
          .status(401)
          .json({ message: "Invalid OTP. Email verification failed." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
  resendOTP: async (req, res) => {
    try {
      const { email } = req.body;

      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Generate a new OTP
      const newOTP = otpGenerator.generate(6, {
        upperCase: false,
        specialChars: false,
      });

      // Update the user's OTP in the database
      user.emailVerificationOTP = newOTP;
      await user.save();

      // Send the new OTP to the user's email
      await sendEmail(
        email,
        "Email Verification OTP",
        `Your new OTP is: ${newOTP}`
      );

      res.status(200).json({ message: "New OTP sent successfully." });
    } catch (error) {
      console.error("Error during OTP resend:", error);
      res
        .status(500)
        .json({ message: "Internal Server Error during OTP resend" });
    }
  },

  getUser: async (req, res) => {
    try {
      // Get the user ID from the request parameter
      const userId = req.userId;

      // Find the user by ID
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Return user details
      res.status(200).json({
        fullname: user.fullName,
        email: user.email,
      });
    } catch (error) {
      console.error("Error getting user details:", error);
      res
        .status(500)
        .json({ message: "Internal Server Error getting user details" });
    }
  },

  chat: async (req, res) => {
    try {
      // The user ID is already attached to the request by the extractUserId middleware
      const userId = req.userId;
      const { message } = req.body;

      // Save user's message to the database
      const userMessage = await Message.create({
        content: message,
        userId,
      });

      // Create a health-related prompt for OpenAI
      const healthPrompt =
        "Discuss common health issues, their symptoms, and preventive measures.";

      // Send user's message and health-related prompt to OpenAI for processing
      const openAIResponse = await axios.post(
        "https://api.openai.com/v1/engines/davinci-codex/completions",
        {
          prompt: `${message}\n${healthPrompt}`,
          max_tokens: 1000,
          n: 1,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${openaiApiKey}`,
            "User-Token": req.header("x-auth-token"),
          },
        }
      );

      const aiResponse = openAIResponse.data.choices[0]?.text || "No Response";

      // Save AI response to the database
      const aiMessage = await Response.create({
        content: aiResponse,
        userId: aiBotUserId,
      });

      // Return the IDs and content of both messages
      res.status(200).json({
        userMessage: {
          id: userMessage._id,
          content: userMessage.content,
        },
        aiResponse: {
          id: aiMessage._id,
          content: aiMessage.content,
        },
      });
    } catch (error) {
      console.error("Error during chat processing:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  getChatHistory: async (req, res) => {
    try {
      const userId = req.userId;

      // Retrieve the chat history for the logged-in user
      const userMessages = await Message.find({ userId }).sort({
        createdAt: "asc",
      });
      const aiResponses = await Response.find({
        userId: "AI_BOT_USER_ID",
      }).sort({ createdAt: "asc" });

      // Combine and sort messages and responses based on createdAt
      const chatHistory = [...userMessages, ...aiResponses].sort(
        (a, b) => a.createdAt - b.createdAt
      );

      res.status(200).json({ chatHistory });
    } catch (error) {
      console.error("Error getting chat history:", error);
      res
        .status(500)
        .json({ message: "Internal Server Error getting chat history" });
    }
  },

  editMessage: async (req, res) => {
    try {
      const { messageId, newContent } = req.body;
      const userId = req.userId;

      // Check if the user owns the message
      const userMessage = await Message.findOne({ _id: messageId, userId });
      if (!userMessage) {
        return res
          .status(403)
          .json({ message: "You are not authorized to edit this message" });
      }

      // Update the message content
      userMessage.content = newContent;
      await userMessage.save();

      res.status(200).json({ message: "Message edited successfully" });
    } catch (error) {
      console.error("Error editing message:", error);
      res
        .status(500)
        .json({ message: "Internal Server Error editing message" });
    }
  },
};

module.exports = authController;
