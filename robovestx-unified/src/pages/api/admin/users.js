import connectDB from '../../../../backend/config/db';
import User from '../../../../backend/models/user';
import { protect, role } from '../../../../backend/api/middlewares/auth';

connectDB();

async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export default protect(role('admin')(handler));
