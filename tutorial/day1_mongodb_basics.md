# 📌 Día 1: Introducción a MongoDB

## 🔹 ¿Qué es MongoDB?
MongoDB es una base de datos NoSQL orientada a documentos  que se ha convertido en una de las soluciones más populares para el almacenamiento y gestión de grandes volúmenes de datos. A diferencia de las bases de datos relacionales tradicionales, MongoDB no utiliza tablas ni filas para organizar la información; en su lugar, almacena los datos en documentos , que son estructuras flexibles similares a objetos JSON (JavaScript Object Notation). Internamente, MongoDB utiliza un formato binario llamado BSON  (Binary JSON), lo que permite una representación más eficiente y rápida de los datos.

### 🌟 Características principales de MongoDB

- **Orientación a Documentos:** 
    En MongoDB, los datos se organizan en colecciones , que son grupos de documentos. Cada documento es similar a un registro en una base de datos relacional, pero con la diferencia clave de que puede contener campos anidados y estructuras complejas. Esto permite modelar datos de manera mucho más natural y flexible, especialmente cuando se trabaja con información jerárquica o semi-estructurada. 

- **Sin Esquemas Rígidos:**
    Una de las ventajas más destacadas de MongoDB es su capacidad para manejar esquemas dinámicos . Esto significa que no es necesario definir previamente la estructura de los documentos en una colección. Los documentos dentro de una misma colección pueden tener diferentes campos y tipos de datos, lo que facilita la evolución del modelo de datos sin necesidad de realizar costosas migraciones. 

- **Escalabilidad Horizontal:**
    MongoDB está diseñado para ser altamente escalable, permitiendo distribuir los datos entre múltiples servidores mediante una técnica conocida como sharding  (fragmentación). Esta característica hace que sea ideal para aplicaciones que requieren manejar grandes volúmenes de datos y tráfico, ya que puede crecer horizontalmente añadiendo más nodos al sistema en lugar de depender únicamente de mejorar el hardware existente (escalabilidad vertical). 

- **Consulta Flexible y Potente:**
    MongoDB ofrece un lenguaje de consulta muy poderoso que permite realizar búsquedas avanzadas, filtros complejos, agregaciones y operaciones de análisis directamente sobre los datos almacenados. Además, soporta índices para acelerar las consultas, incluyendo índices geoespaciales, de texto y compuestos. 

- **Alta Disponibilidad y Tolerancia a Fallos:** 
    MongoDB implementa un sistema de replicación  mediante conjuntos de réplicas (replica sets ), lo que garantiza la disponibilidad y durabilidad de los datos. En caso de fallo de un nodo, otros nodos secundarios pueden asumir el control y continuar sirviendo las solicitudes, asegurando así que la aplicación siga funcionando sin interrupciones. 

- **Compatibilidad con JSON/BSON:**
    Dado que MongoDB utiliza documentos en formato JSON (o BSON internamente), es especialmente adecuado para trabajar con aplicaciones modernas basadas en tecnologías web, donde JSON es el formato estándar para el intercambio de datos. BSON extiende JSON para admitir más tipos de datos, como fechas y números binarios, lo que mejora su funcionalidad. 

- **Soporte para Datos Geoespaciales:** 
    MongoDB tiene soporte nativo para consultas geoespaciales, lo que lo convierte en una excelente opción para aplicaciones que requieren trabajar con datos de ubicación, como mapas, sistemas de seguimiento o servicios basados en localización. 

- **Ecosistema y Comunidad:** 
    MongoDB cuenta con un ecosistema robusto y una gran comunidad de desarrolladores. Además de la base de datos principal, ofrece herramientas como MongoDB Atlas  (una plataforma de base de datos en la nube totalmente administrada), MongoDB Compass  (una interfaz gráfica para explorar y gestionar los datos) y diversas bibliotecas y drivers para integrarse con diferentes lenguajes de programación. 

- **Alto rendimiento**: Ideal para aplicaciones en tiempo real.
- **Consultas poderosas**: Usa un lenguaje de consultas basado en JSON.
- **Compatibilidad con Big Data**: Integraciones con herramientas de procesamiento de datos masivos.

---

## 🔹 Instalación y Configuración (Docker)
Para facilitar la instalación, usaremos **Docker** para ejecutar MongoDB sin necesidad de instalarlo manualmente.

### 🔍 Verificar si MongoDB está corriendo
Para asegurarte de que MongoDB está ejecutándose en un contenedor, usa:
```bash
docker ps
```
Esto debería mostrar un contenedor corriendo con la imagen `mongo:6`.

Si no está corriendo, puedes iniciarlo con:
```bash
docker compose up -d
```

### 🔗 Conectarse a MongoDB desde la Terminal
Usaremos `mongosh` para conectarnos a la base de datos con autenticación:
```bash
docker exec -it mongodb_container mongosh "mongodb://root:example@localhost:27017/"
```
Esto abrirá el shell interactivo de MongoDB con el usuario y contraseña definidos en `docker-compose.yml`.

---

## 🔹 Conceptos Claves en MongoDB
### 📂 Estructura de MongoDB
MongoDB maneja los siguientes conceptos básicos:
- **Base de datos (Database)**: Conjunto de colecciones.
    Piensa en una base de datos  como un "almacén" donde se guardan todos los datos relacionados con un proyecto o aplicación.
    Por ejemplo, si tienes una aplicación de comercio electrónico, podrías tener una base de datos llamada ecommerce donde almacenes información sobre productos, usuarios, pedidos, etc.
    En MongoDB, puedes tener varias bases de datos dentro del mismo servidor, cada una completamente independiente.
     
- **Colección (Collection)**: Conjunto de documentos (similar a una tabla en SQL).
    Dentro de una base de datos, los datos se organizan en colecciones .
    Una colección es como una "carpeta" donde se agrupan documentos similares. Es algo parecido a una tabla  en una base de datos relacional, pero sin la necesidad de seguir un esquema rígido.
    Por ejemplo, en tu base de datos ecommerce, podrías tener una colección llamada productos para almacenar información sobre los productos, otra llamada usuarios para los clientes, y otra llamada pedidos.
   
- **Documento (Document)**: Unidad de almacenamiento de datos en formato JSON/BSON.
    Un documento  es la unidad básica de almacenamiento en MongoDB. Es similar a una fila  en una tabla de una base de datos relacional, pero en lugar de estar organizado en columnas, el documento es una estructura flexible en formato JSON  (o BSON internamente). 

    Cada documento contiene pares de clave-valor . Por ejemplo, un documento en la colección productos podría verse así: 
    json
    ```
      {
        "nombre": "Laptop",
        "precio": 1200,
        "stock": 50,
        "categoria": "Electrónica"
      }
    ```
    Lo interesante es que los documentos dentro de una misma colección pueden tener diferentes campos. Por ejemplo, otro producto podría tener un campo adicional como "descuento": 10, mientras que otros productos no lo tienen.
- **Campo (Field)**: Cada documento tiene campos, equivalentes a columnas en SQL.
    Los campos  son las propiedades o atributos que componen un documento. Son equivalentes a las columnas  en una tabla de una base de datos relacional.
    Siguiendo el ejemplo anterior, los campos del documento serían: "nombre", "precio", "stock", y "categoria".
    Cada campo tiene un valor asociado, como "nombre": "Laptop".
     
- **Índice (Index)**: Optimizan las consultas y mejoran el rendimiento.
    Los índices  son herramientas que MongoDB utiliza para acelerar las consultas. Imagina que tienes miles de productos en tu colección productos y quieres buscar rápidamente un producto por su nombre. Sin un índice, MongoDB tendría que revisar cada documento uno por uno, lo que sería muy lento.
    Al crear un índice  en el campo "nombre", MongoDB puede encontrar rápidamente los documentos que coinciden con ese nombre, mejorando el rendimiento de las consultas.
    Puedes crear índices en uno o varios campos, dependiendo de tus necesidades.
     
- **Replica Set**: Mecanismo de alta disponibilidad mediante la replicación de datos.
    La replicación  es un mecanismo que MongoDB utiliza para garantizar que los datos estén disponibles incluso si un servidor falla.
    Un Replica Set  es un grupo de servidores MongoDB que mantienen copias idénticas de los datos. Uno de estos servidores actúa como el primario  (principal) y los demás como secundarios .
    Si el servidor primario falla, uno de los secundarios automáticamente toma su lugar y sigue sirviendo las solicitudes, asegurando que la aplicación no se detenga.
    Esto es especialmente útil para aplicaciones críticas que necesitan alta disponibilidad y tolerancia a fallos.
     
- **Sharding**: Estrategia para distribuir datos en múltiples servidores y mejorar la escalabilidad.

    Sharding  es una técnica que MongoDB utiliza para manejar grandes volúmenes de datos distribuyéndolos entre múltiples servidores.
    Imagina que tienes una colección con millones de documentos y un solo servidor no puede manejar toda esa carga. Con sharding , MongoDB divide la colección en partes más pequeñas llamadas fragmentos  y los distribuye entre diferentes servidores.
    Esto permite que MongoDB maneje grandes cantidades de datos y tráfico sin problemas, ya que los servidores trabajan juntos para procesar las consultas.
    Sharding es ideal para aplicaciones que crecen rápidamente y necesitan escalabilidad horizontal (añadir más servidores en lugar de mejorar el hardware existente).
     

---

## 🔹 Comandos Básicos en MongoDB

### 📁 Crear una Base de Datos
```javascript
use my_database
```
Si la base de datos no existe, MongoDB la creará cuando insertes datos.

### 📄 Crear una Colección e Insertar Datos
```javascript
db.createCollection("users")

db.users.insertOne({
  name: "John Doe",
  age: 30,
  email: "john@example.com"
})
```

### 🔄 Insertar Varios Documentos
```javascript
db.users.insertMany([
  { name: "Alice", age: 25, email: "alice@example.com" },
  { name: "Bob", age: 28, email: "bob@example.com" }
])
```

### 🔎 Consultar Datos
```javascript
db.users.find()
db.users.find({ age: { $gt: 25 } }) // Filtrar por edad mayor a 25
```

### ✅ Actualizar Documentos
```javascript
db.users.updateOne(
  { name: "John Doe" },
  { $set: { age: 31 } }
)
```

### ❌ Eliminar Documentos
```javascript
db.users.deleteOne({ name: "John Doe" })
db.users.deleteMany({ age: { $lt: 25 } }) // Eliminar usuarios menores de 25
```

---

