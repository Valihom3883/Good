import connectDB from '../../../../backend/config/db';
import User from '../../../../backend/models/user';
import { protect, admin } from '../../../../backend/api/middlewares/auth';

connectDB();

async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { userId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.isBlocked = !user.isBlocked;
    await user.save();
    res.json({ message: `User ${user.isBlocked ? 'blocked' : 'unblocked'}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export default protect(admin(handler));
