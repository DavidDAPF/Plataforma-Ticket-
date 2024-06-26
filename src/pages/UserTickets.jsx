import React, { useContext, useState, useEffect } from 'react';
import { TicketContext } from '../context/TicketContext';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const UserTickets = () => {
  const { tickets, setTickets } = useContext(TicketContext);
  const { user } = useContext(AuthContext);
  const [userTickets, setUserTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterPriority, setFilterPriority] = useState('All');

  useEffect(() => {
    if (user) {
      const filteredTickets = tickets.filter(ticket => ticket.user === user.id);
      setUserTickets(filteredTickets);
    }
  }, [tickets, user]);

  const handleReopenTicket = async (ticketId) => {
    try {
      const response = await axios.post('/api/tickets/reopen', { ticketId });
      setTickets(tickets.map(ticket => ticket.id === ticketId ? response.data : ticket));
    } catch (error) {
      console.error('Error reopening ticket:', error);
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

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleStatusChange = (e) => setFilterStatus(e.target.value);
  const handlePriorityChange = (e) => setFilterPriority(e.target.value);

  const filteredTickets = userTickets.filter(ticket => {
    return (
      (filterStatus === 'All' || ticket.status === filterStatus) &&
      (filterPriority === 'All' || ticket.priority === filterPriority) &&
      ticket.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto bg-white p-6 rounded-md shadow-md">
        <h1 className="text-3xl font-bold mb-6">Mis Tickets</h1>
        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Buscar tickets..."
            className="px-4 py-2 border rounded-md"
          />
          <select
            value={filterStatus}
            onChange={handleStatusChange}
            className="ml-4 px-4 py-2 border rounded-md"
          >
            <option value="All">Todos los estados</option>
            <option value="Nuevo">Nuevo</option>
            <option value="Abierto">Abierto</option>
            <option value="Cerrado">Cerrado</option>
            <option value="Reabierto">Reabierto</option>
          </select>
          <select
            value={filterPriority}
            onChange={handlePriorityChange}
            className="ml-4 px-4 py-2 border rounded-md"
          >
            <option value="All">Todas las prioridades</option>
            <option value="Alto">Alto</option>
            <option value="Medio">Medio</option>
            <option value="Bajo">Bajo</option>
          </select>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="border-b p-4">Resumen</th>
              <th className="border-b p-4">Estado</th>
              <th className="border-b p-4">Prioridad</th>
              <th className="border-b p-4">Fecha de Creación</th>
              <th className="border-b p-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredTickets.map(ticket => (
              <tr key={ticket.id}>
                <td className="border-b p-4">{ticket.description}</td>
                <td className={`border-b p-4 ${ticket.status === 'Abierto' ? 'text-blue-500' : ticket.status === 'Cerrado' ? 'text-green-500' : ticket.status === 'Reabierto' ? 'text-red-500' : 'text-gray-500'}`}>{ticket.status}</td>
                <td className={`border-b p-4 ${ticket.priority === 'Alto' ? 'text-red-500' : ticket.priority === 'Medio' ? 'text-yellow-500' : 'text-green-500'}`}>{ticket.priority}</td>
                <td className="border-b p-4">{new Date(ticket.creationDate).toLocaleDateString()}</td>
                <td className="border-b p-4">
                  <button onClick={() => toggleComments(ticket)} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 mr-2">
                    Comentarios
                  </button>
                  {ticket.status === 'Cerrado' && (
                    <button onClick={() => handleReopenTicket(ticket.id)} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                      Reabrir
                    </button>
                  )}
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

export default UserTickets;
