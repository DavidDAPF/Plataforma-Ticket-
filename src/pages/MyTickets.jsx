
// export default MyTickets;
import React, { useEffect, useContext } from 'react';
import { TicketContext } from '../context/TicketContext.jsx';

const MyTickets = () => {
  const { tickets, fetchTickets } = useContext(TicketContext);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Todos los Tickets</h2>
      <ul>
        {tickets.map((ticket) => (
          <li key={ticket._id} className="mb-4 p-4 border rounded-md">
            <h3 className="text-xl font-semibold">{ticket.summary}</h3>
            <p>{ticket.description}</p>
            <p>Prioridad: {ticket.priority}</p>
            <p>Tipo: {ticket.type}</p>
            <p>Estado: {ticket.status}</p>
            <p>Asignado a: {ticket.assignedTo ? ticket.assignedTo.name : 'No asignado'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyTickets;

