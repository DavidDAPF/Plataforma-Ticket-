import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import ticketRoutes from './routes/ticketRoutes.js';
import equipmentRoutes from './routes/equipmentRoutes.js';
import locationRoutes from './routes/locationRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
connectDB();

// Middleware
app.use(express.json());
app.use(cors({origin: 'http://localhost:5173'}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/equipment', equipmentRoutes);
app.use('/api/locations', locationRoutes);
app.use('api/users', userRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Conectado a MongoDB');
  app.listen(PORT, () => {
    console.log(`Server corriendo en el puerto ${PORT}`);
  });
})
.catch((err) => {
  console.error('Error al conectar a MongoDB', err);
});
