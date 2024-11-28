import React, { useContext, useState, useEffect } from "react";
import { TicketContext } from "../context/TicketContext";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const SupportTickets = () => {
  const { tickets = [], setTickets, fetchTickets } = useContext(TicketContext);
  const { user } = useContext(AuthContext);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [assignee, setAssignee] = useState("");
  const [technicians, setTechnicians] = useState([]); // Estado para almacenar técnicos
  const [error, setError] = useState("");

  // Cargar tickets y técnicos al montar el componente
  useEffect(() => {
    if (fetchTickets) {
      fetchTickets();
    }
    fetchTechnicians(); // Obtener la lista de técnicos
    console.log( "Tickets cargados desde el contexto: ", tickets);
  }, [fetchTickets, tickets]);

  // Función para obtener la lista de técnicos
  const fetchTechnicians = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      // Filtrar usuarios con rol de soporte
      const supportTechnicians = response.data.filter(
        (u) => u.role === "Soporte"
      );
      setTechnicians(supportTechnicians); // Almacenar solo técnicos
    } catch (error) {
      //console.error("Error al obtener técnicos:", error);
      setError("Error al cargar la lista de técnicos.");
    }
  };

  const handleAssignTicket = async () => {
    if (!assignee) return; // Verificar si se seleccionó un técnico
    console.log("Assignee (ID del técnico seleccionado):", assignee);
    console.log("Selected Ticket:", selectedTicket);
    try {
      const response = await axios.put(
        `http://localhost:5000/api/tickets/${selectedTicket._id}`,
        { assignedTo: assignee },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setTickets((prevTickets) =>
        prevTickets.map((ticket) =>
          ticket._id === selectedTicket._id ? response.data : ticket
        )
      );
      await fetchTickets();
      closeModal();
    } catch (error) {
      console.error("Error al asignar el ticket:", error);
      setError("Error al asignar el ticket. Inténtalo de nuevo.");
    }
  };

  const handleCloseTicket = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/tickets/${selectedTicket._id}`,
        { status: "Cerrado" },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setTickets((prevTickets) =>
        prevTickets.map((ticket) =>
          ticket._id === selectedTicket._id ? response.data : ticket
        )
      );
      closeModal();
    } catch (error) {
      console.error("Error al cerrar el ticket:", error);
      setError("Error al cerrar el ticket. Inténtalo de nuevo.");
    }
  };

  const closeModal = () => {
    setSelectedTicket(null);
    setAssignee("");
    setError(""); // Limpiar el mensaje de error al cerrar el modal
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto bg-white p-6 rounded-md shadow-md">
        <h1 className="text-3xl font-bold mb-6">Tickets de Soporte</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="border-b p-4">Título</th>
              <th className="border-b p-4">Resumen</th>
              <th className="border-b p-4">Estado</th>
              <th className="border-b p-4">Asignado a</th>
              <th className="border-b p-4">Fecha de Creación</th>
              <th className="border-b p-4">Acciones </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(tickets) && tickets.length > 0 ? (
              tickets.map((ticket) => (
                <tr key={ticket._id}>
                  <td className="border-b p-4">{ticket.title || "Sin título"}</td>
                  <td className="border-b p-4">{ticket.summary || "Sin resumen"}</td>
                  <td
                    className={`border-b p-4 ${
                      ticket.status === "Abierto"
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {ticket.status}
                  </td>
                  <td className="border-b p-4">
                    {ticket.assignedTo && ticket.assignedTo.name ? ticket.assignedTo.name :"No Asignado"}
                  </td>
                  <td className="border-b p-4">
                    {new Date(ticket.createdAt).toLocaleDateString()}
                  </td>
                  <td className="border-b p-4">
                    <button
                      onClick={() => setSelectedTicket(ticket)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                      Abrir
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No hay tickets disponibles.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Ventana modal */}
      {selectedTicket && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md shadow-md w-1/2">
            <h3> Prioridad: {selectedTicket.priority || "No prioritario"} </h3>
            {/* <h3> Solicitante: {selectedTicket.requester || "No usuario data"} </h3> */}
            <h3>
              Solicitante: 
                {selectedTicket.requester && selectedTicket.requester.name
                  ? selectedTicket.requester.name
                  : "No usuario data"}
            </h3>
            <h2 className="text-2xl font-bold mb-4">
              Ticket: {selectedTicket.title || "Sin título"}
            </h2>
            <h2>Tipo: {selectedTicket.type || "Sin tipo asignado" }</h2>
            <p className="mb-2">
              <strong>Resumen:</strong> {selectedTicket.summary || "Sin resumen"}
            </p>
            <p className="mb-4">
              <strong>Descripción:</strong>{" "}
              {selectedTicket.description || "Sin descripción"}
            </p>

            <div className="mb-4">
              {/* <label className="block mb-2">Asignar a:</label> */}
              <p>
                <strong>Asignado a:</strong>{" "}
                {selectedTicket.assignedTo && selectedTicket.assignedTo.name 
                  ? selectedTicket.assignedTo.name 
                  : "No Asignado"}
              </p>
              <select
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="">Seleccionar técnico...</option>
                {technicians.map((technician) => (
                  <option key={technician._id} value={technician._id}>
                    {technician.name}
                  </option>
                ))}
              </select>
              <button
                onClick={handleAssignTicket}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Asignar
              </button>
            </div>

            <div className="mb-4">
              <button
                onClick={handleCloseTicket}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Cerrar Ticket
              </button>
            </div>

            <button
              onClick={closeModal}
              className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportTickets;