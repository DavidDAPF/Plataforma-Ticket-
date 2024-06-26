// src/components/settings/ManageUserAccounts.jsx
import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext.jsx';
import { LocationContext } from '../../context/LocationContext.jsx';
import Modal from '../common/Modal.jsx';
import UserAccountForm from './UserAccountForm.jsx'; // Importa el formulario de cuenta de usuario

const ManageUserAccounts = () => {
  const { users, assignAccount } = useContext(UserContext);
  const { locations } = useContext(LocationContext);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLocation, setFilterLocation] = useState('');

  const handleOpenModal = (user) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const handleCloseModal = () => setModalOpen(false);

  const handleSave = (userId, email, password, role, status, location) => {
    assignAccount(userId, email, password, role, status, location);
    handleCloseModal();
  };

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleLocationChange = (e) => setFilterLocation(e.target.value);

  const filteredUsers = users.filter((user) => {
    return (
      (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterLocation === '' || user.location === filterLocation)
    );
  });

  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Asignar Cuentas a Usuarios</h2>
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Buscar usuarios..."
          className="px-4 py-2 border rounded-md"
        />
        <select
          value={filterLocation}
          onChange={handleLocationChange}
          className="ml-4 px-4 py-2 border rounded-md"
        >
          <option value="">Todas las localidades</option>
          {locations.map((location) => (
            <option key={location.id} value={location.name}>
              {location.name}
            </option>
          ))}
        </select>
      </div>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="border-b p-4">Nombre</th>
            <th className="border-b p-4">Correo Electrónico</th>
            <th className="border-b p-4">Rol</th>
            <th className="border-b p-4">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td className="border-b p-4">{user.name}</td>
              <td className="border-b p-4">{user.email}</td>
              <td className="border-b p-4">{user.role}</td>
              <td className="border-b p-4">
                <button
                  onClick={() => handleOpenModal(user)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2"
                >
                  Asignar Cuenta
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <UserAccountForm user={selectedUser} onSave={handleSave} />
        </Modal>
      )}
    </div>
  );
};

export default ManageUserAccounts;
