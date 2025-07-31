const jwt = require('jsonwebtoken');
const User = require('../../models/user');

// Improved JWT verification with proper error handling
const protect = (handler) => async (req, res) => {
  let token;

  if (req.headers.authorization?.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch user with password excluded
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({ message: 'User not found' });
      }

      return handler(req, res);
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// Role-based middleware
const role = (...roles) => (handler) => (req, res) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({
      message: `User role ${req.user.role} is not authorized to access this route`
    });
  }
  return handler(req, res);
};

module.exports = { protect, role };
