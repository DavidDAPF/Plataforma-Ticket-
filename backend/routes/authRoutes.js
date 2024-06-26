import express from 'express';
import { register, login, getUserProfile, requestPasswordReset, resetPassword } from '../controllers/authController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', protect, getUserProfile);
router.post('/request-password-reset', requestPasswordReset)
//router.post('/reset-password/:token', resetPassword);
router.put('/reset-password/:token', resetPassword);
export default router;
