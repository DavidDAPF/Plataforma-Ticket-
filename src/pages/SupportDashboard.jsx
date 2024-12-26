import React, { useContext, useState } from 'react';
import { TicketContext } from '../context/TicketContext.jsx'; // Asegúrate de que la ruta es correcta
import TicketsStatusChart from '../components/support/charts/TicketsStatusChart.jsx';
import TicketsTimeChart from '../components/support/charts/TicketsTimeChart.jsx';
import OpenTicketsTable from '../components/support/tables/OpenTicketsTable.jsx';
import TicketsByUserTable from '../components/support/tables/TicketsByUserTable.jsx';
import TicketsPriorityChart from '../components/support/charts/TicketsPriorityChart.jsx';
import TicketsClosedByTechnicianChart from '../components/support/charts/TicketsClosedByTechnicianChart.jsx';
import TicketsTypeChart from '../components/support/charts/TicketsTypeChart.jsx';
import TicketsByLocationChart from '../components/support/charts/TicketsByLocationChart.jsx';
import ReportModal from '../components/settings/ReportModal.jsx';
import { generateEquipmentPDF } from '../components/settings/GenerateEquipmentPDF.jsx';
import { generateUsersPDF } from '../components/settings/GenerateUsersPDF.jsx';
import { UserContext } from '../context/UserContext.jsx';
import { EquipmentContext } from '../context/EquipmentContext.jsx';


const SupportDashboard = () => {
  const { tickets } = useContext(TicketContext);
  const {users} = useContext(UserContext);
  const {equipment} = useContext(EquipmentContext);

  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const handleOpenModal = () => setIsReportModalOpen(true);
  const handleCloseModal = () => setIsReportModalOpen(false);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto bg-white p-6 rounded-md shadow-md">
        {/* <h1 className="text-3xl font-bold mb-6">Dashboard de Soporte</h1> */}

        {/* Título con Botón */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dashboard de Soporte</h1>
          <button
            onClick={handleOpenModal}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Generar Informe
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TicketsStatusChart tickets={tickets} />
          <TicketsTimeChart tickets={tickets} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <TicketsPriorityChart tickets={tickets} />
          <TicketsClosedByTechnicianChart tickets={tickets} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <TicketsTypeChart tickets={tickets} />
          <TicketsByLocationChart tickets={tickets} />
        </div>
        <div className="mt-6">
          <OpenTicketsTable tickets={tickets} />
        </div>
        <div className="mt-6">
          <TicketsByUserTable tickets={tickets} />
        </div>
      </div>

      {/* Modal para Generar Reportes */}
      {isReportModalOpen && <ReportModal 
        onClose={handleCloseModal}
        tickets={tickets}
        users={users}
        equipment={equipment} />}
    </div>
  );
};

export default SupportDashboard;
