const mongoose = require('mongoose');

const InvestmentPlanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  minAmount: {
    type: Number,
    required: true,
  },
  maxAmount: {
    type: Number,
    required: true,
  },
  roi: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: true, // in days
  },
}, { timestamps: true });

module.exports = mongoose.model('InvestmentPlan', InvestmentPlanSchema);
