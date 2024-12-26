
// export default MyTickets;
import React, { useEffect, useContext } from 'react';
import { TicketContext } from '../context/TicketContext.jsx';
// cambios nuevos
import TicketDetail from '../components/tickets/TicketDetail.jsx';

const MyTickets = () => {
  const { tickets, fetchTickets } = useContext(TicketContext);

  //cambios nuevos
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);


  const openModal = (ticket) => {
    console.log("Ticket seleccionado:", ticket); // Verificar el contenido del ticket
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedTicket(null);
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Todos los Tickets</h2>
      <ul>
        {tickets.map((ticket) => (
          <li key={ticket._id} className="mb-4 p-4 border rounded-md">
            <h3 className="text-xl font-semibold">{ticket.title}</h3>
            <p>{ticket.description}</p>
            <p>Prioridad: {ticket.priority}</p>
            <p>Tipo: {ticket.type}</p>
            <p>Estado: {ticket.status}</p>
            <p>Asignado a: {ticket.assignedTo ? ticket.assignedTo.name : 'No asignado'}</p>

            <button
              onClick={() => openModal(ticket)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-2"
            >
              Ver
            </button>


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

export default MyTickets;

