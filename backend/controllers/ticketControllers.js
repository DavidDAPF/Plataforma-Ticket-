import asyncHandler from 'express-async-handler';
import Ticket from '../models/ticketModel.js';
import User from '../models/userModel.js';
import Equipment from '../models/equipmentModel.js';
//import CreateTicket from '../../src/pages/Tickets.jsx';
import mongoose from 'mongoose';
import { response } from 'express' ; 

// @desc    Create new ticket
// @route   POST /api/tickets
// @access  Private
const createTicket = asyncHandler(async (req, res) => {
  console.log('Datos recibidos: ',req.body);
  const {title, description, priority, type, status,assignedTo } = req.body;
  const requester = req.user._id;

    
  if (!title) {
    res.status(400);
    throw new Error('Por favor ingrese un resumen');
  }

  if (!description) {
    res.status(400);
    throw new Error('Por favor ingrese una descripción');
  }

  let assignedUser = null;
  if (assignedTo) {
    assignedUser = await User.findOne({
      $or: [{ email: assignedTo }, { _id: assignedTo }],
    });

    if (!assignedUser) {
      res.status(400);
      throw new Error('Usuario asignado no encontrado');
    }
  }

  const ticket = new Ticket({
    title,
    description,
    requester,
    priority,
    type,
    status: status || 'Nuevo',
    response: '',
    assignedTo: assignedUser ? assignedUser._id : null,
    comments: [],
    equipment: [],
  });

  const createdTicket = await ticket.save();
  res.status(201).json(createdTicket);
});

// @desc    to close the ticket
// @route   POST /api/tickets/:id/close
// @access  Private
const closeTicket = asyncHandler(async (req, res) => {
  const { response } = req.body;

  if (!response || response.trim() === '') {
    res.status(400);
    throw new Error('Debes proporcionar una respuesta antes de cerrar el ticket');
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error('Ticket no encontrado');
  }

  ticket.response = response;

   // Agregar un comentario automático al cerrar el ticket
   ticket.comments.push({
    user: req.user._id, // ID del técnico
    name: req.user.name,
    //text: `Ticket cerrado: ${response}`, // Texto que explique el cierre
    text: response,
    createdAt: new Date(),
  });

  ticket.status = 'Cerrado';
  

  const updatedTicket = await ticket.save();
  res.status(200).json(updatedTicket);
});


// @desc    Get tickets based on user role
// @route   GET /api/tickets
// @access  Private
const getTickets = asyncHandler(async (req, res) => {
  let tickets;

  if (req.user.role === 'Soporte') {
    // Si el usuario es técnico, obtiene todos los tickets
    tickets = await Ticket.find({})
    .populate('equipment', 'label')
    .populate('assignedTo', 'name email')
    .populate('requester', 'name email');
  } else {
    // Si el usuario no es técnico, solo obtiene sus propios tickets
    tickets = await Ticket.find({ requester: req.user._id })
      .populate('equipment', 'label')
      .populate('assignedTo', 'name email')
      .populate('requester', 'name email');
  }

  if(!tickets){
    return res.status(404).json({message: "No se encontraron tickets mensaje desde getTickets TicketController.js"})
  }

  res.status(200).json(tickets);
});


// @desc    Get single ticket by ID
// @route   GET /api/tickets/:id
// @access  Private
const getTicketById = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id)
    .populate('equipment', 'label') // Equipos asignados al ticket
    .populate('assignedTo', 'name email')
    .populate('requester', 'name email') // Información del usuario solicitante
    .populate({
      path: 'requester',
      populate: { path: 'equipmentAssignments', select: 'label brand model status' }, // Equipos asignados al usuario
    });

  if (ticket) {
    res.json(ticket);
  } else {
    res.status(404);
    throw new Error('Ticket no encontrado');
  }
});



// @desc    Get tickets by user
// @route   GET /api/tickets/user/:userId
// @access  Private
const getTicketsByUser = asyncHandler(async (req, res) => {
  const tickets = await Ticket.find({ requester: req.params.userId });
  res.json(tickets);
});

const updateTicket = asyncHandler(async (req, res) => {
  const { comment, title, description, priority, type, assignedTo, equipment, status } = req.body;

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    return res.status(404).json({ message: 'Ticket no encontrado' });
  }

  // Agregar un comentario
  if (comment) {
    ticket.comments.push({
      user: req.user._id,
      name: req.user.name,
      text: comment,
      createdAt: new Date(),
    });
  }

  // Lógica para roles
  if (req.user.role === 'Usuario') {
    // El usuario solo puede agregar comentarios para reabrir el ticket
    if (ticket.status === 'Cerrado') {
      ticket.status = 'Abierto'; // Cambia el estado si el ticket estaba cerrado
    }
  } else if (req.user.role === 'Soporte') {
    // El técnico puede modificar otros campos
    ticket.title = title || ticket.title;
    ticket.description = description || ticket.description;
    ticket.priority = priority || ticket.priority;
    ticket.type = type || ticket.type;
    ticket.assignedTo = assignedTo || ticket.assignedTo;
    ticket.equipment = equipment || ticket.equipment;
    ticket.status = status || ticket.status;
  }

  const updatedTicket = await ticket.save();

  // Actualizar relaciones si el técnico modificó equipos o asignaciones
  if (req.user.role === 'Soporte') {
    await updateTicketRelations(updatedTicket);
  }

  res.status(200).json(updatedTicket);
});




export default updateTicket;

const updateTicketRelations = async (ticket) => {
  // Actualizar el usuario
  await User.updateOne(
    { _id: ticket.requester },
    { $addToSet: { equipmentAssignments: { $each: ticket.equipment } } }
  );

  // Actualizar los equipos
  await Equipment.updateMany(
    { _id: { $in: ticket.equipment } },
    { $addToSet: { assignedTo: ticket.requester } }
  );
};



// @desc    Delete ticket
// @route   DELETE /api/tickets/:id
// @access  Private
const deleteTicket = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    return res.status(404).json({ message: 'Ticket no encontrado' });
  }

  // Eliminar referencias
  await User.updateMany({ _id: ticket.requester }, { $pull: { tickets: ticket._id } });
  await Equipment.updateMany({ _id: { $in: ticket.equipment } }, { $pull: { tickets: ticket._id } });

  await ticket.remove();

  res.status(200).json({ message: 'Ticket eliminado' });
});




// @desc    Add comment to a ticket
// @route   POST /api/tickets/:id/comments
// @access  Private
const addComment = asyncHandler(async (req, res) => {
  const { text } = req.body;

  const ticket = await Ticket.findById(req.params.id);

  if (ticket) {
    const user = await User.findById(req.user._id);

    if (!user) {
      res.status(404);
      throw new Error('Usuario no encontrado');
    }

    const comment = {
      user: req.user._id,
      name: user.name,
      text,
    };

    ticket.comments.push(comment);

    await ticket.save();
    res.status(201).json(ticket);
  } else {
    res.status(404);
    throw new Error('Ticket no encontrado');
  }
});


// @desc    Add comment whith re-open to a ticket
// @route   POST /api/tickets/:id/reopen
// @access  Private
// Controlador para reabrir un ticket
const reopenTicket = async (req, res) => {
  const { comment } = req.body;

  if (!comment) {
    return res.status(400).json({ message: 'El comentario es obligatorio para reabrir un ticket.' });
  }

  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket no encontrado.' });
    }

    ticket.status = 'Abierto';

    ticket.comments.push({
      user: req.user._id,
      name: req.user.name,
      text: comment,
      createdAt: new Date(),
    });

    await ticket.save();

    res.json({ message: 'Ticket reabierto correctamente.', ticket });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al reabrir el ticket.' });
  }
};



// @desc Agregar un equipo a un ticket
// @route POST /api/tickets/:id/equipment
// @access Private
const addEquipmentToTicket = asyncHandler(async (req, res) => {
  const { equipmentId } = req.body;

  // Verificar si el equipo existe
  const equipment = await Equipment.findById(equipmentId);
  if (!equipment) {
    res.status(404);
    throw new Error('Equipo no encontrado.');
  }

   // Verificar si ya está asignado a otro usuario
   if (equipment.assignedUser && equipment.assignedUser.toString() !== req.user._id.toString()) {
    res.status(400);
    throw new Error('El equipo ya está asignado a otro usuario.');
  }

  // Buscar el ticket por ID
  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    res.status(404);
    throw new Error('Ticket no encontrado.');
  }


  
  // Verificar si el equipo ya está asignado al ticket
  // const alreadyAssigned = ticket.equipment.some(
  //   (eq) => eq.toString() === equipmentId
  // );
  const alreadyAssigned = ticket.equipment.some((eq) => eq._id.toString() === equipmentId);
  if (alreadyAssigned) {
    res.status(400);
    throw new Error('El equipo ya está asignado a este ticket.');
  }

  // Agregar el equipo al array de equipos del ticket
  ticket.equipment.push(equipment._id);

  // Actualizar el equipo
  equipment.assignedUser = req.user._id;
  await equipment.save();

  // Actualizar el usuario
  const user = await User.findById(req.user._id);
  if (!user.equipmentAssignments.includes(equipmentId)) {
    user.equipmentAssignments.push(equipmentId);
    await user.save();
  }

  // Guardar los cambios
  const updatedTicket = await ticket.save();

  res.status(200).json(updatedTicket);
});



const removeEquipmentFromTicket = asyncHandler(async (req, res) => {
  const { equipmentId } = req.body;

  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    res.status(404);
    throw new Error('Ticket no encontrado.');
  }

  ticket.equipment = ticket.equipment.filter((eq) => eq.toString() !== equipmentId);

  const equipment = await Equipment.findById(equipmentId);
  if (equipment) {
    equipment.assignedUser = null; // Liberar el equipo
    await equipment.save();
  }

  const user = await User.findById(req.user._id);
  if (user) {
    user.equipmentAssignments = user.equipmentAssignments.filter((eq) => eq.toString() !== equipmentId);
    await user.save();
  }

  const updatedTicket = await ticket.save();
  res.status(200).json(updatedTicket);
});



export {addEquipmentToTicket, getTicketsByUser, getTickets, createTicket,getTicketById, updateTicket, deleteTicket, addComment, removeEquipmentFromTicket, closeTicket, reopenTicket };