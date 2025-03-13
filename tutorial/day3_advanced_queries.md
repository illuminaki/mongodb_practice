# 📌 Día 3: Búsquedas Avanzadas en MongoDB

Bienvenido al Día 3. Hasta ahora, has poblado, clonado y ofuscado bases de datos en MongoDB. Hoy nos enfocaremos en **búsquedas avanzadas**: crearás y poblarás una base con más de 50,000 registros, aprenderás a usar operadores de comparación y lógicos, paginarás y ordenarás resultados, y analizarás el desempeño de tus consultas. Esto te preparará para optimizarlas con índices en el Día 4. Todo dentro de nuestro entorno Docker (`mongodb_container`). ¡Empecemos!

---

## 🔹 Consultas Avanzadas en MongoDB
MongoDB ofrece herramientas poderosas para filtrar, ordenar y paginar datos. Hoy trabajarás con una base grande para ver su impacto real.

### 📖 Crear y poblar la base de datos
Crearemos una nueva base de datos `store_db` y la colección `products` con un script en Node.js que genere 50,000 productos usando `faker-js`.

#### 📌 Paso 1: Script de población
Usa el archivo `seed_products.js` en la raíz de tu proyecto:

```javascript
  node seed_products.js
```
Esto creará store_db con 50,000 productos en products. Puede tomar unos segundos dependiendo de tu máquina.

Aqui puedes ver el archivo usado para poblar la db [seed_products.js](/seed_products.js)

#### 📌 Paso 2: Verificar la base de datos
Conéctate a mongosh:

```bash
  docker exec -it mongodb_container mongosh "mongodb://root:example@localhost:27017/"
```

```bash
  use store_db
  db.products.countDocuments()
```


## 🔍 Consultas Avanzadas en MongoDB
MongoDB ofrece potentes operadores para realizar consultas avanzadas. Hoy aprenderemos sobre operadores de comparación, operadores lógicos y paginación.

### 🛠 Operadores de Comparación
Algunos operadores esenciales:
- `$eq`: Igual a.
- `$ne`: Diferente de.
- `$gt`, `$gte`: Mayor que, mayor o igual que.
- `$lt`, `$lte`: Menor que, menor o igual que.
- `$in`: Coincidencia en un conjunto de valores.
- `$nin`: No está en un conjunto de valores.

**Ejemplo 1:** Buscar Productos con precio mayor a 500:
```bash
  db.products.find({ price: { $gt: 500 } }).limit(5)
```
**Ejemplo 2:**: Productos con stock igual a 0:
```bash
  db.products.find({ stock: { $eq: 0 } }).limit(5)
```
**Ejemplo 3:**: Productos con precio menor o igual a 50:
```bash
  db.products.find({ price: { $lte: 50 } }).limit(5)
```
**Ejemplo 4:** Productos en categorías específicas:
```bash
  db.products.find({ category: { $in: ["Electronics", "Clothing"] } }).limit(5)
```
**Ejemplo 5:** Productos con stock no mayor a 100:
```bash
  db.products.find({ stock: { $nin: [101, 200, 500, 1000] } }).limit(5)
```


### 🛠 Operadores Lógicos
Combinan condiciones:
- `$and`: Todas las condiciones deben cumplirse.
- `$or`: Al menos una condición debe cumplirse.
- `$not`: Niega una condición.
- `$nor`: Ninguna condición debe cumplirse.

**Ejemplo 1:** Productos con precio > 300 o stock < 100:
Si quieres combinar condiciones, puedes usar operadores lógicos como $and o $or.

```bash
  db.products.find({
    $or: [
      { price: { $gt: 300 } },
      { stock: { $lt: 100 } }
    ]
  }).limit(5)
```
**Ejemplo 2:** Productos con precio entre 200-400 y stock > 500:

```bash
  db.products.find({
    $and: [
      { price: { $gte: 200, $lte: 400 } },
      { stock: { $gt: 500 } }
    ]
  }).limit(5)
```
**Ejemplo 3:** Productos que no tienen precio mayor a 800:

```bash
  db.products.find({
    price: { $not: { $gt: 800 } }
  }).limit(5)
```

**Ejemplo 4:** Productos que no son baratos ni agotados:

```bash
  db.products.find({
    $nor: [
      { price: { $lt: 20 } },
      { stock: { $eq: 0 } }
    ]
  }).limit(5)
```

**Ejemplo 5:** Combinación compleja (precio alto y stock bajo, o categoría específica):

```bash
  db.products.find({
    $or: [
      { $and: [{ price: { $gt: 600 } }, { stock: { $lt: 200 } }] },
      { category: "Books" }
    ]
  }).limit(5)
```


### 🛠 Paginación y Ordenamiento
Controla resultados:
- `sort({ campo: 1/-1 })`: Ordena.
- `skip(n)`: Omite.
- `limit(n)`: Limita.

**Ejemplo:** 5 productos más caros, saltando los 10 primeros:
```bash
  db.products.find().sort({ price: -1 }).skip(10).limit(5)
```

### 📖 Midiendo el desempeño con explain()

- El método .explain("executionStats") en MongoDB es una herramienta poderosa para analizar cómo se ejecutan las consultas. Proporciona métricas clave que te ayudan a entender el rendimiento de una consulta y a identificar posibles cuellos de botella.

- Métricas clave en .explain("executionStats")
- `executionStats`:

  Significado: Número de documentos que MongoDB revisó para ejecutar la consulta.
  Importancia: Si este número es cercano al total de documentos en la colección, significa que MongoDB está haciendo un escaneo completo (COLLSCAN), lo cual es ineficiente.

- `executionTimeMillis`:

  Significado: Tiempo total que tomó ejecutar la consulta, en milisegundos.
  Importancia: Un tiempo alto puede indicar que la consulta no está optimizada, especialmente si totalDocsExamined es grande.

- `nReturned`:

  Significado: Número de documentos que cumplieron con la condición de la consulta y fueron devueltos.
  Importancia: Comparado con totalDocsExamined, te da una idea de la selectividad de la consulta. Si nReturned es mucho menor que totalDocsExamined, la consulta no es eficiente.

- `totalKeysExamined`:

  Significado: Número de claves de índice que MongoDB revisó.
  Importancia: Si es 0, significa que no se usaron índices, lo cual es ineficiente.

- `stage`:

  Significado: Indica la estrategia de ejecución que MongoDB utilizó.
  Valores comunes:

- COLLSCAN: Escaneo completo de la colección (ineficiente).

- IXSCAN: Escaneo de índice (eficiente).


  Analiza consultas con .explain("executionStats"):
- `totalDocsExamined`: Documentos revisados.


**Ejemplo:** Consulta sin índices:
```bash
  db.products.find({ price: { $gt: 500 } }).explain("executionStats")
```
Resultado de ejemplo:
```json
{
  "queryPlanner": {
    "winningPlan": {
      "stage": "COLLSCAN",
      "filter": { "price": { "$gt": 500 } },
      "direction": "forward"
    },
    "rejectedPlans": []
  },
  "executionStats": {
    "executionSuccess": true,
    "nReturned": 25444,
    "executionTimeMillis": 13,
    "totalKeysExamined": 0,
    "totalDocsExamined": 50000,
    "executionStages": {
      "stage": "COLLSCAN",
      "nReturned": 25444,
      "executionTimeMillisEstimate": 10,
      "docsExamined": 50000
    }
  }
}
```
### 📖 Explicación paso a paso:

1- `queryPlanner.winningPlan.stage: "COLLSCAN"`
- Significado: MongoDB usó un "collection scan" (escaneo completo). Sin índices, revisa todos los documentos de la colección.
- Impacto: Con 50,000 registros, esto es ineficiente, especialmente en bases más grandes.

2- `executionStats.nReturned: 25444`
- Significado: La consulta devolvió 25,444 documentos que cumplen price > 500. Esto varía según los datos generados por faker.
- Nota: Aunque devuelve muchos, tuvo que revisar todos para encontrarlos.

3- `executionStats.totalDocsExamined: 50000`
- Significado: MongoDB examinó los 50,000 documentos de la colección.
- Por qué es importante: Sin un índice en price, no puede "saltar" a los relevantes, lo que consume tiempo y recursos.

4- `executionStats.totalKeysExamined: 0`
- Significado: No se usaron índices (0 claves examinadas). Confirma que no hay optimización.

5- `executionStats.executionTimeMillis: 13`
- Significado: La consulta tomó 13 milisegundos. Con 50,000 registros es rápido, pero en millones de documentos sería mucho más lento.

6- `executionStages.stage: "COLLSCAN"`
- Significado: Refuerza que la etapa de ejecución fue un escaneo completo.

Conclusión:
-Sin índices, MongoDB revisa cada documento (totalDocsExamined = 50000), incluso si solo devuelve la mitad (nReturned = 25444). Esto es un cuello de botella en bases grandes. En el Día 4, aprenderás a usar índices para reducir totalDocsExamined y executionTimeMillis.


### 📌 Ejemplo Práctico:  Analiza la Tienda Online

## Contexto
Usarás `store_db` con la colección `products` (50,000 registros) para practicar consultas avanzadas, paginación y análisis de desempeño. Resuelve cada reto.

## 1. Consulta con operadores
**Encuentra productos con precio entre 200 y 400 y stock mayor a 500.**

<details>
<summary>Ver solución</summary>

```javascript
db.products.find({
  $and: [
    { price: { $gte: 200, $lte: 400 } },
    { stock: { $gt: 500 } }
  ]
}).limit(5)
```

</details>

Resultado esperado: 5 documentos (varían por datos aleatorios), e.g.:



## 2. Paginación y ordenamiento
**Obtén los 10 productos más baratos de "Electronics", omitiendo los 5 primeros.**

<details>
<summary>Ver solución</summary>

```javascript
  db.products.find({ category: "Electronics" }).sort({ price: 1 }).skip(5).limit(10)
```

</details>

Analiza la consulta del paso 1 con .explain("executionStats"). ¿Cuántos documentos examinó MongoDB? ¿Por qué es ineficiente?

## 3. Análisis de desempeño
**Obtén los 10 productos más baratos de "Electronics", omitiendo los 5 primeros.**

<details>
<summary>Ver solución</summary>

```javascript
  db.products.find({
    $and: [
      { price: { $gte: 200, $lte: 400 } },
      { stock: { $gt: 500 } }
    ]
  }).explain("executionStats")
```

</details>

Resultado esperado (extracto):
```json
  {
    "queryPlanner": { "winningPlan": { "stage": "COLLSCAN" } },
    "executionStats": { "totalDocsExamined": 50000, "nReturned": X }
  }
```
- COLLSCAN: Escaneo completo de la colección.

- totalDocsExamined: 50000: MongoDB revisó todos los documentos.

- Ineficiencia: Sin índices, MongoDB no filtra eficientemente, revisando todos los documentos. Mañana lo optimizaremos.

🎯 Práctica realizada
1. Creaste y poblaste una base con 50,000 registros.
2. Usaste operadores para filtros avanzados.
3. Aplicaste paginación y ordenamiento.
4. Analizaste el desempeño sin índices.


---

🔗 Próximo paso: Día 4 - MongoDB
Sigue al cuarto paso [Ver el tutorial de MongoDB - Día 4](/tutorial/day4_indexes_performance.md)

