import connectDB from '../../../backend/config/db';
import Investment from '../../../backend/models/investment';
import Wallet from '../../../backend/models/wallet';
import logger from '../../../backend/config/logger';
import { protect } from '../../../backend/api/middlewares/auth';

connectDB();

async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

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
    logger.error(error.message); res.status(500).json({ message: 'Server Error' });
  }
}

export default protect(handler);
