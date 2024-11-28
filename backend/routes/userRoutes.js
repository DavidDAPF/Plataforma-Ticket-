// routes/userRoutes.js
import express from 'express';
import { createUser, getAssignedEquipment, getAllUsers, hasAllEquipmentAssigned } from '../controllers/userControllers.js';
import { protect } from '../middlewares/authMiddleware.js';
import { assignEquipmentToUser } from '../controllers/equipmentController.js';
const router = express.Router();

router.post('/register', protect, createUser);
router.get('/equipment/:userId', protect,getAssignedEquipment)
router.get('/has-all-equipment/:userId', protect, hasAllEquipmentAssigned);
router.get('/assigned/:userId', protect, getAssignedEquipment);
router.get('/', protect, getAllUsers);
router.post('/assign-equipment',protect,assignEquipmentToUser)

export default router;
