import React, { useState, useContext, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Modal from '../common/Modal';
import { LocationContext } from '../../context/LocationContext';
import { EquipmentContext } from '../../context/EquipmentContext';

const AddUserModal = ({ isOpen, onClose, onAddUser }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Usuario');
  //const [location, setLocation] = useState('');
  const [status, setStatus] = useState('Activo');
  const [password, setPassword] = useState('');
  const { locations } = useContext(LocationContext);

   // Reiniciar los estados al abrir el modal
   useEffect(() => {
    if (isOpen) {
      setName('');
      setEmail('');
      setRole('Usuario');
      setStatus('Activo');
      setPassword('');
    }
  }, [isOpen]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onAddUser({ name, email, role, status, password});
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2">Nombre</label>
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
              <label className="block mb-2">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                Guardar
              </button>
            </div>
          </form>
    </Modal>
  );
};

export default AddUserModal;
