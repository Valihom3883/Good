import connectDB from '../../../backend/config/db';
import Trader from '../../../backend/models/trader';
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

    trader.followers = trader.followers.filter(
      (follower) => follower.toString() !== userId
    );
    await trader.save();

    res.json({ message: 'Stopped copying trader' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export default protect(handler);
