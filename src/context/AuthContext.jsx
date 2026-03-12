import React, { createContext, useState, useContext, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await authAPI.login(email, password);
      const { access_token } = response.data;
      
      localStorage.setItem('token', access_token);
      setToken(access_token);

      try {
        const userResponse = await authAPI.getCurrentUser();
        const userData = userResponse.data;
        
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        setLoading(false);
        return true;
      } catch (userErr) {
        localStorage.setItem('user', JSON.stringify({ email }));
        setUser({ email });
        setLoading(false);
        return true;
      }
    } catch (err) {
      const errorMessage = err.response?.data?.detail || 'Email o contraseña incorrectos';
      setError(errorMessage);
      setToken(null);
      setUser(null);
      setLoading(false);
      return false;
    }
  };

  const register = async (nombre, email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      await authAPI.register(nombre, email, password);
      setLoading(false);
      return await login(email, password);
    } catch (err) {
      const errorMessage = err.response?.data?.detail || 'Error en el registro';
      setError(errorMessage);
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    setError(null);
  };

  const value = {
    user,
    token,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!token,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};