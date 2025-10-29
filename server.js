const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// 🔹 Importar las rutas
const productoRoutes = require('./routes/productoRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes'); // 🔹 NUEVA RUTA DE USUARIOS

const app = express();

// 🔹 Configuración de CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

// 🔹 Middleware para leer JSON
app.use(express.json());

// 🔹 Ruta de prueba para Android
app.get('/api/ping', (req, res) => {
  res.json({ message: '✅ Conexión exitosa con el backend desde Android!' });
});

// 🔹 Usar las rutas
app.use('/api/productos', productoRoutes);
app.use('/api/usuarios', usuarioRoutes); // 🔹 Aquí conectamos las rutas de usuario

// 🔹 Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Conectado a MongoDB Atlas');

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Error al conectar MongoDB:', err.message);
  });
