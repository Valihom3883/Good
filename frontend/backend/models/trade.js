const mongoose = require('mongoose');

const TradeSchema = new mongoose.Schema({
  trader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trader',
    required: true,
  },
  copiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  asset: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['buy', 'sell'],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  entryPrice: {
    type: Number,
    required: true,
  },
  exitPrice: {
    type: Number,
  },
  status: {
    type: String,
    enum: ['open', 'closed'],
    default: 'open',
  },
}, { timestamps: true });

module.exports = mongoose.model('Trade', TradeSchema);
