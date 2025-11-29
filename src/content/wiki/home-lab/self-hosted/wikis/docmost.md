---
title: Docmost
description: Una plataforma de wiki y documentación colaborativa de código abierto, alternativa a Confluence y Notion.
date: 2025-09-02
mod: 2025-11-29
published: true
tags: [collaboration, documentation, self-hosted, wiki]
---

# Docmost

Docmost es una plataforma de wiki y documentación colaborativa de código abierto. Se presenta como una alternativa auto-alojada a servicios como Confluence y Notion, permitiendo a los equipos crear y gestionar conocimiento de forma centralizada.

## Funcionalidades clave

- **Editor colaborativo en tiempo real:** Permite que múltiples usuarios editen documentos simultáneamente.
- **Soporte para diagramas:** Se integra con herramientas como Draw.io, Excalidraw y Mermaid para crear diagramas directamente en los documentos.
- **Organización por espacios:** Utiliza "espacios" para agrupar documentación relacionada y gestionar permisos de forma lógica.
- **Sistema de permisos:** Control granular sobre quién puede ver, editar o comentar en los documentos.
- **Adjuntar archivos:** Permite subir y adjuntar archivos a las páginas de la wiki.

## Ventajas

- **Auto-alojado:** Tienes control total sobre tus datos y la infraestructura de la plataforma.
- **Código abierto:** Es un software gratuito y de código abierto, lo que permite la personalización y la auditoría del código.
- **Colaboración en tiempo real:** Facilita el trabajo en equipo y la creación conjunta de documentación.
- **Alternativa a servicios de pago:** Ofrece funcionalidades similares a las de herramientas populares pero sin el coste de la licencia.

<div class="obsidian-meta-links" style="position: relative;"><a href="https://github.com/docmost/docmost" target="_blank" style="border: 1px solid var(--background-modifier-border); margin: 20px 0; border-radius: 3px; width: 100%; display: flex; text-decoration: none !important; background-color: var(--background-primary);"><div style="height: 100%; width: 35%; min-width: 120px; overflow: hidden; border-right: 1px solid var(--background-modifier-border);"><div style="background-image: url(https://opengraph.githubassets.com/1/docmost/docmost); background-position: center center; background-size: cover; background-repeat: no-repeat; padding-bottom: 120px; background-color: var(--background-secondary);"></div></div><div style="padding: 8px; width: 75%; overflow: hidden;"><h5 style="font-family: sans-serif; font-size: 1.125rem; margin: 0 0 4px 0; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; color: var(--text-normal);">GitHub - docmost/docmost: Docmost is an open-source, collaborative wiki.</h5><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-muted); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">Docmost is an open-source, collaborative wiki. Contribute to docmost/docmost development by creating an account on GitHub.</p><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-faint); display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;">https://github.com/docmost/docmost</p></div></a></div>

## Docker compose

Este archivo `docker-compose.yml` despliega Docmost junto con una base de datos PostgreSQL y Redis.

```yml
version: '3'
services:
  docmost:
    image: docmost/docmost:latest
    depends_on:
      - db
      - redis
    environment:
      APP_URL: 'http://localhost:3000'
      APP_SECRET: 'REPLACE_WITH_LONG_SECRET'
      DATABASE_URL: 'postgresql://docmost:STRONG_DB_PASSWORD@db:5432/docmost?schema=public'
      REDIS_URL: 'redis://redis:6379'
    ports:
      - "3000:3000"
    restart: unless-stopped
    volumes:
      - docmost:/app/data/storage
  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: docmost
      POSTGRES_USER: docmost
      POSTGRES_PASSWORD: STRONG_DB_PASSWORD
    restart: unless-stopped
    volumes:
      - db_data:/var/lib/postgresql/data
  redis:
    image: redis:7.2-alpine
    restart: unless-stopped
    volumes:
      - redis_data:/data
volumes:
  docmost:
  db_data:
  redis_data:
```

### Variables de Entorno

Es **crítico** cambiar las siguientes variables de entorno antes de desplegar:

- `APP_SECRET`: Reemplazar con una cadena de texto larga y secreta.
- `STRONG_DB_PASSWORD`: Reemplazar con una contraseña segura para la base de datos.
