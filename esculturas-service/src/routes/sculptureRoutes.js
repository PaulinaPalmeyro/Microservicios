
const express = require('express');
const {
  getAllSculptures,
  createSculpture,
  getSculptureById,
  updateSculpture,
  deleteSculpture,
} = require('../controllers/sculptureController');

const router = express.Router();

// Rutas
router.get('/', getAllSculptures);
router.post('/', createSculpture);
router.get('/:id', getSculptureById);
router.put('/:id', updateSculpture);
router.delete('/:id', deleteSculpture);

module.exports = router;
