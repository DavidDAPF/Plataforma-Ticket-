import express from 'express';
import { createEquipment, getEquipments, updateEquipment, deleteEquipment } from '../controllers/equipmentController.js';

const router = express.Router();

router.post('/', createEquipment);
router.get('/', getEquipments);
router.put('/:id', updateEquipment);
router.delete('/:id', deleteEquipment);

export default router;
