import connectDB from '../../../../backend/config/db';
import Trader from '../../../../backend/models/trader';
import { protect, trader } from '../../../../backend/api/middlewares/auth';

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
    res.status(500).json({ message: error.message });
  }
}

export default protect(trader(handler));
