import React, { useContext, useEffect } from 'react';
import { EquipmentContext } from '../../context/EquipmentContext.jsx';

const EquipmentList = () => {
  const { equipment, fetchEquipment } = useContext(EquipmentContext);

  useEffect(() => {
    fetchEquipment();
  }, [fetchEquipment]);

  return (
    <div className="equipment-list">
      {equipment.length > 0 ? (
        <ul>
          {equipment.map((item) => (
            <li key={item.id}>
              <strong>{item.name}</strong>
              <p>{item.type}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay equipos disponibles</p>
      )}
    </div>
  );
};

export default EquipmentList;
