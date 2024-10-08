// src/routes/sculptureRoutes.js
const express = require('express');
const {
  getAllSculptures,
  createSculpture,
  getSculptureById,
  updateSculpture,
  deleteSculpture,
} = require('../controllers/sculptureController');

const router = express.Router();

// Middleware para registrar solicitudes
router.use((req, res, next) => {
  console.log(`Recibiendo ${req.method} en /api/sculptures${req.originalUrl}`);
  next();
});

// Rutas
router.get('/', getAllSculptures);
router.post('/', createSculpture);
router.get('/:id', getSculptureById);
router.put('/:id', updateSculpture);
router.delete('/:id', deleteSculpture);

module.exports = router;
