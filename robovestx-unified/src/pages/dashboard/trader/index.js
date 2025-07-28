import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useRouter } from 'next/router';
import DashboardLayout from '../../../layouts/DashboardLayout';
import api from '../../../services/api';
import Skeleton from '../../../components/Skeleton';

const TraderDashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [trader, setTrader] = useState(null);
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && (!user || user.role !== 'trader')) {
      router.push('/dashboard');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        try {
          const traderRes = await api.get('/api/trader/profile');
          setTrader(traderRes.data);
          setFollowers(traderRes.data.followers);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [user]);

  if (authLoading || loading) {
    return (
      <DashboardLayout>
        <h1 className="text-3xl font-bold mb-8">Trader Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-8">Trader Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-2">My Stats</h2>
          <p>ROI: {trader?.roi}%</p>
          <p>Risk Level: {trader?.riskLevel}</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-2">Followers</h2>
          <p className="text-3xl font-bold text-indigo-600">{followers.length}</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TraderDashboard;
