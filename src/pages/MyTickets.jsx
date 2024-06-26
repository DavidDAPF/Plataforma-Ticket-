// src/pages/MyTickets.jsx
import React, { useContext, useState } from 'react';
import { TicketContext } from '../context/TicketContext.jsx';
import { AuthContext } from '../context/AuthContext.jsx';
import ResolveTicketModal from '../components/tickets/ResolveTicketModal.jsx';

const MyTickets = () => {
  const { tickets, setTickets } = useContext(TicketContext);
  const { user } = useContext(AuthContext);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [newComment, setNewComment] = useState('');

  const handleResolveClick = (ticket) => {
    setSelectedTicket(ticket);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedTicket(null);
  };

  const handleResolveTicket = (ticketId, solution, closureDate, assignedEquipment) => {
    setTickets((prevTickets) =>
      prevTickets.map((ticket) =>
        ticket.id === ticketId
          ? { ...ticket, status: 'Cerrado', solution, closureDate, assignedEquipment }
          : ticket
      )
    );
  };

  const handleAddComment = () => {
    if (newComment.trim() === '') return;
    setTickets((prevTickets) =>
      prevTickets.map((ticket) =>
        ticket.id === selectedTicket.id
          ? {
              ...ticket,
              comments: [...ticket.comments, { user: user.name, comment: newComment, createdAt: new Date() }]
            }
          : ticket
      )
    );
    setNewComment('');
  };

  const userTickets = tickets.filter((ticket) => ticket.requester === user.name);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto bg-white p-6 rounded-md shadow-md">
        <h1 className="text-3xl font-bold mb-6">Mis Tickets</h1>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="border-b p-4">Resumen</th>
              <th className="border-b p-4">Estado</th>
              <th className="border-b p-4">Fecha de Creación</th>
              <th className="border-b p-4">Fecha de Cierre</th>
              <th className="border-b p-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {userTickets.map((ticket) => (
              <tr key={ticket.id}>
                <td className="border-b p-4">{ticket.summary}</td>
                <td className={`border-b p-4 ${ticket.status === 'Abierto' ? 'text-blue-500' : 'text-green-500'}`}>{ticket.status}</td>
                <td className="border-b p-4">{new Date(ticket.creationDate).toLocaleDateString()}</td>
                <td className="border-b p-4">{ticket.closureDate ? new Date(ticket.closureDate).toLocaleDateString() : 'NA'}</td>
                <td className="border-b p-4">
                  <button onClick={() => handleResolveClick(ticket)} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 mr-2">
                    Comentarios
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isModalOpen && selectedTicket && (
          <div className="mt-6 bg-white p-6 rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-4">Comentarios</h2>
            <ul>
              {selectedTicket.comments.map((comment, index) => (
                <li key={index} className="mb-2">
                  <strong>{comment.user}:</strong> {comment.comment} <span className="text-gray-600 text-sm">({new Date(comment.createdAt).toLocaleString()})</span>
                </li>
              ))}
            </ul>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Agregar un comentario..."
              className="w-full p-2 border rounded-md mb-4"
            ></textarea>
            <button onClick={handleAddComment} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
              Agregar Comentario
            </button>
          </div>
        )}
      </div>
      <ResolveTicketModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        ticket={selectedTicket}
        onResolve={handleResolveTicket}
      />
    </div>
  );
};

export default MyTickets;
