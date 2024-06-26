import React, { useState } from 'react';

const AddEquipmentForm = ({ onAddEquipment }) => {
  const [label, setLabel] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [ipAddress, setIpAddress] = useState('');
  const [type, setType] = useState('');
  const [assignedUser, setAssignedUser] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddEquipment({ label, brand, model, serialNumber, ipAddress, type, assignedUser });
    setLabel('');
    setBrand('');
    setModel('');
    setSerialNumber('');
    setIpAddress('');
    setType('');
    setAssignedUser('');
  };

  const renderIpField = () => {
    if (type === 'equipo') {
      return (
        <div className="mb-4">
          <label className="block text-gray-700">Dirección IP</label>
          <input
            type="text"
            value={ipAddress}
            onChange={(e) => setIpAddress(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border shadow-sm border-gray-300 rounded-md"
            required
          />
        </div>
      );
    }
    return null;
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
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
      <div className="mb-4">
        <label className="block text-gray-700">Tipo de Equipo</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-white border shadow-sm border-gray-300 rounded-md"
          required
        >
          <option value="">Seleccione un tipo</option>
          <option value="equipo">Equipo</option>
          <option value="periferico">Periférico</option>
        </select>
      </div>
      {renderIpField()}
      <div className="mb-4">
        <label className="block text-gray-700">Usuario Asignado</label>
        <input
          type="text"
          value={assignedUser}
          onChange={(e) => setAssignedUser(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-white border shadow-sm border-gray-300 rounded-md"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
        Añadir Equipo
      </button>
    </form>
  );
};

export default AddEquipmentForm;
