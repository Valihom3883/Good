const User = require('../../models/user');
const jwt = require('jsonwebtoken');

// @desc    Register a new user
// @route   POST /api/register
// @access  Public
const registerUser = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      username,
      email,
      password,
      role,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Auth user & get token
// @route   POST /api/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user profile
// @route   GET /api/profile
// @access  Private
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// Generate QR code for 2FA setup
const setup2FA = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const otpauthUrl = user.enable2FA();
    await user.save();

    const qrCodeUrl = await QRCode.toDataURL(otpauthUrl);
    res.json({ qrCodeUrl });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Verify 2FA token
const verify2FA = async (req, res) => {
  const { token } = req.body;

  try {
    const user = await User.findById(req.user.id);
    const isValid = user.verify2FAToken(token);

    if (isValid) {
      user.isTwoFactorEnabled = true;
      await user.save();
      res.json({ message: '2FA enabled successfully' });
    } else {
      res.status(400).json({ message: 'Invalid token' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Middleware for 2FA verification
const require2FA = async (req, res, next) => {
  if (!req.user.isTwoFactorEnabled) return next();

  if (req.session.twoFactorVerified) return next();

  res.status(401).json({
    message: 'Two-factor authentication required',
    requires2FA: true
  });
};

module.exports = { registerUser, loginUser, getUserProfile, setup2FA, verify2FA, require2FA };
