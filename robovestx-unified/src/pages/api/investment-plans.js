import connectDB from '../../../backend/config/db';
import InvestmentPlan from '../../../backend/models/investmentPlan';
import { protect } from '../../../backend/api/middlewares/auth';

connectDB();

async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const plans = await InvestmentPlan.find({});
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export default protect(handler);
