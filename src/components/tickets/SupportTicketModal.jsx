// src/components/SupportTicketModal.jsx
import React, { useContext, useState } from "react";
import SelectEquipmentModal from "./SelectEquipmentModal";
import { TicketContext } from "../../context/TicketContext";
import axios from "axios";
import { toast } from "react-toastify";

const SupportTicketModal = ({
  ticket,
  technicians,
  onClose,
  onAssign,
  //onCloseTicket,
  onAddEquipment,
  onRemoveEquipment,
  error,
}) => {
  const [assignee, setAssignee] = useState("");
  const [isEquipmentModalOpen, setIsEquipmentModalOpen] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [newComment, setNewComment] = useState('');
  const { closeTicket } =useContext(TicketContext);

  if (!ticket || !ticket.comments) {
    console.error("El ticket no tiene datos válidos:", ticket);
    return null; // No renderiza nada si `ticket` está vacío o incompleto
  }

  const userEquipment = ticket?.requester?.equipmentAssignments || [];

  const handleOpenEquipmentModal = () => {
    setIsEquipmentModalOpen(true);
  };

  const handleCloseEquipmentModal = () => {
    setIsEquipmentModalOpen(false);
  };

  const handleAddEquipment = (equipment) => {
    console.log("Equipo seleccionado:", equipment);
    setSelectedEquipment(equipment); // Actualiza el estado con el equipo seleccionado
    handleCloseEquipmentModal();
  };
  const handleCloseTicket = async () => {
    if (!newComment.trim()) {
      alert('Debes agregar un comentario antes de cerrar el ticket.');
      return;
    }
  
    try {
      await closeTicket(ticket._id, newComment); // Llamar a la función del contexto
      setNewComment(''); // Limpiar el textarea
      onClose(); // Cerrar el modal
    } catch (error) {
      console.error('Error al cerrar el ticket:', error);
      alert('Hubo un error al cerrar el ticket. Intenta de nuevo.');
    }
  };
  


  const handleAddComment = async () => {
    if (!newComment.trim()) {
      console.log("El comentario no puede estar vacío.");
      return;
    }
  
    try {
      const response = await axios.put(
        `http://localhost:5000/api/tickets/${ticket._id}`,
        {
          comment: newComment,
          userRole: "Soporte", // O Usuario según corresponda
          newStatus: "Cerrado", // El técnico cierra el ticket
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
  
      // Actualizar los comentarios en el modal
      ticket.comments = response.data.comments;
      setNewComment(""); // Limpiar el textarea
      console.log("Comentario agregado correctamente y ticket cerrado.");
    } catch (error) {
      console.error("Error al agregar el comentario:", error);
      console.log("Hubo un problema al intentar agregar el comentario.");
    }
  };
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md shadow-md w-3/4 max-h-[90vh] overflow-y-auto">
        <div className="grid grid-cols-2 gap-6">
          {/* Columna 1: Info del ticket */}
          <div>
            <h2 className="mb-4">
              <strong>Estado:</strong>{" "}
              <span
                className={`font-semibold ${
                  ticket.status === "Cerrado"
                    ? "text-green-600" // Verde para Cerrado
                    : "text-red-600"   // Rojo para Abierto
                }`}
              >
                {ticket.status || "Estado no disponible"}
              </span>
            </h2>
            <h3 className="mb-4">
              <strong>Prioridad:</strong> {ticket.priority || "No prioritario"}
            </h3>
            <h3 className="mb-4">
              <strong>Solicitante:</strong>{" "}
              {ticket.requester?.name || "Nombre no disponible"}
            </h3>
            <h2 className="text-1xl font-bold mb-4">
              Título: {ticket.title || "Sin título"}
            </h2>
            <h2 className="mb-4">
              <strong>Tipo:</strong> {ticket.type || "Sin tipo asignado"}
            </h2>
            <p className="mb-4">
              <strong>Descripción:</strong>{" "}
              {ticket.description || "Sin descripción"}
            </p>

            {/* Asignación de técnico */}
            <div className="mb-4">
              <p>
                <strong>Asignado a:</strong>{" "}
                {ticket.assignedTo?.name || " No Asignado"}
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
                onClick={() => onAssign(assignee)}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Asignar
              </button>
            </div>
          </div>
  
          {/* Columna 2: Comentarios */}
          <div className="flex flex-col">
            <h4 className="mb-4 font-bold">Comentarios:</h4>
            <ul className="flex-1 max-h-[60vh] overflow-y-auto border p-4 rounded-md">
              {ticket.comments.length > 0 ? (
                ticket.comments.map((comment, index) => (
                  <li key={index} className="p-2 border-b">
                    <p>
                      <strong>{comment.name}:</strong> {comment.text}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(comment.createdAt).toLocaleString()}
                    </p>
                  </li>
                ))
              ) : (
                <p>No hay comentarios para este ticket.</p>
              )}
            </ul>
  
            {/* Agregar comentario */}
            <div className="mt-4">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Escribe un comentario para cerrar el ticket..."
                className="w-full px-4 py-2 border rounded-md"
              />
              <button
                onClick={handleCloseTicket}
                className={`mt-2 px-4 py-2 rounded-md ${
                  newComment.trim()
                    ? "bg-green-500 hover:bg-green-600 text-white"
                    : "bg-gray-300 text-gray-500"
                }`}
                disabled={!newComment.trim()}
              >
                Agregar respuesta y cerrar el ticket
              </button>
            </div>
          </div>
        </div>
  
        {/* Botón para cerrar el modal */}
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600"
          >
            Cerrar ventana
          </button>
        </div>
        {error && <div className="text-red-500 mt-4">{error}</div>}
      </div>
    </div>
  );
};

export default SupportTicketModal;