---
title: Introducción a Docker
description: Aprende los conceptos fundamentales de Docker, desde contenedores hasta imágenes y por qué Docker revolucionó el desarrollo de software.
date: 2025-11-01
mod: 2025-11-13
published: true
tags: [containers, devops, docker, tutorial]
serieId: "docker-fundamentals"
serieTitle: "Docker Fundamentals: De Cero a Producción"
serieOrder: 1
---

# Introducción a Docker

Docker ha revolucionado la forma en que desarrollamos, desplegamos y ejecutamos aplicaciones. En esta primera parte de la serie **Docker Fundamentals**, vamos a explorar los conceptos básicos que necesitas conocer.

## ¿Qué es Docker?

Docker es una plataforma de contenedorización que permite empaquetar aplicaciones con todas sus dependencias en un formato estándar llamado **contenedor**.

### Ventajas principales

- **Portabilidad**: "Funciona en mi máquina" → "Funciona en todas las máquinas"
- **Aislamiento**: Cada contenedor tiene su propio entorno
- **Eficiencia**: Comparte el kernel del sistema operativo
- **Escalabilidad**: Fácil de replicar y distribuir

## Contenedores vs Máquinas Virtuales

```bash
# Un contenedor es mucho más ligero que una VM
docker run -d nginx  # Segundos para iniciar
# vs
# VM tradicional: minutos para arrancar
```

### Diferencias clave

| Característica | Contenedor | VM |
|----------------|------------|-----|
| Arranque | Segundos | Minutos |
| Tamaño | MBs | GBs |
| Aislamiento | Proceso | Hardware virtual |
| Performance | Nativo | Overhead |

## Conceptos Fundamentales

### 1. Imágenes

Una imagen es una plantilla read-only que contiene:

- Sistema operativo base
- Dependencias de la aplicación
- Código de la aplicación
- Configuración

```dockerfile
# Ejemplo simple de Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]
```

### 2. Contenedores

Un contenedor es una instancia ejecutable de una imagen:

```bash
# Crear y ejecutar un contenedor
docker run -d -p 8080:80 --name mi-app nginx

# Listar contenedores activos
docker ps

# Ver logs
docker logs mi-app
```

### 3. Docker Hub

Repositorio público de imágenes Docker:

```bash
# Descargar una imagen
docker pull ubuntu:22.04

# Buscar imágenes
docker search postgres
```

## Instalación de Docker

### Linux (Ubuntu/Debian)

```bash
# Actualizar paquetes
sudo apt update

# Instalar dependencias
sudo apt install apt-transport-https ca-certificates curl software-properties-common

# Añadir clave GPG oficial de Docker
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Añadir repositorio
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Instalar Docker
sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io

# Verificar instalación
docker --version
```

### macOS

Descarga Docker Desktop desde [docker.com](https://www.docker.com/products/docker-desktop)

## Tu Primer Contenedor

Vamos a crear nuestro primer contenedor con Node.js:

```bash
# 1. Crear un directorio
mkdir mi-primera-app && cd mi-primera-app

# 2. Crear un archivo index.js
cat > index.js << EOF
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('¡Hola desde Docker!\n');
});

server.listen(3000, () => {
  console.log('Servidor corriendo en puerto 3000');
});
EOF

# 3. Crear Dockerfile
cat > Dockerfile << EOF
FROM node:18-alpine
WORKDIR /app
COPY index.js .
EXPOSE 3000
CMD ["node", "index.js"]
EOF

# 4. Construir la imagen
docker build -t mi-primera-app .

# 5. Ejecutar el contenedor
docker run -p 3000:3000 mi-primera-app
```

Abre tu navegador en `http://localhost:3000` y verás el mensaje.

## Comandos Esenciales

```bash
# Gestión de contenedores
docker ps                    # Contenedores activos
docker ps -a                 # Todos los contenedores
docker stop <container>      # Detener
docker start <container>     # Iniciar
docker restart <container>   # Reiniciar
docker rm <container>        # Eliminar

# Gestión de imágenes
docker images               # Listar imágenes
docker rmi <image>         # Eliminar imagen
docker pull <image>        # Descargar imagen
docker build -t name .     # Construir imagen

# Limpieza
docker system prune        # Limpiar recursos no usados
docker volume prune        # Limpiar volúmenes
```

## Próximos Pasos

En la **Parte 3** de esta serie (la Parte 2 está en desarrollo), exploraremos:

- Volúmenes y persistencia de datos
- Redes en Docker
- Variables de entorno

## Recursos Adicionales

- [Documentación oficial de Docker](https://docs.docker.com)
- [Docker Hub](https://hub.docker.com)
- [Awesome Docker](https://github.com/veggiemonk/awesome-docker)

---

**Nota**: Esta es la primera parte de una serie de 5 artículos sobre Docker. ¡Continúa con la siguiente parte para profundizar más!
