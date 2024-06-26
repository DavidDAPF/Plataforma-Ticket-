import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { useNavigate } from 'react-router-dom';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const TicketsTypeChart = ({ tickets }) => {
  const navigate = useNavigate();

  const typeCounts = tickets.reduce(
    (counts, ticket) => {
      counts[ticket.type] = (counts[ticket.type] || 0) + 1;
      return counts;
    },
    { Hardware: 0, Software: 0 }
  );

  const data = {
    labels: ['Hardware', 'Software'],
    datasets: [
      {
        label: 'Cantidad de Tickets',
        data: [typeCounts['Hardware'], typeCounts['Software']],
        backgroundColor: ['#FF6384', '#36A2EB'],
      },
    ],
  };

  const options = {
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        const label = data.labels[index];
        
        // Redirigir a la página de tickets con el filtro de tipo
        navigate(`/tickets?type=${label.toLowerCase()}`);
      }
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">Cantidad de Tickets por Tipo de Requerimiento</h2>
      <div className="relative h-72 w-full">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default TicketsTypeChart;
