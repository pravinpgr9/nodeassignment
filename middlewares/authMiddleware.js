const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
const authenticateUser = (req, res, next) => {
  // Get the token from the request headers or query parameters
  const token = req.headers.authorization?.split(' ')[1] || req.query.token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  // Verify the token
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
    // Store the decoded token payload in the request object
    req.user = decoded;
    next(); // Call the next middleware or route handler
  });
};

module.exports = authenticateUser;
