// routes/userRoutes.js
import express from 'express';
import { createUser } from '../controllers/userControllers.js';

const router = express.Router();

router.post('/api/register', createUser);

export default router;
