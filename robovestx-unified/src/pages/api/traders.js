import connectDB from '@backend/config/db';
import Trader from '@backend/models/trader';
import Trade from '@backend/models/trade';
import logger from '@backend/config/logger';
import { protect } from '@backend/api/middlewares/auth';

connectDB();

async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const userId = req.user.id;

  try {
    const traders = await Trader.find({}).populate('user', 'username email').lean();

    const tradersWithStats = await Promise.all(
      traders.map(async (trader) => {
        const tradeCount = await Trade.countDocuments({ trader: trader._id });
        const isCopied = trader.followers.some(
          (follower) => follower.toString() === userId
        );
        return { ...trader, tradeCount, isCopied };
      })
    );

    res.json(tradersWithStats);
  } catch (error) {
    logger.error(error.message); res.status(500).json({ message: 'Server Error' });
  }
}

export default protect(handler);

export const config = { runtime: "nodejs" };
