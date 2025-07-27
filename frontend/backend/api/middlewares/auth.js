const jwt = require('jsonwebtoken');
const User = require('../../models/user');

const protect = (handler) => async (req, res) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select('-password');

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

const admin = (handler) => async (req, res) => {
  if (req.user && req.user.role === 'admin') {
    return handler(req, res);
  } else {
    return res.status(401).json({ message: 'Not authorized as an admin' });
  }
};

const trader = (handler) => async (req, res) => {
  if (req.user && req.user.role === 'trader') {
    return handler(req, res);
  } else {
    return res.status(401).json({ message: 'Not authorized as a trader' });
  }
};

module.exports = { protect, admin, trader };
