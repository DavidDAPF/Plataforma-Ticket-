import React, { useState, useContext } from 'react';
import { TicketContext } from '../context/TicketContext.jsx';
import { useNavigate } from 'react-router-dom';

const CreateTicket = () => {
  const { createTicket } = useContext(TicketContext);
  const [ summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Media');
  const [type, setType] = useState('Software');
  const [assignedTo, setAssignedTo] = useState(''); // Nuevo estado para asignar
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log({ title:summary, description, priority, type, assignedTo });
      await createTicket({ summary, description, priority, type, assignedTo });
      setSummary('');
      setDescription('');
      setAssignedTo('');
      navigate('/my-tickets');
    } catch (error) {
      console.error('Error creando el ticket:', error);
    }
  };
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Crear Ticket</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor='summary' className="block mb-2">Título</label>
          <input
            type="text"
            id='summary'
            name='summary'
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
            required
            autoComplete='off'
          />
        </div>
        <div className="mb-4">
          <label htmlFor='description' className="block mb-2">Descripción</label>
          <textarea
            id='description'
            name='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor='priority' className="block mb-2">Prioridad</label>
          <select
            id='priority'
            name='priority'
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          >
            <option value="Alta">Alta</option>
            <option value="Media">Media</option>
            <option value="Baja">Baja</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor='type' className="block mb-2">Tipo</label>
          <select
            id='type'
            name='type'
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          >
            <option value="Software">Software</option>
            <option value="Hardware">Hardware</option>
            <option value="Recuperación de contraseña">Recuperación de contraseña</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor='assignedTo' className="block mb-2">Asignar a</label>
          <input
            type="text"
            id='assignedTo'
            name='assignedTo'
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            placeholder="Correo del usuario (opcional)"
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Crear
        </button>
        <button
          type="button"
          onClick={() => navigate('/my-tickets')}
          className="ml-4 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
        >
          Ver Mis Tickets
        </button>
      </form>
    </div>
  );
};

export default CreateTicket;
