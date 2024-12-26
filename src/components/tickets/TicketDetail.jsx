import React, { useState, useContext } from 'react';
import { TicketContext } from '../../context/TicketContext';
import { toast } from 'react-toastify';

const TicketDetail = ({ ticket, onClose }) => {
  const {reopenTicket} = useContext(TicketContext);

  console.log("Datos iniciales del ticket:", ticket);

  const [newComment, setNewComment] = useState('');

  //console.log(ticket)

  const handleReopenTicket = async () => {
    if (!newComment.trim()) {
      toast.warning('Debes ingresar un comentario para reabrir el ticket.');
      return;
    }

    await reopenTicket(ticket._id, newComment); // Llama a la función del contexto
    setNewComment(''); // Limpia el campo de comentario
    onClose(); // Cierra el modal después de reabrir
    
  };

  return (
    <div className="p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Detalle del Ticket</h2>
      <p className=" font-bold mb-4">Titulo: {ticket.title}</p>
      <p className="mb-4"><strong>Descripción:</strong> {ticket.description}</p>
      <p className="mb-4"><strong>Tipo:</strong> {ticket.type}</p>
      <p className="mb-4"><strong>Prioridad:</strong> {ticket.priority}</p>
      <p className="mb-4"><strong>Estado:</strong> {ticket.status}</p>
      <p className='mb-4'>
        <strong>Asignado a: </strong>
        {ticket.assignedTo && ticket.assignedTo?.name
          ? ticket.assignedTo.name
          : 'Técnico no cargado'}
      </p>

      <p className="mb-4">
        <strong>Respuesta final del Técnico:</strong> {ticket.response || 'No hay respuesta aún'}
      </p>
       {/* Mostrar los comentarios agrupados */}
       <div className="mb-4 max-h-60 overflow-y-auto border p-3 rounded-md bg-gray-50">
        <h3 className="text-xl font-bold mb-2">Comentarios</h3>
        {ticket.comments.length > 0 ? (
          <ul className="space-y-2">
            {ticket.comments.map((comment, index) => (
              <li key={index} className="p-2 border rounded-md">
                <p><strong>{comment.name}:</strong> {comment.text}</p>
                <p className="text-sm text-gray-500">{new Date(comment.createdAt).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay comentarios para este ticket.</p>
        )}
      </div>
       {/* Campo para agregar comentario */}
       {ticket.status === 'Cerrado' && (
        <div className="mb-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Agregar comentario para reabrir el ticket..."
            className="w-full px-4 py-2 border rounded-md"
          />
          <button
            onClick={handleReopenTicket}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-2"
          >
            Reabrir Ticket
          </button>
        </div>
      )}
      {/* Botón de cierre del modal */}
      <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 mt-2">
        Cerrar
      </button>
    </div>
  );
};

export default TicketDetail;


