import mongoose from 'mongoose';

const EquipmentSchema = new mongoose.Schema({
  // label seria el equivalente al codigo del equipo 
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
    validate: {
      validator: function (v) {
        // Validación de IPv4 (opcional, solo si se proporciona)
        return !v || /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(v);
      },
      message: (props) => `${props.value} no es una dirección IPv4 válida.`,
    },
  },

  assignedUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', //referencia a la coleccion usuarios
    default: null, // puede no estar asignado a ningun usuario
  },
  status: { 
    type: String,
    enum: ['activo',    //Estado disponible y/o asignado a usuario
           'inactivo',  //No esta disponible o dado de baja
           'inventario' //Nuevo pero no asignado o guardado 
          ], 
    default: 'inventario'},

    // Campo para historial
  history: [
    {
      action: { type: String, required: true }, // Ejemplo: 'Asignado', 'Reasignado', 'Cambiado de estado'
      performedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Usuario que realizó la acción
      ticket: { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket', default: null }, // Ticket relacionado, si aplica
      previousState: { type: String, default: null }, // Estado previo, si aplica
      currentState: { type: String, default: null }, // Estado actual, si aplica
      //previousState: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
      //currentState: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
      date: { type: Date, default: Date.now }, // Fecha del evento
    },
  ],
});


const Equipment = mongoose.model('Equipment', EquipmentSchema);

export default Equipment;
