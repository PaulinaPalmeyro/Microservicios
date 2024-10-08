// src/index.js
const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
