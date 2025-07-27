const plans = [
  {
    name: 'Fixed Income',
    description: 'A safe investment with a fixed return.',
    minAmount: 100,
    maxAmount: 1000,
    roi: 5,
    duration: 30,
  },
  {
    name: 'Aggressive Growth',
    description: 'A high-risk, high-return investment.',
    minAmount: 500,
    maxAmount: 5000,
    roi: 20,
    duration: 60,
  },
  {
    name: 'Diversified Portfolio',
    description: 'A balanced portfolio with a mix of assets.',
    minAmount: 200,
    maxAmount: 2000,
    roi: 10,
    duration: 45,
  },
];

module.exports = plans;
