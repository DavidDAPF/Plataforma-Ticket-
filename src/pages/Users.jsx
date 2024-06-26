// src/pages/Users.jsx
import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext.jsx';
import AddUserModal from '../components/users/AddUserModal.jsx';
import EditUserModal from '../components/users/EditUserModal.jsx';
import DeleteUserModal from '../components/users/DeleteUserModal.jsx';
import AddGroupModal from '../components/groups/AddGroupModal.jsx';
import EditGroupModal from '../components/groups/EditGroupModal.jsx';
import DeleteGroupModal from '../components/groups/DeleteGroupModal.jsx';
import { LocationContext } from '../context/LocationContext.jsx'; // Import the LocationContext
import { useNavigate, Link } from 'react-router-dom';

const Users = () => {
  const { users, addUser, updateUser, deleteUser, groups, addGroup, updateGroup, deleteGroup } = useContext(UserContext);
  const { locations } = useContext(LocationContext); // Use the LocationContext
  const [isAddUserModalOpen, setAddUserModalOpen] = useState(false);
  const [isEditUserModalOpen, setEditUserModalOpen] = useState(false);
  const [isDeleteUserModalOpen, setDeleteUserModalOpen] = useState(false);
  const [isAddGroupModalOpen, setAddGroupModalOpen] = useState(false);
  const [isEditGroupModalOpen, setEditGroupModalOpen] = useState(false);
  const [isDeleteGroupModalOpen, setDeleteGroupModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  
  const navigate = useNavigate();

  const handleOpenAddUserModal = () => setAddUserModalOpen(true);
  const handleCloseAddUserModal = () => setAddUserModalOpen(false);

  const handleOpenEditUserModal = (user) => {
    setSelectedUser(user);
    setEditUserModalOpen(true);
  };
  const handleCloseEditUserModal = () => setEditUserModalOpen(false);

  const handleOpenDeleteUserModal = (user) => {
    setSelectedUser(user);
    setDeleteUserModalOpen(true);
  };
  const handleCloseDeleteUserModal = () => setDeleteUserModalOpen(false);

  const handleOpenAddGroupModal = () => setAddGroupModalOpen(true);
  const handleCloseAddGroupModal = () => setAddGroupModalOpen(false);

  const handleOpenEditGroupModal = (group) => {
    setSelectedGroup(group);
    setEditGroupModalOpen(true);
  };
  const handleCloseEditGroupModal = () => setEditGroupModalOpen(false);

  const handleOpenDeleteGroupModal = (group) => {
    setSelectedGroup(group);
    setDeleteGroupModalOpen(true);
  };
  const handleCloseDeleteGroupModal = () => setDeleteGroupModalOpen(false);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleLocationChange = (e) => setFilterLocation(e.target.value);

  const filteredUsers = users.filter((user) => {
    return (
      (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterLocation === '' || user.location === filterLocation)
    );
  });

  const handleViewUser = (user) => {
    navigate(`/users/${user.id}`);
  };


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto bg-white p-6 rounded-md shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Usuarios y Grupos</h1>
        </div>
        <AddUserModal isOpen={isAddUserModalOpen} onClose={handleCloseAddUserModal} onAddUser={addUser} />
        <EditUserModal isOpen={isEditUserModalOpen} onClose={handleCloseEditUserModal} onEditUser={updateUser} user={selectedUser} />
        <DeleteUserModal isOpen={isDeleteUserModalOpen} onClose={handleCloseDeleteUserModal} onDeleteUser={deleteUser} user={selectedUser} />
        <AddGroupModal isOpen={isAddGroupModalOpen} onClose={handleCloseAddGroupModal} onAddGroup={addGroup} />
        <EditGroupModal isOpen={isEditGroupModalOpen} onClose={handleCloseEditGroupModal} onEditGroup={updateGroup} group={selectedGroup} />
        <DeleteGroupModal isOpen={isDeleteGroupModalOpen} onClose={handleCloseDeleteGroupModal} onDeleteGroup={deleteGroup} group={selectedGroup} />
        
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-4">
          </div>
        </div>

        <h2 className="text-2xl font-bold mt-8 mb-5">Grupos</h2>
        <button
              onClick={handleOpenAddGroupModal}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              Añadir Grupo
            </button>
        <table className="w-full text-left border-collapse mt-4">
          <thead>
            <tr>
              <th className="border-b p-4">Nombre del Grupo</th>
              <th className="border-b p-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {groups.map((group) => (
              <tr key={group.id}>
                <td className="border-b p-4">{group.name}</td>
                <td className="border-b p-4">
                  <button
                    onClick={() => handleOpenEditGroupModal(group)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleOpenDeleteGroupModal(group)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <h2 className="text-2xl font-bold mt-8 mb-5">Usuarios</h2>
        <div className="flex items-center space-x-4">
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
              className="px-4 py-2 border rounded-md"
            >
              <option value="">Todas las localidades</option>
              {locations.map((location) => (
                <option key={location.id} value={location.name}>
                  {location.name}
                </option>
              ))}
            </select>
            <button
              onClick={handleOpenAddUserModal}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              Añadir Usuario
            </button>
          </div>
        <table className="w-full text-left border-collapse mt-4">
          <thead>
            <tr>
              <th className="border-b p-4">Nombre</th>
              <th className="border-b p-4">Correo Electrónico</th>
              <th className="border-b p-4">Rol</th>
              <th className="border-b p-4">Edad</th>
              <th className="border-b p-4">Ubicación</th>
              <th className="border-b p-4">Número de Teléfono</th>
              <th className="border-b p-4">Estatus</th>
              <th className="border-b p-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td className="border-b p-4">{user.name}</td>
                <td className="border-b p-4">{user.email}</td>
                <td className="border-b p-4">{user.role}</td>
                <td className="border-b p-4">{user.age}</td>
                <td className="border-b p-4">{user.location}</td>
                <td className="border-b p-4">{user.phoneNumber}</td>
                <td className={`border-b p-4 ${user.status === 'Activo' ? 'text-green-500' : 'text-red-500'}`}>{user.status}</td>
                <td className="border-b p-4">
                {/* <Link to={`/users/${user.id}`} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2">
                    Ver
                  </Link> */}
                  <button
                    onClick={() => navigate(`/users/${user.id}`)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 mr-2"
                  >
                    Ver
                  </button>
                  <button
                    onClick={() => handleOpenEditUserModal(user)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleOpenDeleteUserModal(user)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                  {/* <button
                    onClick={() => handleViewUser(user)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                  >
                    Ver
                  </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
