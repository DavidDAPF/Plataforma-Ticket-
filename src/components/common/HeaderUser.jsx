// src/components/common/HeaderUser.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const HeaderUser = () => {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Usuario 1</h1>
        <nav className="space-x-4">
          <Link to="/dashboard" className="hover:underline">
            Home
          </Link>
          <Link to="/user/my-tickets" className="hover:underline">
            Ver Mis Tickets
          </Link>
          <Link to="/login" className="hover:underline">
            Cerrar Sesión
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default HeaderUser;
