import React from "react";
import { generatePDF as generateTicketsPDF } from "../settings/GeneratePDF";
import { generateUsersPDF } from "../settings/GenerateUsersPDF";

const ReportModal = ({ onClose, tickets, users, equipment }) => {
  const handleGenerateTickets = () => {
    if (!tickets || tickets.length === 0) {
      alert("No hay tickets disponibles para generar el informe.");
      return;
    }
    generateTicketsPDF(tickets);
    onClose();
  };

  const handleGenerateUsers = () => {
    if (!users || users.length === 0) {
      alert("No hay usuarios disponibles para generar el informe.");
      return;
    }
    generateUsersPDF(users);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-1/3">
        <h2 className="text-2xl font-bold mb-4">Generar Informe</h2>
        <p className="mb-4">Seleccione el tipo de informe que desea generar:</p>
        <div className="flex flex-col space-y-2">
          <button
            onClick={handleGenerateTickets}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Informe de Tickets
          </button>
          <button
            onClick={handleGenerateUsers}
            className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
          >
            Informe de Usuarios
          </button>
        </div>
        <button
          onClick={onClose}
          className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default ReportModal;

