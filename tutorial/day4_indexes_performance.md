# 📌 Día 4: Índices y Optimización del Rendimiento en MongoDB

## 🔹 ¿Qué son los Índices en MongoDB?

Los **índices** en MongoDB permiten acelerar las consultas al organizar los datos de manera eficiente, reduciendo el número de documentos que deben escanearse para recuperar la información solicitada. Sin índices, MongoDB realizaría un escaneo completo de la colección (*collection scan*), lo que impactaría negativamente en el rendimiento.

- **Sharding**: Estrategia para distribuir datos en múltiples servidores y mejorar la escalabilidad.

  Sharding  es una técnica que MongoDB utiliza para manejar grandes volúmenes de datos distribuyéndolos entre múltiples servidores.
  Imagina que tienes una colección con millones de documentos y un solo servidor no puede manejar toda esa carga. Con sharding , MongoDB divide la colección en partes más pequeñas llamadas fragmentos  y los distribuye entre diferentes servidores.
  Esto permite que MongoDB maneje grandes cantidades de datos y tráfico sin problemas, ya que los servidores trabajan juntos para procesar las consultas.
  Sharding es ideal para aplicaciones que crecen rápidamente y necesitan escalabilidad horizontal (añadir más servidores en lugar de mejorar el hardware existente).
    
- **Índice (Index)**: Optimizan las consultas y mejoran el rendimiento.
  Los índices  son herramientas que MongoDB utiliza para acelerar las consultas. Imagina que tienes miles de productos en tu colección productos y quieres buscar rápidamente un producto por su nombre. Sin un índice, MongoDB tendría que revisar cada documento uno por uno, lo que sería muy lento.
  Al crear un índice  en el campo "nombre", MongoDB puede encontrar rápidamente los documentos que coinciden con ese nombre, mejorando el rendimiento de las consultas.
  Puedes crear índices en uno o varios campos, dependiendo de tus necesidades.

- **Replica Set**: Mecanismo de alta disponibilidad mediante la replicación de datos.
  La replicación  es un mecanismo que MongoDB utiliza para garantizar que los datos estén disponibles incluso si un servidor falla.
  Un Replica Set  es un grupo de servidores MongoDB que mantienen copias idénticas de los datos. Uno de estos servidores actúa como el primario  (principal) y los demás como secundarios .
  Si el servidor primario falla, uno de los secundarios automáticamente toma su lugar y sigue sirviendo las solicitudes, asegurando que la aplicación no se detenga.
  Esto es especialmente útil para aplicaciones críticas que necesitan alta disponibilidad y tolerancia a fallos.
     

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

