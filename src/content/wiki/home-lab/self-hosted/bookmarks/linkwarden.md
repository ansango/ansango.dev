---
title: Linkwarden
description: "Linkwarden: gestor de marcadores colaborativo auto-alojable, archivado automático de páginas web, anotaciones y búsqueda completa"
date: 2025-09-02
mod: 2025-10-25
published: true
tags: [archiving, bookmarks, collaboration, self-hosted]
---

# Linkwarden

Linkwarden es un gestor de marcadores colaborativo, de código abierto y auto-alojable. Su propósito es recopilar, organizar y, lo más importante, archivar páginas web para combatir el "link rot" (enlaces rotos).

## Funcionalidades clave

- **Preservación automática:** Guarda una copia de cada página web como captura de pantalla, PDF y archivo HTML para asegurar que el contenido permanezca accesible.
- **Lectura y anotación:** Ofrece una vista de lectura para artículos, con herramientas para resaltar y anotar texto.
- **Organización avanzada:** Permite organizar enlaces en colecciones y sub-colecciones, con descripciones y etiquetas. Incluye IA local para el etiquetado automático.
- **Colaboración:** Permite a los equipos reunir enlaces y trabajar juntos, con permisos personalizables para cada miembro.
- **Búsqueda y accesibilidad:** Ofrece búsqueda de texto completo, filtrado, un diseño adaptable con modos oscuro/claro, y una extensión de navegador.
- **Integraciones:** Soporta SSO, claves de API, suscripciones a feeds RSS e importación/exportación de marcadores.

## Ventajas

- **Preservación digital:** Su principal ventaja es asegurar que nunca pierdas el acceso a información importante, incluso si la fuente original desaparece.
- **Control total:** Al ser auto-alojado, tienes el control total sobre tus datos.
- **Funcionalidad todo en uno:** Combina las características de un servicio de "leer más tarde" con la fiabilidad de un archivo web personal.

<div class="obsidian-meta-links" style="position: relative;"><a href="https://github.com/linkwarden/linkwarden" target="_blank" style="border: 1px solid var(--background-modifier-border); margin: 20px 0; border-radius: 3px; width: 100%; display: flex; text-decoration: none !important; background-color: var(--background-primary);"><div style="height: 100%; width: 35%; min-width: 120px; overflow: hidden; border-right: 1px solid var(--background-modifier-border);"><div style="background-image: url(https://opengraph.githubassets.com/1/linkwarden/linkwarden); background-position: center center; background-size: cover; background-repeat: no-repeat; padding-bottom: 120px; background-color: var(--background-secondary);"></div></div><div style="padding: 8px; width: 75%; overflow: hidden;"><h5 style="font-family: sans-serif; font-size: 1.125rem; margin: 0 0 4px 0; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; color: var(--text-normal);">GitHub - linkwarden/linkwarden: ⚡️⚡️⚡️ Self-hosted, open-source collaborative bookmark manager to collect, organize, and archive webpages.</h5><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-muted); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">⚡️⚡️⚡️ Self-hosted, open-source collaborative bookmark manager to collect, organize, and archive webpages. - linkwarden/linkwarden</p><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-faint); display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;">https://github.com/linkwarden/linkwarden</p></div></a></div>

## Docker compose

```yml
services:
  postgres:
    image: postgres:16-alpine
    env_file: .env
    restart: always
    volumes:
      - ./pgdata:/var/lib/postgresql/data
  linkwarden:
    env_file: .env
    environment:
      - DATABASE_URL=postgresql://postgres:${POSTGRES_PASSWORD}@postgres:5432/postgres
    restart: always
    image: ghcr.io/linkwarden/linkwarden:latest
    ports:
      - 3000:3000
    volumes:
      - ./data:/data/data
    depends_on:
      - postgres
      - meilisearch
  meilisearch:
    image: getmeili/meilisearch:v1.12.8
    restart: always
    env_file:
      - .env
    volumes:
      - ./meili_data:/meili_data
```

## Archivo de Entorno (`.env`)

Crea un archivo `.env` en el mismo directorio que el `docker-compose.yml` y define las siguientes variables. Es **crítico** usar valores aleatorios y seguros.

```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_strong_password
MEILI_MASTER_KEY=your_strong_meili_key
```

- Reemplaza `your_strong_password` y `your_strong_meili_key` con contraseñas seguras.
