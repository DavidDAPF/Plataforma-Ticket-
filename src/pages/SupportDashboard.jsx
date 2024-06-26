import React, { useContext } from 'react';
import { TicketContext } from '../context/TicketContext.jsx'; // Asegúrate de que la ruta es correcta
import TicketsStatusChart from '../components/support/charts/TicketsStatusChart.jsx';
import TicketsTimeChart from '../components/support/charts/TicketsTimeChart.jsx';
import OpenTicketsTable from '../components/support/tables/OpenTicketsTable.jsx';
import TicketsByUserTable from '../components/support/tables/TicketsByUserTable.jsx';
import TicketsPriorityChart from '../components/support/charts/TicketsPriorityChart.jsx';
import TicketsClosedByTechnicianChart from '../components/support/charts/TicketsClosedByTechnicianChart.jsx';
import TicketsTypeChart from '../components/support/charts/TicketsTypeChart.jsx';
import TicketsByLocationChart from '../components/support/charts/TicketsByLocationChart.jsx';

const SupportDashboard = () => {
  const { tickets } = useContext(TicketContext);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto bg-white p-6 rounded-md shadow-md">
        <h1 className="text-3xl font-bold mb-6">Dashboard de Soporte</h1>
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
    </div>
  );
};

export default SupportDashboard;
