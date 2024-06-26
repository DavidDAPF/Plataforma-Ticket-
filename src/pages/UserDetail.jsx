// src/pages/UserDetail.jsx
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { EquipmentContext } from '../context/EquipmentContext';

const UserDetail = () => {
  const { users } = useContext(UserContext);
  const { equipmentList } = useContext(EquipmentContext);
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const foundUser = users.find(user => user.id === parseInt(userId));
    setUser(foundUser);
  }, [userId, users]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Detalles del Usuario</h1>
      <div className="bg-white p-6 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4">Información Personal</h2>
        <p><strong>Nombre:</strong> {user.name}</p>
        <p><strong>Correo Electrónico:</strong> {user.email}</p>
        <p><strong>Rol:</strong> {user.role}</p>
        <p><strong>Edad:</strong> {user.age}</p>
        <p><strong>Ubicación:</strong> {user.location}</p>
        <p><strong>Número de Teléfono:</strong> {user.phoneNumber}</p>
        <p><strong>Estatus:</strong> {user.status}</p>

        <h2 className="text-2xl font-bold mt-6 mb-4">Equipos Asignados</h2>
        <ul>
          {equipmentList.filter(e => e.assignedUser === user.name).map((equipment, index) => (
            <li key={index}>{equipment.label} - {equipment.type}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserDetail;
