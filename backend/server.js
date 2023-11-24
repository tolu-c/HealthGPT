require('dotenv').config();
const helmet = require('helmet');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');


const app = express();
const PORT = process.env.PORT || 4000;

const { MONGODB_URI } = process.env;
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Load environment variables
const { WIT_AI_ACCESS_TOKEN, SESSION_SECRET } = process.env;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Using helmet middleware for secure headers
app.use(helmet());

// Initialize Passport and use the express-session middleware
app.use(session({ secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());



// Routes
app.use('/api', authRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
