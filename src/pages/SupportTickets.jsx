import React, { useContext, useState, useEffect } from 'react';
import { TicketContext } from '../context/TicketContext';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const SupportTickets = () => {
  const { tickets, setTickets } = useContext(TicketContext);
  const { user } = useContext(AuthContext);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [assignee, setAssignee] = useState('');

  const handleAssignTicket = async (ticketId) => {
    try {
      const response = await axios.post('/api/tickets/assign', { ticketId, userId: assignee });
      setTickets(tickets.map(ticket => ticket.id === ticketId ? response.data : ticket));
      setAssignee('');
    } catch (error) {
      console.error('Error assigning ticket:', error);
    }
  };

  const handleAddComment = async (ticketId) => {
    if (newComment.trim() === '') return;
    try {
      const response = await axios.post('/api/tickets/add-comment', {
        ticketId,
        comment: newComment,
        userId: user.id
      });
      setTickets(tickets.map(ticket => ticket.id === ticketId ? response.data : ticket));
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const toggleComments = (ticket) => {
    setSelectedTicket(ticket);
    setShowComments(!showComments);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto bg-white p-6 rounded-md shadow-md">
        <h1 className="text-3xl font-bold mb-6">Tickets de Soporte</h1>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="border-b p-4">Resumen</th>
              <th className="border-b p-4">Estado</th>
              <th className="border-b p-4">Asignado a</th>
              <th className="border-b p-4">Fecha de Creación</th>
              <th className="border-b p-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map(ticket => (
              <tr key={ticket.id}>
                <td className="border-b p-4">{ticket.description}</td>
                <td className={`border-b p-4 ${ticket.status === 'Abierto' ? 'text-blue-500' : 'text-green-500'}`}>{ticket.status}</td>
                <td className="border-b p-4">{ticket.assignedTo ? ticket.assignedTo.name : 'No Asignado'}</td>
                <td className="border-b p-4">{new Date(ticket.creationDate).toLocaleDateString()}</td>
                <td className="border-b p-4">
                  <button onClick={() => toggleComments(ticket)} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 mr-2">
                    Comentarios
                  </button>
                  <select value={assignee} onChange={(e) => setAssignee(e.target.value)} className="px-4 py-2 border rounded-md">
                    <option value="">Asignar a...</option>
                    {/* Aquí deberías mapear a los usuarios disponibles para asignar */}
                    {/* users.map(user => (
                      <option key={user.id} value={user.id}>{user.name}</option>
                    )) */}
                  </select>
                  <button onClick={() => handleAssignTicket(ticket.id)} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 ml-2">
                    Asignar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showComments && selectedTicket && (
          <div className="mt-6 bg-white p-6 rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-4">Comentarios</h2>
            <ul>
              {selectedTicket.comments.map((comment, index) => (
                <li key={index} className="mb-2">
                  <strong>{comment.user.name}:</strong> {comment.comment} <span className="text-gray-600 text-sm">({new Date(comment.createdAt).toLocaleString()})</span>
                </li>
              ))}
            </ul>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Agregar un comentario..."
              className="w-full p-2 border rounded-md mb-4"
            ></textarea>
            <button onClick={() => handleAddComment(selectedTicket.id)} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
              Agregar Comentario
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupportTickets;
