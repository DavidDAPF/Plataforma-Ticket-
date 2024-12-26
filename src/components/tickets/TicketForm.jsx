// src/components/tickets/TicketForm.jsx
import React from 'react';

const TicketForm = ({ ticketData, setTicketData, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-gray-700">Asunto:</label>
        <input
          type="text"
          id="title"
          value={ticketData.title}
          onChange={(e) => setTicketData({ ...ticketData, title: e.target.value })}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="Resumen del requerimiento"
          required
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-gray-700">Descripción del requerimiento:</label>
        <textarea
          id="description"
          value={ticketData.description}
          onChange={(e) => setTicketData({ ...ticketData, description: e.target.value })}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="Escriba su requerimiento..."
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">Tipo de requerimiento:</label>
        <select
          value={ticketData.type}
          onChange={(e) => setTicketData({ ...ticketData, type: e.target.value })}
          className="w-full px-3 py-2 border rounded-md"
          required
        >
          <option value="Software">Software</option>
          <option value="Hardware">Hardware</option>
          <option value="Cambio de contraseña">Cambio de contraseña</option>
        </select>
      </div>
      <div>
        <label className="block text-gray-700">Prioridad:</label>
        <select
          value={ticketData.priority}
          onChange={(e) => setTicketData({ ...ticketData, priority: e.target.value })}
          className="w-full px-3 py-2 border rounded-md"
          required
        >
          <option value="Alta">Alta</option>
          <option value="Media">Media</option>
          <option value="Baja">Baja</option>
        </select>
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">Enviar</button>
    </form>
  );
};

export default TicketForm;