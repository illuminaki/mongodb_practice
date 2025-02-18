## 🔹 Introducción a Mongoose
Mongoose es una librería de Node.js que proporciona una capa de abstracción sobre MongoDB, facilitando la validación, estructuración y manipulación de datos.

### 📦 Instalación de Mongoose
Si aún no lo tienes instalado, agrégalo a tu proyecto con:
```bash
npm install mongoose
```

### 📌 Conectando Mongoose a MongoDB
```javascript
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('🔥 MongoDB Connected Successfully');
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err);
    process.exit(1);
  }
};

module.exports = connectDB;
```
Esto permite conectar Mongoose a la base de datos definida en `MONGO_URI`.

### 📌 Creación de un Modelo en Mongoose
Los modelos en Mongoose definen la estructura de los documentos dentro de una colección.
```javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
```

Con esto, podemos interactuar con la colección `users` desde Node.js de manera estructurada.

## ✅ Resumen del Día 1
- Entendimos qué es MongoDB y cómo funciona.
- Instalamos y configuramos MongoDB con Docker.
- Aprendimos a conectarnos desde la terminal usando `mongosh`.
- Exploramos operaciones básicas como CRUD (Crear, Leer, Actualizar y Eliminar).
- Introdujimos Mongoose para trabajar con MongoDB en Node.js de manera más sencilla.

🎯 **En el Día 2 exploraremos Mongoose en profundidad, creando modelos y operaciones avanzadas.**

