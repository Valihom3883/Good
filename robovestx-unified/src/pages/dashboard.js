import { useAuth } from '@/context/AuthContext';
import DashboardLayout from '@/layouts/DashboardLayout';
import api from '@/services/api';
import { useEffect, useState } from 'react';
import PortfolioSummary from '@/components/dashboard/PortfolioSummary';
import RecentTrades from '@/components/dashboard/RecentTrades';
import PerformanceChart from '@/components/dashboard/PerformanceChart';

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get('/api/dashboard');
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

      {loading ? (
        <div className="animate-pulse space-y-6">
          <div className="h-32 bg-gray-200 rounded-md"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-md"></div>
            ))}
          </div>
          <div className="h-96 bg-gray-200 rounded-md"></div>
        </div>
      ) : (
        <>
          <PortfolioSummary
            balance={stats.walletBalance}
            profit={stats.totalProfit}
            activeInvestments={stats.activeInvestments}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            <PerformanceChart data={stats.performanceData} />
            <RecentTrades trades={stats.recentTrades} />
          </div>
        </>
      )}
    </DashboardLayout>
  );
}
