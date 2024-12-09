// src/components/common/Header.jsx
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext.jsx';

const Header = () => {
  const { user, handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogoutClick = () =>{
    handleLogout();
    navigate('/login');
  };

  return (
    <header className="bg-blue-500 p-4 text-white">
      <nav className="container mx-auto flex justify-between">
        <div>
          {user ? (
            <>
              {/* <Link to="/dashboard" className="font-bold">Dashboard</Link> */}
              {/* <Link to="/create-ticket" className="ml-4">Crear Ticket</Link> */}
              {user.role === 'Usuario' && (
                <Link to="/create-ticket" className="ml-4">Crear Ticket</Link>
              )}
              {user.role === 'Soporte' && (
                <Link to="/support/dashboard" className="ml-4">HomePage</Link>
              )}
              {/* Mostrar 'Equipos' solo si el usuario es Soporte */}
              {user.role === 'Soporte' && (
                <Link to="/equipment" className="ml-4">Equipos</Link>
              )}
              {user.role === 'Soporte' && (
                <Link to="/users" className="ml-4">Usuarios</Link>
              )}
              {/* Condicional para mostrar 'Todos los Tickets' o 'Mis Tickets' según el rol */}
              {user.role === 'Soporte' ? (
                <Link to="/support/my-tickets" className="ml-4">Todos los Tickets</Link>
              ) : (
                <Link to="/my-tickets" className="ml-4">Mis Tickets</Link>
              )}
              <button onClick={handleLogoutClick} className="ml-4">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="font-bold">Login</Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;


