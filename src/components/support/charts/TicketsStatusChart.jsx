import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useNavigate } from 'react-router-dom';

ChartJS.register(ArcElement, Tooltip, Legend);

const TicketsStatusChart = ({ tickets }) => {
  const navigate = useNavigate();

  const statusCounts = tickets.reduce(
    (counts, ticket) => {
      counts[ticket.status] = (counts[ticket.status] || 0) + 1;
      return counts;
    },
    { Nuevo: 0, Abierto: 0, Cerrado: 0 }
  );

  const data = {
    labels: ['Nuevos', 'Abiertos', 'Cerrados'],
    datasets: [
      {
        data: [statusCounts['Nuevo'], statusCounts['Abierto'], statusCounts['Cerrado']],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const options = {
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        const label = data.labels[index];
        
        // Redirigir a la página de tickets con el filtro de estado
        navigate(`/tickets?status=${label.toLowerCase()}`);
      }
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">Estado de Tickets</h2>
      <div className="relative h-72 w-full">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default TicketsStatusChart;
