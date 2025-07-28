const InvestmentPlan = require('../../models/investmentPlan');
const Investment = require('../../models/investment');
const Wallet = require('../../models/wallet');

// @desc    Get all investment plans
// @route   GET /api/investment-plans
// @access  Private
const getInvestmentPlans = async (req, res) => {
  try {
    const plans = await InvestmentPlan.find({});
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Invest in a plan
// @route   POST /api/invest
// @access  Private
const invest = async (req, res) => {
  const { planId, amount } = req.body;
  const userId = req.user.id;

  try {
    const plan = await InvestmentPlan.findById(planId);
    if (!plan) {
      return res.status(404).json({ message: 'Investment plan not found' });
    }

    if (amount < plan.minAmount || amount > plan.maxAmount) {
      return res.status(400).json({ message: 'Invalid investment amount' });
    }

    const wallet = await Wallet.findOne({ user: userId });
    if (!wallet || wallet.balance < amount) {
      return res.status(400).json({ message: 'Insufficient wallet balance' });
    }

    wallet.balance -= amount;
    await wallet.save();

    const investment = await Investment.create({
      user: userId,
      plan: planId,
      amount,
    });

    res.status(201).json(investment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user portfolio
// @route   GET /api/portfolio
// @access  Private
const getPortfolio = async (req, res) => {
  const userId = req.user.id;
  try {
    const investments = await Investment.find({ user: userId }).populate('plan');
    res.json(investments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Withdraw from investment
// @route   POST /api/withdraw
// @access  Private
const withdrawInvestment = async (req, res) => {
  const { investmentId } = req.body;
  const userId = req.user.id;

  try {
    const investment = await Investment.findById(investmentId);
    if (!investment) {
      return res.status(404).json({ message: 'Investment not found' });
    }

    if (investment.user.toString() !== userId) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    if (investment.status !== 'matured') {
      return res.status(400).json({ message: 'Investment has not matured yet' });
    }

    const wallet = await Wallet.findOne({ user: userId });
    wallet.balance += investment.amount + investment.profit;
    await wallet.save();

    await investment.remove();

    res.json({ message: 'Withdrawal successful' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  getInvestmentPlans,
  invest,
  getPortfolio,
  withdrawInvestment,
};
