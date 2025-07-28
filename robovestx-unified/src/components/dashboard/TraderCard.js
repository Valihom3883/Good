import { useState } from 'react';
import api from '@/services/api';
import { toast } from 'react-hot-toast';

export default function TraderCard({ trader }) {
  const [isCopying, setIsCopying] = useState(trader.isCopied);
  const [loading, setLoading] = useState(false);

  const handleCopyAction = async () => {
    setLoading(true);
    try {
      const endpoint = isCopying ? '/api/stop-copy' : '/api/copy';
      await api.post(endpoint, { traderId: trader._id });

      toast.success(
        isCopying
          ? `Stopped copying ${trader.user.username}`
          : `Now copying ${trader.user.username}`
      );

      setIsCopying(!isCopying);
    } catch (error) {
      toast.error(`Action failed: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
          <div className="ml-4">
            <h3 className="text-xl font-semibold">{trader.user.username}</h3>
            <p className="text-gray-500 text-sm">@{trader.user.username}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <StatCard label="ROI" value={`${trader.roi}%`} />
          <StatCard label="Risk" value={trader.riskLevel} />
          <StatCard label="Trades" value={trader.tradeCount} />
          <StatCard label="Followers" value={trader.followers.length} />
        </div>

        <button
          onClick={handleCopyAction}
          disabled={loading}
          className={`w-full py-3 rounded-lg font-medium transition-colors ${
            isCopying
              ? 'bg-red-100 text-red-700 hover:bg-red-200'
              : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
          }`}
        >
          {loading ? (
            'Processing...'
          ) : isCopying ? (
            'Stop Copying'
          ) : (
            'Copy This Trader'
          )}
        </button>
      </div>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  );
}
