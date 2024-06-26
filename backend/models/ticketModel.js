// backend/models/ticketModel.js
import { response } from 'express';
import mongoose from 'mongoose';

const commentSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ticketSchema = mongoose.Schema(
  {
    summary: {
      type: String,
      required:true,
    },
    description: {
      type: String,
      required: [true,'Por favor ingrese una descripcion'],
    },

    requester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Por favor ingrese el solicitante'],
    },

    priority: {
      type: String,
      required: true,
      enum: ['Alta', 'Media', 'Baja'],
      default: 'Media',
    },
    type: {
      type: String,
      required: true,
      enum: ['Software', 'Hardware', 'Recuperación de contraseña'],
      default: 'Software',
    },
    status: {
      type: String,
      required: true,
      enum: ['Nuevo', 'Abierto', 'Cerrado'],
      default: 'Nuevo',
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    comments: [commentSchema],
    response:{
      type: String
    },

    equipment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Equipment',
    },
  },
  {
    timestamps: true,
  }
);

const Ticket = mongoose.model('Ticket', ticketSchema);

export default Ticket;
