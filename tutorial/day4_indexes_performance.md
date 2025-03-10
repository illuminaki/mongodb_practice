# 📌 Día 4: Índices y Optimización del Rendimiento en MongoDB

Bienvenido al Día 4. Hasta ahora, has aprendido a poblar, clonar, ofuscar y consultar datos en MongoDB. Hoy nos enfocaremos en optimizar el rendimiento de tus bases de datos mediante **índices**, exploraremos conceptos avanzados como **sharding** y **replicación (Replica Set)**, y aprenderás buenas prácticas para mantener tus consultas rápidas y eficientes. Todo esto dentro de nuestro entorno Docker ya configurado. ¡Prepárate para llevar tus habilidades al siguiente nivel!

---

## 🔹 Teoría: Índices y Optimización en MongoDB

### 📖 ¿Qué son los índices?
Los **índices** son estructuras que MongoDB utiliza para acelerar las consultas al organizar los datos de manera eficiente. Sin un índice, MongoDB realiza un **collection scan** (escaneo completo de la colección), lo que puede ser lento en bases grandes. Con índices, las búsquedas, filtros y ordenamientos se vuelven mucho más rápidos.

**Ejemplo:** Imagina una colección `products` con millones de documentos. Buscar un producto por `name` sin índice es como buscar una palabra en un libro sin índice alfabético. Con un índice, MongoDB va directo al dato.

### 📌 Tipos de índices
1. **Índice único:** Evita duplicados en un campo.
   ```javascript
   db.customers.createIndex({ email: 1 }, { unique: true })
   ```
2. **Índice compuesto:** Optimiza consultas con múltiples campos.
   ```javascript
   db.orders.createIndex({ customerId: 1, orderDate: -1 })
   ```
3. **Índice de texto:** Permite búsquedas textuales.
   ```javascript
   db.products.createIndex({ description: "text" })
   ```
4. **Índice geoespacial:** Para consultas basadas en ubicación.
   ```javascript
   db.stores.createIndex({ location: "2dsphere" })
   ```

### 📖 Sharding
**Sharding** es una técnica para distribuir datos entre múltiples servidores (fragmentos o *shards*), mejorando la escalabilidad horizontal. Ideal para grandes volúmenes de datos o tráfico intenso.

**Ejemplo:** Una colección `users` con millones de registros se divide en fragmentos por `country`. Cada servidor maneja un subconjunto, reduciendo la carga.

**Nota:** Configurar sharding requiere múltiples instancias de MongoDB, lo que va más allá de nuestro contenedor único actual. Lo mencionamos como concepto clave para entornos reales.

### 📖 Replica Set
Un **Replica Set** es un grupo de nodos MongoDB que replican datos para alta disponibilidad. Incluye un nodo primario (escritura) y secundarios (lectura). Si el primario falla, un secundario toma su lugar.

**Ejemplo básico en `mongosh`:**
```javascript
rs.initiate()
rs.status()
```
**Nota:** Similar a sharding, requiere múltiples contenedores, pero lo exploraremos teóricamente por ahora.

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

#### 6. Reflexiona sobre sharding y replicación
Supón que `shop_db` crece a millones de documentos. Responde teóricamente:
- ¿Cómo usarías sharding para dividir `products`?
- ¿Cómo configurarías un Replica Set para alta disponibilidad?

<details>
<summary>Ver solución</summary>

- **Sharding:** Dividiría `products` por `category` (clave de fragmentación o *shard key*). Cada shard contendría categorías específicas (e.g., "Electronics" en un servidor, "Clothing" en otro).
- **Replica Set:** Configuraría 3 nodos: un primario y dos secundarios. Usaría `rs.initiate()` para activar la replicación y `rs.status()` para monitorear.

</details>

---

### Resultado Esperado
- `products` tiene 10 documentos (5 del Día 3 + 5 nuevos).
- Un índice compuesto optimiza consultas en `category` y `price`.
- Puedes analizar rendimiento y aggregations con herramientas prácticas.

---

## 🎯 Práctica realizada
- Creaste y optimizaste índices.
- Analizaste rendimiento con `explain()`.
- Usaste aggregations para análisis.
- Reflexionaste sobre sharding y replicación.

¡Felicidades! Ahora sabes cómo optimizar MongoDB para rendimiento y escalabilidad.

---