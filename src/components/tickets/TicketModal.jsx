import React, { useState } from 'react';

const TicketModal = ({ isOpen, onClose, ticket }) => {
  const [response, setResponse] = useState(ticket.response || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para actualizar el ticket con la respuesta
    onClose();
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-md shadow-md w-1/2">
          <h2 className="text-2xl font-bold mb-4">Ticket: {ticket.summary}</h2>
          <p className="mb-4">{ticket.description}</p>
          <form onSubmit={handleSubmit}>
            <textarea
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              className="w-full px-4 py-2 border rounded-md mb-4"
              placeholder="Escribe tu respuesta aquí..."
            />
            <div className="flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 mr-2"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Enviar
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default TicketModal;
