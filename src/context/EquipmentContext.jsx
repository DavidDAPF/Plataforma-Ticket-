import React, { createContext, useState } from 'react';

export const EquipmentContext = createContext();

export const EquipmentProvider = ({ children }) => {
  const [equipmentList, setEquipmentList] = useState([]);

  const addEquipment = (equipment) => {
    setEquipmentList([...equipmentList, { ...equipment, id: Date.now() }]);
  };

  const updateEquipment = (updatedEquipment) => {
    setEquipmentList(equipmentList.map((item) => (item.id === updatedEquipment.id ? updatedEquipment : item)));
  };

  const deleteEquipment = (equipmentId) => {
    setEquipmentList(equipmentList.filter((item) => item.id !== equipmentId));
  };

  return (
    <EquipmentContext.Provider value={{ equipmentList, addEquipment, updateEquipment, deleteEquipment }}>
      {children}
    </EquipmentContext.Provider>
  );
};
