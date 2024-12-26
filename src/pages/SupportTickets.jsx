import React, { useContext, useState, useEffect } from "react";
import { TicketContext } from "../context/TicketContext";
import { AuthContext } from "../context/AuthContext";
import SupportTicketModal from "../components/tickets/SupportTicketModal";
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
    //console.log( "Tickets cargados desde el contexto: ", tickets);
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

  //Manejo de los equipos
  const addEquipmentToTicket = async (ticketId, equipmentId) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/tickets/${ticketId}/equipment`,
        { equipmentId },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setTickets((prevTickets) =>
        prevTickets.map((ticket) =>
          ticket._id === ticketId ? response.data : ticket
        )
      );
      fetchTickets(); // Refrescar lista
    } catch (error) {
      setError("Error al agregar equipo al ticket.");
    }
  };
  
  const removeEquipmentFromTicket = async (ticketId, equipmentId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/tickets/${ticketId}/equipment/${equipmentId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setTickets((prevTickets) =>
        prevTickets.map((ticket) =>
          ticket._id === ticketId ? response.data : ticket
        )
      );
      fetchTickets(); // Refrescar lista
    } catch (error) {
      setError("Error al quitar equipo del ticket.");
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
  // Función para abrir el modal con el ticket seleccionado
  const handleOpenModal = (ticket) => {
    setSelectedTicket(ticket);
  };

  const handleCloseModal = () => {
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
              <th className="border-b p-4">Usuario</th>
              <th className="border-b p-4">Estado</th>
              <th className="border-b p-4">Asignado a</th>
              <th className="border-b p-4">Fecha de Creación</th>
              <th className="border-b p-4">Fecha de Actualizacion</th>
              <th className="border-b p-4">Acciones </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(tickets) && tickets.length > 0 ? (
              tickets.map((ticket) => (
                <tr key={ticket._id}>
                  <td className="border-b p-4">{ticket.title || "Sin título"}</td>
                  <td className="border-b p-4">{ticket.requester?.name || "Sin nombre"}</td>
                  <td
                    className={`border-b p-4  font-bold ${
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
                    {new Date(ticket.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="border-b p-4">
                    <button
                      onClick={() => handleOpenModal(ticket)}
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
      { selectedTicket ? (
      <SupportTicketModal
        ticket={selectedTicket}
        technicians={technicians}
        onClose={() => setSelectedTicket(null)}
        //onClose={handleCloseModal}
        onAssign={handleAssignTicket}
        //onCloseTicket={handleCloseTicket}
        onAddEquipment={addEquipmentToTicket}
        onRemoveEquipment={removeEquipmentFromTicket}
        error={error}
      />
      ): null
      }
    </div>
  );
};

export default SupportTickets;