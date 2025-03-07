# 📌 Día 3: Mongo express y busquedas avanzadas

El Día 3 se enfocará en:

- **Visualización con Mongo Express** (introducción a la UI como transición natural desde comandos).
- **Consultas Avanzadas** (operadores y paginación).
- **Índices** (optimización básica).
- **Aggregations** (consultas avanzadas y optimización).

Bienvenido al Día 3. Hasta ahora, has trabajado con MongoDB usando comandos en la terminal y scripts. Hoy darás un paso adelante: explorarás tus datos con una interfaz gráfica usando **Mongo Express**, aprenderás a realizar consultas avanzadas, optimizarás el rendimiento con índices y dominarás las **Aggregations** para procesar datos complejos. Todo esto dentro de nuestro entorno Docker ya configurado. ¡Empecemos!

---

## 🖥️ Visualización con Mongo Express
Mongo Express es una herramienta de interfaz gráfica que simplifica la gestión de bases de datos MongoDB. Ya está corriendo en nuestro contenedor Docker (`mongo_express_container`) y te permitirá ver y manipular datos sin necesidad de comandos.

### 📌 Acceder a Mongo Express
Abre tu navegador y dirígete a:
```bash
http://localhost:8081
```
**Nota:** Asegúrate de que el contenedor `mongo_express_container` esté activo (`docker ps` debería mostrarlo en el puerto 8081).

### 📌 Características clave
- **Exploración visual:** Navega por bases de datos y colecciones en una interfaz de árbol.
- **Operaciones CRUD:** Inserta, edita y elimina documentos directamente desde la UI.
- **Consultas personalizadas:** Ejecuta consultas con una sintaxis sencilla y visualiza resultados en tablas.
- **Gestión de índices:** Crea y elimina índices sin usar mongosh.
- **Exportación/Importación:** Descarga colecciones como JSON o CSV y sube datos manualmente.
- **Estadísticas:** Inspecciona el tamaño y estado de tus bases de datos y colecciones.
- **Modo readonly (opcional):** Descarga colecciones como JSON o CSV y sube datos manualmente.

### 📌 Funcionalidades avanzadas
Mongo Express va más allá de lo básico. Aquí tienes ejemplos prácticos para aprovecharlo al máximo:

1. **Insertar un documento desde la UI**  
   En `shop_db > customers`, haz clic en "New Document".  
   Ingresa un documento como:
   ```json
   {
     "name": "Nuevo Cliente",
     "email": "nuevo@example.com",
     "address": {
       "street": "123 Calle Falsa",
       "city": "Ciudad Ejemplo"
     }
   }
   ```
   Haz clic en "Insert" y verifica que aparezca en la lista.

2. **Editar un documento existente**  
   En `customers`, haz clic en un documento (e.g., uno con email: `anon@example.com`).  
   Cambia el campo `name` a "Cliente Editado".  
   Presiona "Update" y recarga la página para confirmar.

3. **Crear un índice desde la UI**  
   Ve a `shop_db > orders`.  
   Haz clic en la pestaña "Indexes".  
   Selecciona "Add Index", usa el campo `price` con dirección `1` (ascendente).  
   Nómbralo `price_1` y haz clic en "Create".  
   Esto optimizará consultas como `db.orders.find().sort({ price: 1 })`.

4. **Exportar una colección**  
   En `customers`, haz clic en "Export".  
   Elige formato JSON y descarga el archivo.  
   Esto es útil para compartir datos o hacer backups rápidos.

5. **Ejecutar una consulta avanzada**  
   En `orders`, ve a la pestaña "Query".  
   Ingresa:
   ```json
   { "price": { "$gt": 100 } }
   ```
   Haz clic en "Submit Query" para ver órdenes con precios mayores a 100.  
   Compara con el comando `db.orders.find({ price: { $gt: 100 } })`.

6. **Ver estadísticas**  
   En el panel izquierdo, haz clic en `shop_db`.  
   Revisa el apartado de estadísticas (tamaño de la base de datos, número de colecciones, etc.).  
   Esto te ayuda a monitorear el crecimiento de tus datos.

📝 **Ventajas de Mongo Express**  
- **Simplicidad**: Ideal para principiantes o para inspecciones rápidas.
**Beneficio:** Ahora puedes alternar entre comandos y la UI según tus necesidades.

---

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

**Ejemplo:** Buscar clientes con edad mayor a 25 años.
```json
{
  "age": { "$gt": 25 }
}
```

### 🛠 Operadores Lógicos
- `$and`: Todas las condiciones deben cumplirse.
- `$or`: Al menos una condición debe cumplirse.
- `$not`: Niega una condición.
- `$nor`: Ninguna condición debe cumplirse.

**Ejemplo:** Buscar clientes con edad mayor a 25 o que vivan en "Colombia".
```json
{
  "$or": [
    { "age": { "$gt": 25 } },
    { "country": "Colombia" }
  ]
}
```

### 📌 Ejemplo Práctico

### Conectar a la base de datos:
coenctate a un db con mongosh o crea una products

### Insertar datos de ejemplo:
Si aún no has insertado los datos proporcionados, puedes hacerlo con el siguiente comando:

```javascript
db.products.insertMany([
  { name: "Electronic Steel Ball", price: 62.85, category: "Movies", stock: 993 },
  { name: "Refined Rubber Soap", price: 460.04, category: "Sports", stock: 655 },
  { name: "Practical Ceramic Bike", price: 139.07, category: "Outdoors", stock: 524 },
  { name: "Soft Granite Tuna", price: 34.29, category: "Industrial", stock: 102 },
  { name: "Oriental Marble Salad", price: 250.72, category: "Industrial", stock: 786 },
  { name: "Tasty Ceramic Keyboard", price: 347.95, category: "Toys", stock: 302 },
  { name: "Sleek Granite Bacon", price: 105.10, category: "Baby", stock: 0 },
  { name: "Elegant Rubber Ball", price: 656.02, category: "Jewelry", stock: 567 },
  { name: "Licensed Ceramic Computer", price: 213.86, category: "Music", stock: 951 },
  { name: "Unbranded Gold Mouse", price: 144.35, category: "Shoes", stock: 502 }
]);
```

### Realizar la consulta:
Para encontrar todos los productos cuyo `price` sea diferente de `100`, ejecuta:

```javascript
db.products.find({ price: { $ne: 100 } });
```

### Resultado esperado:
La consulta devolverá todos los documentos donde `price` no sea igual a `100`. Por ejemplo:

```json
[
  { "_id": ObjectId("67cb0445327177aba2e9b28c"), "name": "Electronic Steel Ball", "price": 62.85, "category": "Movies", "stock": 993 },
  { "_id": ObjectId("67cb0445327177aba2e9b28d"), "name": "Refined Rubber Soap", "price": 460.04, "category": "Sports", "stock": 655 },
  { "_id": ObjectId("67cb0445327177aba2e9b28e"), "name": "Practical Ceramic Bike", "price": 139.07, "category": "Outdoors", "stock": 524 },
  { "_id": ObjectId("67cb0445327177aba2e9b28f"), "name": "Soft Granite Tuna", "price": 34.29, "category": "Industrial", "stock": 102 },
  { "_id": ObjectId("67cb0445327177aba2e9b290"), "name": "Oriental Marble Salad", "price": 250.72, "category": "Industrial", "stock": 786 },
  { "_id": ObjectId("67cb0445327177aba2e9b291"), "name": "Tasty Ceramic Keyboard", "price": 347.95, "category": "Toys", "stock": 302 },
  { "_id": ObjectId("67cb0445327177aba2e9b292"), "name": "Sleek Granite Bacon", "price": 105.10, "category": "Baby", "stock": 0 },
  { "_id": ObjectId("67cb0445327177aba2e9b293"), "name": "Elegant Rubber Ball", "price": 656.02, "category": "Jewelry", "stock": 567 },
  { "_id": ObjectId("67cb0445327177aba2e9b294"), "name": "Licensed Ceramic Computer", "price": 213.86, "category": "Music", "stock": 951 },
  { "_id": ObjectId("67cb0445327177aba2e9b295"), "name": "Unbranded Gold Mouse", "price": 144.35, "category": "Shoes", "stock": 502 }
]
```

### Otros Operadores de Comparación:
Además de $ne, MongoDB ofrece otros operadores de comparación útiles:

 1. $eq (Igual a):
```bash
  db.products.find({ price: { $eq: 100 } });
```
2. $gt (Mayor que):
```bash
  db.products.find({ price: { $gt: 200 } });
```
3. $lt (Menor que):
```bash
  db.products.find({ price: { $lt: 100 } });
```
4. $gte (Mayor o igual que):
```bash
  db.products.find({ price: { $gte: 100 } });
```
5. $lte (Menor o igual que):
```bash
  db.products.find({ price: { $lte: 100 } });
```
6. $in (En una lista de valores):
```bash
  db.products.find({ price: { $in: [100, 200, 300] } });
```
7. $nin (No en una lista de valores):
```bash
  db.products.find({ price: { $nin: [100, 200, 300] } });
```
### Ejemplo con Múltiples Condiciones:
Si quieres combinar condiciones, puedes usar operadores lógicos como $and o $or. Por ejemplo, para encontrar productos con price diferente de 100 y stock mayor que 500:
```bash
  db.products.find({
    $and: [
      { price: { $ne: 100 } },
      { stock: { $gt: 500 } }
    ]
  });
```

### Conclusión:
- Usa $ne para filtrar documentos donde un campo no sea igual a un valor específico.

- Combina operadores de comparación y lógicos para consultas más complejas.

- Asegúrate de estar conectado a la base de datos correcta (use local_db) y de que la colección (products) exista.


---

🔗 Próximo paso: Día 4 - MongoDB
Sigue al cuarto paso [Ver el tutorial de MongoDB - Día 4](/tutorial/day4_indexes_performance.md)

