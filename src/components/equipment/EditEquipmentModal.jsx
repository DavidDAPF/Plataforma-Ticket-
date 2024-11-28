// export default EditEquipmentModal;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserSelectionModal from './UserSeleccionModal';



const EditEquipmentModal = ({ isOpen, onClose, onEditEquipment, equipment }) => {
  const [label, setLabel] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [ipAddress, setIpAddress] = useState('');
  const [assignedUser, setAssignedUser] = useState('');
  const [showUserModal, setShowUserModal] = useState(false);
  const [users, setUsers] = useState([]);

   // Lógica para cargar los usuarios
   useEffect(() => {
    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/users', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            setUsers(response.data); // Guardamos los usuarios en el estado
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    fetchUsers(); // Llamada a la función
}, []);

  useEffect(() => {
    if (equipment) {
      setLabel(equipment.label || '');
      setBrand(equipment.brand || '');
      setModel(equipment.model || '');
      setSerialNumber(equipment.serialNumber || '');
      setIpAddress(equipment.ipAddress || '');
      setAssignedUser(equipment.assignedUser?._id || '');
      //setAssignedUser(equipment.assignedUser || ''); // Mantener el usuario actual
    }
  }, [equipment]);

  const handleSubmit = (e) => {
    e.preventDefault();
  

    //const userToAssign = assignedUser.trim() === '' ? null : assignedUser;
  
    const updatedData = {
      label,
      brand,
      model,
      serialNumber,
      ipAddress,
      //assignedUser: userToAssign,
      //assignedUser: assignedUser || equipment.assignedUser, // Usar el valor actual si no se selecciona
      assignedUser: assignedUser || assignedUser?._id || null, // Enviar solo el id en el backend
    };
  
    console.log('Datos enviados al backend:', updatedData);
    console.log('Datos enviados:', { ...equipment, label, brand, model, serialNumber, ipAddress, assignedUser });
   //     onEditEquipment({ ...equipment, label, brand, model, serialNumber, ipAddress, assignedUser });
  
    onEditEquipment(equipment._id,updatedData);
    onClose();
  };


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Editar Equipo</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Etiqueta</label>
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border shadow-sm border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Marca</label>
            <input
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border shadow-sm border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Modelo</label>
            <input
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border shadow-sm border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Número de Serie</label>
            <input
              type="text"
              value={serialNumber}
              onChange={(e) => setSerialNumber(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border shadow-sm border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Campo de Dirección IP */}
            <div className="mb-4">
              <label className="block text-gray-700">Dirección IP</label>
              <input
                type="text"
                value={ipAddress}
                onChange={(e) => setIpAddress(e.target.value)} // Validar en frontend si es necesario
                className="mt-1 block w-full px-3 py-2 bg-white border shadow-sm border-gray-300 rounded-md"
                placeholder='Opcional'
              />
            </div>

              <div className="mb-4">
                  <label className="block text-gray-700">Usuario Asignado</label>
                  <button
                      type="button"
                      onClick={() => setShowUserModal(true)} // Muestra el modal de usuarios
                      className="mt-1 block w-full px-3 py-2 bg-white border shadow-sm border-gray-300 rounded-md text-left"
                  >
                      {/* {assignedUser ? `Usuario ID: ${assignedUser}` : 'Seleccionar usuario'} */}
                      {/* {assignedUser && assignedUser.name ? assignedUser.name : 'Seleccionar usuario'} */}
                      {assignedUser
                         ? users.find((user) => user._id === assignedUser)?.name || 'Usuario no encontrado'
                         : 'Seleccionar usuario'}
                  </button>
              </div>
              {showUserModal && (
                  <UserSelectionModal
                      isOpen={showUserModal}
                      onClose={() => setShowUserModal(false)}
                      users={users}
                      onUserSelect={(user) => { //userId
                          setAssignedUser(user); // Actualiza el usuario asignado
                          setShowUserModal(false); // Cierra el modal
                      }}
                  />
              )}


          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
            Guardar Cambios
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditEquipmentModal;

