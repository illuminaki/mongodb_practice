# 📌 Día 1: Introducción a MongoDB

## 🔹 ¿Qué es MongoDB?
MongoDB es una base de datos NoSQL orientada a documentos que almacena información en formato **JSON (BSON internamente)**. A diferencia de las bases de datos relacionales, **MongoDB no usa tablas ni esquemas rígidos**, lo que lo hace muy flexible y escalable. Su modelo de documentos permite almacenar estructuras complejas de datos y facilita la escalabilidad horizontal.

## 🔹 Instalación y Configuración (Docker)
En este curso, usaremos **Docker** para ejecutar MongoDB sin necesidad de instalarlo manualmente. Ya hemos configurado el `docker-compose.yml` para iniciar MongoDB automáticamente.

Para asegurarte de que MongoDB está corriendo, usa:
```bash
docker ps
```
Esto debería mostrar un contenedor corriendo con la imagen `mongo:6`.

Si no está corriendo, puedes iniciarlo con:
```bash
docker compose up -d
```

## 🔹 Conectarse a MongoDB desde la Terminal
Usaremos `mongosh` para conectarnos a la base de datos con autenticación:
```bash
docker exec -it mongodb_container mongosh "mongodb://root:example@localhost:27017/"
```
Esto abrirá el shell interactivo de MongoDB con el usuario y contraseña definidos en `docker-compose.yml`.

## 🔹 Conceptos Claves en MongoDB
MongoDB maneja los siguientes conceptos básicos:
- **Base de datos (Database)**: Conjunto de colecciones.
- **Colección (Collection)**: Conjunto de documentos (similar a una tabla en SQL).
- **Documento (Document)**: Unidad de almacenamiento de datos en formato JSON/BSON.

## 🔹 Comandos Básicos en MongoDB

### 📂 Crear una Base de Datos
```javascript
use my_database
```
Si la base de datos no existe, MongoDB la creará cuando insertes datos.

### 📄 Crear una Colección e Insertar Datos
```javascript
db.users.insertOne({
  name: "John Doe",
  age: 30,
  email: "johndoe@example.com"
})
```
Esto crea una colección llamada `users` e inserta un documento dentro de ella.

También se pueden insertar múltiples documentos a la vez:
```javascript
db.users.insertMany([
  { name: "Alice", age: 25, email: "alice@example.com" },
  { name: "Bob", age: 28, email: "bob@example.com" }
])
```

### 🔍 Leer Datos
```javascript
db.users.find()
```
Muestra todos los documentos en la colección `users`.

Para formatear los datos de manera más legible:
```javascript
db.users.find().pretty()
```

Para buscar documentos con una condición específica:
```javascript
db.users.find({ age: { $gt: 25 } })
```
Esto muestra todos los usuarios cuya edad sea mayor a 25.

### ✏️ Actualizar un Documento
```javascript
db.users.updateOne(
  { name: "John Doe" },
  { $set: { age: 31 } }
)
```
Actualiza la edad del usuario `John Doe` a 31.

Para actualizar múltiples documentos que cumplan una condición:
```javascript
db.users.updateMany(
  { age: { $lt: 30 } },
  { $set: { category: "young" } }
)
```
Esto agregará un campo `category` con el valor `young` a todos los usuarios menores de 30 años.

### 🗑️ Eliminar un Documento
```javascript
db.users.deleteOne({ name: "John Doe" })
```
Elimina el usuario con el nombre `John Doe`.

Para eliminar múltiples documentos:
```javascript
db.users.deleteMany({ age: { $lt: 25 } })
```
Elimina todos los usuarios cuya edad sea menor a 25.

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

