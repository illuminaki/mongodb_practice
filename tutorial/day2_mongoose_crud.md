# 📌 Día 2: Poblar, Clonar y Ofuscar Bases de Datos en MongoDB

## 🎯 Objetivo General
En este Día 2, aprenderás a poblar bases de datos con datos masivos (seeds), clonar bases existentes con `mongodump` y `mongorestore`, y ofuscar datos sensibles para trabajar localmente. Esto te preparará para optimizar bases grandes con índices y visualizarlas en el Día 3 con **Mongo Express**.

---

## 🔹 1. Poblar Bases de Datos con Seeds
### 📖 Teoría:
- **¿Qué son los seeds?** Son datos iniciales generados para pruebas o desarrollo, similares a los "seeds" en Rails.
- En MongoDB, no hay un comando nativo para seeds, pero podemos usar scripts o herramientas como `faker-js` en Node.js para generarlos.

### 🛠 Práctica con `faker-js`:
Usaremos un script en Node.js para generar datos masivos.

#### 📌 Instalación de `faker-js`:
```bash
npm install @faker-js/faker
```

#### 📌 Ejemplo de script (`seed.js`) para poblar la colección `users` con 1000 documentos:
```javascript
const { MongoClient } = require('mongodb');
const { faker } = require('@faker-js/faker');

async function seedDB() {
  const uri = "mongodb://root:example@localhost:27017/mydatabase?authSource=admin";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db('mydatabase');
    const collection = db.collection('users');

    // Generar 1000 usuarios falsos
    const users = Array.from({ length: 1000 }, () => ({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      age: faker.number.int({ min: 18, max: 80 }),
      createdAt: faker.date.past(),
      address: {
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        country: faker.location.country()
      }
    }));

    await collection.insertMany(users);
    console.log("¡Base de datos poblada con éxito!");
  } catch (error) {
    console.error("Error al poblar la base de datos:", error);
  } finally {
    await client.close();
  }
}

seedDB();
```

---

## 🔹 2. Clonar Bases de Datos con `mongodump` y `mongorestore`
### 📖 Teoría:
- `mongodump`: Comando que extrae una copia de una base de datos en formato BSON.
- `mongorestore`: Restaura una base de datos desde un backup creado con `mongodump`.

### 🛠 Práctica:
#### 📌 **Crear un backup** de la base de datos `mydatabase`:
```bash
mongodump --host localhost --port 27017 -u root -p example --authenticationDatabase admin --db mydatabase --out backup/
```

#### 📌 **Restaurar el backup** en una nueva base de datos `mydatabase_clone`:
```bash
mongorestore --host localhost --port 27017 -u root -p example --authenticationDatabase admin --db mydatabase_clone backup/mydatabase/
```

---

## 🔹 3. Ofuscación de Datos Sensibles
### 📖 Teoría:
- La ofuscación es el proceso de modificar datos sensibles para proteger la privacidad de los usuarios.
- Se usa en entornos de desarrollo o pruebas para evitar exponer información real.

### 🛠 Práctica con `updateMany()`:
Podemos ofuscar correos electrónicos y nombres en la base de datos:
```javascript
const { MongoClient } = require('mongodb');
const { faker } = require('@faker-js/faker');

async function obfuscateData() {
  const uri = "mongodb://root:example@localhost:27017/mydatabase?authSource=admin";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db('mydatabase');
    const collection = db.collection('users');

    // Ofuscar datos
    const users = await collection.find().toArray();
    for (const user of users) {
      await collection.updateOne(
        { _id: user._id },
        { $set: { name: faker.person.fullName(), email: faker.internet.email() } }
      );
    }
    console.log("¡Datos ofuscados con éxito!");
  } catch (error) {
    console.error("Error al ofuscar los datos:", error);
  } finally {
    await client.close();
  }
}

obfuscateData();
```

---

## ✅ Conclusión
Hoy aprendimos a poblar bases de datos con `faker-js`, a clonar bases con `mongodump` y `mongorestore`, y a proteger datos sensibles con ofuscación. ¡En el Día 3 veremos cómo optimizar estas bases con índices y visualizarlas en **Mongo Express**!

