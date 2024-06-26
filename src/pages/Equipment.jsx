import React, { useContext, useState } from 'react';
import { EquipmentContext } from '../context/EquipmentContext.jsx';
import AddEquipmentModal from '../components/equipment/AddEquipmentModal.jsx';
import EditEquipmentModal from '../components/equipment/EditEquipmentModal.jsx';
import DeleteEquipmentModal from '../components/equipment/DeleteEquipmentModal.jsx';
import EquipmentHistoryModal from '../components/equipment/EquipmentHistoryModal.jsx';

const Equipment = () => {
  const { equipmentList, addEquipment, updateEquipment, deleteEquipment } = useContext(EquipmentContext);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isHistoryModalOpen, setHistoryModalOpen] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState(null);

  const handleOpenAddModal = () => setAddModalOpen(true);
  const handleCloseAddModal = () => setAddModalOpen(false);

  const handleOpenEditModal = (item) => {
    setSelectedEquipment(item);
    setEditModalOpen(true);
  };
  const handleCloseEditModal = () => setEditModalOpen(false);

  const handleOpenDeleteModal = (item) => {
    setSelectedEquipment(item);
    setDeleteModalOpen(true);
  };
  const handleCloseDeleteModal = () => setDeleteModalOpen(false);

  const handleOpenHistoryModal = (item) => {
    setSelectedEquipment(item);
    setHistoryModalOpen(true);
  };
  const handleCloseHistoryModal = () => setHistoryModalOpen(false);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto bg-white p-6 rounded-md shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Equipos</h1>
          <button
            onClick={handleOpenAddModal}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Añadir Equipo
          </button>
        </div>
        <AddEquipmentModal isOpen={isAddModalOpen} onClose={handleCloseAddModal} onAddEquipment={addEquipment} />
        <EditEquipmentModal isOpen={isEditModalOpen} onClose={handleCloseEditModal} onEditEquipment={updateEquipment} equipment={selectedEquipment} />
        <DeleteEquipmentModal isOpen={isDeleteModalOpen} onClose={handleCloseDeleteModal} onDeleteEquipment={deleteEquipment} equipment={selectedEquipment} />
        <EquipmentHistoryModal isOpen={isHistoryModalOpen} onClose={handleCloseHistoryModal} equipment={selectedEquipment} />
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="border-b p-4">Etiqueta</th>
              <th className="border-b p-4">Marca</th>
              <th className="border-b p-4">Modelo</th>
              <th className="border-b p-4">Número de Serie</th>
              <th className="border-b p-4">Dirección IP</th>
              <th className="border-b p-4">Dirección MAC</th>
              <th className="border-b p-4">Tipo de Equipo</th>
              <th className="border-b p-4">Usuario Asignado</th>
              <th className="border-b p-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {equipmentList.map((item) => (
              <tr key={item.id}>
                <td className="border-b p-4">{item.label}</td>
                <td className="border-b p-4">{item.brand}</td>
                <td className="border-b p-4">{item.model}</td>
                <td className="border-b p-4">{item.serialNumber}</td>
                <td className="border-b p-4">{item.ipAddress}</td>
                <td className="border-b p-4">{item.macAddress}</td>
                <td className="border-b p-4">{item.type}</td>
                <td className="border-b p-4">{item.assignedUser}</td>
                <td className="border-b p-4">
                  <button
                    onClick={() => handleOpenEditModal(item)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleOpenDeleteModal(item)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 mr-2"
                  >
                    Eliminar
                  </button>
                  <button
                    onClick={() => handleOpenHistoryModal(item)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                  >
                    Historial
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Equipment;
