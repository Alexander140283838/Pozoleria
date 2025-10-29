// models/usuario.js
const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  correo: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
}, {
  timestamps: true // guarda automáticamente createdAt y updatedAt
});

module.exports = mongoose.model('Usuario', usuarioSchema);
