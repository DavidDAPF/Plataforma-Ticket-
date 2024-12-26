import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generateUsersPDF = (users) => {
  const doc = new jsPDF();

  // Estadísticas generales
  const totalUsers = users.length;
  const totalTechnicians = users.filter((user) => user.role === "Soporte").length;
  const totalActiveUsers = users.filter((user) => user.status === "Activo" && user.role === "Usuario").length;
  const totalInactiveUsers = users.filter((user) => user.status === "Inactivo" && user.role === "Usuario").length;
  const totalActiveTechnicians = users.filter(
    (user) => user.status === "Activo" && user.role === "Soporte"
  ).length;
  const totalInactiveTechnicians = users.filter(
    (user) => user.status === "Inactivo" && user.role === "Soporte"
  ).length;

  // Primera hoja: Estadísticas
  doc.setFontSize(18);
  doc.text("Estadísticas de Usuarios", 14, 20);

  doc.setFontSize(12);
  doc.text(`Total de usuarios: ${totalUsers}`, 14, 30);
  doc.text(`Total de técnicos: ${totalTechnicians}`, 14, 40);
  doc.text(`Usuarios activos: ${totalActiveUsers}`, 14, 50);
  doc.text(`Técnicos activos: ${totalActiveTechnicians}`, 14, 60);
  doc.text(`Usuarios inactivos: ${totalInactiveUsers}`, 14, 70);
  doc.text(`Técnicos inactivos: ${totalInactiveTechnicians}`, 14, 80);

  // Segunda hoja: Lista detallada
  doc.addPage();
  doc.setFontSize(18);
  doc.text("Informe de Usuarios", 14, 20);

  const tableData = users.map((user) => [
    user.name,
    user.email,
    user.status,
    user.role,
  ]);

  autoTable(doc, {
    head: [["Nombre", "Correo", "Estado", "Rol"]],
    body: tableData,
    startY: 30,
  });

  doc.save("reporte_usuarios.pdf");
};



