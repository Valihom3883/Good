import connectDB from '../../../backend/config/db';
import Wallet from '../../../backend/models/wallet';
import Transaction from '../../../backend/models/transaction';
import { protect } from '../../../backend/api/middlewares/auth';

connectDB();

async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const userId = req.user.id;
  try {
    const wallet = await Wallet.findOne({ user: userId });
    const transactions = await Transaction.find({ wallet: wallet._id });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export default protect(handler);
