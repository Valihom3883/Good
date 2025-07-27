import withTrader from '../../../utils/withTrader';
import DashboardLayout from '../../../layouts/DashboardLayout';
import { useEffect, useState } from 'react';
import api from '../../../services/api';

const TraderDashboard = () => {
  const [trader, setTrader] = useState(null);
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Assuming an endpoint to get trader details
        const traderRes = await api.get('/trader/profile');
        setTrader(traderRes.data);
        setFollowers(traderRes.data.followers);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

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

export default withTrader(TraderDashboard);
