const mongoose = require('mongoose');

const InvestmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  plan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'InvestmentPlan',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
  },
  status: {
    type: String,
    enum: ['active', 'matured'],
    default: 'active',
  },
  profit: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

InvestmentSchema.pre('save', function (next) {
  if (!this.endDate) {
    const planDuration = this.plan.duration; // Assuming duration is in days
    this.endDate = new Date(this.startDate.getTime() + planDuration * 24 * 60 * 60 * 1000);
  }
  next();
});

module.exports = mongoose.model('Investment', InvestmentSchema);
