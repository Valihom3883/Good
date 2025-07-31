import connectDB from '@backend/config/db';
import Wallet from '@backend/models/wallet';
import Transaction from '@backend/models/transaction';
import User from '@backend/models/user';
import logger from '@backend/config/logger';
import { protect } from '@backend/api/middlewares/auth';

connectDB();

async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { amount, recipientEmail } = req.body;
  const userId = req.user.id;

  try {
    const senderWallet = await Wallet.findOne({ user: userId });
    if (senderWallet.balance < amount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    const recipient = await User.findOne({ email: recipientEmail });
    if (!recipient) {
      return res.status(404).json({ message: 'Recipient not found' });
    }

    const recipientWallet = await Wallet.findOne({ user: recipient._id });

    senderWallet.balance -= amount;
    recipientWallet.balance += amount;

    await senderWallet.save();
    await recipientWallet.save();

    await Transaction.create({
      wallet: senderWallet._id,
      type: 'transfer',
      amount,
      fromUser: userId,
      toUser: recipient._id,
    });

    res.json({ message: 'Transfer successful' });
  } catch (error) {
    logger.error(error.message); res.status(500).json({ message: 'Server Error' });
  }
}

export default protect(handler);

export const config = { runtime: "nodejs" };
