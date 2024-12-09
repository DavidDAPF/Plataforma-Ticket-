import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import Equipment from '../models/equipmentModel.js';
//import User from '../models/userModel.js';

export const createUser = async (req, res) => {
  try {
    const { email, password, role, name, status } = req.body;
    const newUser = new User({ email, password, role, name, status });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, role, name, status, equipmentAssignments } = req.body;

    // Buscar usuario actual
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Actualizar datos del usuario
    user.email = email || user.email;
    user.role = role || user.role;
    user.name = name || user.name;
    user.status = status || user.status;

    // Sincronizar equipos
    if (equipmentAssignments) {
      // Remover equipos que ya no están asignados
      const removedEquipments = user.equipmentAssignments.filter(
        (id) => !equipmentAssignments.includes(id.toString())
      );
      for (const equipmentId of removedEquipments) {
        const equipment = await Equipment.findById(equipmentId);
        if (equipment) {
          equipment.assignedUser = null;
          await equipment.save();
        }
      }

      // Agregar nuevos equipos
      const newEquipments = equipmentAssignments.filter(
        (id) => !user.equipmentAssignments.includes(id)
      );
      for (const equipmentId of newEquipments) {
        const equipment = await Equipment.findById(equipmentId);
        if (equipment) {
          equipment.assignedUser = user._id;
          await equipment.save();
        }
      }

      user.equipmentAssignments = equipmentAssignments;
    }

    // Guardar cambios
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.error('Error actualizando usuario:', error);
    res.status(500).json({ message: 'Error actualizando usuario', error });
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
    // Obtener todos los usuarios con equipos asignados poblados
    const users = await User.find({}, '-password') // Excluir el campo contraseña
      .populate('equipmentAssignments', 'label brand model status') // Poblar equipos asignados
      .lean(); // Convertir documentos a objetos simples

    res.status(200).json(users);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ message: 'Error al obtener usuarios', error });
  }
});

export const assignEquipmentToUser = asyncHandler(async (req, res) => {
  const { userId, equipmentId } = req.body;

  try {
    // Verificar si el usuario existe
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Verificar si el equipo existe
    const equipment = await Equipment.findById(equipmentId);
    if (!equipment) {
      return res.status(404).json({ message: 'Equipo no encontrado' });
    }

    // Si el equipo ya está asignado, removerlo del usuario anterior
    if (equipment.assignedUser && equipment.assignedUser.toString() !== userId) {
      const previousUser = await User.findById(equipment.assignedUser);
      if (previousUser) {
        previousUser.equipmentAssignments = previousUser.equipmentAssignments.filter(
          (id) => id.toString() !== equipmentId
        );
        await previousUser.save();
      }
    }

    // Asignar el equipo al nuevo usuario
    equipment.assignedUser = userId;
    if (!user.equipmentAssignments.includes(equipmentId)) {
      user.equipmentAssignments.push(equipmentId);
    }

    // Guardar cambios
    await equipment.save();
    await user.save();

    res.status(200).json({
      message: `Equipo ${equipment.label} asignado al usuario ${user.name}`,
      user,
      equipment,
    });
  } catch (error) {
    console.error('Error asignando equipo:', error);
    res.status(500).json({ message: 'Error asignando equipo', error });
  }
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

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar al usuario por ID
    const user = await User.findById(id).lean();

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Poblar los equipos asignados
    const equipmentAssignments = await Equipment.find({
      _id: { $in: user.equipmentAssignments || [] },
    });

    res.status(200).json({ ...user, equipmentAssignments });
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
    res.status(500).json({ message: 'Error al obtener el usuario', error });
  }
};

// @desc Obtener usuarios por rol
// @route GET /api/users/role/:role
// @access Private
export const getUsersByRole = asyncHandler(async (req, res) => {
  const { role } = req.params;

  try {
    // Filtrar usuarios por el rol especificado
    const users = await User.find({ role });

    if (!users || users.length === 0) {
      return res.status(404).json({ message: `No se encontraron usuarios con el rol: ${role}` });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error('Error al obtener usuarios por rol:', error);
    res.status(500).json({ message: 'Error al obtener usuarios por rol.' });
  }
});
