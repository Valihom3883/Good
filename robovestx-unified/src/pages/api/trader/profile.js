import connectDB from '@backend/config/db';
import Trader from '@backend/models/trader';
import { protect, role } from '@backend/api/middlewares/auth';

connectDB();

async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const trader = await Trader.findOne({ user: req.user.id }).populate('user', 'username email');
    if (!trader) {
      return res.status(404).json({ message: 'Trader not found' });
    }
    res.json(trader);
  } catch (error) {
    logger.error(error.message); res.status(500).json({ message: 'Server Error' });
  }
}

export default protect(role('trader')(handler));

export const config = { runtime: "nodejs" };
