import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ['Usuario', 'Soporte'],
    default: 'Usuario',
  },

  //Campo de equipos asignados
  equipmentAssignments: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Equipment',
    }],
    default: [], // Asegura que siempre sea un arreglo vacío
  },
  
  resetPasswordToken: String,
  resetPasswordExpire: Date,
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

export default User;
