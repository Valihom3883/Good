import connectDB from '../../../backend/config/db';
import Wallet from '../../../backend/models/wallet';
import Investment from '../../../backend/models/investment';
import Trade from '../../../backend/models/trade';
import logger from '../../../backend/config/logger';
import { protect } from '../../../backend/api/middlewares/auth';
import logger from '../../../backend/config/logger';

connectDB();

async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const userId = req.user.id;

  try {
    const wallet = await Wallet.findOne({ user: userId });
    const investments = await Investment.find({ user: userId });
    const trades = await Trade.find({ copiedBy: userId })
      .populate({
        path: 'trader',
        populate: {
          path: 'user',
          select: 'username',
        },
      })
      .sort({ createdAt: -1 })
      .limit(5);

    const totalProfit = investments.reduce((acc, investment) => {
      if (investment.status === 'matured') {
        return acc + investment.profit;
      }
      return acc;
    }, 0);

    const performanceData = [
      { name: 'Jan', value: 400 },
      { name: 'Feb', value: 300 },
      { name: 'Mar', value: 500 },
      { name: 'Apr', value: 200 },
      { name: 'May', value: 600 },
    ];

    res.status(200).json({
      walletBalance: wallet?.balance || 0,
      totalProfit,
      activeInvestments: investments.filter((inv) => inv.status === 'active').length,
      recentTrades: trades,
      performanceData,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
}

export default protect(handler);
