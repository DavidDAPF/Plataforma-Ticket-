import React from 'react';

const TicketsStatusTable = ({ tickets }) => {
  const statusCounts = tickets.reduce(
    (counts, ticket) => {
      counts[ticket.status] = (counts[ticket.status] || 0) + 1;
      return counts;
    },
    { nuevo: 0, abierto: 0, cerrado: 0 }
  );

  return (
    <div className="bg-white p-6 shadow-md rounded-md">
      <h3 className="text-lg font-semibold mb-4">Cantidad de Tickets por Status</h3>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="border-b p-4">Status</th>
            <th className="border-b p-4">Cantidad</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border-b p-4">Nuevos</td>
            <td className="border-b p-4">{statusCounts.nuevo}</td>
          </tr>
          <tr>
            <td className="border-b p-4">Abiertos</td>
            <td className="border-b p-4">{statusCounts.abierto}</td>
          </tr>
          <tr>
            <td className="border-b p-4">Cerrados</td>
            <td className="border-b p-4">{statusCounts.cerrado}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TicketsStatusTable;
