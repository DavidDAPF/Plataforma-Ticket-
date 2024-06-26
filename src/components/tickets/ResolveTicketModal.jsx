// src/components/tickets/ResolveTicketModal.jsx
import React, { useState, useEffect } from 'react';

const ResolveTicketModal = ({ isOpen, onClose, ticket, onResolve }) => {
  const [solution, setSolution] = useState('');
  const [closureDate, setClosureDate] = useState('');
  const [assignedEquipment, setAssignedEquipment] = useState([]);
  const [newEquipment, setNewEquipment] = useState('');
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    if (ticket) {
      setSolution(ticket.solution || '');
      setClosureDate(ticket.closureDate || '');
      setAssignedEquipment(ticket.assignedEquipment || []);
    }
  }, [ticket]);

  const handleAddEquipment = () => {
    if (newEquipment) {
      setAssignedEquipment([...assignedEquipment, newEquipment]);
      setNewEquipment('');
    }
  };

  const handleRemoveEquipment = (equipment) => {
    setAssignedEquipment(assignedEquipment.filter((e) => e !== equipment));
  };

  const handleAddComment = () => {
    if (newComment.trim() === '') return;
    const updatedComments = [...ticket.comments, { user: 'Soporte', comment: newComment, createdAt: new Date() }];
    ticket.comments = updatedComments;
    setNewComment('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onResolve(ticket.id, solution, closureDate, assignedEquipment);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Resolver Ticket</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Solución</label>
            <textarea
              value={solution}
              onChange={(e) => setSolution(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border shadow-sm border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Fecha de Cierre</label>
            <input
              type="date"
              value={closureDate}
              onChange={(e) => setClosureDate(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border shadow-sm border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Equipos y Periféricos Asignados</label>
            <ul>
              {assignedEquipment.map((equipment, index) => (
                <li key={index} className="flex justify-between items-center mb-2">
                  <span>{equipment}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveEquipment(equipment)}
                    className="text-red-500 hover:text-red-700"
                  >
                    &times;
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex items-center mt-2">
              <input
                type="text"
                value={newEquipment}
                onChange={(e) => setNewEquipment(e.target.value)}
                placeholder="Agregar equipo/periférico"
                className="px-3 py-2 border shadow-sm border-gray-300 rounded-md"
              />
              <button
                type="button"
                onClick={handleAddEquipment}
                className="ml-2 bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600"
              >
                Agregar
              </button>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Comentarios</label>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Agregar un comentario..."
              className="w-full p-2 border rounded-md mb-4"
            ></textarea>
            <button onClick={handleAddComment} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
              Agregar Comentario
            </button>
            <ul className="mt-4">
              {ticket.comments.map((comment, index) => (
                <li key={index} className="mb-2">
                  <strong>{comment.user}:</strong> {comment.comment} <span className="text-gray-600 text-sm">({new Date(comment.createdAt).toLocaleString()})</span>
                </li>
              ))}
            </ul>
          </div>
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
            Cerrar Ticket
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResolveTicketModal;
