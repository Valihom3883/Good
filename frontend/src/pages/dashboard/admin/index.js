import withAdmin from '../../../utils/withAdmin';
import DashboardLayout from '../../../layouts/DashboardLayout';
import { useEffect, useState } from 'react';
import api from '../../../services/api';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [kycSubmissions, setKycSubmissions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, kycRes] = await Promise.all([
          api.get('/admin/users'),
          api.get('/admin/kyc'),
        ]);
        setUsers(usersRes.data);
        setKycSubmissions(kycRes.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleBlockUser = async (userId) => {
    try {
      await api.post('/admin/block-user', { userId });
      // You might want to update the UI to reflect the change
    } catch (error) {
      console.error(error);
    }
  };

  const handleApproveKyc = async (userId, status) => {
    try {
      await api.post('/admin/approve-kyc', { userId, status });
      // You might want to update the UI to reflect the change
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Users</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left">Username</th>
                <th className="text-left">Email</th>
                <th className="text-left">Role</th>
                <th className="text-left">Status</th>
                <th className="text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.isBlocked ? 'Blocked' : 'Active'}</td>
                  <td>
                    <button onClick={() => handleBlockUser(user._id)} className="px-4 py-2 text-white bg-red-600 rounded-md">
                      {user.isBlocked ? 'Unblock' : 'Block'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">KYC Submissions</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left">Username</th>
                <th className="text-left">Document</th>
                <th className="text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {kycSubmissions.map((user) => (
                <tr key={user._id}>
                  <td>{user.username}</td>
                  <td><a href={user.kyc.documentUrl} target="_blank" rel="noreferrer" className="text-indigo-600">View</a></td>
                  <td>
                    <button onClick={() => handleApproveKyc(user._id, 'approved')} className="px-4 py-2 text-white bg-green-600 rounded-md mr-2">Approve</button>
                    <button onClick={() => handleApproveKyc(user._id, 'rejected')} className="px-4 py-2 text-white bg-red-600 rounded-md">Reject</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default withAdmin(AdminDashboard);
