# 📌 Día 2: Poblar, Clonar y Ofuscar Bases de Datos en MongoDB

En este Día 2, aprenderás a poblar bases de datos con datos masivos (seeds), clonar bases existentes con `mongodump` y `mongorestore`, y ofuscar datos sensibles para trabajar localmente. Esto te preparará para optimizar bases grandes con índices y visualizarlas en el Día 3 con Mongo Express.

---

## 🔹 Poblar Bases de Datos con Seeds

### 📖 Teoría:
- **¿Qué son los seeds?** Datos iniciales generados para pruebas o desarrollo, similares a los encontrados en entorno de production en cuanto a estructura y cantidad de datos.
- En MongoDB, no hay un comando nativo para seeds, pero podemos usar scripts o herramientas como `faker-js` en Node.js.

### 🛠 Práctica con faker-js:
Usaremos un script en Node.js para generar datos masivos. Necesitarás instalar faker, en esta app de ejemplo ya lo tenemos instalado pero lo puedes hacer con el siguiente comando:
```bash
npm install @faker-js/faker
```

Ejemplo de script [para poblar la colección `users` con 1000 documentos:](/seed.js)

Lo que debes hacer luego de crear un script como el anterior es correr dicho script para enviar los datos de prueba a nuestra base de datos, para ello debes estar en la raiz del proyecto y correr el siguiente comando 
```bash
node seed.js
```
Lo anterior deberia reponder el siguiente mensaje "¡Base de datos poblada con éxito!"

### 🛠 Casos de Uso:

El script anterior (seed.js) es una herramienta poderosa para poblar una base de datos MongoDB con datos ficticios pero realistas. Su propósito principal es crear un entorno de pruebas que simule condiciones reales sin necesidad de datos de producción sensibles. En este caso:

Qué hace: Conecta a una instancia local de MongoDB, genera 1000 documentos con datos falsos (nombres, correos, edades, direcciones) usando faker-js, los inserta en la colección users y cierra la conexión.
Eficiencia: Usa insertMany para inserciones masivas, lo que es mucho más rápido que insertar documentos uno por uno.
Robustez: Incluye manejo de errores y asegura que la conexión se cierre incluso si algo falla.
¿En qué casos se usa?

Desarrollo local: Cuando un desarrollador necesita probar una aplicación sin acceso a datos reales.
Pruebas de rendimiento: Para evaluar cómo se comporta una base de datos con grandes volúmenes de datos.
Demostraciones: Para preparar datos de ejemplo para presentaciones o tutoriales sin exponer información sensible.
QA (Control de Calidad): Equipos de testing pueden usarlo para simular escenarios realistas y detectar bugs.

Ejemplos reales de uso de Faker:
E-commerce: Un desarrollador trabajando en una tienda online podría usar Faker para generar miles de usuarios, productos y órdenes de compra. Por ejemplo, crear clientes con nombres, direcciones y fechas de registro para probar el sistema de envíos.
Aplicaciones de salud: Simular registros de pacientes (sin datos reales) con edades, fechas de citas y direcciones para probar una app de gestión hospitalaria.
Redes sociales: Generar perfiles de usuario ficticios con nombres, emails y fechas de creación para probar funcionalidades como búsqueda o recomendaciones.
Fintech: Crear datos de transacciones ficticias con montos, fechas y usuarios para probar sistemas de análisis financiero sin violar regulaciones de privacidad.
En resumen, herramientas como faker-js combinadas con scripts como este son esenciales en el ciclo de desarrollo moderno, permitiendo a los equipos trabajar de manera segura, eficiente y realista sin depender de datos sensibles o entornos de producción.

---

## 🔹 Clonar Bases de Datos con mongodump y mongorestore

### 📖 Usando `mongodump`
`mongodump` es una herramienta de línea de comandos que permite hacer un backup de una base de datos MongoDB. Crea un archivo BSON que contiene los datos de la base de datos.

#### 📌 Sintaxis básica:
```bash
mongodump --host <hostname> --port <port> --db <database_name> --out <backup_directory>
```

#### 📌 En el caso de una instancia de docker:
```bash
docker exec -it mongodb_container mongodump --uri "mongodb://root:example@localhost:27017/mydatabase?authSource=admin" --out /dump
```
El anterior comando nos permitira realizar una copia de nuestra db dentro de la instancia de docker pero si queremos sacarla del contedor y contar con la data en nuestro entorno local no virtualizado, podriamos aplicar el siguiente comando y llevarlo a una carpeta dentro de nuestro proyecto

#### 📌 Opciones comunes:
- `--host`: Especifica el host de la base de datos.
- `--port`: Especifica el puerto (por defecto es 27017).
- `--db`: Especifica la base de datos a respaldar.
- `--out`: Especifica el directorio donde se guardará el backup.
- `--username` y `--password`: Para autenticación si la base de datos requiere credenciales.

El siguiente comando va a crear la carpeta mongo_backup con los archivos que necesitaremos para realizar la restauracion de nuestros datos.


```bash
docker cp mongodb_container:/dump ./mongo_backup
```
verifica la ruta mongo_backup/mydatabase/ deberias tener algo como mongo_backup/mydatabase/users.bson y mongo_backup/mydatabase/users.metadata.json

#### 🔹 Restauracion de copias de db:
En nuestro caso acabamos de copiar una base de datos mydatabase que usaremos de ejemplo para restaurar por ende como ya esta creada en nuestro entorno debemos eliminarla antes de restaurarla si te llevas esta copia a una maquina diferente deberias podes salrtarte la section de eliminacion y pasar directamnete a la restauracion pero en nuestro caso eliminaremos primero mydatabase.

### 🛠 Step 1 Eliminacion de db:
Delete the mydatabase Database
You’re already connected to your MongoDB container via mongosh. Here’s how to delete the mydatabase database:

Commands in mongosh:
```bash
  use mydatabase
  db.dropDatabase()
  use mydatabase: Switches to the mydatabase database.
  db.dropDatabase(): Deletes the current database (mydatabase).  
```
Verify Deletion:
Verifica que se haya eliminado exitosamente mydatabase antes de continuar 
```bash
  show dbs
```

resultado esperado
```bash
  test> use mydatabase
  switched to db mydatabase
  mydatabase> db.dropDatabase()
  { "ok" : 1, "dropped" : "mydatabase" }
  mydatabase> show dbs
  admin        100.00 KiB
  config        84.00 KiB
  local         80.00 KiB
```
### 🛠 Step 2: Restore db mydatabase:

### 📖 Usando `mongorestore` para restaurar
`mongorestore` es la herramienta complementaria a `mongodump` que permite restaurar un backup.
Por fuera de mongosh puedes aplicar los siguientes comandos

Para los casos en que no uses docker puedes crear el comando de la siguiente manera.
#### 📌 Sintaxis básica:
```bash
mongorestore --host <hostname> --port <port> --db <database_name> <backup_directory>
```
#### 📌 Ejemplo:
```bash
mongorestore --host localhost --port 27017 --db mi_base_de_datos /ruta/al/backup/mi_base_de_datos
```
En el caso del presente tutorial puedes usar la siguiente estructura para los comandos
#### 📌 En contenedores docker:
```bash
docker cp ./mongo_backup mongodb_container:/restore
```
El anterior comando deberia responderte algo como esto "Successfully copied 207kB to mongodb_container:/restore" esto debe permitirte copiar el backup para posteriomente usarlo en la restauracion, con el siguiente comando 

```bash
docker exec -it mongodb_container mongorestore --uri "mongodb://root:example@localhost:27017/mydatabase?authSource=admin" /restore/mydatabase
```
Una vez finalice la restauracion puedes ingresar a mongosh para verificar que se haya creado sin problemas mydatabse
```bash
docker exec -it mongodb_container mongosh "mongodb://root:example@localhost:27017/"
```
Con los siguientes comandos verifica que mydatabse este creado y poblado
```bash
  test> show dbs
  admin       100.00 KiB
  config       72.00 KiB
  local        80.00 KiB
  mydatabase   56.00 KiB
  test         56.00 KiB
  test> use mydatabase
  switched to db mydatabase
  mydatabase> db.users.find().limit(1)
  [
    {
      _id: ObjectId('67b49404475408b4333dd31b'),
      name: 'Juan',
      age: 25,
      email: 'juan@example.com',
      __v: 0
    }
```
---

## 🔹 Métodos Alternativos de Backup y Restauración

### 📖 Backup con copias de archivos de datos
MongoDB almacena los datos en archivos en el sistema de archivos (por defecto en `/data/db`). Puedes hacer un backup deteniendo el servidor MongoDB y copiando estos archivos manualmente.

#### 📌 Pasos:
1. Detén el servidor MongoDB.
2. Copia los archivos de datos (normalmente en `/data/db`) a un lugar seguro.
3. Reinicia el servidor MongoDB.

> **Nota:** Este método no es recomendable para bases de datos en producción porque requiere detener el servidor.
---

## 🔹🛠 Automatizar la clonación de esquemas (opcional)

Si necesitas clonar solo la estructura (esquema) de una base de datos desde otro entorno (e.g., producción) a tu máquina local sin datos, puedes automatizarlo con un script en Node.js. Esto es útil cuando trabajas con muchas colecciones y quieres replicar su estructura rápidamente.

📖 Teoría:

Objetivo: Copiar colecciones e índices desde una base remota a tu base local sin datos.

Ventaja: Ahorra tiempo frente a comandos manuales y permite personalización (e.g., poblar luego con faker-js).

📌 Script de ejemplo:  [clone_schema.js](/clone_schema.js)

Crea un archivo clone_schema.js en la raíz del proyecto:


📌 Ejecutar el script:

node clone_schema.js

📝 Explicación del script:

Conexión: Usa MongoClient para conectar a una base remota (source_db) y tu base local (local_db).

Colecciones: Lista todas las colecciones de la base fuente con listCollections().

Creación: Replica cada colección con sus opciones (e.g., capped collections) en la base local.

Índices: Copia todos los índices (excepto _id_) con sus propiedades (e.g., unique).

Adaptación: Usa las credenciales root:example y el URI de tu entorno Docker local.

📌 Personalización:

Cambia remote_host por la dirección de tu servidor remoto (e.g., production.example.com).

Ajusta source_db al nombre de la base remota (e.g., production_db).

📌 Casos de uso:

Clonar una base de producción a local para desarrollo.

Preparar un entorno de prueba con la misma estructura que producción.

Nota: Este script no copia datos, solo el esquema. Para poblar luego, usa populate_schema.js.

## 🔹 Ofuscación de Datos Sensibles
Cuando trabajamos con bases de datos reales, a menudo necesitamos una copia de los datos en un entorno de desarrollo sin exponer información sensible.

## 🔹 ¿Qué es la ofuscación y por qué es importante?
La ofuscación consiste en alterar datos sensibles (como nombres, correos, números de teléfono, etc.) para que no sean identificables, mientras se preserva la estructura y funcionalidad de la base de datos. Esto es crucial cuando:

-Trabajas con datos de producción en desarrollo o pruebas.

-Quieres cumplir con regulaciones de privacidad (como GDPR o HIPAA).

-Necesitas compartir datos con terceros sin exponer información real.

-En nuestro caso, supongamos que mydatabase contiene datos reales de producción. Usaremos tu backup (mongo_backup) como base y aplicaremos técnicas de ofuscación antes o después de restaurarlo.

## 🔹 Técnicas de Ofuscación

Analizaremos los siguientes tres enfoques prácticos que se pueden integrar en un flujo de trabajo:

1. Reemplazo con datos ficticios usando faker-js:
Modifica los datos después de restaurar la base de datos usando un script de Node.js con faker-js.
Ideal para mantener la estructura y generar datos realistas.
2. Ofuscación directa en el backup (editando los .bson):
Procesa los archivos .bson antes de restaurarlos usando herramientas como bsondump y un script personalizado.
Más complejo, pero permite ofuscar antes de restaurar.
3. Enmascaramiento simple en MongoDB:
Usa comandos de MongoDB (updateMany) para reemplazar datos sensibles tras la restauración.
Rápido y sencillo, pero menos flexible que faker-js.

### 📖 Métodos de Ofuscación
1. **Remplazo de valores sensibles:** Sustituir nombres, correos y direcciones por datos ficticios.
   ```javascript
   db.users.updateMany({}, {
     $set: { email: "anonimo@example.com", name: "Usuario Anónimo" }
   });
   ```
2. **Encriptación de datos sensibles:** Usar librerías como `crypto` en Node.js para encriptar ciertos campos.
3. **Generación de datos falsos:** Similar a `faker-js`, pero aplicando sobre bases existentes.

> **Objetivo:** Mantener la integridad de la estructura de datos sin comprometer información real.

En este tutorial haremos un ejercicio con la primera opcion 

# Método 1: Copiar Solo el Esquema Manualmente

Si no quieres restaurar datos y solo necesitas la lista de colecciones:

## Paso 1: Listar Colecciones
Conecta a la base de datos original:

```bash
docker exec -it mongodb_container mongosh "mongodb://root:example@localhost:27017/production_db?authSource=admin"
```

Dentro de la consola de MongoDB, ejecuta:

```javascript
show collections
```

Anota las colecciones (e.g., `users`, `orders`, `products`).

## Paso 2: Crear Colecciones Vacías Localmente
En tu base de datos local:

```bash
docker exec -it mongodb_container mongosh "mongodb://root:example@localhost:27017/local_db?authSource=admin"
```

Dentro de la consola de MongoDB, ejecuta:

```javascript
use local_db
db.createCollection("users")
db.createCollection("orders")
db.createCollection("products")
```

## Paso 3: Poblar con Faker
Usa el script `populate_schema.js` crea uno nuevo para poblar las colecciones con datos falsos:

### Script `populate_schema.js`
Script [populate_schema.js](/populate_schema.js)

Ejecuta el script con:
```bash
node populate_schema.js
```

Esto generará datos falsos en las colecciones de la base de datos local.
---

## 🛠 Ejercicio práctico: Gestiona una Base de Datos de Tienda Online

En este ejercicio, simularás el manejo de una base de datos para una tienda online. Usarás las herramientas y técnicas aprendidas en el Día 2: poblar con datos falsos, hacer backups, restaurarlos y ofuscar datos sensibles. Sigue los pasos e intenta resolver cada reto por tu cuenta antes de ver las soluciones.

### Contexto
Imagina que eres un desarrollador que necesita trabajar localmente con una base de datos de producción llamada `shop_db`, que contiene las colecciones `customers` y `orders`. Tu tarea es clonarla, ofuscar datos sensibles y poblarla con datos de prueba.

---

### 1. Conéctate a MongoDB
Accede a la consola interactiva `mongosh` dentro de tu contenedor Docker para empezar a trabajar con la base de datos.

<details>
<summary>Ver solución</summary>

```bash
docker exec -it mongodb_container mongosh "mongodb://root:example@localhost:27017/"
```

</details>

### 2. Crea una base de datos y colecciones vacías
Crea una base de datos llamada `shop_db` y dentro de ella dos colecciones vacías: `customers` y `orders`. Usa `use` para seleccionar la base de datos y `db.createCollection()` para crear las colecciones. Nota que no aparecerán en `show dbs` hasta que insertes datos.

<details>
<summary>Ver solución</summary>

```javascript
use shop_db
db.createCollection("customers")
db.createCollection("orders")
```

</details>

### 3. Pobla las colecciones con datos falsos usando faker-js
Crea un script en Node.js llamado `seed_shop.js` que conecte a `shop_db` y genere datos falsos:

- `customers` con 5 documentos, cada uno con:
  - `name`: nombre completo.
  - `email`: correo electrónico.
  - `address`: objeto con `street` y `city`.
- `orders` con 5 documentos, cada uno con:
  - `customerId`: un ID ficticio.
  - `product`: nombre de producto.
  - `price`: número entre 10 y 500.

<details>
<summary>Ver solución</summary>

```javascript
const { faker } = require('@faker-js/faker');
const { MongoClient } = require('mongodb');

async function seedDB() {
  const client = new MongoClient('mongodb://localhost:27017');
  await client.connect();
  const db = client.db('shop_db');
  
  const customers = Array.from({ length: 5 }).map(() => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    address: {
      street: faker.location.streetAddress(),
      city: faker.location.city(),
    },
  }));
  
  const orders = Array.from({ length: 5 }).map(() => ({
    customerId: faker.database.mongodbObjectId(),
    product: faker.commerce.productName(),
    price: faker.commerce.price({ min: 10, max: 500 }),
  }));
  
  await db.collection('customers').insertMany(customers);
  await db.collection('orders').insertMany(orders);
  
  console.log('Datos insertados correctamente');
  await client.close();
}

seedDB();
```

</details>

### 4. Realiza un backup de la base de datos
Genera un respaldo de la base de datos shop_db usando mongodump dentro del contenedor Docker y copia el backup a tu máquina local en una carpeta llamada shop_backup.

<details>
<summary>Ver solución</summary>

```bash
docker exec -it mongodb_container mongodump --uri "mongodb://root:example@localhost:27017/shop_db?authSource=admin" --out /dump
docker cp mongodb_container:/dump ./shop_backup
```
El primer comando crea el backup dentro del contenedor en /dump.
El segundo comando lo copia a tu máquina local en ./shop_backup.

</details>

### 5. Restaura la base de datos
Usa `mongorestore` para restaurar la base de datos desde el respaldo en shop_backup. Primero elimina shop_db para simular una restauración limpia, luego restaura los datos en una nueva base llamada shop_db_restored.

<details>
<summary>Ver solución</summary>
(en mongosh):

```bash
use shop_db
db.dropDatabase()
```

Restaurar desde el backup:
```bash
docker cp ./shop_backup mongodb_container:/restore
docker exec -it mongodb_container mongorestore --uri "mongodb://root:example@localhost:27017/
```
docker cp copia el backup al contenedor en /restore.
mongorestore restaura shop_db como shop_db_restored.


</details>

### 6. Ofusca datos sensibles
Actualiza los correos electrónicos de los clientes en shop_db_restored para proteger su privacidad. Usa un comando en mongosh para reemplazar todos los emails con un valor genérico.

en (mongosh)
<details>
<summary>Ver solución</summary>

```javascript
use shop_db_restored
db.customers.updateMany({}, { $set: { email: "anon@example.com" } })
```

</details>

## 🎯 Resultado Esperado
- Después del paso 3, shop_db tendrá 5 clientes y 5 órdenes con datos falsos.
- Después del paso 4, tendrás un backup en ./shop_backup/shop_db con archivos .bson y .metadata.json.
- Después del paso 5, shop_db_restored contendrá las mismas colecciones y datos que el backup.
- Después del paso 6, todos los emails en customers serán "anon@example.com".

---
🔗 Próximo paso: Día 3 - MongoDB
Sigue al tercer paso [Ver el tutorial de MongoDB - Día 3](/tutorial/day3_advanced_queries.md)
