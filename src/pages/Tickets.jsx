import React, { useState, useContext, useEffect } from 'react';
import { TicketContext } from '../context/TicketContext.jsx';
import axios from 'axios';

const CreateTicket = () => {
  const { createTicket } = useContext(TicketContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Media');
  const [type, setType] = useState('Software');
  const [assignedTo, setAssignedTo] = useState(''); // Nuevo estado para asignar
  const [technicians, setTechnicians] = useState([]); //Estado para los tecnicos disponibles

  // // Cargar técnicos disponibles desde el backend
  // useEffect(() => {
  //   const fetchTechnicians = async () => {
  //     try {
  //       const { data } = await axios.get('http://localhost:5000/api/users?role=Soporte', {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem('token')}`,
  //         },
  //       });
  //       setTechnicians(response.data);
  //     } catch (error) {
  //       console.error('Error fetching technicians:', error);
  //     }
  //   };

  //   fetchTechnicians();
  // }, []);

  // const Tickets = () => {
  //   const [technicians, setTechnicians] = useState([]);
  //   const [error, setError] = useState(null);
  
    useEffect(() => {
      const loadTechnicians = async () => {
        try {
          const techs = await fetchTechnicians(); // Llama a la función corregida
          setTechnicians(techs); // Guarda los técnicos en el estado
        } catch (err) {
          setError('Error al cargar los técnicos');
        }
      };
  
      loadTechnicians(); // Ejecuta la carga de técnicos
    }, []);
  
    const fetchTechnicians = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/role/Soporte', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        console.log(response.data);
        return response.data; // Devuelve los técnicos obtenidos
      } catch (error) {
        console.error('Error fetching technicians:', error);
        throw error;
      }
    };


  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   await createTicket({ title, description, priority, type, assignedTo });
  //   setTitle('');
  //   setDescription('');
  //   setAssignedTo(''); // Limpiar el campo
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log({
      title,
      description,
      priority,
      type,
      assignedTo,
    }); // Verifica estos datos en la consola antes de enviarlos
  
    try {
      await createTicket({ title, description, priority, type, assignedTo });
      setTitle('');
      setDescription('');
      setAssignedTo('');
    } catch (error) {
      console.error('Error al crear ticket:', error);
    }
  };
  

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Crear Ticket</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Título</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Descripción</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Prioridad</label>
          <select
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
          <label className="block mb-2">Tipo</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          >
            <option value="Software">Software</option>
            <option value="Hardware">Hardware</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Asignar a</label>
            <select 
              value={assignedTo}
              onChange={(e)=>setAssignedTo(e.target.value)}
              className='w-full px-4 py-2 border rounded-md'>
                <option value=''>Seleccionar Tecnico/</option>
                  {technicians.map((tech)=>(
                    <option key={tech._id} value={tech._id}>
                      {tech.name}
                    </option >
                  ))}
              </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Crear
        </button>
      </form>
    </div>
  );
};

export default CreateTicket;

