# 📌 Día 2: CRUD con Mongoose en MongoDB

## 🔹 ¿Qué es Mongoose?
Mongoose es una biblioteca de modelado de datos para MongoDB y Node.js. Facilita la interacción con MongoDB proporcionando una capa de abstracción sobre la API nativa, permitiendo trabajar con esquemas, validaciones y modelos de datos de manera estructurada y eficiente. Es ampliamente utilizada en aplicaciones Node.js que requieren persistencia de datos en una base MongoDB.

🔍 Ventajas de usar Mongoose

✅ Permite definir esquemas que estructuran los documentos en MongoDB.

✅ Incluye validaciones integradas para garantizar la integridad de los datos.

✅ Facilita la creación de modelos para representar colecciones en la base de datos.

✅ Proporciona una API con métodos avanzados para consultas y manipulación de datos.

✅ Soporta middleware para ejecutar lógica antes o después de ciertas operaciones.

✅ Permite definir métodos personalizados en los modelos para extender su funcionalidad.



### ✨ Características principales de Mongoose
- Definición de **esquemas** Mongoose permite definir esquemas que describen la estructura de los documentos que se almacenarán en MongoDB. Un esquema es una plantilla que define los campos, tipos de datos, valores predeterminados, validaciones y más.

``` 
    const mongoose = require('mongoose');
    const Schema = mongoose.Schema;

    const userSchema = new Schema({
    name: { type: String, required: true },
    age: { type: Number, min: 18 },
    email: { type: String, unique: true, required: true }
    });
```

- **Modelado de datos** Un modelo es una clase que representa una colección en MongoDB. Se crea a partir de un esquema y proporciona métodos para realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar).

```
    const User = mongoose.model('User', userSchema);
```

- **Validaciones integradas** Mongoose incluye validaciones automáticas basadas en los esquemas. Por ejemplo, si un campo es requerido o debe ser único, Mongoose se encarga de validar estos requisitos antes de guardar los datos en la base de datos.

```
    const newUser = new User({ name: 'John', age: 17 });
        newUser.save((err) => {
        if (err) console.log(err); // Error: "age" debe ser mayor o igual a 18
    });
```

- **Métodos avanzados para consultas** Mongoose proporciona métodos como find, findOne, update, delete, entre otros, para realizar consultas y manipular datos de manera eficiente.

```
    User.find({ age: { $gte: 18 } }, (err, users) => {
    if (err) console.log(err);
    else console.log(users); // Lista de usuarios mayores de 18 años
    });
```

- **Middleware y hooks** Mongoose permite definir funciones de middleware (también conocidas como hooks) que se ejecutan antes o después de ciertas acciones, como guardar un documento o eliminarlo.

```
    userSchema.pre('save', function(next) {
        console.log('Guardando usuario...');
        next();
    });
```

- **Integración con MongoDB** Mongoose se conecta a MongoDB utilizando la API nativa del driver de MongoDB, pero simplifica su uso al proporcionar una interfaz más intuitiva y orientada a objetos.




---

## 🔹 Instalación y Configuración de Mongoose
Antes de comenzar, debemos instalar Mongoose en nuestro proyecto:
```bash
npm install mongoose
```
Luego, creamos una conexión a MongoDB utilizando nuestro archivo `mongoose_connection.js`:

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

Para utilizar la conexión en nuestro servidor:
```javascript
const connectDB = require('./mongoose_connection');
connectDB();
```

---

## 🔹 Definiendo un Esquema y Modelo en Mongoose
En Mongoose, los **esquemas** definen la estructura de los documentos dentro de una colección. Un **modelo** es una instancia de un esquema que permite interactuar con MongoDB.

Ejemplo de un esquema para usuarios:
```javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, min: 0 }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
```

---

## 🔹 Operaciones CRUD con Mongoose
### 📌 Crear un Documento (Create)
```javascript
const newUser = new User({ name: 'John Doe', email: 'john@example.com', age: 30 });
await newUser.save();
console.log('Usuario guardado:', newUser);
```

### 📌 Leer Documentos (Read)
```javascript
const users = await User.find();
console.log('Usuarios:', users);
```

### 📌 Actualizar un Documento (Update)
```javascript
await User.updateOne({ email: 'john@example.com' }, { age: 31 });
console.log('Usuario actualizado');
```

### 📌 Eliminar un Documento (Delete)
```javascript
await User.deleteOne({ email: 'john@example.com' });
console.log('Usuario eliminado');
```

---

## 🔹 Conclusión
Mongoose facilita la interacción con MongoDB al proporcionar un sistema de modelado estructurado. En los próximos días, exploraremos validaciones avanzadas, relaciones entre modelos y optimización de consultas.

