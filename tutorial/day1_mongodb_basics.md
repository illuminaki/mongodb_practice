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


---

## 🔹 Instalación y Configuración (Docker)
Para este tutorial, asumimos que ya tienes Docker y Docker Compose instalados. Si aún no lo has hecho, consulta la documentación oficial de instalación de Docker y Docker Compose.

### 🔍 Verificar si MongoDB está corriendo
Para asegurarte de que MongoDB está ejecutándose en un contenedor, usa:
```bash
docker ps
```
Esto debería mostrar un contenedor corriendo con la imagen `mongo`.

```bash
CONTAINER ID   IMAGE                      COMMAND                  CREATED          STATUS                    PORTS                                           NAMES
2a47ba172a3c   mongo-express              "/sbin/tini -- /dock…"   23 minutes ago   Up 23 minutes             0.0.0.0:8081->8081/tcp, :::8081->8081/tcp       mongo_express_container
bd88f5c22b69   mongodb_practice-nodeapp   "docker-entrypoint.s…"   23 minutes ago   Up 23 minutes             0.0.0.0:3000->3000/tcp, :::3000->3000/tcp       nodeapp_container
07a665829c72   mongo:latest               "docker-entrypoint.s…"   23 minutes ago   Up 23 minutes (healthy)   0.0.0.0:27017->27017/tcp, :::27017->27017/tcp   mongodb_container
```

Si no está corriendo, puedes iniciarlo con:
```bash
docker compose up
```

### 🔗 Conectarse a MongoDB desde la Terminal
Usaremos `mongosh` para conectarnos a la base de datos con autenticación:
```bash
docker exec -it mongodb_container mongosh "mongodb://root:example@localhost:27017/"
```
Esto abrirá el shell interactivo de MongoDB con el usuario y contraseña definidos en `docker-compose.yml`.

## 🔹 Comandos Básicos en MongoDB

Accede a la shell de MongoDB: Ya estás dentro de mongosh (con el paso que hicimos anteriormente), así que no necesitas volver a conectarte.
```bash
 show dbs
```
### 📁 Crear una Base de Datos
```bash
use my_database
```
Si la base de datos no existe, MongoDB la creará cuando insertes datos.

### 📄 Crear una Colección e Insertar Datos
```bash
db.createCollection("users")
```

```bash
db.users.insertOne({
  name: "John Doe",
  age: 30,
  email: "john@example.com"
})
```

### 🔄 Insertar Varios Documentos
```bash
db.users.insertMany([
  { name: "Alice", age: 25, email: "alice@example.com" },
  { name: "Bob", age: 28, email: "bob@example.com" }
])
```

### 🔎 Consultar Datos1permite buscar todos los campos de la collection users
```bash
db.users.find()
```

```bash
db.users.find({ age: { $gt: 25 } }) // Filtrar por edad mayor a 25
```

### ✅ Actualizar Documentos
```bash
db.users.updateOne(
  { name: "John Doe" },
  { $set: { age: 31 } }
)
```

### ❌ Eliminar Documentos
```bash
db.users.deleteOne({ name: "John Doe" })
db.users.deleteMany({ age: { $lt: 25 } }) // Eliminar usuarios menores de 25
```

---

## 🛠 Ejercicio práctico: Crea tu primera colección

Vamos a crear una colección para una aplicación sencilla de "Lista de tareas". Intenta hacer con los conocimientos adquiridos el desarrollo de los siguiente retos y solo mira la solución cuando termines por tu cuenta.

1. **Conéctate a MongoDB** Antes de empezar a trabajar con MongoDB, necesitas acceder a la consola interactiva de mongosh dentro de tu contenedor Docker:

   <details>
   <summary>Ver solución</summary>

   ```bash
    docker exec -it mongodb_container mongosh "mongodb://root:example@localhost:27017/"
   ```
</details>

2. **Crea una base de datos llamada task_app**: 

    Usa el comando use para seleccionar o crear una nueva base de datos llamada task_app. Este será el espacio donde almacenaremos nuestra colección de tareas. Nota que en MongoDB, la base de datos no aparecerá en show dbs hasta que insertes datos en ella.

   <details>
   <summary>Ver solución</summary>

   ```bash
    use task_app
   ```
</details>

3. **Inserta tareas en una colección llamada tasks**:

    Crea una colección llamada tasks e inserta tres documentos que representen tareas. Cada tarea debe tener los campos title (título de la tarea), completed (estado de completitud como booleano) y priority (prioridad como texto: "alta", "media" o "baja"). Usa insertMany para agregarlas todas de una vez. Por ejemplo, incluye tareas como "Aprender MongoDB", "Hacer ejercicio" y "Leer un libro" con valores variados.

   <details>
   <summary>Ver solución</summary>

    ```bash
    db.tasks.insertMany([
    { title: "Aprender MongoDB", completed: false, priority: "alta" },
    { title: "Hacer ejercicio", completed: true, priority: "media" },
    { title: "Leer un libro", completed: false, priority: "baja" }
    ])
    ```
</details>

4. **Consulta las tareas:**:

    Realiza dos consultas sobre la colección tasks:
    Primero, muestra todos los documentos de la colección para verificar que las tareas se insertaron correctamente.
    Luego, filtra las tareas para encontrar solo las que no están completadas (completed: false). Usa el comando find en ambos casos.

   <details>
   <summary>Ver solución</summary>

    Muestra todas las tareas:
    ```bash
    db.tasks.find()
    ```
    Encuentra tareas no completadas:
    ```bash
    db.tasks.find({ completed: false })
    ```
</details>

5. **Actualiza una tarea: Marca "Aprender MongoDB" como completada:**:

    Modifica el documento de la tarea con el título "Aprender MongoDB" para cambiar su estado completed a true. Usa updateOne con un filtro por el campo title y el operador $set para actualizar solo el campo deseado.
    
   <details>
   <summary>Ver solución</summary>

    ```bash
    db.tasks.updateOne({ title: "Aprender MongoDB" }, { $set: { completed: true } })
    ```
</details>

6. **Elimina una tarea: Borra "Hacer ejercicio":**:

    Elimina el documento correspondiente a la tarea "Hacer ejercicio" de la colección tasks. Usa deleteOne con un filtro que identifique esa tarea por su título.

   <details>
   <summary>Ver solución</summary>

    ```bash
    db.tasks.deleteOne({ title: "Hacer ejercicio" })
    ```
</details>


    Resultado esperado: Al final, ejecuta db.tasks.find() y deberías ver solo 2 tareas en la colección: "Aprender MongoDB" (con completed: true) y "Leer un libro" (con completed: false). Esto confirma que insertaste, actualizaste y eliminaste datos correctamente.

## 🎯 Práctica realizada
En esta sesión, creaste la colección **tasks**, insertaste tareas, realizaste consultas, actualizaste y eliminaste datos, aplicando las operaciones CRUD básicas.


---
🔗 Próximo paso: Día 2 - MongoDB
Sigue al segundo paso [Ver el tutorial de MongoDB - Día 2](/tutorial/day2_backup_restore_seeds.md)