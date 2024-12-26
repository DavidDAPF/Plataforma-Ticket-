import asyncHandler from 'express-async-handler';
import Equipment from '../models/equipmentModel.js';
import User from '../models/userModel.js'

// @desc Crear un nuevo equipo
// @route POST /api/equipment
// @access Private
const createEquipment = asyncHandler(async (req, res) => {
  const { label,status, brand, model, serialNumber, ipAddress } = req.body;

  // Verificar si el equipo ya existe (por serialNumber o label)
  const existingEquipment = await Equipment.findOne({ serialNumber });
  if (existingEquipment) {
    res.status(400);
    throw new Error('El equipo ya existe.');
  }

  const equipment = new Equipment({
    label,
    status,
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

  try {
    // Verificar existencia del equipo y usuario
    const equipment = await Equipment.findById(equipmentId);
    const newUser = await User.findById(userId);

    if (!equipment) return res.status(404).json({ message: 'Equipo no encontrado' });
    if (!newUser) return res.status(404).json({ message: 'Usuario no encontrado' });

    // Si el equipo está asignado, eliminarlo del usuario anterior
    if (equipment.assignedUser) {
      const oldUser = await User.findById(equipment.assignedUser);
      if (oldUser) {
        oldUser.equipmentAssignments = oldUser.equipmentAssignments.filter(
          (id) => id.toString() !== equipmentId
        );
        await oldUser.save();
      }
    }

    // Asignar el equipo al nuevo usuario
    equipment.assignedUser = userId;
    newUser.equipmentAssignments.push(equipmentId);

    // Agregar al historial del equipo
    equipment.history.push({
      action: equipment.assignedUser ? 'Reasignado' : 'Asignado',
      performedBy: req.user._id, // Usuario que realiza la acción
      ticket: ticketId || null,
      previousState: equipment.assignedUser
        ? `Usuario anterior: ${equipment.assignedUser}`
        : 'No asignado',
      currentState: `Asignado a ${newUser.name}`,
      date: new Date(),
    });

    // Guardar cambios
    await equipment.save();
    await newUser.save();

    res.status(200).json({ message: 'Equipo asignado correctamente', equipment, user: newUser });
  } catch (error) {
    console.error('Error asignando equipo:', error);
    res.status(500).json({ message: 'Error asignando equipo', error });
  }
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
    action: 'Cambio de estado desde updateepuipmentstatus',
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

  // Verificar si el equipo existe y obtener historial con datos relevantes
  const equipment = await Equipment.findById(equipmentId)
    .populate('history.performedBy', 'name email') // Incluye los datos del usuario
    .populate('assigneUser', 'name email')
    
    .populate('history.ticket', 'title'); // Incluye detalles del ticket si existen

  if (!equipment) {
    res.status(404);
    throw new Error('Equipo no encontrado');
  }

  //Opcional: Formatear el historial para solo devolver lo necesario
  const formattedHistory = equipment.history.map((entry) => ({
    action: entry.action,
    date: entry.date,
    performedBy: entry.performedBy
      ? { name: entry.performedBy.name, email: entry.performedBy.email }
      : {name: 'Usuario desconocido', email:'Email no disponible'},
    ticket: entry.ticket ? { title: entry.ticket.title } : null,
    previousState: entry.previousState?.replace(
        /ID (\W+)/,
        (_, id)=>{
          const user = equipment.assignedUser || {};
          return`${user.name || 'Usuario desconocido'}(${user.email || 'sin correo'})`;
        }
      ),

    currentState: entry.currentState?.replace(
      /ID (\w+)/,
      (_, id) => {
        const user = equipment.assignedUser || {};
        return `${user.name || 'Usuario desconocido'} (${user.email || 'sin correo'})`;
      }
    ),
  }));

  res.status(200).json(formattedHistory);
});

const getAllEquipment = asyncHandler(async (req, res) => {
  try {
    const equipmentList = await Equipment.find({})
      .populate('assignedUser', 'name email') // Usuario asignado
      .populate('history.performedBy', 'name email') // Historial de cambios
      .exec();

    res.status(200).json(equipmentList);
  } catch (error) {
    console.error('Error obteniendo equipos:', error);
    res.status(500).json({ message: 'Error obteniendo equipos', error });
  }
});
  
const updateEquipment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  const performedBy = req.user._id;

  try {
    const equipment = await Equipment.findById(id);

    if (!equipment) {
      return res.status(404).json({ message: 'Equipo no encontrado.' });
    }

    const performedByUser = await User.findById(performedBy); // Obtén el usuario que realiza la acción

    const historyEntry = [];

    // Sincronización de usuario asignado
    if (updatedData.assignedUser && updatedData.assignedUser !== equipment.assignedUser?.toString()) {
      const assignedUser = await User.findById(updatedData.assignedUser); // Usuario al que se asigna el equipo
      const previousUser = equipment.assignedUser ? await User.findById(equipment.assignedUser) : null; // Usuario anterior

      // Remover equipo del usuario anterior
      if (previousUser) {
        previousUser.equipmentAssignments = previousUser.equipmentAssignments.filter(
          (eqId) => eqId.toString() !== id
        );
        await previousUser.save();
      }

      // Agregar equipo al nuevo usuario
      if (assignedUser) {
        if (!assignedUser.equipmentAssignments.includes(id)) {
          assignedUser.equipmentAssignments.push(id);
          await assignedUser.save();
        }

        // Registrar historial
        historyEntry.push({
          action: equipment.assignedUser ? 'Reasignado a otro usuario' : 'Asignado a un usuario',
          performedBy: {
            _id: performedByUser._id,
            name: performedByUser.name,
            email: performedByUser.email,
          },
          previousState: previousUser
            ? `Asignado a ${previousUser.name} (${previousUser.email})`
            : 'No asignado',
          currentState: `Asignado a ${assignedUser.name} (${assignedUser.email})`,
          date: new Date(),
        });
      }

      // Actualizar el usuario asignado en el equipo
      equipment.assignedUser = updatedData.assignedUser;
    }

    // Cambiar el estado del equipo si es necesario
    if (updatedData.status && updatedData.status !== equipment.status) {
      historyEntry.push({
        action: 'Cambiado de estado',
        performedBy: {
          _id: performedByUser._id,
          name: performedByUser.name,
          email: performedByUser.email,
        },
        previousState: equipment.status || 'Sin estado',
        currentState: updatedData.status,
        date: new Date(),
      });

      equipment.status = updatedData.status;
    }

    // Actualizar otros datos del equipo
    equipment.label = updatedData.label || equipment.label;
    equipment.brand = updatedData.brand || equipment.brand;
    equipment.model = updatedData.model || equipment.model;
    equipment.serialNumber = updatedData.serialNumber || equipment.serialNumber;
    equipment.ipAddress = updatedData.ipAddress || equipment.ipAddress;

    // Agregar historial si hay cambios
    if (historyEntry.length > 0) {
      equipment.history.push(...historyEntry);
    }

    // Guardar cambios
    await equipment.save();

    res.status(200).json(equipment);
  } catch (error) {
    console.error('Error actualizando equipo:', error);
    res.status(500).json({ message: 'Error actualizando equipo.', error });
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

const removeEquipmentFromUser = asyncHandler(async (req, res) => {
  const { equipmentId } = req.body;

  try {
    const equipment = await Equipment.findById(equipmentId);

    if (!equipment) return res.status(404).json({ message: 'Equipo no encontrado' });

    if (equipment.assignedUser) {
      const user = await User.findById(equipment.assignedUser);

      if (user) {
        // Remover el equipo del usuario
        user.equipmentAssignments = user.equipmentAssignments.filter(
          (id) => id.toString() !== equipmentId
        );
        await user.save();
      }

      // Remover la asignación del equipo
      equipment.assignedUser = null;
      equipment.history.push({
        action: 'Desasignado',
        performedBy: req.user._id,
        previousState: `Asignado a ${user.name}`,
        currentState: 'No asignado',
        date: new Date(),
      });

      await equipment.save();
    }

    res.status(200).json({ message: 'Equipo desasignado correctamente', equipment });
  } catch (error) {
    console.error('Error desasignando equipo:', error);
    res.status(500).json({ message: 'Error desasignando equipo', error });
  }
});



export { addEquipmentAssignmentsField ,deleteEquipment, updateEquipment, getAllEquipment , createEquipment, updateEquipmentStatus, assignEquipmentToUser, getEquipmentHistory};