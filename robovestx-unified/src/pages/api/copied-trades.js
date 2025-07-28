import connectDB from '../../../backend/config/db';
import Trade from '../../../backend/models/trade';
import logger from '../../../backend/config/logger';
import { protect } from '../../../backend/api/middlewares/auth';

connectDB();

async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const userId = req.user.id;
  try {
    const trades = await Trade.find({ copiedBy: userId }).populate('trader', 'user');
    res.json(trades);
  } catch (error) {
    logger.error(error.message); res.status(500).json({ message: 'Server Error' });
  }
}

export default protect(handler);
