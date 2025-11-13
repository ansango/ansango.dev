---
title: "Docker Volumes: Persistencia de Datos"
description: "Descubre cómo gestionar la persistencia de datos en Docker usando volúmenes, bind mounts y tmpfs. Aprende las mejores prácticas para mantener tus datos seguros."
date: 2025-11-10
mod: 2025-11-13
published: true
tags: [docker, persistence, storage, volumes]
serieId: "docker-fundamentals"
serieTitle: "Docker Fundamentals: De Cero a Producción"
serieOrder: 3
---

# Docker Volumes: Persistencia de Datos

Cuando eliminas un contenedor, todos los datos dentro de él se pierden. Los **volúmenes** son la solución de Docker para la persistencia de datos.

## Tipos de Almacenamiento en Docker

Docker ofrece tres formas de persistir datos:

### 1. Volumes (Recomendado)

Gestionados completamente por Docker:

```bash
# Crear un volumen
docker volume create mi-volumen

# Listar volúmenes
docker volume ls

# Inspeccionar volumen
docker volume inspect mi-volumen

# Usar el volumen
docker run -d \
  --name postgres-db \
  -v mi-volumen:/var/lib/postgresql/data \
  postgres:15
```

**Ventajas:**
- Gestionados por Docker
- Funcionan en Windows, Mac y Linux
- Fáciles de backup y migración
- Pueden compartirse entre contenedores

### 2. Bind Mounts

Montan un directorio del host:

```bash
# Montar directorio actual
docker run -d \
  --name nginx-dev \
  -v $(pwd)/html:/usr/share/nginx/html \
  -p 8080:80 \
  nginx

# Crear archivo y verlo en el contenedor
echo "<h1>Hello from host</h1>" > html/index.html
curl http://localhost:8080
```

**Ventajas:**
- Acceso directo desde el host
- Ideal para desarrollo
- Cambios en tiempo real

**Desventajas:**
- Dependiente del sistema de archivos del host
- Problemas de permisos en algunos casos

### 3. tmpfs Mounts

Almacenamiento temporal en memoria:

```bash
docker run -d \
  --name redis-cache \
  --tmpfs /data \
  redis
```

Útil para datos sensibles que no deben persistir.

## Gestión de Volúmenes

### Crear y usar volúmenes

```bash
# Crear volumen con nombre
docker volume create datos-app

# Ejecutar contenedor con volumen
docker run -d \
  --name mi-app \
  -v datos-app:/app/data \
  mi-imagen

# Volumen anónimo (se crea automáticamente)
docker run -d -v /app/data mi-imagen
```

### Compartir volúmenes entre contenedores

```bash
# Contenedor 1: Escribe datos
docker run -d \
  --name escritor \
  -v datos-compartidos:/datos \
  alpine sh -c "echo 'Hola desde escritor' > /datos/mensaje.txt && sleep 3600"

# Contenedor 2: Lee datos
docker run --rm \
  -v datos-compartidos:/datos \
  alpine cat /datos/mensaje.txt
```

### Backup y restauración

```bash
# Backup de volumen
docker run --rm \
  -v datos-app:/source \
  -v $(pwd):/backup \
  alpine tar czf /backup/backup.tar.gz -C /source .

# Restaurar volumen
docker run --rm \
  -v datos-app-nuevo:/target \
  -v $(pwd):/backup \
  alpine sh -c "cd /target && tar xzf /backup/backup.tar.gz"
```

## Caso Práctico: Base de Datos PostgreSQL

```bash
# 1. Crear volumen para datos
docker volume create postgres-data

# 2. Ejecutar PostgreSQL con volumen
docker run -d \
  --name postgres-prod \
  -e POSTGRES_PASSWORD=secreto123 \
  -e POSTGRES_DB=miapp \
  -v postgres-data:/var/lib/postgresql/data \
  -p 5432:5432 \
  postgres:15

# 3. Conectar y crear datos
docker exec -it postgres-prod psql -U postgres -d miapp

# En psql:
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100),
  email VARCHAR(100)
);

INSERT INTO usuarios (nombre, email) 
VALUES ('Ana García', 'ana@example.com');

\q

# 4. Eliminar el contenedor
docker stop postgres-prod
docker rm postgres-prod

# 5. Crear nuevo contenedor con el mismo volumen
docker run -d \
  --name postgres-prod-v2 \
  -e POSTGRES_PASSWORD=secreto123 \
  -v postgres-data:/var/lib/postgresql/data \
  -p 5432:5432 \
  postgres:15

# 6. Verificar que los datos persisten
docker exec -it postgres-prod-v2 psql -U postgres -d miapp -c "SELECT * FROM usuarios;"
```

¡Los datos siguen ahí! 🎉

## Caso Práctico: Aplicación Web con MongoDB

```yaml
# docker-compose.yml
version: '3.8'

services:
  web:
    image: node:18-alpine
    working_dir: /app
    volumes:
      - ./app:/app
      - node_modules:/app/node_modules
    ports:
      - "3000:3000"
    command: npm start
    depends_on:
      - mongodb

  mongodb:
    image: mongo:7
    volumes:
      - mongo-data:/data/db
      - ./init-mongo.js:/docker-entrypoint-initdb.d/init.js:ro
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: secreto
      MONGO_INITDB_DATABASE: miapp
    ports:
      - "27017:27017"

volumes:
  mongo-data:
  node_modules:
```

```bash
# Iniciar servicios
docker-compose up -d

# Ver logs
docker-compose logs -f mongodb

# Hacer backup
docker-compose exec mongodb mongodump \
  --username admin \
  --password secreto \
  --out /data/db/backup

# Detener pero mantener datos
docker-compose down

# Detener y eliminar volúmenes
docker-compose down -v
```

## Mejores Prácticas

### 1. Nombra tus volúmenes

```bash
# ❌ Mal: volumen anónimo
docker run -v /data mi-app

# ✅ Bien: volumen con nombre
docker run -v app-data:/data mi-app
```

### 2. Usa volúmenes para datos, bind mounts para código

```bash
# Desarrollo
docker run \
  -v $(pwd)/src:/app/src \     # Código (bind mount)
  -v app-data:/app/data \      # Datos (volume)
  mi-app
```

### 3. Limpieza regular

```bash
# Ver espacio usado
docker system df

# Eliminar volúmenes no usados
docker volume prune

# Eliminar volumen específico
docker volume rm mi-volumen
```

### 4. Permisos correctos

```dockerfile
# En Dockerfile
RUN addgroup -g 1000 appgroup && \
    adduser -D -u 1000 -G appgroup appuser

USER appuser

VOLUME /app/data
```

## Inspección y Debugging

```bash
# Ver dónde está el volumen en el host
docker volume inspect mi-volumen
# Busca "Mountpoint": "/var/lib/docker/volumes/mi-volumen/_data"

# Ejecutar shell en contenedor temporal para explorar volumen
docker run -it --rm \
  -v mi-volumen:/data \
  alpine sh

# Dentro del contenedor
ls -la /data
```

## Rendimiento

### Consideraciones

- **Linux**: Volúmenes tienen rendimiento nativo
- **macOS/Windows**: Bind mounts pueden ser lentos
  - Solución: Usa volúmenes nombrados
  - O activa cached/delegated mode

```bash
# macOS: modo cached para mejor rendimiento
docker run -v $(pwd):/app:cached mi-app
```

## Próximos Pasos

En la **Parte 4** exploraremos:

- Redes en Docker
- Comunicación entre contenedores
- Exposición de servicios

## Comandos de Referencia

```bash
# Gestión de volúmenes
docker volume create NAME           # Crear
docker volume ls                    # Listar
docker volume inspect NAME          # Detalles
docker volume rm NAME              # Eliminar
docker volume prune                # Limpiar no usados

# Uso en contenedores
docker run -v nombre:/ruta imagen  # Volumen nombrado
docker run -v /host:/cont imagen   # Bind mount
docker run --tmpfs /ruta imagen    # tmpfs
```

---

**Nota**: Esta es la parte 3 de la serie Docker Fundamentals. Las partes 2, 4 y 5 están en desarrollo.
