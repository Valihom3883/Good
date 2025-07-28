const Wallet = require('../../models/wallet');
const Transaction = require('../../models/transaction');
const User = require('../../models/user');

// @desc    Get wallet balance
// @route   GET /api/wallet
// @access  Private
const getWallet = async (req, res) => {
  const userId = req.user.id;
  try {
    const wallet = await Wallet.findOne({ user: userId });
    if (!wallet) {
      // Create a wallet if it doesn't exist
      const newWallet = await Wallet.create({ user: userId });
      return res.json(newWallet);
    }
    res.json(wallet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Deposit funds
// @route   POST /api/deposit
// @access  Private
const deposit = async (req, res) => {
  const { amount } = req.body;
  const userId = req.user.id;

  try {
    const wallet = await Wallet.findOne({ user: userId });
    wallet.balance += amount;
    await wallet.save();

    await Transaction.create({
      wallet: wallet._id,
      type: 'deposit',
      amount,
    });

    res.json(wallet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Withdraw funds
// @route   POST /api/withdraw-wallet
// @access  Private
const withdraw = async (req, res) => {
  const { amount } = req.body;
  const userId = req.user.id;

  try {
    const wallet = await Wallet.findOne({ user: userId });
    if (wallet.balance < amount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }
    wallet.balance -= amount;
    await wallet.save();

    await Transaction.create({
      wallet: wallet._id,
      type: 'withdrawal',
      amount,
    });

    res.json(wallet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Transfer funds to another user
// @route   POST /api/transfer
// @access  Private
const transfer = async (req, res) => {
  const { amount, recipientEmail } = req.body;
  const userId = req.user.id;

  try {
    const senderWallet = await Wallet.findOne({ user: userId });
    if (senderWallet.balance < amount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    const recipient = await User.findOne({ email: recipientEmail });
    if (!recipient) {
      return res.status(404).json({ message: 'Recipient not found' });
    }

    const recipientWallet = await Wallet.findOne({ user: recipient._id });

    senderWallet.balance -= amount;
    recipientWallet.balance += amount;

    await senderWallet.save();
    await recipientWallet.save();

    await Transaction.create({
      wallet: senderWallet._id,
      type: 'transfer',
      amount,
      fromUser: userId,
      toUser: recipient._id,
    });

    res.json({ message: 'Transfer successful' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all transactions for a user
// @route   GET /api/transactions
// @access  Private
const getTransactions = async (req, res) => {
  const userId = req.user.id;
  try {
    const wallet = await Wallet.findOne({ user: userId });
    const transactions = await Transaction.find({ wallet: wallet._id });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getWallet,
  deposit,
  withdraw,
  transfer,
  getTransactions,
};
