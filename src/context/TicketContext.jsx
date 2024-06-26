// src/context/TicketContext.jsx
import React, { createContext, useState, useEffect } from 'react';

export const TicketContext = createContext();

export const TicketProvider = ({ children }) => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    // Generar tickets de prueba
    const sampleTickets = [
      { id: 1, summary: 'Problema de Software', description: 'No puedo abrir el programa', type: 'Software', priority: 'Alta', status: 'Nuevo', requester: 'user1@example.com' },
      { id: 2, summary: 'Problema de Hardware', description: 'La impresora no funciona', type: 'Hardware', priority: 'Media', status: 'Abierto', requester: 'user2@example.com' },
      { id: 3, summary: 'Cambio de Contraseña', description: 'Necesito cambiar mi contraseña', type: 'Cambio de contraseña', priority: 'Baja', status: 'Cerrado', requester: 'user3@example.com' }
    ];
    setTickets(sampleTickets);
  }, []);

  const createTicket = (ticket) => {
    setTickets([...tickets, { ...ticket, id: Date.now(), comments: [] }]);
  };

  const updateTicket = (updatedTicket) => {
    setTickets(
      tickets.map((ticket) =>
        ticket.id === updatedTicket.id ? updatedTicket : ticket
      )
    );
  };

  return (
    <TicketContext.Provider value={{ tickets, createTicket, updateTicket }}>
      {children}
    </TicketContext.Provider>
  );
};
