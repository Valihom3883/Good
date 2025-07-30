const StatCard = ({ title, value, change, isCurrency = true }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
    <p className="text-3xl font-bold text-gray-900 dark:text-white">
      {isCurrency ? `$${value.toFixed(2)}` : value}
    </p>
    {change && (
      <p className={`text-sm ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
        {change >= 0 ? `+${change.toFixed(2)}%` : `${change.toFixed(2)}%`} vs last month
      </p>
    )}
  </div>
);

export default function PortfolioSummary({ balance, profit, activeInvestments }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard title="Wallet Balance" value={balance} />
      <StatCard title="Total Profit" value={profit} change={5.4} />
      <StatCard title="Active Investments" value={activeInvestments} isCurrency={false} />
    </div>
  );
}
