import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const TicketsTimeChart = ({ tickets }) => {
  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'];
  const ticketCounts = months.map((month) => {
    return tickets.filter((ticket) => new Date(ticket.creationDate).toLocaleString('es-ES', { month: 'long' }) === month.toLowerCase()).length;
  });

  const data = {
    labels: months,
    datasets: [
      {
        label: 'Tickets por periodo de tiempo',
        data: ticketCounts,
        fill: false,
        borderColor: '#36A2EB',
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">Tickets por periodo de tiempo</h2>
      <Line data={data} />
    </div>
  );
};

export default TicketsTimeChart;
