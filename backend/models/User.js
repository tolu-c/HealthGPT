<<<<<<< HEAD
const mongoose = require('mongoose');
const authController = require('../controllers/authController'); 
=======
const mongoose = require("mongoose");
const authController = require("../controllers/authController");
>>>>>>> ad92de0682e7dcfc14c6589b22a3676b3b6d4d23

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

<<<<<<< HEAD
const Message = mongoose.model('Message', messageSchema);
=======
const Message = mongoose.model("Message", messageSchema);
>>>>>>> ad92de0682e7dcfc14c6589b22a3676b3b6d4d23

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

<<<<<<< HEAD
const Response = mongoose.model('Response', responseSchema);


=======
const Response = mongoose.model("Response", responseSchema);
>>>>>>> ad92de0682e7dcfc14c6589b22a3676b3b6d4d23

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
<<<<<<< HEAD

const User = mongoose.model('User', userSchema);

=======

const User = mongoose.model("User", userSchema);

>>>>>>> ad92de0682e7dcfc14c6589b22a3676b3b6d4d23
module.exports = { User, Message, Response };
