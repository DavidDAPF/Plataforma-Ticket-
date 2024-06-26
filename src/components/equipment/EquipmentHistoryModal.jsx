import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EquipmentHistoryModal = ({ isOpen, onClose, equipment }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (equipment) {
      const fetchHistory = async () => {
        try {
          const response = await axios.get(`/api/equipment/${equipment.id}/history`);
          setHistory(response.data);
        } catch (error) {
          console.error('Error fetching equipment history:', error);
        }
      };
      fetchHistory();
    }
  }, [equipment]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Historial de Equipo</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">&times;</button>
        </div>
        <div>
          {history.length > 0 ? (
            <ul>
              {history.map((entry, index) => (
                <li key={index} className="mb-2">
                  <div><strong>Fecha:</strong> {new Date(entry.date).toLocaleString()}</div>
                  <div><strong>Acción:</strong> {entry.action}</div>
                  {entry.ticketId && <div><strong>ID del Ticket:</strong> {entry.ticketId}</div>}
                  {entry.assignedUser && <div><strong>Usuario Asignado:</strong> {entry.assignedUser}</div>}
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay historial para este equipo.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EquipmentHistoryModal;
