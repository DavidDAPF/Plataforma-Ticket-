import React, { useState, useContext } from 'react';
import Modal from '../common/Modal.jsx';
import axios from 'axios';
import { TicketContext } from '../../context/TicketContext.jsx';

const PasswordRecoveryModal = ({ isOpen, onClose }) => {
  const { createTicket } = useContext(TicketContext);
  const [email, setEmail] = useState('');

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   createTicket({
  //     summary: 'Recuperación de contraseña',
  //     requester: email,
  //     status: 'Nuevo',
  //     type: 'Recuperación de contraseña',
  //     priority: 'Alta',
  //     channel: 'Web',
  //     creationDate: new Date().toISOString(),
  //   });
  //   onClose();
  //   alert('Se ha enviado un ticket de recuperación de contraseña.');
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/request-password-reset', { email });
      alert('Se ha enviado un correo de recuperación de contraseña. Por favor, revise su bandeja de entrada.');
      onClose();
    } catch (error) {
      console.error('Error al enviar la solicitud de recuperación de contraseña:', error);
      alert('Error al enviar la solicitud de recuperación de contraseña. Por favor, inténtelo de nuevo.');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold mb-4">Recuperación de Contraseña</h2>
        <div className="mb-4">
          <label className="block mb-2">Correo Electrónico</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>
        <div className="flex justify-end mt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Enviar
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 ml-2"
          >
            Cancelar
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default PasswordRecoveryModal;
