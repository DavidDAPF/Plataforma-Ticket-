import asyncHandler from 'express-async-handler';
import Equipment from '../models/equipmentModel.js';
import User from '../models/userModel.js'
//import asyncHandler from 'express-async-handler';

// @desc Crear un nuevo equipo
// @route POST /api/equipment
// @access Private
const createEquipment = asyncHandler(async (req, res) => {
  const { label, brand, model, serialNumber, ipAddress } = req.body;

  // Verificar si el equipo ya existe (por serialNumber o label)
  const existingEquipment = await Equipment.findOne({ serialNumber });
  if (existingEquipment) {
    res.status(400);
    throw new Error('El equipo ya existe.');
  }

  const equipment = new Equipment({
    label,
    brand,
    model,
    serialNumber,
    ipAddress,
  });

  const createdEquipment = await equipment.save();
  res.status(201).json(createdEquipment);
});


// @desc Eliminar un equipo
// @route DELETE /api/equipment/:id
// @access Private
const deleteEquipment = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const equipment = await Equipment.findById(id);
  if (!equipment) {
    res.status(404);
    throw new Error('Equipo no encontrado.');
  }

  await equipment.remove();
  res.status(200).json({ message: 'Equipo eliminado.' });
});


const assignEquipmentToUser = asyncHandler(async (req, res) => {
  const { equipmentId, userId, ticketId } = req.body;

  // Verificar si el equipo existe
  const equipment = await Equipment.findById(equipmentId);
  if (!equipment) {
    res.status(404);
    throw new Error('Equipo no encontrado');
  }

  // Verificar si el usuario existe
  const user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error('Usuario no encontrado');
  }

  // Registrar el historial
  equipment.history.push({
    action: equipment.assignedUser
      ? 'Reasignado a otro usuario'
      : 'Asignado a un usuario',
    performedBy: req.user._id, // Usuario que realiza la acción
    ticket: ticketId || null,
    previousState: equipment.assignedUser
      ? `Asignado a usuario ID ${equipment.assignedUser}`
      : 'No asignado',
    currentState: `Asignado a usuario ID ${userId}`,
    date: new Date(),
  });

  // Actualizar el usuario asignado
  equipment.assignedUser = userId;

    // Actualizar el array `equipmentAssignments` en el usuario
    if (!user.equipmentAssignments.includes(equipmentId)) {
      user.equipmentAssignments.push(equipmentId);
      await user.save();
    }

  // Guardar cambios
  await equipment.save();
  res.status(200).json(equipment);
});

const updateEquipmentStatus = asyncHandler(async (req, res) => {
  const { equipmentId, newStatus, ticketId } = req.body;

  // Verificar si el equipo existe
  const equipment = await Equipment.findById(equipmentId);
  if (!equipment) {
    res.status(404);
    throw new Error('Equipo no encontrado');
  }

  // Registrar el historial
  equipment.history.push({
    action: 'Cambio de estado',
    performedBy: req.user._id,
    ticket: ticketId || null,
    previousState: equipment.status,
    currentState: newStatus,
  });

  // Actualizar el estado
  equipment.status = newStatus;

  // Guardar cambios
  await equipment.save();
  res.status(200).json(equipment);
});

const getEquipmentHistory = asyncHandler(async (req, res) => {
  const { equipmentId } = req.params;

  // Verificar si el equipo existe
  const equipment = await Equipment.findById(equipmentId).populate(
    'history.performedBy',
    'name email'
  ).populate('history.ticket', 'title');
  
  if (!equipment) {
    res.status(404);
    throw new Error('Equipo no encontrado');
  }

  res.status(200).json(equipment.history);
});


const getAllEquipment = asyncHandler(async (req, res) => {
  try {
    const statusFilter = req.query.status; // Lee el parámetro de consulta 'status'
    const equipmentList = statusFilter
      ? await Equipment.find({ status: statusFilter }).populate('assignedUser', 'name email')
      : await Equipment.find({}).populate('assignedUser', 'name email');

    res.status(200).json(equipmentList);
  } catch (error) {
    console.error('Error fetching equipment:', error);
    res.status(500).json({ message: 'Error fetching equipment' });
  }
});

const updateEquipment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    // Actualizar el equipo
    const equipment = await Equipment.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true, // Ejecutar validaciones del modelo
    });

    if (!equipment) {
      return res.status(404).json({ message: 'Equipo no encontrado.' });
    }

    res.status(200).json(equipment);
  } catch (error) {
    console.error('Error actualizando equipo:', error);
    res.status(500).json({ message: 'Error actualizando equipo.' });
  }
});





const addEquipmentAssignmentsField = async () => {
  try {
    const users = await User.find({});

    for (const user of users) {
      if (!user.equipmentAssignments) {
        user.equipmentAssignments = []; // Inicializa como un arreglo vacío si no existe
        await user.save(); // Guarda el usuario
      }
    }

    console.log('Campo equipmentAssignments agregado a usuarios sin él.');
  } catch (error) {
    console.error('Error al agregar el campo equipmentAssignments:', error);
  }
};


export { addEquipmentAssignmentsField ,deleteEquipment, updateEquipment, getAllEquipment , createEquipment, updateEquipmentStatus, assignEquipmentToUser, getEquipmentHistory};