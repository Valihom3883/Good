import connectDB from '@backend/config/db';
import Investment from '@backend/models/investment';
import { protect, role } from '@backend/api/middlewares/auth';

connectDB();

async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const investments = await Investment.find({}).populate('user', 'username email').populate('plan');
    res.json(investments);
  } catch (error) {
    logger.error(error.message); res.status(500).json({ message: 'Server Error' });
  }
}

export default protect(role('admin')(handler));

export const config = { runtime: "nodejs" };
