import React from 'react';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Dashboard del Usuario</h2>
      <div className="mb-4">
        <Link to="/create-ticket" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-4">
          Crear Ticket
        </Link>
        <Link to="/my-tickets" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
          Mis Tickets
        </Link>
      </div>
    </div>
  );
};

export default UserDashboard;
