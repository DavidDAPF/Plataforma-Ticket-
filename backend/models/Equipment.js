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
    unique: true,
    validate: {
      validator: function(v) {
        if (this.type === 'peripheral') {
          return v === null || v === ''; // No se permite dirección IP para periferales
        } else {
          // Validación de IPv4 para hardware
          return /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(v);
        }
      },
      message: props => `${props.value} no es una dirección IPv4 válida para el tipo ${props.path === 'peripheral' ? 'peripheral' : 'hardware'}!`
    },
  },

  // ipAddress: {
  //   type: String,
  //   required: true,
  //   unique: true,
  //   validate: {
  //     validator: function(v){
  //       return /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(v);
  //     },
  //     message: props => `${props.value} no es una direccion Ipv4 valida!`
  //   },
  // },

  type: {
    type: String,
    enum: ['hardware', 'peripheral'],
    required: true,
  },
  assignedUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

// Pre-save hook para manejar la dirección IP de periferales
EquipmentSchema.pre('save', function(next) {
  if (this.type === 'peripheral') {
    this.ipAddress = null;
  }
  next();
});

const Equipment = mongoose.model('Equipment', EquipmentSchema);

export default Equipment;
