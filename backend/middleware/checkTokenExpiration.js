// checkTokenExpiration.js
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
  // Get the token from the request headers
  const token = req.headers.authorization;

  if (token) {
    // Verify the token
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        // Token verification failed, indicating an expired token
        console.error('Token verification failed:', err);
        req.logout(); // Perform logout
      } else {
        // Check if the token is expired after 2 minutes
        const expirationTime = decoded.exp * 1000; // Convert seconds to milliseconds
        const currentTime = Date.now();

        if (currentTime > expirationTime + 120000) {
          console.error('Token expired after 2 minutes.');
          req.logout(); // Perform logout
        }
      }
    });
  }

  next();
};
