import React, { useState, useEffect, useContext } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Modal from '../common/Modal';
import { LocationContext } from '../../context/LocationContext';
//import { EquipmentContext } from '../../context/EquipmentContext';

const EditUserModal = ({ isOpen, onClose, onEditUser, user }) => {
  const [name, setName] = useState(user ? user.name : '');
  const [email, setEmail] = useState(user ? user.email : '');
  const [role, setRole] = useState(user ? user.role : 'Usuario');
  //const [location, setLocation] = useState(user ? user.location : '');
  const [status, setStatus] = useState(user ? user.status : 'Activo');
  const { locations } = useContext(LocationContext);
  //const { equipmentList } = useContext(EquipmentContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
      setStatus(user.status);
    }
  }, [user]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onEditUser({ ...user, _id: user._id, name, email, role, status });
      onClose();
    } catch (error) {
      console.error('Error al editar el usuario:', error);
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2">Nombre y Apellido</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Correo Electrónico</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Rol</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-2 border rounded-md"
              >
                <option value="Usuario">Usuario</option>
                <option value="Soporte">Soporte</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-2">Estatus</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-2 border rounded-md"
              >
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
            </div>
            <div className="flex justify-end mt-4">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Guardar cambios
              </button>
            </div>
          </form>
    </Modal>
  );
};

export default EditUserModal;