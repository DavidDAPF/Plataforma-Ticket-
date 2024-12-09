import React from 'react';

const EquipmentHistoryModal = ({ isOpen, onClose, history }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Historial de los Equipos</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">&times;</button>
        </div>
        {history && history.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {history.map((entry, index) => (
              <li key={entry._id || index} className="py-2">
                <p><strong>Acción:</strong> {entry.action}</p>
                <p><strong>Realizado por ID:</strong> {entry.performedBy?.name || 'Usuario desconocido' }({entry.performedBy?.email || 'Email no disponible'}) </p>
                <p><strong>Estado previo:</strong> {entry.previousState || 'N/A'}</p>
                <p><strong>Estado actual:</strong> {entry.currentState || 'N/A'}</p>
                <p><strong>Fecha:</strong> {new Date(entry.date).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay historial disponible.</p>
        )}
      </div>
    </div>
  );
};

export default EquipmentHistoryModal;
