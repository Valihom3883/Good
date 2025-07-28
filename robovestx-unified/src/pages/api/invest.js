import connectDB from '../../../backend/config/db';
import Investment from '../../../backend/models/investment';
import InvestmentPlan from '../../../backend/models/investmentPlan';
import Wallet from '../../../backend/models/wallet';
import logger from '../../../backend/config/logger';
import { protect } from '../../../backend/api/middlewares/auth';

connectDB();

async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

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
    logger.error(error.message); res.status(500).json({ message: 'Server Error' });
  }
}

export default protect(handler);
