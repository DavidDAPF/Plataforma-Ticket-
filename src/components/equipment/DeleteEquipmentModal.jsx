import React from 'react';
import Modal from '../common/Modal.jsx';

const DeleteEquipmentModal = ({ isOpen, onClose, onDeleteEquipment, equipment }) => {
  if (!equipment) return null;

  const handleDelete = () => {
    onDeleteEquipment(equipment.id);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div>
        <h2 className="text-xl font-bold mb-4">Eliminar Equipo</h2>
        <p>¿Deseas eliminar este equipo de forma permanente?</p>
        <div className="mt-4">
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Eliminar
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 ml-2"
          >
            Cancelar
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteEquipmentModal;
