import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';

const Redirect = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      // Redirige basado en el rol del usuario
      if (user.role === 'soporte') {
        navigate('/support/dashboard');
      } else {
        navigate('/dashboard');
      }
    } else {
      // Si no hay usuario autenticado, redirige al login
      navigate('/login');
    }
  }, [user, navigate]);

  return <div>Redirigiendo...</div>;
};

export default Redirect;
