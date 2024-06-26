import React, { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import Modal from '../common/Modal.jsx';

const GenerateReportModal = ({ isOpen, onClose }) => {
  const [reportType, setReportType] = useState('');

  const handleGenerateReport = () => {
    if (reportType === 'tickets') {
      generateTicketsReport();
    } else if (reportType === 'equipos') {
      generateEquiposReport();
    } else if (reportType === 'usuarios') {
      generateUsuariosReport();
    }
    onClose();
  };

  const generateTicketsReport = () => {
    // Lógica para generar informe de tickets
    const doc = new jsPDF();
    doc.text('Informe de Tickets', 20, 20);
    doc.save('informe_tickets.pdf');
  };

  const generateEquiposReport = () => {
    // Lógica para generar informe de equipos
    const doc = new jsPDF();
    doc.text('Informe de Equipos', 20, 20);
    doc.save('informe_equipos.pdf');
  };

  const generateUsuariosReport = () => {
    // Lógica para generar informe de usuarios
    const doc = new jsPDF();
    doc.text('Informe de Usuarios', 20, 20);
    doc.save('informe_usuarios.pdf');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div>
        <h2 className="text-2xl font-bold mb-4">Generar Informe</h2>
        <select
          value={reportType}
          onChange={(e) => setReportType(e.target.value)}
          className="w-full px-4 py-2 border rounded-md mb-4"
        >
          <option value="">Seleccionar tipo de informe</option>
          <option value="tickets">Informe de Tickets</option>
          <option value="equipos">Informe de Equipos</option>
          <option value="usuarios">Informe de Usuarios</option>
        </select>
        <button
          onClick={handleGenerateReport}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Generar Informe
        </button>
      </div>
    </Modal>
  );
};

export default GenerateReportModal;
