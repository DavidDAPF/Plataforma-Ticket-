import React, { useState, useEffect } from 'react';
import './TicketVista.css';

function ResolucionTicket({ ticketId }) {
  const [ticketData, setTicketData] = useState(null);
  const [descripcionResolucion, setDescripcionResolucion] = useState('');
  const [fechaCierre, setFechaCierre] = useState('');
  const [equiposCambiados, setEquiposCambiados] = useState([]);

  useEffect(() => {
    // Fetch ticket data
    fetch(`/api/tickets/${ticketId}`)
      .then(response => response.json())
      .then(data => setTicketData(data));
  }, [ticketId]);

  const handleEquipoChange = (equipoId, isSelected) => {
    setEquiposCambiados(prevState => {
      if (isSelected) {
        return [...prevState, equipoId];
      } else {
        return prevState.filter(id => id !== equipoId);
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const ticketUpdateData = {
      descripcionResolucion,
      fechaCierre,
      equiposCambiados,
    };

    fetch(`/api/tickets/${ticketId}/resolver`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ticketUpdateData),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert('Ticket resuelto exitosamente');
        } else {
          alert('Error al resolver el ticket');
        }
      });
  };

  if (!ticketData) {
    return <div>Cargando datos del ticket...</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Resolución del Ticket ID: {ticketData.ticketId}</h2>
      <div>
        <strong>Nombre del Usuario:</strong> {ticketData.usuario.nombre}
      </div>
      <div>
        <strong>Dirección:</strong> {ticketData.usuario.direccion}
      </div>
      <div>
        <strong>Dirección IP:</strong> {ticketData.usuario.direccionIp}
      </div>
      <div>
        <strong>Mensaje:</strong> {ticketData.mensaje}
      </div>
      <div>
        <strong>Fecha de Creación:</strong> {new Date(ticketData.fechaCreacion).toLocaleString()}
      </div>
      <div>
        <strong>Equipos del Usuario:</strong>
        <ul>
          {ticketData.equipos.map(equipo => (
            <li key={equipo.id}>
              <input
                type="checkbox"
                id={equipo.id}
                name="equipos"
                value={equipo.id}
                onChange={(e) => handleEquipoChange(equipo.id, e.target.checked)}
              />
              <label htmlFor={equipo.id}>{equipo.nombre}</label>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <label>Descripción de la Resolución:</label>
        <textarea
          value={descripcionResolucion}
          onChange={(e) => setDescripcionResolucion(e.target.value)}
        />
      </div>
      <div>
        <label>Fecha de Cierre:</label>
        <input
          type="date"
          value={fechaCierre}
          onChange={(e) => setFechaCierre(e.target.value)}
        />
      </div>
      <button type="submit">Resolver Ticket</button>
    </form>
  );
}

export default ResolucionTicket;
