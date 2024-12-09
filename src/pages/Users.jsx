// src/pages/Users.jsx
import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext.jsx';
import AddUserModal from '../components/users/AddUserModal.jsx';
import EditUserModal from '../components/users/EditUserModal.jsx';
import DeleteUserModal from '../components/users/DeleteUserModal.jsx';
import ViewUserModal from '../components/users/ViewUserModal.jsx';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const Users = () => {
  const { users, addUser, updateUser, deleteUser,getUserById } = useContext(UserContext);
  const [isAddUserModalOpen, setAddUserModalOpen] = useState(false);
  const [isEditUserModalOpen, setEditUserModalOpen] = useState(false);
  const [isDeleteUserModalOpen, setDeleteUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUserDetails, setSelectedUserDetails] = useState(null);
  const [isViewUserModalOpen, setViewUserModalOpen] = useState(false);
  const navigate = useNavigate();

  // Modales
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

  const handleOpenViewUserModal = async (userId) => {
    try {
      const userDetails = await getUserById(userId); // Obtén los datos del usuario
      setSelectedUserDetails(userDetails);
      setViewUserModalOpen(true);
    } catch (err) {
      console.error('Error al cargar los datos del usuario:', err);
      toast.error('Error al cargar los datos del usuario', err)
    }
  };
  
  const handleCloseViewUserModal = () => {
    setViewUserModalOpen(false);
    setSelectedUserDetails(null);
  };

  // Filtro por búsqueda
  const filteredUsers = users.filter((user) => {
    return (
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto bg-white p-6 rounded-md shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Gestión de Usuarios</h1>
          <button
            onClick={handleOpenAddUserModal}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            Añadir Usuario
          </button>
        </div>

        {/* Modales */}
        <AddUserModal
          isOpen={isAddUserModalOpen}
          onClose={handleCloseAddUserModal}
          onAddUser={addUser}
        />
        <EditUserModal
          isOpen={isEditUserModalOpen}
          onClose={handleCloseEditUserModal}
          onEditUser={updateUser}
          user={selectedUser}
        />
        <DeleteUserModal
          isOpen={isDeleteUserModalOpen}
          onClose={handleCloseDeleteUserModal}
          onDeleteUser={deleteUser}
          user={selectedUser}
        />
        <ViewUserModal 
          isOpen= {isViewUserModalOpen}
          onClose={handleCloseViewUserModal}
          userDetails={selectedUserDetails}
        />  

        {/* Búsqueda */}
        <div className="flex items-center space-x-4 mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar usuarios..."
            className="px-4 py-2 border rounded-md"
          />
        </div>

        {/* Tabla de Usuarios */}
        <table className="w-full text-left border-collapse mt-4">
          <thead>
            <tr>
              <th className="border-b p-4">Nombre</th>
              <th className="border-b p-4">Correo Electrónico</th>
              <th className="border-b p-4">Rol</th>
              <th className='border-b p-4'>Status</th>
              <th className="border-b p-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id}>
                <td className="border-b p-4">{user.name}</td>
                <td className="border-b p-4">{user.email}</td>
                <td className="border-b p-4">{user.role}</td>
                <td className='border-b p-4'>{user.status}</td>
                <td className="border-b p-4">
                  <button
                    onClick={() => handleOpenViewUserModal(user._id)}
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
                  {/* <button
                    onClick={() => handleOpenDeleteUserModal(user)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                  >
                    Eliminar
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
