import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import Equipment from '../models/equipmentModel.js';
//import User from '../models/userModel.js';

export const createUser = async (req, res) => {
  try {
    const { email, password, role, name } = req.body;
    const newUser = new User({ email, password, role, name });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, role, name } = req.body;
    const updatedUser = await User.findByIdAndUpdate(id, { email, role, name }, { new: true });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
};

export const getAllUsers = asyncHandler(async (req, res) => {
  try {
    // Obtener todos los usuarios
    const users = await User.find({}).lean(); // Usar .lean() para obtener documentos simples

    // Sanitizar la lista de usuarios
    const sanitizedUsers = users.map((user) => {
      // Filtrar los IDs vacíos o nulos en equipmentAssignments
      const validEquipmentAssignments = user.equipmentAssignments
        ? user.equipmentAssignments.filter(id => id && id.toString() !== "")
        : [];

      return {
        ...user,
        equipmentAssignments: validEquipmentAssignments, // Asigna los IDs válidos
      };
    });

    // Población de los equipos asignados solo si hay IDs válidos
    const populatedUsers = await Promise.all(sanitizedUsers.map(async (user) => {
      if (user.equipmentAssignments.length > 0) {
        const populatedAssignments = await Equipment.find({ _id: { $in: user.equipmentAssignments } });
        return {
          ...user,
          equipmentAssignments: populatedAssignments,
        };
      }
      return user;
    }));

    res.status(200).json(populatedUsers);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users', error });
  }
});


// @desc Asignar un equipo a un usuario
// @route POST /api/users/assign-equipment
// @access Private
export const assignEquipmentToUser = asyncHandler(async (req, res) => {
  const { userId, equipmentId } = req.body;

  // Verificar si el usuario existe
  const user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error('Usuario no encontrado');
  }

  // Verificar si el equipo existe
  const equipment = await Equipment.findById(equipmentId);
  if (!equipment) {
    res.status(404);
    throw new Error('Equipo no encontrado');
  }

  // Verificar si el equipo ya está asignado
  if (equipment.assignedUser) {
    res.status(400);
    throw new Error('El equipo ya está asignado a otro usuario');
  }

  // Asignar el equipo al usuario
  equipment.assignedUser = userId;
  await equipment.save();

  // Agregar el equipo al listado de equipos asignados del usuario
  user.equipmentAssignments.push(equipmentId);
  await user.save();

  res.status(200).json({
    message: `Equipo ${equipment.label} asignado al usuario ${user.name}`,
    user,
    equipment,
  });
});

export const getAssignedEquipment = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  // Verificar si el usuario existe
  const user = await User.findById(userId).populate('equipmentAssignments');
  console.log(user.equipmentAssignments); //verificar los datos
  if (!user) {
    res.status(404);
    throw new Error('Usuario no encontrado');
  }

  // Devolver los equipos asignados
  res.status(200).json(user.equipmentAssignments);
});

export const hasAllEquipmentAssigned = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  // Obtener los equipos asignados al usuario
  const user = await User.findById(userId).populate('equipmentAssignments');
  if (!user) {
    res.status(404);
    throw new Error('Usuario no encontrado');
  }

    // Obtener todos los equipos
    const allEquipment = await Equipment.find({});
    const allEquipmentIds = allEquipment.map((equipment) => equipment._id.toString());


  const assignedEquipmentIds = user.equipmentAssignments.map(id => id.toString());

  // Verificar si todos los equipos están asignados al usuario
  const hasAllAssigned = allEquipmentIds.every((id) => assignedEquipmentIds.includes(id));

  res.status(200).json({
    hasAllAssigned,
    assignedEquipmentIds,
    allEquipmentIds,
  });
});

