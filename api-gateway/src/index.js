// api-gateway/index.js
const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Importar CORS
require('dotenv').config();

const app = express();

app.use(cors()); // Habilitar CORS
app.use(express.json()); // Middleware para parsear JSON

// Rutas de Autenticación
app.use('/api/auth', (req, res) => {
    const url = `${process.env.AUTH_SERVICE_URL}${req.originalUrl.replace('/api/auth', '')}`;
    axios({ method: req.method, url, data: req.body })
        .then(response => {
            res.status(response.status).send(response.data);
        })
        .catch(error => {
            res.status(error.response.status).send(error.response.data);
        });
});

// Rutas de Esculturas
app.use('/api/sculptures', (req, res) => {
    const url = `${process.env.SCULPTURE_SERVICE_URL}${req.originalUrl.replace('/api/sculptures', '')}`;
    axios({ method: req.method, url, data: req.body })
        .then(response => {
            res.status(response.status).send(response.data);
        })
        .catch(error => {
            res.status(error.response.status).send(error.response.data);
        });
});


// Escuchar en el puerto especificado
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API Gateway listening on port ${PORT}`);
});
