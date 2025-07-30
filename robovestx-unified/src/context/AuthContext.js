import { createContext, useContext, useEffect, useState } from 'react';
import api from '@/services/api';
import { useRouter } from 'next/router';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [requires2FA, setRequires2FA] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          api.defaults.headers.Authorization = `Bearer ${token}`;
          const { data } = await api.get('/api/profile');
          setUser(data);

          // Check if 2FA is required for this route
          if (data.isTwoFactorEnabled && !sessionStorage.getItem('2faVerified')) {
            setRequires2FA(true);
            router.push('/verify-2fa');
          }
        }
      } catch (err) {
        console.error('Failed to load user:', err);
        logout();
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [router]);

  const login = async (credentials) => {
    try {
      const { data } = await api.post('/api/login', credentials);

      if (data.requires2FA) {
        setRequires2FA(true);
        return { requires2FA: true };
      }

      localStorage.setItem('token', data.token);
      api.defaults.headers.Authorization = `Bearer ${data.token}`;
      setUser(data.user);
      return { success: true };
    } catch (err) {
      console.error('Login failed:', err);
      throw err;
    }
  };

  const verify2FA = async (token) => {
    try {
      const { data } = await api.post('/api/verify-2fa', { token });
      localStorage.setItem('token', data.token);
      sessionStorage.setItem('2faVerified', 'true');
      api.defaults.headers.Authorization = `Bearer ${data.token}`;
      setUser(data.user);
      setRequires2FA(false);
      return true;
    } catch (err) {
      console.error('2FA verification failed:', err);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('2faVerified');
    delete api.defaults.headers.Authorization;
    setUser(null);
    setRequires2FA(false);
    router.push('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        verify2FA,
        requires2FA
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
