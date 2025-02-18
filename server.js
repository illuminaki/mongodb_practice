const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes'); // Importa las rutas

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://root:example@mongodb:27017/mydatabase?authSource=admin';

// Middleware para parsear JSON
app.use(express.json());

// Conectar a MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('🔥 Conectado a MongoDB'))
  .catch(err => console.error('❌ Error al conectar a MongoDB:', err));

// Cargar rutas
app.use('/api/users', userRoutes);

// Ruta base
app.get('/', (req, res) => {
  res.send('¡MongoDB y Node.js conectados con éxito en Docker!');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});


