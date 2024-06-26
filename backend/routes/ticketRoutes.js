// import express from 'express';
// import { createTicket, getTickets, getTicketById, updateTicket, deleteTicket } from '../controllers/ticketController.js';
// import { protect } from '../middlewares/authMiddleware.js';

// const router = express.Router();

// router.route('/')
//   .post(protect, createTicket)
//   .get(protect, getTickets);

// router.route('/:id')
//   .get(protect, getTicketById)
//   .put(protect, updateTicket)
//   .delete(protect, deleteTicket);

// export default router;
// import express from 'express';
// import { getTickets, createTicket, updateTicket, deleteTicket } from '../controllers/ticketControllers.js';

// const router = express.Router();

// router.get('/', getTickets);
// router.post('/', createTicket);
// router.put('/:id', updateTicket);
// router.delete('/:id', deleteTicket);

// export default router;
// import express from 'express';
// import { createTicket, getTickets, updateTicket, deleteTicket, getTicketById, reopenTicket, assignTicket } from '../controllers/ticketControllers.js';
// import { protect } from '../middleware/authMiddleware.js';

// const router = express.Router();

// router.post('/', protect, createTicket);
// router.patch('/:id/reopen', protect, reopenTicket);
// router.patch('/:id/assign', protect, assignTicket);

// export default router;

// backend/routes/ticketRoutes.js
// import express from 'express';
// const router = express.Router();
// import { protect } from '../middlewares/authMiddleware.js';
// import {
//   createTicket,
//   getTickets,
//   updateTicket,
//   deleteTicket,
//   getTicketById,
// } from '../controllers/ticketControllers.js';

// router.route('/').post(protect, createTicket).get(protect, getTickets);
// router
//   .route('/:id')
//   .get(protect, getTicketById)
//   .put(protect, updateTicket)
//   .delete(protect, deleteTicket);

// export default router;


// backend/routes/ticketRoutes.js
// import express from 'express';
// import {createTicket, getTickets, getTicketById, updateTicket, deleteTicket, getAllTickets } from '../controllers/ticketControllers.js';
// import { protect } from '../middlewares/authMiddleware.js';

// const router = express.Router();

// router.post('/', protect, createTicket);
// router.put('/:id', protect, updateTicket);
// router.get('/:id', protect, getTickets);
// router.delete('/:id', protect, deleteTicket);
// router.get('/', protect, getAllTickets);

// export default router;


// backend/routes/ticketRoutes.js
// import express from 'express';
// import {
//   createTicket,
//   getTickets,
//   getTicketById,
//   updateTicket,
//   deleteTicket,
//   getAllTickets,
//   addComment
// } from '../controllers/ticketControllers.js';
// import { protect } from '../middlewares/authMiddleware.js';

// const router = express.Router();

// // Agrupar rutas por método HTTP
// router.route('/').post(protect, createTicket).get(protect, getAllTickets);
// router.route('/:id')
//   .get(protect, getTicketById)
//   .put(protect, updateTicket)
//   .delete(protect, deleteTicket);
// router.post('/:id/comments', protect, addComment);

// export default router;

import express from 'express';
import { createTicket, getTicketById, updateTicket, deleteTicket, getAllTickets, addComment } from '../controllers/ticketControllers.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createTicket); // Crear ticket
router.put('/:id', protect, updateTicket); // Actualizar ticket
router.get('/:id', protect, getTicketById); // Obtener ticket por ID
router.delete('/:id', protect, deleteTicket); // Eliminar ticket
router.get('/', protect, getAllTickets); // Obtener todos los tickets
router.post('/:id/comments', protect, addComment); // Agregar comentario a un ticket

export default router;
