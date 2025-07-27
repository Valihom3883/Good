const Trader = require('../../models/trader');
const User = require('../../models/user');
const Trade = require('../../models/trade');

// @desc    Get all traders
// @route   GET /api/traders
// @access  Private
const getTraders = async (req, res) => {
  try {
    const traders = await Trader.find({}).populate('user', 'username email');
    res.json(traders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Copy a trader
// @route   POST /api/copy
// @access  Private
const copyTrader = async (req, res) => {
  const { traderId } = req.body;
  const userId = req.user.id;

  try {
    const trader = await Trader.findById(traderId);
    if (!trader) {
      return res.status(404).json({ message: 'Trader not found' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (trader.followers.includes(userId)) {
      return res.status(400).json({ message: 'Already copying this trader' });
    }

    trader.followers.push(userId);
    await trader.save();

    res.json({ message: 'Started copying trader' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Stop copying a trader
// @route   POST /api/stop-copy
// @access  Private
const stopCopyTrader = async (req, res) => {
  const { traderId } = req.body;
  const userId = req.user.id;

  try {
    const trader = await Trader.findById(traderId);
    if (!trader) {
      return res.status(404).json({ message: 'Trader not found' });
    }

    trader.followers = trader.followers.filter(
      (follower) => follower.toString() !== userId
    );
    await trader.save();

    res.json({ message: 'Stopped copying trader' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Execute a trade (for traders)
// @route   POST /api/execute-trade
// @access  Private/Trader
const executeTrade = async (req, res) => {
  const { asset, type, amount, entryPrice } = req.body;
  const traderId = req.user.traderId; // Assuming traderId is on user object

  try {
    // Create the trade for the trader
    const trade = await Trade.create({
      trader: traderId,
      asset,
      type,
      amount,
      entryPrice,
    });

    // Mirror the trade for all followers
    const trader = await Trader.findById(traderId);
    for (const followerId of trader.followers) {
      await Trade.create({
        trader: traderId,
        copiedBy: followerId,
        asset,
        type,
        amount, // This could be a percentage of the follower's capital
        entryPrice,
      });
    }

    res.status(201).json(trade);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all copied trades for a user
// @route   GET /api/copied-trades
// @access  Private
const getCopiedTrades = async (req, res) => {
  const userId = req.user.id;
  try {
    const trades = await Trade.find({ copiedBy: userId }).populate('trader', 'user');
    res.json(trades);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  getTraders,
  copyTrader,
  stopCopyTrader,
  executeTrade,
  getCopiedTrades,
};
