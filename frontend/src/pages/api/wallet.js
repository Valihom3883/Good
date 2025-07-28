import connectDB from '../../../backend/config/db';
import Wallet from '../../../backend/models/wallet';
import { protect } from '../../../backend/api/middlewares/auth';

connectDB();

async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const userId = req.user.id;
  try {
    let wallet = await Wallet.findOne({ user: userId });
    if (!wallet) {
      // Create a wallet if it doesn't exist
      wallet = await Wallet.create({ user: userId });
    }
    res.json(wallet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export default protect(handler);
