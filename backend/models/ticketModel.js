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
    title: {
      type: String,
      required:function (){
        return this.isNew
      },
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
      enum: ['Software', 'Hardware'],
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

    response: {
       type: String, 
       default: '' 
      }, // Respuesta inicial del técnico

    equipment: [
      {
        _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Equipment' },
        label: { type: String, required: true },
      },
    ], //Equipo pasa a ser un array
  },
  {
    timestamps: true,
  }
);

const Ticket = mongoose.model('Ticket', ticketSchema);

export default Ticket;
