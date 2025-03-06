# MongoDB Practice

Bienvenido al repositorio **MongoDB Practice**, un proyecto diseñado para enseñar los fundamentos y mejores prácticas de MongoDB a través de ejemplos prácticos. Este proyecto está completamente dockerizado, lo que facilita su ejecución sin necesidad de instalar dependencias adicionales más allá de Docker y Docker Compose.

## Requisitos previos
Para ejecutar este proyecto, solo necesitas tener instalados:

- **Docker**: Sigue las instrucciones oficiales para instalar Docker en tu sistema siguiendo [esta guía](https://docs.docker.com/engine/install/ubuntu/).
- **Docker Compose**: Instala Docker Compose según las [guías oficiales](https://docs.docker.com/compose/install/).

Asegúrate de que ambos estén correctamente configurados antes de continuar.

## Instalación y ejecución

### 1. Clona el repositorio:
```bash
git clone https://github.com/illuminaki/mongodb_practice.git
cd mongodb_practice
```

### 2. Ejecuta el proyecto con Docker Compose:
```bash
docker-compose up --build
```
Esto construirá las imágenes necesarias y levantará tanto la aplicación como la base de datos MongoDB en contenedores. La bandera `--build` asegura que las imágenes se reconstruyan si hay cambios en el `Dockerfile` o el código.

### 3. Accede a la aplicación
Una vez que los contenedores estén en ejecución, abre tu navegador y visita:
```
http://localhost:3000
```
(El puerto puede variar según lo que hayas configurado en el `docker-compose.yml`).

### 4. Detener la aplicación
Para detener los contenedores, usa:
```bash
docker-compose down
```
Si deseas eliminar también los volúmenes (como la base de datos), agrega la bandera `--volumes`:
```bash
docker-compose down --volumes
```

## Estructura del proyecto
```
📦 mongodb_practice
├── 📂 controllers/    # Lógica de negocio y manejo de rutas
├── 📂 models/         # Definiciones de esquemas de MongoDB
├── 📂 routes/         # Definición de rutas de la API
├── 📂 config/         # Configuración de la base de datos y variables de entorno
├── 📂 tutorial/       # Documentación teórica sobre MongoDB
├── 📜 docker-compose.yml  # Configuración de los contenedores Docker
├── 📜 Dockerfile      # Instrucciones para construir la imagen Docker
├── 📜 README.md       # Documentación principal del proyecto
```

Este proyecto incluye una carpeta `tutorial/` donde se encuentra documentación teórica sobre los fundamentos de MongoDB y su uso en aplicaciones prácticas.
Sigue al primer paso [Ver el tutorial de MongoDB - Día 1](tutorial/day1_mongodb_basics.md)
---




