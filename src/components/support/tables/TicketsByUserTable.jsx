import React from 'react';

const TicketsByUserTable = ({ tickets }) => {
  const ticketsByUser = tickets.reduce((acc, ticket) => {
    if (!acc[ticket.user]) {
      acc[ticket.user] = 0;
    }
    acc[ticket.user]++;
    return acc;
  }, {});

  return (
    <div className="bg-white p-6 shadow-md rounded-md">
      <h3 className="text-lg font-semibold mb-4">Cantidad de tickets por Usuario</h3>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="border-b p-4">Usuario</th>
            <th className="border-b p-4">Cantidad</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(ticketsByUser).map(([user, count]) => (
            <tr key={user}>
              <td className="border-b p-4">{user}</td>
              <td className="border-b p-4">{count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TicketsByUserTable;
