export const getTickets = async () => {
  return [
    { id: 1, title: 'Problema de red', description: 'No hay conexión a internet.', status: 'abierto' },
    { id: 2, title: 'Error de software', description: 'El software se cierra inesperadamente.', status: 'cerrado' },
    { id: 3, title: 'Problema del Sati', description: 'El software se cierra inesperadamente.', status: 'abierto' },
    { id: 4, title: 'Error de software', description: 'El software se cierra inesperadamente.', status: 'cerrado' },
    { id: 5, title: 'Error de software', description: 'El software se cierra inesperadamente.', status: 'abierto' }
  ];
};

export const createNewTicket = async (ticket) => {
  // Simulación de llamada a API
  return { id: Date.now(), ...ticket, status: 'nuevo', createdAt: new Date() };
};

export const updateTicketStatus = async (ticketId, status) => {
  // Simulación de actualización de estado
  return { id: ticketId, status };
};

export const getUsers = async () => {
  return [
    { id: 1, name: 'Juan Perez', email: 'juan.perez@example.com' },
    { id: 2, name: 'Maria Gomez', email: 'maria.gomez@example.com' }
  ];
};

export const getEquipment = async () => {
  return [
    { id: 1, name: 'Laptop Dell', type: 'Laptop' },
    { id: 2, name: 'Impresora HP', type: 'Impresora' }
  ];
};
