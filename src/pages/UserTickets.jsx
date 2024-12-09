import React, { useEffect, useContext, useState } from 'react';
import { TicketContext } from '../context/TicketContext.jsx';
import { AuthContext } from '../context/AuthContext.jsx';

import TicketDetail from '../components/tickets/TicketDetail.jsx';

const UserTickets = () => {
  const { tickets, fetchTicketsByUser} = useContext(TicketContext);
  //const userId = localStorage.getItem('userId'); // Asegúrate de obtener el ID del usuario correctamente
  const {user } = useContext(AuthContext);

  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      fetchTicketsByUser(user._id);
    }
  }, [user, fetchTicketsByUser]);


  const openModal = (ticket) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedTicket(null);
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto p-7">
      <h2 className="text-2xl font-bold mb-4">Mis Tickets</h2>
      <ul>
        {tickets.map((ticket) => (
          <li key={ticket._id} className="mb-5 hover:animate-background rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-0.5 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s]">
            <div className='rounded-[10px] bg-white p-4 !pt-15 sm:p-6' >
            <h3 className="text-xl font-semibold">{ticket.title}</h3>
            <p>{ticket.description}</p>
            <p>Prioridad: {ticket.priority}</p>
            <p>Tipo: {ticket.type}</p>
            <p>Estado: {ticket.status}</p>

            <button
                onClick={() => openModal(ticket)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-2"
              >
                Ver
              </button>

            </div>
            {/* <p>Asignado a: {ticket.assignedTo ? ticket.assignedTo.name : 'No asignado'}</p> */}
          </li>
        ))}
      </ul>
      {isModalOpen && selectedTicket && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md w-3/4 max-w-lg">
            <TicketDetail ticket={selectedTicket} onClose={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTickets;

