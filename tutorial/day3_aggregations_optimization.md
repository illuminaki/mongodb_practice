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