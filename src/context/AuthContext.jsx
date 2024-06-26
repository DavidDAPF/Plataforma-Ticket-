
// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const validateToken = async ()=>{
    const token = localStorage.getItem('token');
    if (token) {
      try{
        const config = {
          headers:{
            Authorization: `Bearer ${token}`,
        },
      };
       const {data} = await axios.get('http://localhost:5000/api/auth/profile', config);
        setUser(data);
    }catch(error) {
        console.error('Error al validar token:', error);
        localStorage.removeItem('token');
      }
    }
    setLoading(false)
  };
  validateToken();
  }, []);

  const handleLogin = async (email, password) => {
    try {
      const {data} = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      setUser(data);
      if (data.role === 'Usuario') {
        navigate('/dashboard');
      } else if (data.role === 'Soporte') {
        navigate('/support/dashboard');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw new Error('Error al iniciar sesion');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider};