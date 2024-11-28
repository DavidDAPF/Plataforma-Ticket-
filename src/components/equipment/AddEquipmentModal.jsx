import React, { useState } from 'react';
import { useContext } from 'react';
import { EquipmentContext } from '../../context/EquipmentContext';

const AddEquipmentModal = ({ isOpen, onClose }) => {
  const { addEquipment } = useContext(EquipmentContext);
  const [formData, setFormData] = useState({
    label: '',
    brand: '',
    model: '',
    serialNumber: '',
    ipAddress: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addEquipment(formData); // Llama a la funcion del contexto
    onClose(); // Cerrar modal
  };

  if (!isOpen) return null;

  // return (
  //   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
  //     <div className="bg-white p-6 rounded-md shadow-md w-full max-w-lg">
  //       <h2 className="text-lg font-semibold mb-4">Añadir Equipo</h2>
  //       <form onSubmit={handleSubmit}>
  //         <input type="text" name="label" value={formData.label} placeholder="Etiqueta" onChange={handleChange} required />
  //         <input type="text" name="brand" value={formData.brand} placeholder="Marca" onChange={handleChange} required />
  //         <input type="text" name="model" value={formData.model} placeholder="Modelo" onChange={handleChange} required />
  //         <input type="text" name="serialNumber" value={formData.serialNumber} placeholder="Número de Serie" onChange={handleChange} required />
  //         <input type="text" name="ipAddress" value={formData.ipAddress} placeholder="Dirección IP" onChange={handleChange} />
  //         <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" >Guardar</button>
  //         <button type='button' className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600" onClick={onClose}>Cancelar</button>
  //       </form>
        
  //     </div>
  //   </div>
  // );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Anadir Equipo</h3>
          {/* <button onClick={onClose} className="text-gray-500 hover:text-gray-700">&times;</button> */}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Etiqueta</label>
            <input
              type="text"
              name='label'
              value={formData.label}
              placeholder='Label'
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white border shadow-sm border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Marca</label>
            <input
              type="text"
              name='brand'
              value={formData.brand}
              placeholder='Marca'
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white border shadow-sm border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Modelo</label>
            <input
              type="text"
              name='model'
              value={formData.model}
              placeholder='Modelo'
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white border shadow-sm border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Número de Serie</label>
            <input
              type="text"
              name='serialNumber'
              value={formData.serialNumber}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white border shadow-sm border-gray-300 rounded-md"
              required
            />
          </div>
  
          {/* Campo de Dirección IP */}
            <div className="mb-4">
              <label className="block text-gray-700">Dirección IP</label>
              <input
                type="text"
                value={FormData.ipAddress}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-white border shadow-sm border-gray-300 rounded-md"
                placeholder='Direccion IP optativa'
              />
            </div>
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
            Agregar Equipo
          </button>
          <button type="submit" className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600" onClick={onclose}>
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );


};

export default AddEquipmentModal;

