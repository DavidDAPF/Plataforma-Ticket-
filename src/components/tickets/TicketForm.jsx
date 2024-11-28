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



// import React, { useState, useContext, useEffect } from 'react';
// import { TicketContext } from '../../context/TicketContext';
// import { AuthContext } from '../../context/AuthContext';
// import { UserContext } from '../../context/UserContext';

// const TicketForm = ({ ticket, onSave, onClose }) => {
//   const { createTicket, updateTicket } = useContext(TicketContext);
//   const { user } = useContext(AuthContext);
//   const { users } = useContext(UserContext);

//   const [formData, setFormData] = useState({
//     id: ticket ? ticket.id : null,
//     subject: ticket ? ticket.subject : '',
//     description: ticket ? ticket.description : '',
//     type: ticket ? ticket.type : 'Software',
//     priority: ticket ? ticket.priority : 'Media',
//     status: ticket ? ticket.status : 'Nuevo',
//     assignee: ticket ? ticket.assignee : '',
//     comments: ticket ? ticket.comments : []
//   });

//   useEffect(() => {
//     if (ticket) {
//       setFormData(ticket);
//     }
//   }, [ticket]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (formData.id) {
//       updateTicket(formData);
//     } else {
//       createTicket({ ...formData, requester: user.email, creationDate: new Date() });
//     }
//     onSave();
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div className="mb-4">
//         <label className="block mb-2">Asunto</label>
//         <input
//           type="text"
//           name="subject"
//           value={formData.subject}
//           onChange={handleChange}
//           className="w-full px-4 py-2 border rounded-md"
//           required
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block mb-2">Descripción</label>
//         <textarea
//           name="description"
//           value={formData.description}
//           onChange={handleChange}
//           className="w-full px-4 py-2 border rounded-md"
//           required
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block mb-2">Tipo</label>
//         <select
//           name="type"
//           value={formData.type}
//           onChange={handleChange}
//           className="w-full px-4 py-2 border rounded-md"
//         >
//           <option value="Software">Software</option>
//           <option value="Hardware">Hardware</option>
//           <option value="Recuperación de contraseña">Recuperación de contraseña</option>
//         </select>
//       </div>
//       <div className="mb-4">
//         <label className="block mb-2">Prioridad</label>
//         <select
//           name="priority"
//           value={formData.priority}
//           onChange={handleChange}
//           className="w-full px-4 py-2 border rounded-md"
//         >
//           <option value="Alta">Alta</option>
//           <option value="Media">Media</option>
//           <option value="Baja">Baja</option>
//         </select>
//       </div>
//       <div className="mb-4">
//         <label className="block mb-2">Asignado a</label>
//         <select
//           name="assignee"
//           value={formData.assignee}
//           onChange={handleChange}
//           className="w-full px-4 py-2 border rounded-md"
//         >
//           <option value="">Seleccionar Usuario</option>
//           {users.map((user) => (
//             <option key={user.id} value={user.email}>{user.name}</option>
//           ))}
//         </select>
//       </div>
//       <div className="flex justify-end mt-4">
//         <button
//           type="submit"
//           className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
//         >
//           Guardar
//         </button>
//         <button
//           type="button"
//           onClick={onClose}
//           className="ml-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
//         >
//           Cancelar
//         </button>
//       </div>
//     </form>
//   );
// };

// export default TicketForm;
