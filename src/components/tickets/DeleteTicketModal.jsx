// src/components/tickets/DeleteTicketModal.jsx
import React from 'react';

const DeleteTicketModal = ({ isOpen, onClose, onDelete, ticket }) => {
  const handleDelete = () => {
    onDelete(ticket.id);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Eliminar Ticket</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">&times;</button>
        </div>
        <p>¿Estás seguro de que quieres eliminar el ticket "{ticket.summary}"?</p>
        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400 mr-2">
            Cancelar
          </button>
          <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTicketModal;
