import React from 'react';
import Modal from '../common/Modal.jsx';

const DeleteUserModal = ({ isOpen, onClose, onDeleteUser, user }) => {
  if (!user) return null;

  const handleDelete = () => {
    onDeleteUser(user.id);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div>
        <h2 className="text-xl font-bold mb-4">Eliminar Usuario</h2>
        <p>¿Deseas eliminar el usuario o ponerlo como inactivo para tenerlo de histórico?</p>
        <div className="mt-4">
          <button
            onClick={() => onDeleteUser(user.id, 'inactive')}
            className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 mr-2"
          >
            Inactivar
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Eliminar
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteUserModal;
