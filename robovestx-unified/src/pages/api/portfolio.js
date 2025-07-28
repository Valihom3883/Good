import connectDB from '../../../backend/config/db';
import Investment from '../../../backend/models/investment';
import logger from '../../../backend/config/logger';
import { protect } from '../../../backend/api/middlewares/auth';

connectDB();

async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const userId = req.user.id;
  try {
    const investments = await Investment.find({ user: userId }).populate('plan');
    res.json(investments);
  } catch (error) {
    logger.error(error.message); res.status(500).json({ message: 'Server Error' });
  }
}

export default protect(handler);
