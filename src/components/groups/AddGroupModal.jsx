import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext.jsx';

const AddGroupModal = ({ isOpen, onClose, onAddGroup }) => {
  const { users } = useContext(UserContext);
  const [groupName, setGroupName] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleCheckboxChange = (userId) => {
    setSelectedUsers((prevSelectedUsers) =>
      prevSelectedUsers.includes(userId)
        ? prevSelectedUsers.filter((id) => id !== userId)
        : [...prevSelectedUsers, userId]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddGroup({ name: groupName, users: selectedUsers });
    setGroupName('');
    setSelectedUsers([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Añadir Grupo</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
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
          <div className="mb-4">
            <label className="block text-gray-700">Usuarios</label>
            {users.map((user) => (
              <div key={user.id}>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    value={user.id}
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => handleCheckboxChange(user.id)}
                    className="form-checkbox"
                  />
                  <span className="ml-2">{user.name}</span>
                </label>
              </div>
            ))}
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            Añadir Grupo
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddGroupModal;
