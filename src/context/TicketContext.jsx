// src/context/TicketContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext.jsx';
import { toast } from 'react-toastify';

export const TicketContext = createContext();


export const TicketProvider = ({ children }) => {
  const [tickets, setTickets] = useState([]);
  //const [error, setError] = useState(null);
  const {user} = useContext(AuthContext);

  const fetchTickets = async () => {
    try {
      const token = localStorage.getItem('token'); // Obtén el token del localStorage
      if (!token) {
        toast.error('No se encontro el token, por favor inicie sesion')
        throw new Error('No se encontró el token. Por favor, inicia sesión.');
        
      }
  
      const response = await axios.get('http://localhost:5000/api/tickets', {
        headers: {
          Authorization: `Bearer ${token}`, // Adjunta el token a la cabecera de autorización
        },
      });
  
      //console.log('Datos obtenidos de /api/tickets:', response.data); // Agregar este log
      setTickets(response.data); // Actualiza el estado con los tickets
      //console.log('Tickets cargados correctamente'); // Mensaje en consola (opcional)
      // Mueve el toast fuera del bucle infinito
    } catch (error) {
      toast.error('Error cargando tickets. Verifica tu sesión.');
      console.error('Error fetching tickets:', error);
      
    }
  };
  
  useEffect(() => {
    fetchTickets(); // Llama a fetchTickets al montar el componente
  }, []); // El array vacío asegura que se ejecuta solo una vez
  
  const createTicket = async (ticketData) => {
    try {
      //const token = localStorage.getItem('token'); // Obtén el token desde localStorage
      const response = await axios.post('http://localhost:5000/api/tickets', ticketData, {
        headers: {
          //Authorization: `Bearer ${token}`, // Asegúrate de enviar el token en el encabezado
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      await fetchTickets();
      //setTickets((prevTickets) => [...prevTickets, response.data]);
    } catch (error) {
      console.error('Error creating ticket:', error);
      toast.error('Hubo un error al crear el ticket por favor llame a soporte', error)
      throw error;
    }
  };
  
  const updateTicket = async (id, { comment, userRole, newStatus }) => {
    try {
      // Preparar el payload con la lógica condicional
      const payload = { comment };
  
      if (userRole === 'Usuario') {
        // Si el usuario reabre el ticket
        payload.status = 'Abierto';
      } else if (userRole === 'Soporte') {
        // Si el técnico cierra el ticket
        payload.status = newStatus || 'Cerrado'; // Por defecto, el estado será 'Cerrado'
      }
  
      // Enviar la actualización al backend
      const response = await axios.put(
        `http://localhost:5000/api/tickets/${id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
  
      // Actualizar el estado de los tickets en el frontend
      setTickets((prevTickets) =>
        prevTickets.map((ticket) => (ticket._id === id ? response.data : ticket))
      );
  
      alert('Ticket actualizado correctamente');
    } catch (error) {
      console.error('Error updating ticket:', error);
      toast.error('Error al actualizar el ticket')
      throw error;
    }
  };
  

  useEffect(() => {
    if (user) {
      fetchTicketsByUser(user._id);
    }
  }, [user]);


  const fetchTicketsByUser = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/tickets/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setTickets(response.data);
    } catch (error) {
      console.error('Error fetching tickets by user:', error);
    }
  };

  const addEquipmentToTicket = async (ticketId, equipmentId) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/tickets/${ticketId}/equipment`, 
        { equipmentId },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      setTickets((prevTickets) =>
        prevTickets.map((ticket) =>
          ticket._id === ticketId ? response.data : ticket
        )
      );
    } catch (error) {
      console.error('Error adding equipment to ticket:', error);
      throw error;
    }
  };
  
  const removeEquipmentFromTicket = async (ticketId, equipmentId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/tickets/${ticketId}/equipment/${equipmentId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      setTickets((prevTickets) =>
        prevTickets.map((ticket) =>
          ticket._id === ticketId ? response.data : ticket
        )
      );
    } catch (error) {
      console.error('Error removing equipment from ticket:', error);
      throw error;
    }
  };
  
  const fetchTechnicians = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users/role/Soporte', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      console.log(response.data); // Aquí están los técnicos disponibles
      return response.data; // Devuelve los técnicos
    } catch (error) {
      console.error('Error fetching technicians:', error);
      throw error; // Lanza el error para manejarlo más arriba si es necesario
      toast.error('Error en el fetch te Tecnicos')
    }
  };

  const reopenTicket = async (ticketId, comment) => {
    try {
      const { data } = await axios.put(`http://localhost:5000/api/tickets/${ticketId}/reopen`,
        { comment },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      // Actualizar el estado de los tickets si es necesario
      setTickets((prevTickets) =>
        prevTickets.map((ticket) =>
          ticket._id === data.ticket._id ? data.ticket : ticket
        )
      );
  
      alert('Ticket reabierto correctamente');
    } catch (error) {
      console.error('Error al reabrir el ticket:', error);
      toast.error('Hubo un problema al intentar reabrir el ticket.');
    }
  };

  const closeTicket = async (ticketId, comment) => {
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/tickets/${ticketId}/close`,
        { response: comment }, // El comentario para cerrar el ticket
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
  
      // Actualiza la lista de tickets localmente
      setTickets((prevTickets) =>
        prevTickets.map((ticket) =>
          ticket._id === data._id ? data : ticket
        )
      );
  
      toast.success('El ticket se cerró correctamente.');
      return data;
    } catch (error) {
      console.error('Error al cerrar el ticket:', error);
      toast.error('Hubo un problema al cerrar el ticket.');
    }
  };
  
  
  
  return (
    <TicketContext.Provider 
      value={{ 
        tickets,
        setTickets,
        fetchTickets,
        createTicket,
        updateTicket,
        fetchTicketsByUser,
        addEquipmentToTicket,
        removeEquipmentFromTicket,
        fetchTechnicians,
        closeTicket,
        reopenTicket}}>
      {children}
    </TicketContext.Provider>
  );
};
