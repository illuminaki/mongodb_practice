# 📌 Día 4: Índices y Optimización del Rendimiento en MongoDB

## 🔹 ¿Qué son los Índices en MongoDB?

Los **índices** en MongoDB permiten acelerar las consultas al organizar los datos de manera eficiente, reduciendo el número de documentos que deben escanearse para recuperar la información solicitada. Sin índices, MongoDB realizaría un escaneo completo de la colección (*collection scan*), lo que impactaría negativamente en el rendimiento.

### 🔍 Ventajas de usar Índices

✅ Mejoran significativamente el rendimiento de las consultas.

✅ Reducen la carga en el servidor al minimizar la cantidad de documentos analizados.

✅ Permiten ordenar y filtrar datos de manera eficiente.

✅ Facilitan la ejecución de operaciones de agregación más rápidas.

✅ Son clave para la escalabilidad y el rendimiento en grandes volúmenes de datos.

## ✨ Tipos de Índices en MongoDB

### 📌 1. **Índice Único** (`unique`)

Garantiza que los valores en un campo sean únicos dentro de una colección.

```javascript
  db.users.createIndex({ email: 1 }, { unique: true });
```

### 📌 2. **Índice Compuesto**

Se utiliza cuando se consultan múltiples campos con frecuencia.

```javascript
  db.orders.createIndex({ customerId: 1, orderDate: -1 });
```

### 📌 3. **Índice Texto**

Permite realizar búsquedas de texto en campos específicos.

```javascript
  db.articles.createIndex({ content: "text" });
```

### 📌 4. **Índice Geoespacial**

Utilizado para consultas basadas en ubicación geográfica.

```javascript
  db.places.createIndex({ location: "2dsphere" });
```

## 🔹 Cómo Optimizar el Uso de Índices

### 📌 1. **Analizar el rendimiento con `explain()`**

MongoDB permite analizar cómo se ejecuta una consulta utilizando `explain()`, lo que ayuda a entender si los índices están siendo utilizados correctamente.

```javascript
  db.orders.find({ customerId: 123 }).explain("executionStats");
```

### 📌 2. **Evitar el uso excesivo de índices**

Aunque los índices mejoran las consultas, un número excesivo de ellos puede ralentizar las operaciones de escritura (inserciones, actualizaciones y eliminaciones) porque cada cambio en los datos debe actualizar los índices asociados.

### 📌 3. **Usar índices parciales (`partialFilterExpression`)**

Si solo se consultan ciertos documentos con frecuencia, se puede crear un índice parcial para reducir el espacio en disco y mejorar el rendimiento.

```javascript
  db.users.createIndex({ email: 1 }, { unique: true, partialFilterExpression: { email: { $exists: true } } });
```

### 📌 4. **Eliminar índices innecesarios**

Para comprobar qué índices existen en una colección:

```javascript
  db.users.getIndexes();
```

Si un índice no es necesario, se puede eliminar:

```javascript
  db.users.dropIndex("email_1");
```

## 🔹 Buenas Prácticas para Índices en MongoDB

✅ Analizar las consultas más frecuentes y crear índices adecuados para ellas.

✅ Revisar periódicamente los índices y eliminar los que no se usen.

✅ Priorizar índices compuestos cuando se consulten múltiples campos simultáneamente.

✅ Usar `explain()` para verificar si un índice está optimizando una consulta.

✅ Considerar la relación costo-beneficio entre la mejora en lectura y el impacto en escritura.

✅ Aplicar índices parciales y `sparse` para ahorrar espacio cuando sea necesario.

Con esta guía, tendrás una mejor comprensión de cómo utilizar **índices en MongoDB** para optimizar el rendimiento de tus bases de datos. 🚀

