import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export const generateEquipmentPDF = (equipment) => {
  if (!equipment || equipment.length === 0) {
    alert("No hay equipos disponibles para generar el PDF.");
    return;
  }

  const doc = new jsPDF();

  // Resumen
  doc.setFontSize(18);
  doc.text("Informe de Equipos", 14, 20);

  const totalEquipment = equipment.length;
  const activeEquipment = equipment.filter(eq => eq.status === "Activo").length;
  const inactiveEquipment = equipment.filter(eq => eq.status === "Inactivo").length;

  doc.setFontSize(12);
  doc.text(`Total de equipos: ${totalEquipment}`, 14, 30);
  doc.text(`Equipos Activos: ${activeEquipment}`, 14, 40);
  doc.text(`Equipos Inactivos: ${inactiveEquipment}`, 14, 50);

  // Detalles en tabla
  const tableData = equipment.map((eq, index) => [
    index + 1,
    eq.label || "N/A",
    eq.brand || "N/A",
    eq.model || "N/A",
    eq.status || "N/A"
  ]);

  autoTable(doc, {
    startY: 60,
    head: [["No.", "Etiqueta", "Marca", "Modelo", "Estado"]],
    body: tableData,
    theme: "grid",
  });

  doc.save("equipment-report.pdf");
};

