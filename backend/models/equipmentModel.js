import mongoose from 'mongoose';

const EquipmentSchema = new mongoose.Schema({
  // label seria el equivalente al codigo de patrimonio
  label: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  serialNumber: {
    type: String,
    required: true,
    unique: true,
  },
  ipAddress: {
    type: String,
    //unique: false,
    validate: {
      validator: function (v) {
        // Validación de IPv4 (opcional, solo si se proporciona)
        return !v || /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(v);
      },
      message: (props) => `${props.value} no es una dirección IPv4 válida.`,
    },
    // validate: {
    //   validator: function(v) {
    //     if (this.type === 'peripheral') {
    //       return v === null || v === ''; // No se permite dirección IP para periferales
    //     } else {
    //       // Validación de IPv4 para hardware
    //       return /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(v);
    //     }
    //   },
    //   message: props => `${props.value} no es una dirección IPv4 válida para el tipo ${props.path === 'peripheral' ? 'peripheral' : 'hardware'}!`
    // },
  },

  assignedUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  status: { 
    type: String,
    enum: ['activo','inactivo', 'inventario'], default: 'inventario'},

    // Campo para historial
  history: [
    {
      action: { type: String, required: true }, // Ejemplo: 'Asignado', 'Reasignado', 'Cambiado de estado'
      performedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Usuario que realizó la acción
      ticket: { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket', default: null }, // Ticket relacionado, si aplica
      previousState: { type: String, default: null }, // Estado previo, si aplica
      currentState: { type: String, default: null }, // Estado actual, si aplica
      date: { type: Date, default: Date.now }, // Fecha del evento
    },
  ],
});

// // Pre-save hook para manejar la dirección IP de periferales
// EquipmentSchema.pre('save', function(next) {
//   if (this.type === 'peripheral') {
//     this.ipAddress = null;
//   }
//   next();
// });

const Equipment = mongoose.model('Equipment', EquipmentSchema);

export default Equipment;
