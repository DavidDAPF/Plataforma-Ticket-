import React, { useState } from 'react';

const AddUserForm = ({ onAddUser }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  //const [age, setAge] = useState('');
  //const [location, setLocation] = useState('');
  //const [phoneNumber, setPhoneNumber] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddUser({ name, email, role, status });
    setName('');
    setEmail('');
    setRole('');
    //setAge('');
    //setLocation('');
    //setPhoneNumber('');
    setStatus('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="mb-4">
        <label className="block text-gray-700">Nombre y Apellido</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-white border shadow-sm border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Correo Electrónico</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-white border shadow-sm border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Rol</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-white border shadow-sm border-gray-300 rounded-md"
          required
        >
          <option value="">Seleccione un rol</option>
          <option value="Usuario">Usuario</option>
          <option value="Soporte">Soporte</option>
        </select>
      </div>
      {/* <div className="mb-4">
        <label className="block text-gray-700">Edad</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-white border shadow-sm border-gray-300 rounded-md"
          required
        />
      </div> */}
      {/* <div className="mb-4">
        <label className="block text-gray-700">Ubicación</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-white border shadow-sm border-gray-300 rounded-md"
          required
        />
      </div> */}
      {/* <div className="mb-4">
        <label className="block text-gray-700">Número de Teléfono</label>
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-white border shadow-sm border-gray-300 rounded-md"
          required
        />
      </div> */}
      <div className="mb-4">
        <label className="block text-gray-700">Estatus</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-white border shadow-sm border-gray-300 rounded-md"
          required
        >
          <option value="">Seleccione un estatus</option>
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
        </select>
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
        Añadir Usuario
      </button>
    </form>
  );
};

export default AddUserForm;
