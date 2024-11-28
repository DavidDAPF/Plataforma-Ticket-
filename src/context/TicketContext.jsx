// src/context/TicketContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext.jsx';

//import { TicketContext} from '/home/david/Documentos/TESIS-CODIGO/primera-tesis/src/context/'
export const TicketContext = createContext();


export const TicketProvider = ({ children }) => {
  const [tickets, setTickets] = useState([]);
  //const { token, user } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const { loading, user} = useContext(AuthContext);

  // const fetchTickets = async () => {
  //   //if (token) {
  //     try {
  //       const response = await axios.get('http://localhost:5000/api/tickets', {
  //         headers: {
  //           //Authorization: `Bearer ${token}`
  //           Authorization: `Bearer ${localStorage.getItem('token')}`,
  //         }
  //       });
  //       setTickets(response.data);
  //     } catch (error) {
  //       console.error('Error fetching tickets:', error);
  //     }
  //   //}
  // };
  const fetchTickets = async () => {
    if (!user) return; // Asegúrate de que el usuario esté autenticado
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };
      const { data } = await axios.get('http://localhost:5000/api/tickets', config);
      setTickets(data);
    } catch (error) {
      console.error('Error fetching tickets:', error);
      setError('No se pudieron cargar los tickets.');
    }
  };

  // useEffect(() => {
  //   fetchTickets();
  // }, [token]);

  useEffect(() => {
    if (!loading) {
      fetchTickets();
    }
  }, [loading, user]); // Solo intenta cargar tickets si el usuario está autenticado

  const createTicket = async (ticketData) => {
    try {
      const token = localStorage.getItem('token'); // Obtén el token desde localStorage
      const response = await axios.post('http://localhost:5000/api/tickets', ticketData, {
        headers: {
          //Authorization: `Bearer ${token}`, // Asegúrate de enviar el token en el encabezado
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setTickets((prevTickets) => [...prevTickets, response.data]);
    } catch (error) {
      console.error('Error creating ticket:', error);
      throw error;
    }
  };
  

  const updateTicket = async (id, updatedTicket) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/tickets/${id}`, updatedTicket, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTickets(tickets.map(ticket => (ticket._id === id ? response.data : ticket)));
    } catch (error) {
      console.error('Error updating ticket:', error);
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

  return (
    <TicketContext.Provider value={{ tickets,setTickets, fetchTickets, createTicket, updateTicket, fetchTicketsByUser }}>
      {children}
    </TicketContext.Provider>
  );
};
