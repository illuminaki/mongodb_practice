# 📌 Día 3: Consultas Avanzadas, Índices y Visualización con Mongo Express

En este segundo día, profundizaremos en cómo trabajar con MongoDB de manera más avanzada. Aprenderás a realizar consultas complejas, optimizar el rendimiento con índices y visualizar tus datos usando **Mongo Express**, una interfaz gráfica que ya está configurada en nuestro entorno Docker. ¡Vamos a ello!

---

## 🔹 Consultas avanzadas
Ahora que sabes cómo insertar y buscar datos básicos (Día 1), vamos a explorar consultas más poderosas para filtrar y organizar información.

### 🔍 Operadores de comparación y lógicos
MongoDB proporciona una variedad de operadores para realizar consultas más específicas y eficientes. Entre los más importantes están:

- **Operadores de comparación:** Permiten comparar valores dentro de los documentos.
  - `$eq`: Igual a un valor específico.
  - `$ne`: No igual a un valor específico.
  - `$lt`: Menor que un valor específico.
  - `$lte`: Menor o igual que un valor específico.
  - `$gt`: Mayor que un valor específico.
  - `$gte`: Mayor o igual que un valor específico.
  
  **Ejemplo:** Encontrar tareas que no son de baja prioridad.
  ```js
  db.tasks.find({ priority: { $ne: "baja" } })
  ```
  
- **Operadores lógicos:** Permiten combinar condiciones para obtener resultados más refinados.
  - `$or`: Devuelve documentos que coinciden con al menos una condición.
  - `$and`: Devuelve documentos que cumplen todas las condiciones.
  - `$not`: Niega una condición específica.

  **Ejemplo:** Buscar tareas no completadas de alta prioridad.
  ```js
  db.tasks.find({ $and: [{ completed: false }, { priority: "alta" }] })
  ```

### 🔄 Ordenamiento y paginación
- **Ordenar resultados:** Usa `.sort()` para ordenar los resultados de una consulta.
  ```js
  db.tasks.find().sort({ priority: 1 }) // Ordena por prioridad ascendente
  ```

- **Limitar y omitir resultados:**
  - `.limit(n)`: Muestra solo `n` documentos.
  - `.skip(n)`: Omite los primeros `n` documentos.
  
  **Ejemplo:** Obtener las primeras 5 tareas de prioridad alta, omitiendo las 3 primeras.
  ```js
  db.tasks.find({ priority: "alta" }).sort({ createdAt: -1 }).skip(3).limit(5)
  ```

---

## 📌 Índices en MongoDB
Los índices mejoran la velocidad de las consultas al permitir que MongoDB busque datos de manera más eficiente. 

### 🔹 Tipos de índices
1. **Índice único**: Se usa para evitar valores duplicados en un campo.
   ```js
   db.users.createIndex({ email: 1 }, { unique: true })
   ```

2. **Índice compuesto**: Abarca múltiples campos para optimizar consultas complejas.
   ```js
   db.tasks.createIndex({ priority: 1, dueDate: -1 })
   ```

3. **Índice de texto**: Permite realizar búsquedas eficientes en texto.
   ```js
   db.articles.createIndex({ content: "text" })
   ```

### 🔍 Ver y eliminar índices
- **Listar índices existentes:**
  ```js
  db.tasks.getIndexes()
  ```
- **Eliminar un índice:**
  ```js
  db.tasks.dropIndex("priority_1_dueDate_-1")
  ```

---

## 🖥️ Visualización con Mongo Express
Mongo Express proporciona una interfaz web para interactuar con MongoDB de manera visual.

### 📌 Características clave de Mongo Express
- Explorar bases de datos y colecciones fácilmente.
- Insertar, actualizar y eliminar documentos.
- Ejecutar consultas y visualizar resultados sin necesidad de la CLI de MongoDB.

### 📌 Acceder a Mongo Express
Para acceder a la interfaz web, simplemente abre tu navegador y dirígete a:
```
http://localhost:8081
```
Aquí podrás ver todas tus bases de datos y realizar operaciones CRUD sin necesidad de comandos.

---

### ✅ Resumen del día 2
✅ Consultas avanzadas con operadores de comparación y lógicos.
✅ Ordenamiento y paginación de resultados.
✅ Creación y gestión de índices para mejorar el rendimiento.
✅ Uso de Mongo Express para una gestión visual de la base de datos.

¡Felicidades! Ahora tienes una mejor comprensión de cómo consultar y optimizar tu base de datos en MongoDB. 🚀



************************************************************************************************

# 📌 Día 3: Aggregations y Optimización en MongoDB

## 🔹 ¿Qué son las Aggregations en MongoDB?

Las **Aggregations** en MongoDB permiten procesar y transformar documentos dentro de una colección, permitiendo realizar operaciones avanzadas como filtrado, agrupamiento, ordenamiento y cálculos en grandes volúmenes de datos de manera eficiente.

MongoDB proporciona el **Aggregation Framework**, una herramienta poderosa basada en una tubería (*pipeline*) de operaciones que se aplican secuencialmente a los documentos.

### 🔍 Ventajas de usar Aggregations

✅ Permite realizar consultas complejas con múltiples etapas de procesamiento.

✅ Reduce la carga en la aplicación al ejecutar transformaciones directamente en la base de datos.

✅ Optimiza el rendimiento al minimizar la cantidad de datos transferidos.

✅ Facilita análisis de datos y generación de reportes en tiempo real.

✅ Se integra con índices para mejorar la eficiencia en grandes volúmenes de información.

## ✨ Principales Operadores en Aggregations

### 📌 1. **$match** (Filtrado de documentos)

Filtra documentos en función de una condición específica, similar a `find()`.

```javascript
  db.users.aggregate([
    { $match: { age: { $gte: 18 } } }
  ]);
```

### 📌 2. **$group** (Agrupación de datos)

Agrupa documentos basándose en un campo específico y permite realizar cálculos como sumas y promedios.

```javascript
  db.orders.aggregate([
    { $group: { _id: "$customerId", totalSpent: { $sum: "$amount" } } }
  ]);
```

### 📌 3. **$project** (Proyección de campos)

Permite seleccionar y modificar los campos que se devuelven en la consulta.

```javascript
  db.users.aggregate([
    { $project: { name: 1, email: 1, _id: 0 } }
  ]);
```

### 📌 4. **$sort** (Ordenamiento de resultados)

Ordena los documentos en función de un criterio.

```javascript
  db.products.aggregate([
    { $sort: { price: -1 } } // Ordena por precio de mayor a menor
  ]);
```

### 📌 5. **$limit y $skip** (Paginación de resultados)

Permite limitar la cantidad de documentos devueltos y omitir un número específico de documentos.

```javascript
  db.products.aggregate([
    { $sort: { price: -1 } },
    { $skip: 10 },
    { $limit: 5 }
  ]);
```

Optimización de Aggregations en MongoDB

Para garantizar que las agregaciones sean eficientes, es fundamental aplicar estrategias de optimización que mejoren el rendimiento y reduzcan el tiempo de ejecución.

📌 1. Ordenar las etapas correctamente

El orden en que se aplican las operaciones dentro del pipeline afecta significativamente el rendimiento. Algunas recomendaciones clave incluyen:

✅ Usar $match lo antes posible para reducir la cantidad de documentos a procesar en las siguientes etapas.

✅ Aplicar $project temprano para limitar los campos procesados y disminuir el uso de memoria.

✅ Usar $limit y $skip estratégicamente para paginación y evitar sobrecarga en la base de datos.

📌 2. Uso de índices para optimización

Los índices ayudan a acelerar las consultas en MongoDB y son especialmente útiles en aggregations cuando se usan en conjunto con $match, $sort y $lookup.

```
  db.users.createIndex({ age: 1 });
  db.users.aggregate([
    { $match: { age: { $gte: 18 } } },
    { $sort: { age: 1 } }
  ]);
```

📌 3. Evitar operaciones innecesarias

✅ Evitar $unwind en arreglos grandes si no es estrictamente necesario.

✅ Usar $facet en lugar de múltiples agregaciones separadas cuando se necesiten múltiples resultados en una sola ejecución.

📌 4. Monitorización del rendimiento con explain()

MongoDB permite analizar el rendimiento de una consulta usando .explain(), lo cual ayuda a identificar cuellos de botella en la ejecución.

```
  db.orders.aggregate([
    { $match: { status: "completed" } }
  ]).explain("executionStats");
```
Esta consulta devuelve detalles sobre el uso de índices y la cantidad de documentos examinados en cada etapa del pipeline.