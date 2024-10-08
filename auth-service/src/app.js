
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Conectar a la base de datos
connectDB();

// Middleware para parsear JSON
app.use(express.json());

// Ruta de ejemplo
app.get('/', (req, res) => {
  res.send('API de Autenticación funcionando');
});

// Rutas de autenticación
app.use('/api/auth', authRoutes);

module.exports = app;
