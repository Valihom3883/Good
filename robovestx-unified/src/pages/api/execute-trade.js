import connectDB from '@backend/config/db';
import Trade from '@backend/models/trade';
import Trader from '@backend/models/trader';
import Wallet from '@backend/models/wallet';
import { protect, role } from '@backend/api/middlewares/auth';

connectDB();

// Helper function for allocation calculation
const calculateAllocation = async (user, baseAmount) => {
  const wallet = await Wallet.findOne({ user: user._id });
  const maxAllocation = wallet.balance * 0.1; // Max 10% of balance
  return Math.min(baseAmount, maxAllocation);
};

async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { asset, type, amount, entryPrice } = req.body;
    const traderId = req.user.id;

    // Validate trade parameters
    if (!['buy', 'sell'].includes(type)) {
      return res.status(400).json({ message: 'Invalid trade type' });
    }

    if (amount <= 0) {
      return res.status(400).json({ message: 'Amount must be positive' });
    }

    // Create trade for trader
    const trade = await Trade.create({
      trader: traderId,
      asset,
      type,
      amount,
      entryPrice,
    });

    // Mirror for followers with allocation logic
    const trader = await Trader.findById(traderId).populate('followers');
    for (const follower of trader.followers) {
      const allocation = await calculateAllocation(follower, amount);
      await Trade.create({
        trader: traderId,
        copiedBy: follower._id,
        asset,
        type,
        amount: allocation,
        entryPrice,
      });
    }

    res.status(201).json(trade);
  } catch (error) {
    logger.error(error.message); res.status(500).json({ message: 'Server Error' });
  }
}

export default protect(role('trader')(handler));

export const config = { runtime: "nodejs" };
