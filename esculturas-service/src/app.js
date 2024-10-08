
const express = require('express');
const connectDB = require('./config/db');
const sculptureRoutes = require('./routes/sculptureRoutes');

const app = express();

// Conectar a la base de datos
connectDB();

// Middleware para parsear JSON
app.use(express.json());


// Rutas de esculturas
app.use('/api/sculptures', sculptureRoutes);

module.exports = app;
