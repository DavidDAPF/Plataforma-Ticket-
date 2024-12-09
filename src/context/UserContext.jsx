//UserContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = 'http://localhost:5000/api/users'; // Cambia según tu configuración.
  const API_URL_AUTH = 'http://localhost:5000/api/auth/register/';

  // Obtener el token desde el almacenamiento local
  const getToken = () => localStorage.getItem('token'); // Cambia si usas otro lugar para guardar el token.

  // Cargar usuarios desde el backend
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = getToken();
      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
    } catch (err) {
      setError(err.message || 'Error al cargar los usuarios');
    } finally {
      setLoading(false);
    }
  };

  const fetchTechnicians = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users/role/Soporte', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return response.data; // Devuelve la lista de técnicos
    } catch (error) {
      console.error('Error fetching technicians:', error);
      throw error;
    }
  };
  

  // Agregar un usuario
  // const addUser = async (user) => {
  //   try {
  //     const token = getToken();
  //     const response = await axios.post( API_URL_AUTH, user, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     setUsers([...users, response.data]);
  //   } catch (err) {
  //     setError(err.message || 'Error al agregar el usuario');
  //   }
  // };

  const addUser = async (user) => {
    try {
      const response = await axios.post(API_URL_AUTH, user, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
  
      //const newUser = response.data; // Usuario completo devuelto por el backend
      await fetchUsers();
      //setUsers((prevUsers) => [...prevUsers, newUser]);
  
      toast.success('Usuario creado exitosamente.');
    } catch (error) {
      console.error('Error al crear usuario:', error);
      toast.error('Error al crear usuario.');
    }
  };
  

  // Actualizar un usuario
  const updateUser = async (updatedUser) => {
    try {
      const token = getToken();
      const response = await axios.put(`${API_URL}/${updatedUser._id}`, updatedUser, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(
        users.map((user) =>
          user._id === updatedUser._id ? response.data : user
        )
      );
    } catch (err) {
      setError(err.message || 'Error al actualizar el usuario');
    }
  };

  // Eliminar un usuario
  const deleteUser = async (userId) => {
    try {
      const token = getToken();
      await axios.delete(`${API_URL}/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.filter((user) => user._id !== userId));
    } catch (err) {
      setError(err.message || 'Error al eliminar el usuario');
    }
  };

  const getUserById = async (id) => {
    try {
      const token = getToken();
      const response = await axios.get(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data; // Devolver los datos del usuario
    } catch (err) {
      console.error('Error al obtener usuario por ID:', err.response?.data || err.message);
      throw err;
    }
  };
  

  // Cargar usuarios al montar el componente
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <UserContext.Provider
      value={{
        users,
        loading,
        error,
        addUser,
        updateUser,
        deleteUser,
        fetchUsers,
        getUserById,
        fetchTechnicians
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
