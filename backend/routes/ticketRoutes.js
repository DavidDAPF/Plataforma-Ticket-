// routes/ticketRoutes.js
import express from 'express';
import {getTicketsByUser, createTicket, getTicketById, updateTicket, deleteTicket, addComment,getTickets } from '../controllers/ticketControllers.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createTicket); // Crear ticket
router.put('/:id', protect, updateTicket); // Actualizar ticket
router.get('/:id', protect, getTicketById); // Obtener ticket por ID
router.delete('/:id', protect, deleteTicket); // Eliminar ticket
router.get('/', protect, getTickets); // Obtener todos los tickets segun el rol
router.post('/:id/comments', protect, addComment); // Agregar comentario a un ticket
router.get('/user/:userId', protect, getTicketsByUser ); //para obtener los tickets de el id del usaurio

export default router;
