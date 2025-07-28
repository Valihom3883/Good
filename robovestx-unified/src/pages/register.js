import { useState } from 'react';
import api from '../services/api';
import { useRouter } from 'next/router';
import Input from '../components/Input';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const validate = () => {
    const newErrors = {};
    if (!username) newErrors.username = 'Username is required';
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    try {
      const { data } = await api.post('/api/register', { username, email, password, role });
      localStorage.setItem('token', data.token);
      router.push('/dashboard');
    } catch (err) {
      setErrors({ form: err.response.data.message });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Register</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={errors.username}
          />
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value)} className="block w-full px-3 py-2 mt-1 border rounded-md">
              <option value="user">User</option>
              <option value="trader">Trader</option>
            </select>
          </div>
          {errors.form && <p className="text-sm text-red-600">{errors.form}</p>}
          <button type="submit" className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
