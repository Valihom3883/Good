import { useState } from 'react';
import withTrader from '../../../utils/withTrader';
import DashboardLayout from '../../../layouts/DashboardLayout';
import api from '../../../services/api';

const ExecuteTrade = () => {
  const [asset, setAsset] = useState('');
  const [type, setType] = useState('buy');
  const [amount, setAmount] = useState(0);
  const [entryPrice, setEntryPrice] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/execute-trade', { asset, type, amount, entryPrice });
      // You might want to update the UI to reflect the change
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-8">Execute Trade</h1>
      <div className="p-6 bg-white rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Asset</label>
            <input
              type="text"
              value={asset}
              onChange={(e) => setAsset(e.target.value)}
              className="block w-full px-3 py-2 mt-1 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Type</label>
            <select value={type} onChange={(e) => setType(e.target.value)} className="block w-full px-3 py-2 mt-1 border rounded-md">
              <option value="buy">Buy</option>
              <option value="sell">Sell</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="block w-full px-3 py-2 mt-1 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Entry Price</p>
            <input
              type="number"
              value={entryPrice}
              onChange={(e) => setEntryPrice(e.target.value)}
              className="block w-full px-3 py-2 mt-1 border rounded-md"
              required
            />
          </div>
          <button type="submit" className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md">
            Execute Trade
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default withTrader(ExecuteTrade);
