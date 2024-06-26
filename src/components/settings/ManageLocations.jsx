import React, { useState, useContext } from 'react';
import { LocationContext } from '../../context/LocationContext.jsx';
import Modal from '../common/Modal.jsx';

const ManageLocations = () => {
  const { locations, addLocation, updateLocation, deleteLocation } = useContext(LocationContext);
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);

  const handleOpenModal = (location = null) => {
    setCurrentLocation(location);
    setModalOpen(true);
  };

  const handleCloseModal = () => setModalOpen(false);

  const handleSave = (location) => {
    if (currentLocation) {
      updateLocation(location);
    } else {
      addLocation(location);
    }
    handleCloseModal();
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Administrar Localidades</h2>
      <button onClick={() => handleOpenModal()} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mb-4">
        Añadir Localidad
      </button>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="border-b p-4">Nombre</th>
            <th className="border-b p-4">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {locations.map((location) => (
            <tr key={location.id}>
              <td className="border-b p-4">{location.name}</td>
              <td className="border-b p-4">
                <button onClick={() => handleOpenModal(location)} className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 mr-2">
                  Editar
                </button>
                <button onClick={() => deleteLocation(location.id)} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <LocationForm location={currentLocation} onSave={handleSave} />
        </Modal>
      )}
    </div>
  );
};

const LocationForm = ({ location, onSave }) => {
  const [name, setName] = useState(location ? location.name : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ id: location ? location.id : null, name });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block mb-2">Nombre de la Localidad</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2 border rounded-md" required />
      </div>
      <div className="flex justify-end mt-4">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Guardar
        </button>
      </div>
    </form>
  );
};

export default ManageLocations;
