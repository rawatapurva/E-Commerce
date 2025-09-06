import React, { createContext, useEffect, useState } from 'react';
import API from '../utils/api';
import { useDispatch } from 'react-redux';
import { fetchCart, setCart } from '../redux/Slices/CartSlice';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const loadUser = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await API.get('/auth/me');
      const loggedUser = res.data.user || res.data; // adjust if needed
      setUser(loggedUser);
      // ✅ Fetch user-specific cart
      dispatch(fetchCart());
    } catch (err) {
      console.error('Auth error:', err.response?.data || err.message);
      localStorage.removeItem('token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const signup = async (name, email, password) => {
    const res = await API.post('/auth/signup', { name, email, password });
    localStorage.setItem('token', res.data.token);
    setUser(res.data.user);
    // ✅ Fetch empty or new cart
    dispatch(fetchCart());
    return res.data;
  };

  const login = async (email, password) => {
    const res = await API.post('/auth/login', { email, password });
    localStorage.setItem('token', res.data.token);
    setUser(res.data.user);
    // ✅ Fetch user-specific cart
    dispatch(fetchCart());
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    // ✅ Clear Redux cart immediately
    dispatch(setCart([]));
  };

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

