// server.js
const express = require('express');
const connectDB = require('./mongoose_connection'); // Asegúrate de que la ruta sea correcta

const app = express();
const port = process.env.PORT || 3000;

// Conectar a la base de datos
connectDB();

// Configurar middleware y rutas
app.use(express.json());

// Ruta de ejemplo
app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
