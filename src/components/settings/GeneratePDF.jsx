import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const generatePDF = (tickets) => {
  const doc = new jsPDF();

  // Primera página: Resumen
  doc.setFontSize(16);
  doc.text('Resumen de Tickets', 14, 20);

  const openTickets = tickets.filter(ticket => ticket.status === 'Abierto').length;
  const closedTickets = tickets.filter(ticket => ticket.status === 'Cerrado').length;

  // Calcular tickets por mes
  const ticketsByMonth = {};
  tickets.forEach(ticket => {
    const month = new Date(ticket.createdAt).toLocaleString('default', { month: 'long', year: 'numeric' });
    ticketsByMonth[month] = (ticketsByMonth[month] || 0) + 1;
  });

  // Mostrar el resumen
  doc.setFontSize(12);
  doc.text(`Tickets Abiertos: ${openTickets}`, 14, 30);
  doc.text(`Tickets Cerrados: ${closedTickets}`, 14, 40);

  // Crear tabla de tickets por mes
  const monthsData = Object.entries(ticketsByMonth).map(([month, count]) => [month, count]);
  autoTable(doc, {
    startY: 50,
    head: [['Mes', 'Cantidad de Tickets']],
    body: monthsData,
    theme: 'grid',
  });

  // Segunda página: Detalle de tickets
  doc.addPage();
  doc.setFontSize(16);
  doc.text('Detalle de Tickets', 14, 20);

  const ticketData = tickets.map(ticket => [
    ticket.title || 'Sin título',
    ticket.status,
    ticket.requester?.name || 'Desconocido',
  ]);

  autoTable(doc, {
    startY: 30,
    head: [['Título', 'Estado', 'Solicitante']],
    body: ticketData,
    theme: 'grid',
  });

  doc.save('tickets-report.pdf');
};
