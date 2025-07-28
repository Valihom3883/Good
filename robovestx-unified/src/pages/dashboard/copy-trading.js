import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/router';
import DashboardLayout from '../../layouts/DashboardLayout';
import api from '../../services/api';
import Skeleton from '../../components/Skeleton';
import TraderCard from '../../components/dashboard/TraderCard';

const CopyTrading = () => {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [traders, setTraders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      const fetchTraders = async () => {
        try {
          const { data } = await api.get('/api/traders');
          setTraders(data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
      fetchTraders();
    }
  }, [user]);

  if (authLoading || loading) {
    return (
      <DashboardLayout>
        <h1 className="text-3xl font-bold mb-8">Discover Top Traders</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-8">Discover Top Traders</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {traders.map((trader) => (
          <TraderCard key={trader._id} trader={trader} />
        ))}
      </div>
    </DashboardLayout>
  );
};

export default CopyTrading;
