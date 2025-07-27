const User = require('../../models/user');
const Trade = require('../../models/trade');
const Investment = require('../../models/investment');

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Block/unblock a user
// @route   POST /api/admin/block-user
// @access  Private/Admin
const blockUser = async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.isBlocked = !user.isBlocked;
    await user.save();
    res.json({ message: `User ${user.isBlocked ? 'blocked' : 'unblocked'}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all KYC submissions
// @route   GET /api/admin/kyc
// @access  Private/Admin
const getKycSubmissions = async (req, res) => {
  try {
    const users = await User.find({ 'kyc.status': 'pending' });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Approve/reject a KYC submission
// @route   POST /api/admin/approve-kyc
// @access  Private/Admin
const approveKyc = async (req, res) => {
  const { userId, status } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.kyc.status = status;
    await user.save();
    res.json({ message: `KYC status updated to ${status}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all trade logs
// @route   GET /api/admin/trade-logs
// @access  Private/Admin
const getTradeLogs = async (req, res) => {
  try {
    const trades = await Trade.find({}).populate('trader', 'user');
    res.json(trades);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all investment logs
// @route   GET /api/admin/investment-logs
// @access  Private/Admin
const getInvestmentLogs = async (req, res) => {
  try {
    const investments = await Investment.find({}).populate('user', 'username email').populate('plan');
    res.json(investments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUsers,
  blockUser,
  getKycSubmissions,
  approveKyc,
  getTradeLogs,
  getInvestmentLogs,
};
