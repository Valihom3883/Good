import connectDB from '../../../backend/config/db';
import Wallet from '../../../backend/models/wallet';
import Transaction from '../../../backend/models/transaction';
import logger from '../../../backend/config/logger';
import { protect } from '../../../backend/api/middlewares/auth';

connectDB();

async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { amount } = req.body;
  const userId = req.user.id;

  try {
    const wallet = await Wallet.findOne({ user: userId });
    wallet.balance += amount;
    await wallet.save();

    await Transaction.create({
      wallet: wallet._id,
      type: 'deposit',
      amount,
    });

    res.json(wallet);
  } catch (error) {
    logger.error(error.message); res.status(500).json({ message: 'Server Error' });
  }
}

export default protect(handler);
