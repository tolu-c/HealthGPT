const mongoose = require("mongoose");
const authController = require("../controllers/authController");

// Message Model
const messageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Message = mongoose.model("Message", messageSchema);

// Response Model
const responseSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Response = mongoose.model("Response", responseSchema);

// User Model
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  passwordResetToken: {
    type: String,
  },
  passwordResetTokenExpiration: {
    type: Date,
  },
  emailVerificationOTP: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = { User, Message, Response };
