// src/app.js
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config();

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Proxy para el microservicio de autenticación
app.use('/api/auth', createProxyMiddleware({
  target: process.env.AUTH_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: { '^/api/auth': '' },
  onError: (err, req, res) => {
    console.error('Error en el proxy a autenticación:', err);
    res.status(500).send('Error en el servicio de autenticación');
  }
}));

// Proxy para el microservicio de esculturas
app.use('/api/sculptures', createProxyMiddleware({
  target: process.env.SCULPTURE_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: { '^/api/sculptures': '' },
  onError: (err, req, res) => {
    console.error('Error en el proxy a esculturas:', err);
    res.status(500).send('Error en el servicio de esculturas');
  },
  logLevel: 'debug', // Agregado para más información de depuración
}));

// Ruta de ejemplo
app.get('/', (req, res) => {
  res.send('API Gateway funcionando');
});

module.exports = app;
