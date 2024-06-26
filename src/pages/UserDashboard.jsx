// src/pages/UserDashboard.jsx
import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import { TicketContext } from '../context/TicketContext.jsx';
import TicketForm from '../components/tickets/TicketForm.jsx';
import HeaderUser from '../components/common/HeaderUser.jsx'

const UserDashboard = () => {
  const { user } = useContext(AuthContext);
  const { createTicket } = useContext(TicketContext);
  const [ticketData, setTicketData] = useState({
    summary: '',
    description: '',
    type: 'Software',
    priority: 'Media'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createTicket({ ...ticketData, requester: user.email });
    setTicketData({
      summary: '',
      description: '',
      type: 'Software',
      priority: 'Media'
    });
  };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="container mx-auto bg-white p-6 rounded-md shadow-md">
//         <h1 className="text-3xl font-bold mb-6">Enviar Requerimiento</h1>
//         <TicketForm ticketData={ticketData} setTicketData={setTicketData} handleSubmit={handleSubmit} />
//       </div>
//     </div>
//   );
// };

// export default UserDashboard;


// src/pages/UserDashboard.jsx
// import React from 'react';
// import HeaderUser from '../components/common/HeaderUser';

// const UserDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <HeaderUser />
      <div className="flex items-center justify-center pt-8">
        <div className="bg-white p-6 rounded-md shadow-md w-full max-w-2xl">
          <h1 className="text-3xl font-bold mb-6">Enviar Requerimiento</h1>
          <form className="space-y-4">
            <div>
              <label htmlFor="requirement" className="block text-gray-700">Descripción del requerimiento:</label>
              <textarea
                id="requirement"
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Escriba su requerimiento..."
              />
            </div>
            <div>
              <label className="block text-gray-700">Tipo de requerimiento:</label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input type="radio" name="type" value="software" className="mr-2" />
                  Software
                </label>
                <label className="flex items-center">
                  <input type="radio" name="type" value="hardware" className="mr-2" />
                  Hardware
                </label>
              </div>
            </div>
            <div>
              <label className="block text-gray-700">Prioridad:</label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input type="radio" name="priority" value="alta" className="mr-2" />
                  Alta
                </label>
                <label className="flex items-center">
                  <input type="radio" name="priority" value="media" className="mr-2" />
                  Media
                </label>
                <label className="flex items-center">
                  <input type="radio" name="priority" value="baja" className="mr-2" />
                  Baja
                </label>
              </div>
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">Enviar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
