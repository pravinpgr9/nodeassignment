// Middleware to check user role and permissions
const authorizeUser = (req, res, next) => {
  // Check if the user has the necessary permissions
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
  }
  next(); // Call the next middleware or route handler
};

module.exports = authorizeUser;
