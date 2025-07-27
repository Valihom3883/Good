import { useEffect, useState } from 'react';
import withAuth from '../../utils/withAuth';
import DashboardLayout from '../../layouts/DashboardLayout';
import api from '../../services/api';

const CopyTrading = () => {
  const [traders, setTraders] = useState([]);

  useEffect(() => {
    const fetchTraders = async () => {
      try {
        const { data } = await api.get('/traders');
        setTraders(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTraders();
  }, []);

  const handleCopy = async (traderId) => {
    try {
      await api.post('/copy', { traderId });
      // You might want to update the UI to reflect the change
    } catch (error) {
      console.error(error);
    }
  };

  const handleStopCopy = async (traderId) => {
    try {
      await api.post('/stop-copy', { traderId });
      // You might want to update the UI to reflect the change
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-8">Copy Trading</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {traders.map((trader) => (
          <div key={trader._id} className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2">{trader.user.username}</h2>
            <p className="text-gray-600 mb-2">ROI: {trader.roi}%</p>
            <p className="text-gray-600 mb-4">Risk Level: {trader.riskLevel}</p>
            <div className="flex space-x-4">
              <button onClick={() => handleCopy(trader._id)} className="px-4 py-2 text-white bg-indigo-600 rounded-md">Copy</button>
              <button onClick={() => handleStopCopy(trader._id)} className="px-4 py-2 text-white bg-red-600 rounded-md">Stop</button>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default withAuth(CopyTrading);
