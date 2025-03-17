# 📌 Día 4: Índices y Optimización del Rendimiento en MongoDB

Bienvenido al Día 4. Hasta ahora, has aprendido a poblar, clonar, ofuscar y consultar datos en MongoDB. Hoy nos enfocaremos en optimizar el rendimiento de tus bases de datos mediante **índices**, exploraremos conceptos avanzados como **sharding** y **replicación (Replica Set)**, y aprenderás buenas prácticas para mantener tus consultas rápidas y eficientes. Todo esto dentro de nuestro entorno Docker ya configurado. ¡Prepárate para llevar tus habilidades al siguiente nivel!

---

## 🔹 Teoría: Índices y Optimización en MongoDB

### 📖 ¿Qué son los índices?
Los **índices** son estructuras que MongoDB utiliza para acelerar las consultas al organizar los datos de manera eficiente. Sin un índice, MongoDB realiza un **collection scan** (escaneo completo de la colección), lo que puede ser lento en bases grandes. Con índices, las búsquedas, filtros y ordenamientos se vuelven mucho más rápidos.

**Ejemplo:** Imagina una colección `products` con millones de documentos. Buscar un producto por `name` sin índice es como buscar una palabra en un libro sin índice alfabético. Con un índice, MongoDB va directo al dato.

## 📚 ¿Cómo funcionan los índices?
MongoDB almacena los índices como una estructura separada que referencia los documentos en la colección. Cuando realizas una consulta, el motor usa el índice (si existe y es útil) para limitar los documentos que debe examinar. Por ejemplo:

- **Sin índice** en `{ price: 1 }`, una consulta como `db.products.find({ price: 99.99 })` escanea toda la colección.
- **Con índice**, MongoDB usa el **árbol B** para ir directo a los documentos con `price: 99.99`.

> ✨ **Dato curioso:** El campo `_id` siempre tiene un índice único por defecto en todas las colecciones.

## 📌 Ventajas de los índices
- **Rendimiento**: Aceleran consultas de búsqueda (`find`), filtrado (`$gt`, `$lt`), y ordenamiento (`sort`).
- **Eficiencia**: Reducen la cantidad de documentos escaneados, disminuyendo la carga del servidor.
- **Soporte avanzado**: Habilitan operaciones como búsquedas textuales, geoespaciales y `aggregations` más rápidas.
- **Escalabilidad**: Son clave para mantener el rendimiento en bases de datos grandes.

## 📌 Consideraciones y desventajas
- **Espacio en disco**: Cada índice ocupa memoria y almacenamiento adicional.
- **Costo en escrituras**: Insertar, actualizar o eliminar documentos requiere actualizar los índices, lo que puede ralentizar estas operaciones.
- **Selección estratégica**: Crear índices innecesarios desperdicia recursos. Usa `explain()` para identificar qué campos realmente necesitan índices.
- **Límite**: Una colección puede tener hasta **64 índices**, pero rara vez necesitarás tantos.

## 📚 Mejores prácticas para índices
- **Analiza tus consultas**: Crea índices en campos usados frecuentemente en filtros, ordenamientos o joins (e.g., `$lookup`).
- **Orden en índices compuestos**: Coloca primero los campos usados en filtros exactos (`=`) y luego los usados en ordenamiento (`sort`).
- **Índices cubiertos (Covered Queries)**: Diseña índices que incluyan todos los campos devueltos por una consulta para evitar acceder a los documentos originales.

```javascript
db.customers.createIndex({ name: 1, age: 1 })
db.customers.find({ name: "John Doe" }, { name: 1, age: 1, _id: 0 })
```   
## 📌 Ejemplo práctico: Antes y después de un índice
Supón una colección `users` con 1 millón de documentos. **Sin índice**:

```javascript
db.users.find({ age: 30 })
```
MongoDB escanea todos los documentos. **Con un índice**:

```javascript
db.users.createIndex({ age: 1 })
db.users.find({ age: 30 })
```
Solo examina los documentos relevantes, reduciendo el tiempo de ejecución de segundos a milisegundos.

### 📌 Paso 1: Crear el script de seeding
  - Ejecuta el script de seeding `index_seed.js`: para poblar la base de datos con datos de prueba.

```bash
  node index_seed.js
```


### 📌 Tipos de índices

1. **Índice simple (Single Field):**
   - Optimiza consultas en un solo campo.
   - Puede ordenarse ascendente (`1`) o descendente (`-1`).
   ```javascript
   db.customers.createIndex({ age: 1 })
   ```
   Útil para: Consultas como `db.customers.find({ age: 25 })`.

2. **Índice único:** Evita duplicados en un campo.
   - Asegura que no haya duplicados en un campo (o combinación de campos).
   - Ideal para campos como emails o identificadores.
   ```javascript
   db.customers.createIndex({ email: 1 }, { unique: true })
   ```
   - Si intentas insertar un documento con un email duplicado, MongoDB lanza un error.

3. **Índice compuesto:** Optimiza consultas con múltiples campos.
   - Combina múltiples campos en un solo índice para optimizar consultas complejas.
   - El orden de los campos importa: prioriza los campos más usados en filtros.
   ```javascript
   db.orders.createIndex({ customerId: 1, orderDate: -1 })
   ```
4. **Índice de texto:** Permite búsquedas textuales.
  - Permite búsquedas full-text en campos de tipo string.
  - Solo se permite un índice de texto por colección.

   ```javascript
   db.products.createIndex({ description: "text" })
   ```

5. **Índice geoespacial:** Para consultas basadas en ubicación.
  - Optimiza consultas basadas en coordenadas o ubicaciones (2D o esféricas).

   ```javascript
   db.stores.createIndex({ location: "2dsphere" })
   ```
   Ejemplo: Encuentra tiendas cercanas a un punto:

   ```json
    db.stores.find({
      location: {
        $near: {
          $geometry: { type: "Point", coordinates: [-73.935242, 40.730610] },
          $maxDistance: 5000 // metros
        }
      }
    })
   ```

6. **Índice TTL (Time-To-Live):** Elimina documentos automáticamente después de un tiempo   especificado.
   - Perfecto para datos temporales como sesiones o logs.

   ```javascript
    db.sessions.createIndex({ createdAt: 1 }, { expireAfterSeconds: 3600 })
   ```
   Los documentos con createdAt mayor a 1 hora serán eliminados.



### 📌 Ventajas de los índices
- Aceleran consultas de búsqueda, filtrado y ordenamiento.
- Reducen la carga del servidor al evitar escaneos completos.
- Optimizan aggregations y operaciones masivas.
- Son esenciales para escalabilidad y rendimiento.

### 📌 Consideraciones
- **Coste:** Los índices ocupan espacio y ralentizan escrituras (inserciones, actualizaciones), ya que deben mantenerse actualizados.
- **Optimización:** Usa índices solo en campos frecuentemente consultados.

---

## 🔹 Ejemplos prácticos

### 📌 Crear y verificar un índice
Conéctate a `mongosh` en Docker:
```bash
docker exec -it mongodb_container mongosh "mongodb://root:example@localhost:27017/"
```

**Crear un índice en `shop_db`:**
```javascript
use shop_db
db.customers.createIndex({ email: 1 }, { unique: true })
```

**Ver índices:**
```javascript
db.customers.getIndexes()
```

**Resultado esperado:**
```json
[
  { "v": 2, "key": { "_id": 1 }, "name": "_id_" },
  { "v": 2, "key": { "email": 1 }, "name": "email_1", "unique": true }
]
```

### 📌 Paginación con `limit` y `skip`
En `orders`, obtén las 5 órdenes más recientes, saltando las primeras 2:
```javascript
db.orders.find().sort({ _id: -1 }).skip(2).limit(5)
```

### 📌 Aggregation para análisis
Calcula el total gastado por cliente en `orders`:
```javascript
db.orders.aggregate([
  { $group: { _id: "$customerId", totalSpent: { $sum: "$price" } } }
])
```

### 📌 Analizar rendimiento con `explain()`
Prueba una consulta con y sin índice:
```javascript
db.orders.find({ price: { $gt: 100 } }).explain("executionStats")
```
Luego crea un índice y compara:
```javascript
db.orders.createIndex({ price: 1 })
db.orders.find({ price: { $gt: 100 } }).explain("executionStats")
```

---

## 🛠 Ejercicio práctico: Optimiza la Tienda Online

### Contexto
Trabajarás con `shop_db` (del Día 2 y 3) para optimizar su rendimiento. Usarás índices, analizarás consultas y simularás escenarios de alta disponibilidad y escalabilidad con teoría.

---

#### 1. Añade más datos a `products`
Inserta 5 productos adicionales en `products` con `name`, `price`, `category`, y `stock`. Usa `mongosh` en Docker.

<details>
<summary>Ver solución</summary>

```bash
docker exec -it mongodb_container mongosh "mongodb://root:example@localhost:27017/"
```
```javascript
use shop_db
db.products.insertMany([
  { name: "Tablet Lite", price: 199.99, category: "Electronics", stock: 80 },
  { name: "Jacket Warm", price: 129.99, category: "Clothing", stock: 200 },
  { name: "Smartwatch Fit", price: 249.99, category: "Electronics", stock: 50 },
  { name: "Jeans Slim", price: 59.99, category: "Clothing", stock: 400 },
  { name: "Speaker Mini", price: 89.99, category: "Electronics", stock: 120 }
]);
```

</details>

---

#### 2. Crea un índice compuesto
Crea un índice compuesto en `products` para los campos `category` y `price`. Verifica que se haya creado.

<details>
<summary>Ver solución</summary>

```javascript
use shop_db
db.products.createIndex({ category: 1, price: -1 })
db.products.getIndexes()
```

**Resultado esperado:**
```json
[
  { "key": { "_id": 1 }, "name": "_id_" },
  { "key": { "category": 1, "price": -1 }, "name": "category_1_price_-1" }
]
```

</details>

---

#### 3. Consulta optimizada con paginación
Encuentra los 3 productos más baratos de la categoría "Clothing", saltando el primero más barato.

<details>
<summary>Ver solución</summary>

```javascript
db.products.find({ category: "Clothing" }).sort({ price: 1 }).skip(1).limit(3)
```

**Resultado esperado (basado en datos previos + nuevos):**
```json
[
  { "name": "Sneakers Cool", "price": 79.99, ... },
  { "name": "Jacket Warm", "price": 129.99, ... },
  { "name": "Jeans Slim", "price": 59.99, ... }
]
```

</details>

---

#### 4. Analiza el rendimiento
Usa `explain()` para analizar la consulta del paso 3 antes y después de crear el índice compuesto. Nota la diferencia en `totalDocsExamined`.

<details>
<summary>Ver solución</summary>

**Sin índice adicional (solo el creado en el Día 3):**
```javascript
db.products.find({ category: "Clothing" }).sort({ price: 1 }).skip(1).limit(3).explain("executionStats")
```

**Con el índice compuesto:**
```javascript
db.products.find({ category: "Clothing" }).sort({ price: 1 }).skip(1).limit(3).explain("executionStats")
```

**Diferencia:** Con el índice, `totalDocsExamined` debería ser menor, ya que MongoDB usa el índice para filtrar y ordenar.

</details>

---

#### 5. Aggregation para análisis
Calcula el stock total por categoría en `products` y ordénalo de mayor a menor.

<details>
<summary>Ver solución</summary>

```javascript
db.products.aggregate([
  { $group: { _id: "$category", totalStock: { $sum: "$stock" } } },
  { $sort: { totalStock: -1 } }
])
```

**Resultado esperado:**
```json
[
  { "_id": "Clothing", "totalStock": 1400 },
  { "_id": "Electronics", "totalStock": 495 }
]
```

</details>

---


---

## 🎯 Práctica realizada
- Creaste y optimizaste índices.
- Analizaste rendimiento con `explain()`.
- Usaste aggregations para análisis.
- Reflexionaste sobre sharding y replicación.

¡Felicidades! Ahora sabes cómo optimizar MongoDB para rendimiento y escalabilidad.

---