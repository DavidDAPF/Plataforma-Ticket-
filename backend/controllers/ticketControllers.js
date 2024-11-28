import asyncHandler from 'express-async-handler';
import Ticket from '../models/ticketModel.js';
import User from '../models/userModel.js';
import Equipment from '../models/equipmentModel.js';
//import CreateTicket from '../../src/pages/Tickets.jsx';
import mongoose from 'mongoose';
import { response } from 'express';

// @desc    Create new ticket
// @route   POST /api/tickets
// @access  Private
const createTicket = asyncHandler(async (req, res) => {
  const {title, description, priority, type, status, assignedTo } = req.body;
  const requester = req.user._id;

  //console.log('Request Body:', req.body);
  //console.log('Summary:', summary);

  //const summary = title;
    
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
    assignedUser = await User.findOne({ email: assignedTo });
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
    assignedTo: assignedUser ? assignedUser._id : null,
    comments: [],
    
  });

  const createdTicket = await ticket.save();
  res.status(201).json(createdTicket);
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
    .populate("assignedTo", "name email")
    .populate('requester', 'name email');
  } else {
    // Si el usuario no es técnico, solo obtiene sus propios tickets
    tickets = await Ticket.find({ requester: req.user._id })
      .populate('equipment', 'label')
      .populate("assignedTo", "name email")
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
  const ticket = await Ticket.findById(req.params.id).populate('equipment', 'label');

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
  const updatedTicket = await Ticket.findByIdAndUpdate(
    req.params.id,
    req.body, // Solo los campos enviados serán actualizados
    { new: true, runValidators: true } // `new: true` retorna el documento actualizado
  ).populate("assignedTo","name email"); // asegura que el modelo tenga una regerencia valida

  if (!updatedTicket) {
    res.status(404);
    throw new Error("Ticket no encontrado");
  }

  res.status(200).json(updatedTicket);
});


export default updateTicket;


// @desc    Delete ticket
// @route   DELETE /api/tickets/:id
// @access  Private
const deleteTicket = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);

  if (ticket) {
    await ticket.remove();
    res.json({ message: 'Ticket removido' });
  } else {
    res.status(404);
    throw new Error('Ticket no encontrado');
  }
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

  // Buscar el ticket por ID
  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    res.status(404);
    throw new Error('Ticket no encontrado.');
  }

  // Verificar si el equipo ya está asignado al ticket
  const alreadyAssigned = ticket.equipment.some(
    (eq) => eq.toString() === equipmentId
  );

  if (alreadyAssigned) {
    res.status(400);
    throw new Error('El equipo ya está asignado a este ticket.');
  }

  // Agregar el equipo al array de equipos del ticket
  ticket.equipment.push(equipment._id);

  // Guardar los cambios
  const updatedTicket = await ticket.save();

  res.status(200).json(updatedTicket);
});

// const closeTicket = async (req, res) => {
//   try {
//     const { ticketId } = req.params;
//     const userId = req.user.id; // Usuario autenticado (extraído del token)

//     // Buscar el ticket
//     const ticket = await Ticket.findById(ticketId);

//     if (!ticket) {
//       return res.status(404).json({ message: 'Ticket no encontrado' });
//     }

//     // Cambiar el estado del ticket a cerrado
//     ticket.status = 'Cerrado';

//     // Registrar la acción en el historial
//     ticket.history.push({
//       action: 'Cerrado',
//       performedBy: userId,
//       date: new Date(),
//     });

//     await ticket.save();

//     res.json({ message: 'Ticket cerrado con éxito', ticket });
//   } catch (error) {
//     console.error('Error al cerrar el ticket:', error);
//     res.status(500).json({ message: 'Error al cerrar el ticket' });
//   }
// };


export {addEquipmentToTicket, getTicketsByUser, getTickets, createTicket,getTicketById, updateTicket, deleteTicket, addComment };