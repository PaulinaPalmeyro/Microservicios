
const Sculpture = require('../models/sculpture');

// Obtener todas las esculturas
const getAllSculptures = async (req, res) => {
  try {
    const sculptures = await Sculpture.find();
    res.json(sculptures);
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo las esculturas' });
  }
};

// Crear una nueva escultura
const createSculpture = async (req, res) => {
  try {
    const { name, artist, year, material, location } = req.body;
    const newSculpture = new Sculpture({ name, artist, year, material, location });
    await newSculpture.save();
    res.status(201).json(newSculpture);
  } catch (error) {
    res.status(500).json({ error: 'Error creando la escultura' });
  }
};

// Obtener una escultura por ID
const getSculptureById = async (req, res) => {
  try {
    const sculpture = await Sculpture.findById(req.params.id);
    if (!sculpture) {
      return res.status(404).json({ error: 'Escultura no encontrada' });
    }
    res.json(sculpture);
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo la escultura' });
  }
};

// Actualizar una escultura
const updateSculpture = async (req, res) => {
  try {
    const updatedSculpture = await Sculpture.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedSculpture) {
      return res.status(404).json({ error: 'Escultura no encontrada' });
    }
    res.json(updatedSculpture);
  } catch (error) {
    res.status(500).json({ error: 'Error actualizando la escultura' });
  }
};

// Eliminar una escultura
const deleteSculpture = async (req, res) => {
  try {
    const deletedSculpture = await Sculpture.findByIdAndDelete(req.params.id);
    if (!deletedSculpture) {
      return res.status(404).json({ error: 'Escultura no encontrada' });
    }
    res.json({ message: 'Escultura eliminada' });
  } catch (error) {
    res.status(500).json({ error: 'Error eliminando la escultura' });
  }
};

module.exports = {
  getAllSculptures,
  createSculpture,
  getSculptureById,
  updateSculpture,
  deleteSculpture,
};
