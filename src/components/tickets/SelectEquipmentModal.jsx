// export default SelectEquipmentModal;
import React, { useState, useEffect } from "react";
import axios from "axios";

const SelectEquipmentModal = ({ isOpen,onClose, onAddEquipment }) => {
  const [equipmentList, setEquipmentList] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  //if (!isOpen) return null; // Asegúrate de que el modal no se renderice si no está abierto

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/api/equipment", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setEquipmentList(response.data);
      } catch (err) {
        console.error("Error al cargar los equipos:", err);
        setError("No se pudo cargar la lista de equipos.");
      } finally {
        setLoading(false);
      }
    };

    if (isOpen){
    fetchEquipment();
    }
  }, [isOpen]);

  const handleSelect = (equipment) => {
    console.log("Equipo seleccionado:", equipment); // Asegúrate de que muestra datos correctos
    onAddEquipment(equipment); // Llama a la función proporcionada por el padre
    onClose(); // Cierra el modal
  };
  
  if(!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md shadow-md w-3/4 max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Seleccionar Equipo</h2>
        {loading ? (
          <p>Cargando equipos...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <ul className="max-h-60 overflow-y-auto">
            {equipmentList.length > 0 ? (
              equipmentList.map((equipment) => (
                <li
                  key={equipment._id}
                  className="p-2 border-b hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSelect(equipment)}
                >
                  <p><strong>Etiqueta:</strong> {equipment.label}</p>
                  <p><strong>Marca:</strong> {equipment.brand}</p>
                  <p><strong>Modelo:</strong> {equipment.model}</p>
                  <p><strong>Estado:</strong> {equipment.status}</p>
                </li>
              ))
            ) : (
              <p>No hay equipos disponibles.</p>
            )}
          </ul>
        )}
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default SelectEquipmentModal;
