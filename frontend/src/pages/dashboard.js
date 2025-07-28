import { useEffect, useState } from 'react';
import withAuth from '../utils/withAuth';
import DashboardLayout from '../layouts/DashboardLayout';
import api from '../services/api';
import Skeleton from '../components/Skeleton';

const Dashboard = () => {
  const [wallet, setWallet] = useState(null);
  const [investments, setInvestments] = useState([]);
  const [copiedTraders, setCopiedTraders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [walletRes, investmentsRes, copiedTradersRes] = await Promise.all([
          api.get('/api/wallet'),
          api.get('/api/portfolio'),
          api.get('/api/copied-trades'),
        ]);
        setWallet(walletRes.data);
        setInvestments(investmentsRes.data);
        setCopiedTraders(copiedTradersRes.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-8">Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {loading ? (
          <>
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
          </>
        ) : (
          <>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-2">Wallet Balance</h2>
              <p className="text-3xl font-bold text-indigo-600">${wallet?.balance.toFixed(2)}</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-2">Active Investments</h2>
              <p className="text-3xl font-bold text-indigo-600">{investments.length}</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-2">Copied Traders</h2>
              <p className="text-3xl font-bold text-indigo-600">{copiedTraders.length}</p>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default withAuth(Dashboard);
