// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const EquipmentHistoryModal = ({ isOpen, onClose, equipment }) => {
//   const [history, setHistory] = useState([]);
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     if (equipment && equipment._id) {
//       const fetchHistory = async () => {
//         setIsLoading(true); // Comienza la carga del historial
//         try {
//           const response = await axios.get(`/api/equipment/${equipment.id}/history`);
//           setHistory(response.data);
//         } catch (error) {
//           console.error('Error fetching equipment history:', error);
//           setError("No se pudo cargar el historial del equipo");
//         } finally {
//           setIsLoading(false); // finaliza la carga
//         }
//       };
//       fetchHistory();
//     }
//   }, [equipment]);

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ">
//       <div className="bg-white p-6 rounded-md shadow-md w-full max-w-lg overflow-y-auto max-h-[80vh]">
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-lg font-semibold">Historial de Equipo</h3>
//           <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-3xl ">&times;</button>
//         </div>
//         <div>
//           {isLoading ? (
//             <p className='text-blue-500'>Cargando Historial...</p>
//           ): error? ( 
//             <p className='text-red-500 mb-4' >{error}</p>
//           ): history.length > 0 ? (
//             <ul>
//             {history.map((entry, index) => (
//               <li key={index} className="mb-2">
//                 <div><strong>Fecha:</strong> {new Date(entry.date).toLocaleString()}</div>
//                 <div><strong>Acción:</strong> {entry.action}</div>
//                 {entry.ticketId && <div><strong>ID del Ticket:</strong> {entry.ticketId}</div>}
//                 {entry.assignedUser && 
//                   (
//                   <div>
//                     <strong>Usuario Asignado:</strong> 
//                     {entry.assignedUser.name || entry.assignedUser }
//                   </div>
//                   )}
//               </li>
//             ))}
//           </ul>          
//           ) : (
//             <p>No hay historial para este equipo.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EquipmentHistoryModal;

import React from 'react';

const EquipmentHistoryModal = ({ isOpen, onClose, history }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Historial del Equipo</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">&times;</button>
        </div>
        {history && history.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {history.map((entry, index) => (
              <li key={entry._id || index} className="py-2">
                <p><strong>Acción:</strong> {entry.action}</p>
                <p><strong>Realizado por:</strong> {entry.performedBy}</p>
                <p><strong>Estado previo:</strong> {entry.previousState || 'N/A'}</p>
                <p><strong>Estado actual:</strong> {entry.currentState || 'N/A'}</p>
                <p><strong>Fecha:</strong> {new Date(entry.date).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay historial disponible.</p>
        )}
      </div>
    </div>
  );
};

export default EquipmentHistoryModal;
