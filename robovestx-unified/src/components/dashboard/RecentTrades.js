export default function RecentTrades({ trades }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4">Recent Trades</h3>
      <div className="space-y-4">
        {trades.map((trade) => (
          <div key={trade._id} className="flex justify-between items-center">
            <div>
              <p className="font-bold">{trade.asset}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {trade.type === 'buy' ? 'Buy' : 'Sell'} from {trade.trader.user.username}
              </p>
            </div>
            <div className={`text-right ${trade.status === 'closed' && trade.exitPrice > trade.entryPrice ? 'text-green-500' : 'text-red-500'}`}>
              <p className="font-bold">${trade.amount.toFixed(2)}</p>
              <p className="text-sm">{trade.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
