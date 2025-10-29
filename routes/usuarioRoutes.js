// routes/usuarioRoutes.js
const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario');

// 🟢 Registrar un nuevo usuario
router.post('/registro', async (req, res) => {
  try {
    const { nombre, correo, password } = req.body;

    // Validar campos obligatorios
    if (!nombre || !correo || !password) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    // Verificar si ya existe un usuario con ese correo
    const existe = await Usuario.findOne({ correo });
    if (existe) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    // Crear usuario
    const nuevoUsuario = new Usuario({ nombre, correo, password });
    await nuevoUsuario.save();

    res.status(201).json({ message: '✅ Usuario registrado correctamente', usuario: nuevoUsuario });
  } catch (error) {
    res.status(500).json({ message: '❌ Error al registrar usuario', error: error.message });
  }
});

module.exports = router;
