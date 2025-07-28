import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/router';
import DashboardLayout from '../../layouts/DashboardLayout';
import api from '../../services/api';
import toast from 'react-hot-toast';
import Skeleton from '../../components/Skeleton';

const Wallet = () => {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [wallet, setWallet] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState(0);
  const [recipientEmail, setRecipientEmail] = useState('');
  const [action, setAction] = useState('deposit');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        try {
          const [walletRes, transactionsRes] = await Promise.all([
            api.get('/api/wallet'),
            api.get('/api/transactions'), // Assuming a /transactions endpoint exists
          ]);
          setWallet(walletRes.data);
          setTransactions(transactionsRes.data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [user]);

  const handleAction = async (e) => {
    e.preventDefault();
    const promise = () => {
      if (action === 'deposit') {
        return api.post('/api/deposit', { amount });
      } else if (action === 'withdraw') {
        return api.post('/api/withdraw-wallet', { amount });
      } else if (action === 'transfer') {
        return api.post('/api/transfer', { amount, recipientEmail });
      }
    };

    toast.promise(promise(), {
      loading: 'Processing...',
      success: 'Action successful!',
      error: 'An error occurred.',
    });
  };

  if (authLoading || loading) {
    return (
      <DashboardLayout>
        <h1 className="text-3xl font-bold mb-8">Wallet</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Skeleton className="h-32" />
          <Skeleton className="h-64" />
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Transaction History</h2>
          <Skeleton className="h-48" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-8">Wallet</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-2">Current Balance</h2>
          <p className="text-3xl font-bold text-indigo-600">${wallet?.balance.toFixed(2)}</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-2">Perform Action</h2>
          <form onSubmit={handleAction}>
            <select value={action} onChange={(e) => setAction(e.target.value)} className="block w-full px-3 py-2 mt-1 border rounded-md mb-4">
              <option value="deposit">Deposit</option>
              <option value="withdraw">Withdraw</option>
              <option value="transfer">Transfer</option>
            </select>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="block w-full px-3 py-2 mt-1 border rounded-md mb-4"
              placeholder="Amount"
              required
            />
            {action === 'transfer' && (
              <input
                type="email"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                className="block w-full px-3 py-2 mt-1 border rounded-md mb-4"
                placeholder="Recipient Email"
                required
              />
            )}
            <button type="submit" className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md">Submit</button>
          </form>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Transaction History</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left">Type</th>
                <th className="text-left">Amount</th>
                <th className="text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction._id}>
                  <td>{transaction.type}</td>
                  <td>${transaction.amount.toFixed(2)}</td>
                  <td>{new Date(transaction.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Wallet;
