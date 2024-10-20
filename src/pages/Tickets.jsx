// //pages/Tickets.jsx
// import React, { useContext, useState } from 'react';
// import { TicketContext } from '../context/TicketContext.jsx';
// import ResolveTicketModal from '../components/tickets/ResolveTicketModal.jsx';

// const Tickets = () => {
//   const { tickets, setTickets } = useContext(TicketContext);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterStatus, setFilterStatus] = useState('All');
//   const [filterType, setFilterType] = useState('All');
//   const [selectedTicket, setSelectedTicket] = useState(null);
//   const [isModalOpen, setModalOpen] = useState(false);
//   const [sortColumn, setSortColumn] = useState('');
//   const [sortDirection, setSortDirection] = useState('asc');

//   const handleSearchChange = (e) => setSearchTerm(e.target.value);
//   const handleStatusChange = (e) => setFilterStatus(e.target.value);
//   const handleTypeChange = (e) => setFilterType(e.target.value);

//   const handleResolveClick = (ticket) => {
//     setSelectedTicket(ticket);
//     setModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setModalOpen(false);
//     setSelectedTicket(null);
//   };

//   const handleResolveTicket = (ticketId, solution, closureDate, assignedEquipment) => {
//     setTickets((prevTickets) =>
//       prevTickets.map((ticket) =>
//         ticket.id === ticketId
//           ? { ...ticket, status: 'Cerrado', solution, closureDate, assignedEquipment }
//           : ticket
//       )
//     );
//   };

//   const handleSort = (column) => {
//     if (sortColumn === column) {
//       setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
//     } else {
//       setSortColumn(column);
//       setSortDirection('asc');
//     }
//   };

//   const sortTickets = (tickets) => {
//     return [...tickets].sort((a, b) => {
//       if (a[sortColumn] < b[sortColumn]) {
//         return sortDirection === 'asc' ? -1 : 1;
//       }
//       if (a[sortColumn] > b[sortColumn]) {
//         return sortDirection === 'asc' ? 1 : -1;
//       }
//       return 0;
//     });
//   };

//   const filteredTickets = tickets.filter((ticket) => {
//     return (
//       (filterStatus === 'All' || ticket.status === filterStatus) &&
//       (filterType === 'All' || ticket.type === filterType) &&
//       ticket.summary.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   });

//   const sortedTickets = sortColumn ? sortTickets(filteredTickets) : filteredTickets;

//   const calculateOpenTime = (creationDate) => {
//     const currentTime = new Date();
//     const creationTime = new Date(creationDate);
//     const timeDiff = currentTime - creationTime;

//     const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
//     const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

//     return `${days} días, ${hours} horas`;
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="container mx-auto bg-white p-6 rounded-md shadow-md">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-3xl font-bold">Solicitudes</h1>
//           <div className="flex items-center">
//             <input
//               type="text"
//               value={searchTerm}
//               onChange={handleSearchChange}
//               placeholder="Buscar solicitudes..."
//               className="px-4 py-2 border rounded-md"
//             />
//             <select
//               value={filterStatus}
//               onChange={handleStatusChange}
//               className="ml-4 px-4 py-2 border rounded-md"
//             >
//               <option value="All">Todos los estados</option>
//               <option value="Nuevo">Nuevo</option>
//               <option value="Abierto">Abierto</option>
//               <option value="Cerrado">Cerrado</option>
//             </select>
//             <select
//               value={filterType}
//               onChange={handleTypeChange}
//               className="ml-4 px-4 py-2 border rounded-md"
//             >
//               <option value="All">Todos los tipos</option>
//               <option value="Software">Software</option>
//               <option value="Hardware">Hardware</option>
//               <option value="Recuperación de contraseña">Recuperación de contraseña</option>
//             </select>
//           </div>
//         </div>
//         <table className="w-full text-left border-collapse">
//           <thead>
//             <tr>
//               <th className="border-b p-4 cursor-pointer" onClick={() => handleSort('summary')}>Resumen</th>
//               <th className="border-b p-4 cursor-pointer" onClick={() => handleSort('status')}>Estado</th>
//               <th className="border-b p-4 cursor-pointer" onClick={() => handleSort('requester')}>Solicitante</th>
//               <th className="border-b p-4 cursor-pointer" onClick={() => handleSort('priority')}>Prioridad</th>
//               <th className="border-b p-4 cursor-pointer" onClick={() => handleSort('channel')}>Canal</th>
//               <th className="border-b p-4 cursor-pointer" onClick={() => handleSort('type')}>Tipo</th>
//               <th className="border-b p-4 cursor-pointer" onClick={() => handleSort('creationDate')}>Fecha de Creación</th>
//               <th className="border-b p-4 cursor-pointer" onClick={() => handleSort('closureDate')}>Fecha de Cierre</th>
//               <th className="border-b p-4">Tiempo Abierto</th>
//               <th className="border-b p-4">Acciones</th>
//             </tr>
//           </thead>
//           <tbody>
//             {sortedTickets.map((ticket) => (
//               <tr key={ticket.id}>
//                 <td className="border-b p-4">{ticket.summary}</td>
//                 <td className={`border-b p-4 ${ticket.status === 'Abierto' ? 'text-blue-500' : ticket.status === 'Nuevo' ? 'text-gray-500' : 'text-green-500'}`}>{ticket.status}</td>
//                 <td className="border-b p-4">{ticket.requester}</td>
//                 <td className={`border-b p-4 ${ticket.priority === 'Alta' ? 'text-red-500' : ticket.priority === 'Media' ? 'text-yellow-500' : 'text-green-500'}`}>{ticket.priority}</td>
//                 <td className="border-b p-4">{ticket.channel}</td>
//                 <td className="border-b p-4">{ticket.type}</td>
//                 <td className="border-b p-4">{ticket.creationDate}</td>
//                 <td className="border-b p-4">{ticket.closureDate || 'NA'}</td>
//                 <td className="border-b p-4">{ticket.status === 'Abierto' ? calculateOpenTime(ticket.creationDate) : 'NA'}</td>
//                 <td className="border-b p-4">
//                   <button
//                     onClick={() => handleResolveClick(ticket)}
//                     className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
//                   >
//                     Resolver
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <ResolveTicketModal
//         isOpen={isModalOpen}
//         onClose={handleCloseModal}
//         ticket={selectedTicket}
//         onResolve={handleResolveTicket}
//       />
//     </div>
//   );
// };

// export default Tickets;

import React, { useState, useContext } from 'react';
import { TicketContext } from '../context/TicketContext.jsx';

const CreateTicket = () => {
  const { createTicket } = useContext(TicketContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Media');
  const [type, setType] = useState('Software');
  const [assignedTo, setAssignedTo] = useState(''); // Nuevo estado para asignar

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createTicket({ title, description, priority, type, assignedTo });
    setTitle('');
    setDescription('');
    setAssignedTo(''); // Limpiar el campo
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
            <option value="Recuperación de contraseña">Recuperación de contraseña</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Asignar a</label>
          <input
            type="text"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            placeholder="Correo del usuario (opcional)"
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Crear
        </button>
      </form>
    </div>
  );
};

export default CreateTicket;

