import dbConnect from '../../lib/dbConnect';
import Wallet from '../../../backend/models/wallet';
import Investment from '../../../backend/models/investment';
import Trade from '../../../backend/models/trade';
import logger from '../../../backend/config/logger';

export default async function handler(req, res) {
  try {
    await dbConnect();

    const walletBalance = await Wallet.getBalance(req.user.id);
    const totalProfit = await Investment.getTotalProfit(req.user.id);
    const activeInvestments = await Investment.countActive(req.user.id);
    const recentTrades = await Trade.getRecent(req.user.id);
    const performanceData = await Trade.getPerformanceData(req.user.id);

    res.status(200).json({
      walletBalance,
      totalProfit,
      activeInvestments,
      recentTrades,
      performanceData,
    });
  } catch (error) {
    logger.error('Dashboard API failed', error);
    res.status(500).json({ message: 'Server error' });
  }
}
