import { useEffect, useState } from 'react';
import withAuth from '../../utils/withAuth';
import DashboardLayout from '../../layouts/DashboardLayout';
import api from '../../services/api';
import InvestmentChart from '../../components/InvestmentChart';

const Investments = () => {
  const [plans, setPlans] = useState([]);
  const [investments, setInvestments] = useState([]);
  const [amount, setAmount] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const chartData = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 500 },
    { name: 'Apr', value: 200 },
    { name: 'May', value: 600 },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [plansRes, investmentsRes] = await Promise.all([
          api.get('/api/investment-plans'),
          api.get('/api/portfolio'),
        ]);
        setPlans(plansRes.data);
        setInvestments(investmentsRes.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleInvest = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/invest', { planId: selectedPlan, amount });
      // You might want to update the UI to reflect the change
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-8">Investments</h1>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Available Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div key={plan._id} className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <p className="text-gray-600 mb-2">{plan.description}</p>
              <p className="text-gray-600 mb-2">ROI: {plan.roi}%</p>
              <p className="text-gray-600 mb-4">Duration: {plan.duration} days</p>
              <button onClick={() => setSelectedPlan(plan._id)} className="px-4 py-2 text-white bg-indigo-600 rounded-md">Invest</button>
            </div>
          ))}
        </div>
      </div>

      {selectedPlan && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Invest in {plans.find(p => p._id === selectedPlan).name}</h2>
          <form onSubmit={handleInvest}>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="px-3 py-2 border rounded-md"
              required
            />
            <button type="submit" className="px-4 py-2 text-white bg-indigo-600 rounded-md ml-4">Confirm Investment</button>
          </form>
        </div>
      )}

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Investment Growth</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <InvestmentChart data={chartData} />
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">Your Investments</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left">Plan</th>
                <th className="text-left">Amount</th>
                <th className="text-left">Status</th>
                <th className="text-left">End Date</th>
              </tr>
            </thead>
            <tbody>
              {investments.map((investment) => (
                <tr key={investment._id}>
                  <td>{investment.plan.name}</td>
                  <td>${investment.amount.toFixed(2)}</td>
                  <td>{investment.status}</td>
                  <td>{new Date(investment.endDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default withAuth(Investments);
