// backend/controllers/authController.js

const User = require('../models/User');

const signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Create a new user
    const newUser = new User({ email, password });
    
    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Implement similar functions for login, forgot password, etc.
