import connectDB from '../../../backend/config/db';
import Trade from '../../../backend/models/trade';
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
    res.status(500).json({ message: error.message });
  }
}

export default protect(handler);
