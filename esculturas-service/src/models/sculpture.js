// src/models/Sculpture.js
const mongoose = require('mongoose');

const SculptureSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  material: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Sculpture', SculptureSchema);
