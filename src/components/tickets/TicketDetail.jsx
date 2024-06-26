import React, { useState, useContext } from 'react';
import { TicketContext } from '../context/TicketContext.jsx';

const TicketDetail = ({ ticket, onClose }) => {
  const { updateTicket } = useContext(TicketContext);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    const updatedComments = [...ticket.comments, { text: newComment, date: new Date().toISOString() }];
    updateTicket({ ...ticket, comments: updatedComments });
    setNewComment('');
  };

  return (
    <div className="p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">{ticket.summary}</h2>
      <p className="mb-4"><strong>Descripción:</strong> {ticket.description}</p>
      <p className="mb-4"><strong>Tipo:</strong> {ticket.type}</p>
      <p className="mb-4"><strong>Prioridad:</strong> {ticket.priority}</p>
      <p className="mb-4"><strong>Estado:</strong> {ticket.status}</p>
      <p className="mb-4"><strong>Solicitante:</strong> {ticket.requester}</p>
      <div className="mb-4">
        <h3 className="text-xl font-bold mb-2">Comentarios</h3>
        {ticket.comments.map((comment, index) => (
          <div key={index} className="mb-2">
            <p><strong>{new Date(comment.date).toLocaleString()}:</strong> {comment.text}</p>
          </div>
        ))}
      </div>
      <div className="mb-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Agregar comentario..."
          className="w-full px-4 py-2 border rounded-md"
        />
        <button onClick={handleAddComment} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-2">
          Agregar Comentario
        </button>
      </div>
      <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 mt-2">
        Cerrar
      </button>
    </div>
  );
};

export default TicketDetail;
