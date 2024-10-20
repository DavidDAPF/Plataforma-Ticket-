import asyncHandler from 'express-async-handler';
import Ticket from '../models/ticketModel.js';
import User from '../models/userModel.js';
import Equipment from '../models/Equipment.js';
//import CreateTicket from '../../src/pages/Tickets.jsx';
import mongoose from 'mongoose';
import { response } from 'express';

// @desc    Create new ticket
// @route   POST /api/tickets
// @access  Private
const createTicket = asyncHandler(async (req, res) => {
  const { title, description, priority, type, status, assignedTo, equipment } = req.body;
  const requester = req.user._id;

  //console.log('Request Body:', req.body);
  //console.log('Summary:', summary);

  const summary = title;
    
  if (!summary) {
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
    summary,
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

// @desc    Get all tickets
// @route   GET /api/tickets
// @access  Private
const getAllTickets = asyncHandler(async (req, res) => {
  const tickets = await Ticket.find({}).populate('equipment', 'label');
  res.json(tickets);
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



// @desc    Update ticket
// @route   PUT /api/tickets/:id
// @access  Private
const updateTicket = asyncHandler(async (req, res) => {
  const { summary, description, requester, priority, type, status, assignedTo, comments, response, equipment } = req.body;

  const ticket = await Ticket.findById(req.params.id);

  if (ticket) {
    ticket.summary = summary || ticket.summary;
    ticket.description = description || ticket.description;
    ticket.requester = requester || ticket.requester;
    ticket.priority = priority || ticket.priority;
    ticket.type = type || ticket.type;
    ticket.status = status || ticket.status;
    ticket.assignedTo = assignedTo || ticket.assignedTo;
    ticket.response = response || ticket.response;

    if (assignedTo) {
      const assignedUser = await User.findOne({ email: assignedTo });
      if (!assignedUser) {
        res.status(400);
        throw new Error('Usuario asignado no encontrado');
      }
      ticket.assignedTo = assignedUser._id;
    }

      if (Array.isArray(equipment)) {
        const assignedEquipment = await Equipment.find({ _id: { $in: equipment } });
        ticket.equipment = assignedEquipment.map(e => e._id);
      } else {
        res.status(400);
        throw new Error('El campo "equipment" debe ser un array');
      //}
      }

    if (comments) {
      ticket.comments.push({
        user: req.user._id,
        text: comments,
        //comments
        date: new Date(),
      });
    }

    const updatedTicket = await ticket.save();
    res.json(updatedTicket);
  } else {
    res.status(404);
    throw new Error('Ticket no encontrado');
  }
});

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

export {getTicketsByUser, createTicket, getAllTickets, getTicketById, updateTicket, deleteTicket, addComment };