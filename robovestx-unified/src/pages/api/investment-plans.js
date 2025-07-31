import connectDB from '@backend/config/db';
import InvestmentPlan from '@backend/models/investmentPlan';
import logger from '@backend/config/logger';
import { protect } from '@backend/api/middlewares/auth';

connectDB();

async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const plans = await InvestmentPlan.find({});
    res.json(plans);
  } catch (error) {
    logger.error(error.message); res.status(500).json({ message: 'Server Error' });
  }
}

export default protect(handler);

export const config = { runtime: "nodejs" };
