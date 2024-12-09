import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { useNavigate } from 'react-router-dom';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const TicketsClosedByTechnicianChart = ({ tickets }) => {
  const navigate = useNavigate();

  const technicianCounts = tickets.reduce((counts, ticket) => {
    if (ticket.status === 'Cerrado' && ticket.technician) {
      counts[ticket.technician] = (counts[ticket.technician] || 0) + 1;
    }
    return counts;
  }, {});

  const data = {
    labels: Object.keys(technicianCounts),
    datasets: [
      {
        label: 'Tickets Cerrados',
        data: Object.values(technicianCounts),
        backgroundColor: '#4CAF50',
      },
    ],
  };

  const options = {
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        const label = data.labels[index];
        
        // Redirigir a la página de tickets con el filtro de técnico
        navigate(`/tickets?technician=${label.toLowerCase()}`);
      }
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">Tickets Cerrados por Técnico</h2>
      <div className="relative h-72 w-full">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default TicketsClosedByTechnicianChart;