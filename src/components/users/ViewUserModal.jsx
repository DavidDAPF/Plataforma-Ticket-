import React from 'react';
import Modal from '../common/Modal';

const ViewUserModal = ({ isOpen, onClose, userDetails }) => {
  if (!userDetails) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-2xl font-bold mb-4">Detalles del Usuario</h2>
      <div className="mb-4">
        <strong>Nombre:</strong> {userDetails.name}
      </div>
      <div className="mb-4">
        <strong>Correo Electrónico:</strong> {userDetails.email}
      </div>
      <div className="mb-4">
        <strong>Rol:</strong> {userDetails.role}
      </div>
      <div className="mb-4">
        <strong>Estatus:</strong> {userDetails.status}
      </div>
      <h3 className="text-xl font-bold mt-6 mb-4">Equipos Asignados</h3>
      <ul>
        {userDetails.equipmentAssignments.map((equipment) => (
          <li key={equipment._id}>
            {equipment.label} - {equipment.brand} ({equipment.model})
          </li>
        ))}
      </ul>
    </Modal>
  );
};

export default ViewUserModal;
