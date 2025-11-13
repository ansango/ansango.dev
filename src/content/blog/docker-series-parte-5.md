---
title: "Docker en Producción: Deployment y Best Practices"
description: "Aprende a llevar tus aplicaciones Docker a producción de forma segura. Optimización de imágenes, seguridad, monitoreo y estrategias de deployment."
date: 2025-11-13
mod: 2025-11-13
published: true
tags: [deployment, devops, docker, production, security]
serieId: "docker-fundamentals"
serieTitle: "Docker Fundamentals: De Cero a Producción"
serieOrder: 5
---

# Docker en Producción: Deployment y Best Practices

Llevar contenedores a producción requiere considerar aspectos de seguridad, rendimiento y confiabilidad. En esta última parte de la serie, veremos cómo hacerlo correctamente.

## Optimización de Imágenes

### Multi-stage Builds

Reduce el tamaño de las imágenes finales:

```dockerfile
# Etapa de build
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

# Etapa de producción
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./

USER node
EXPOSE 3000
CMD ["node", "dist/index.js"]
```

**Resultado:**
- Build stage: ~1.2 GB
- Production stage: ~150 MB ✨

### Optimización de Capas

```dockerfile
# ❌ Mal: Muchas capas
RUN apt-get update
RUN apt-get install -y curl
RUN apt-get install -y vim
RUN apt-get install -y git

# ✅ Bien: Una sola capa
RUN apt-get update && apt-get install -y \
    curl \
    vim \
    git \
    && rm -rf /var/lib/apt/lists/*
```

### .dockerignore

```dockerignore
# .dockerignore
node_modules
npm-debug.log
.git
.env
.env.local
dist
build
*.md
.vscode
.idea
coverage
.pytest_cache
__pycache__
```

## Seguridad

### 1. Usuario no-root

```dockerfile
# Crear usuario
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Cambiar ownership
RUN chown -R appuser:appgroup /app

# Usar usuario
USER appuser
```

### 2. Escaneo de Vulnerabilidades

```bash
# Instalar trivy
brew install aquasecurity/trivy/trivy

# Escanear imagen
trivy image mi-app:latest

# Escanear solo vulnerabilidades CRITICAL y HIGH
trivy image --severity CRITICAL,HIGH mi-app:latest
```

### 3. Imágenes Base Seguras

```dockerfile
# ❌ Evitar: latest sin versión
FROM node:latest

# ✅ Usar: versión específica + alpine
FROM node:18.17.1-alpine3.18

# ✅ Mejor aún: digest inmutable
FROM node:18.17.1-alpine3.18@sha256:abc123...
```

### 4. Secrets Management

```bash
# ❌ NUNCA hagas esto
ENV DATABASE_PASSWORD=super_secreto

# ✅ Usa secrets de Docker
echo "mi_secreto" | docker secret create db_password -

# Usar en compose
services:
  app:
    secrets:
      - db_password
secrets:
  db_password:
    external: true
```

```javascript
// Leer secret en la aplicación
const fs = require('fs');
const password = fs.readFileSync('/run/secrets/db_password', 'utf8').trim();
```

## Health Checks

```dockerfile
# En Dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node healthcheck.js || exit 1
```

```javascript
// healthcheck.js
const http = require('http');

const options = {
  host: 'localhost',
  port: 3000,
  path: '/health',
  timeout: 2000
};

const request = http.request(options, (res) => {
  if (res.statusCode === 200) {
    process.exit(0);
  } else {
    process.exit(1);
  }
});

request.on('error', () => process.exit(1));
request.end();
```

```yaml
# docker-compose.yml
services:
  app:
    image: mi-app
    healthcheck:
      test: ["CMD", "node", "healthcheck.js"]
      interval: 30s
      timeout: 3s
      retries: 3
      start_period: 40s
```

## Logging y Monitoreo

### Structured Logging

```javascript
// logger.js
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console()
  ]
});

logger.info('Server started', { 
  port: 3000, 
  environment: process.env.NODE_ENV 
});
```

### Configuración de Logs

```yaml
# docker-compose.yml
services:
  app:
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
```

### Prometheus + Grafana

```yaml
version: '3.8'

services:
  app:
    image: mi-app
    ports:
      - "3000:3000"

  prometheus:
    image: prom/prometheus
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus-data:/prometheus
    ports:
      - "9090:9090"

  grafana:
    image: grafana/grafana
    volumes:
      - grafana-data:/var/lib/grafana
    ports:
      - "3001:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin

volumes:
  prometheus-data:
  grafana-data:
```

```yaml
# prometheus.yml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'app'
    static_configs:
      - targets: ['app:3000']
```

## Estrategias de Deployment

### 1. Rolling Update

```yaml
# docker-compose.yml
services:
  app:
    image: mi-app:v2
    deploy:
      replicas: 3
      update_config:
        parallelism: 1
        delay: 10s
        order: start-first
```

### 2. Blue-Green Deployment

```bash
# Deploy green
docker-compose -f docker-compose.green.yml up -d

# Test green
curl http://green.example.com/health

# Switch traffic (en load balancer)
# nginx, traefik, etc.

# Remove blue
docker-compose -f docker-compose.blue.yml down
```

### 3. Canary Deployment

```yaml
# 90% tráfico a stable
# 10% tráfico a canary
services:
  app-stable:
    deploy:
      replicas: 9
  
  app-canary:
    deploy:
      replicas: 1
```

## CI/CD Pipeline

```yaml
# .github/workflows/docker.yml
name: Docker Build and Deploy

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v2
      
      - name: Login to DockerHub
        uses: docker/login-action@v2
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}
      
      - name: Build and push
        uses: docker/build-push-action@v4
        with:
          context: .
          push: true
          tags: |
            user/app:latest
            user/app:${{ github.sha }}
          cache-from: type=gha
          cache-to: type=gha,mode=max
      
      - name: Run security scan
        run: |
          docker run --rm \
            -v /var/run/docker.sock:/var/run/docker.sock \
            aquasec/trivy:latest \
            image user/app:latest
```

## Resource Limits

```yaml
# docker-compose.yml
services:
  app:
    image: mi-app
    deploy:
      resources:
        limits:
          cpus: '0.50'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M
```

```bash
# CLI
docker run -d \
  --name mi-app \
  --cpus=".5" \
  --memory="512m" \
  --memory-swap="1g" \
  mi-app
```

## Backup y Disaster Recovery

```bash
#!/bin/bash
# backup.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups"

# Backup de volúmenes
docker run --rm \
  -v postgres-data:/source:ro \
  -v $BACKUP_DIR:/backup \
  alpine \
  tar czf /backup/postgres-$DATE.tar.gz -C /source .

# Backup de configuración
docker-compose config > $BACKUP_DIR/compose-$DATE.yml

# Subir a S3
aws s3 cp $BACKUP_DIR/postgres-$DATE.tar.gz \
  s3://mi-bucket/backups/

# Limpiar backups antiguos (más de 30 días)
find $BACKUP_DIR -name "*.tar.gz" -mtime +30 -delete
```

## Checklist de Producción

- [ ] Imágenes optimizadas (multi-stage)
- [ ] Usuario no-root
- [ ] Health checks configurados
- [ ] Logs estructurados
- [ ] Resource limits definidos
- [ ] Secrets seguros (no en ENV)
- [ ] Backups automatizados
- [ ] Monitoreo activo
- [ ] Escaneo de vulnerabilidades
- [ ] Documentación actualizada
- [ ] CI/CD pipeline
- [ ] Estrategia de rollback
- [ ] Alertas configuradas

## Herramientas Esenciales

### Portainer

```bash
docker run -d \
  -p 9000:9000 \
  --name portainer \
  --restart always \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v portainer-data:/data \
  portainer/portainer-ce
```

### Watchtower (Auto-updates)

```bash
docker run -d \
  --name watchtower \
  -v /var/run/docker.sock:/var/run/docker.sock \
  containrrr/watchtower \
  --interval 3600
```

## Conclusión

¡Has completado la serie Docker Fundamentals! 🎉

**Hemos cubierto:**
1. ✅ Conceptos básicos y primeros pasos
2. ⏳ Dockerfile y construcción de imágenes (en desarrollo)
3. ✅ Volúmenes y persistencia
4. ⏳ Networking (en desarrollo)
5. ✅ Producción y deployment

### Próximos pasos recomendados

- Explorar **Kubernetes** para orquestación a gran escala
- Aprender **Docker Swarm** como alternativa más simple
- Profundizar en **seguridad de contenedores**
- Implementar **observabilidad completa**

## Recursos Finales

- [Docker Documentation](https://docs.docker.com)
- [Docker Security Best Practices](https://docs.docker.com/develop/security-best-practices/)
- [Awesome Docker](https://github.com/veggiemonk/awesome-docker)
- [Play with Docker](https://labs.play-with-docker.com/)

---

**¡Gracias por seguir esta serie!** Si tienes preguntas, déjalas en los comentarios.
