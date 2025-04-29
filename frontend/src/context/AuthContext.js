import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
      loadUser(token);
    } else {
      setLoading(false);
    }
  }, []);

  const loadUser = async (token) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      const res = await axios.get(`${process.env.REACT_APP_API_URL}/users/me`, config);
      setUser(res.data.data);
      setLoading(false);
    } catch (err) {
      localStorage.removeItem('token');
      setError('Session expired. Please login again.');
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      setError('');
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/users/register`, userData);
      localStorage.setItem('token', res.data.token);
      await loadUser(res.data.token);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
      setLoading(false);
      return false;
    }
  };

  const login = async (userData) => {
    try {
      setLoading(true);
      setError('');
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/users/login`, userData);
      localStorage.setItem('token', res.data.token);
      await loadUser(res.data.token);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        setError,
        register,
        login,
        logout,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}; 