import connectDB from '../../../backend/config/db';
import Trader from '../../../backend/models/trader';
import { protect } from '../../../backend/api/middlewares/auth';

connectDB();

async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const traders = await Trader.find({}).populate('user', 'username email');
    res.json(traders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export default protect(handler);
