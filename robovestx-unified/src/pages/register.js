import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import Input from '../components/Input';
import Link from 'next/link';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const validate = () => {
    const newErrors = {};
    if (!username) newErrors.username = 'Username is required';
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email address is invalid';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
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
    setLoading(true);
    try {
      await api.post('/api/register', { username, email, password, role });
      await login({ email, password });
      router.push('/dashboard');
    } catch (err) {
      setErrors({ form: err.response?.data?.message || 'An error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col md:flex-row rounded-lg shadow-2xl max-w-4xl w-full overflow-hidden">
        {/* Left Side - Promotional Content */}
        <div className="w-full md:w-1/2 bg-indigo-600 p-12 text-white flex flex-col justify-center">
          <h1 className="text-4xl font-extrabold mb-4">Join RoboVestX Today</h1>
          <p className="mb-6 text-indigo-100">
            Start your journey towards automated trading and smart investing. Access top traders, curated portfolios, and powerful analytics, all in one platform.
          </p>
          <div className="mt-4">
            <p className="flex items-center mb-2">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              Copy top-performing traders with one click.
            </p>
            <p className="flex items-center mb-2">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              Invest in diversified, AI-managed portfolios.
            </p>
            <p className="flex items-center">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              Track your performance with real-time analytics.
            </p>
          </div>
        </div>

        {/* Right Side - Registration Form */}
        <div className="w-full md:w-1/2 p-12 bg-white dark:bg-gray-800">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">Create Your Account</h2>
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
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">I am a...</label>
              <select value={role} onChange={(e) => setRole(e.target.value)} className="block w-full px-3 py-2 mt-1 border rounded-md dark:bg-gray-700 dark:border-gray-600">
                <option value="user">User / Investor</option>
                <option value="trader">Trader</option>
              </select>
            </div>
            {errors.form && <p className="text-sm text-red-500 text-center">{errors.form}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-3 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
