import express from 'express';
import {assignEquipmentToUser,updateEquipmentStatus, getEquipmentHistory, getAllEquipment, createEquipment, updateEquipment, deleteEquipment } from '../controllers/equipmentController.js';
import {protect} from '../middlewares/authMiddleware.js'

const router = express.Router();

router.get('/',protect, getAllEquipment); //obtener todos los equiposo
router.post('/',protect, createEquipment); //Crear un nuevo equipo
router.put('/:id',protect, updateEquipment); // Actualizar equipo
router.delete('/:id',protect ,deleteEquipment); // Eliminar equipo

router.post('/assign',protect,assignEquipmentToUser); // Asignar o reasignar equipo
router.put('/status', protect,updateEquipmentStatus); // Cambiar estado de equipo
router.get('/:equipmentId/history',protect, getEquipmentHistory); // Consultar historial de equipo

export default router;
