import connectDB from '../../../backend/config/db';
import Trade from '../../../backend/models/trade';
import Trader from '../../../backend/models/trader';
import { protect, trader } from '../../../backend/api/middlewares/auth';

connectDB();

async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

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
}

export default protect(trader(handler));
