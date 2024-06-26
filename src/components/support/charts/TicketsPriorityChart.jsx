import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { useNavigate } from 'react-router-dom';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const TicketsPriorityChart = ({ tickets }) => {
  const navigate = useNavigate();

  const priorityCounts = tickets.reduce(
    (counts, ticket) => {
      counts[ticket.priority] = (counts[ticket.priority] || 0) + 1;
      return counts;
    },
    { Alta: 0, Media: 0, Baja: 0 }
  );

  const data = {
    labels: ['Alta', 'Media', 'Baja'],
    datasets: [
      {
        label: 'Cantidad de Tickets',
        data: [priorityCounts['Alta'], priorityCounts['Media'], priorityCounts['Baja']],
        backgroundColor: ['#FF6384', '#FFCE56', '#36A2EB'],
      },
    ],
  };

  const options = {
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        const label = data.labels[index];
        
        // Redirigir a la página de tickets con el filtro de prioridad
        navigate(`/tickets?priority=${label.toLowerCase()}`);
      }
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">Cantidad de Tickets por Prioridad</h2>
      <div className="relative h-72 w-full">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default TicketsPriorityChart;
