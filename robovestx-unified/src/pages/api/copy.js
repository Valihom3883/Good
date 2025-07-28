import connectDB from '../../../backend/config/db';
import Trader from '../../../backend/models/trader';
import User from '../../../backend/models/user';
import logger from '../../../backend/config/logger';
import { protect } from '../../../backend/api/middlewares/auth';

connectDB();

async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

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
    logger.error(error.message); res.status(500).json({ message: 'Server Error' });
  }
}

export default protect(handler);
