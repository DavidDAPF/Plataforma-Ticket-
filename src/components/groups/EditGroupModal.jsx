// src/components/groups/EditGroupModal.jsx
import React, { useState, useEffect } from 'react';

const EditGroupModal = ({ isOpen, onClose, onEditGroup, group }) => {
  const [groupName, setGroupName] = useState('');

  useEffect(() => {
    if (group) {
      setGroupName(group.name);
    }
  }, [group]);

  const handleEditGroup = () => {
    onEditGroup({ ...group, name: groupName });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Editar Grupo</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">&times;</button>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Nombre del Grupo</label>
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border shadow-sm border-gray-300 rounded-md"
            required
          />
        </div>
        <button onClick={handleEditGroup} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
          Guardar Cambios
        </button>
      </div>
    </div>
  );
};

export default EditGroupModal;
