import React from 'react';

const OpenTicketsTable = ({ tickets }) => {
  const openTickets = tickets.filter(ticket => ticket.status === 'abierto');

  return (
    <div className="bg-white p-6 shadow-md rounded-md">
      <h3 className="text-lg font-semibold mb-4">Tickets Abiertos por Analista</h3>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="border-b p-4">Ticket</th>
            <th className="border-b p-4">Estado</th>
            <th className="border-b p-4">Tiempo</th>
            <th className="border-b p-4">Personal</th>
          </tr>
        </thead>
        <tbody>
          {openTickets.map(ticket => (
            <tr key={ticket.id}>
              <td className="border-b p-4">{ticket.id}</td>
              <td className="border-b p-4">{ticket.status}</td>
              <td className="border-b p-4">{ticket.time}</td>
              <td className="border-b p-4">{ticket.analyst}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OpenTicketsTable;
