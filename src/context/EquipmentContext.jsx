import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const EquipmentContext = createContext();

const EquipmentProvider = ({ children }) => {
  const [equipmentList, setEquipmentList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchEquipment = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/equipment', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      const data = Array.isArray(response.data) ? response.data : JSON.parse(response.data);
      console.log('Equipos cargados:', data); // Verifica que aquí sea un array
      setEquipmentList(data);
      } catch (error) {
        console.error('Error fetching equipment:', error);
        if (error.response && error.response.status === 401) {
          // Manejo de sesión expirada o no autorizada
          console.warn('Token no válido o sesión expirada.');
          localStorage.removeItem('token'); // Opcional: eliminar el token
          setEquipmentList([]); // Limpia la lista si no hay acceso
        }
        setEquipmentList([]); // Maneja errores inicializando como vacío
      } finally {
      setLoading(false);
    }
  };
  
  
  

  // Crear un equipo
  const addEquipment = async (equipmentData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/equipment', equipmentData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setEquipmentList((prev) => [...prev, response.data]);
    } catch (error) {
      console.error('Error adding equipment:', error);
    }
  };

  const updateEquipment = async (id, updatedData) => {
    try {
        const response = await axios.put(`http://localhost:5000/api/equipment/${id}`, updatedData, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });

        const updatedEquipment = response.data; // El equipo actualizado devuelto por el backend

        // Actualiza el estado de equipmentList
        setEquipmentList((prevList) =>
            prevList.map((item) =>
                item._id === updatedEquipment._id ? updatedEquipment : item
            )
        );

        console.log("Equipo Actualizado: ",updateEquipment);

    } catch (error) {
        console.error('Error updating equipment:', error);
    }
};


  
  

  // Eliminar un equipo
  const deleteEquipment = async (equipmentId) => {
    try {
      await axios.delete(`http://localhost:5000/api/equipment/${equipmentId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setEquipmentList((prev) => prev.filter((item) => item._id !== equipmentId));
    } catch (error) {
      console.error('Error deleting equipment:', error);
    }
  };


    // Función para asignar un equipo a un usuario
    const assignEquipment = async (equipmentId, userId) => {
      try {
        await axios.post(
          'http://localhost:5000/api/equipment/assign',
          { equipmentId, userId },
          {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          }
        );
        fetchEquipment(); // Refresca la lista después de asignar
      } catch (error) {
        console.error('Error assigning equipment:', error);
      }
    };

  // useEffect(() => {
  //   fetchEquipment();
  // }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchEquipment();
    } else {
      console.warn('No hay token disponible. El usuario no está autenticado.');
      setEquipmentList([]); // Opcional: limpia la lista si no hay token
    }
  }, []);

  return (
    <EquipmentContext.Provider
      value={{ equipmentList, addEquipment, updateEquipment, deleteEquipment, assignEquipment, loading }}
    >
      {children}
    </EquipmentContext.Provider>
  );
};

export default EquipmentProvider;


