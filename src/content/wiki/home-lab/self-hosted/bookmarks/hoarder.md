---
title: Hoarder / Karakeep
description: "Hoarder/Karakeep: aplicación auto-alojable para guardar contenido digital con IA, etiquetado automático, OCR y preservación de datos"
date: 2025-09-02
mod: 2025-10-25
published: true
tags: [ai, bookmarks, organization, self-hosted]
---

# Hoarder / Karakeep

Karakeep (anteriormente conocido como Hoarder) es una aplicación de código abierto y auto-alojable diseñada para ser un "guardatodo" digital. Permite guardar, organizar y buscar una amplia gama de contenido, como enlaces, notas, imágenes y PDFs, utilizando IA para facilitar la organización.

## Funcionalidades clave

- **Etiquetado por IA:** Utiliza Modelos de Lenguaje Grandes (LLMs) para entender y etiquetar automáticamente el contenido que guardas. Soporta tanto servicios en la nube (OpenAI) como modelos locales (Ollama).
- **Organización de contenido:** Guarda enlaces, texto, imágenes y PDFs. La aplicación extrae automáticamente metadatos como títulos y descripciones.
- **Búsqueda de texto completo:** Todo el contenido guardado se indexa, permitiendo una búsqueda rápida y completa.
- **Soporte multiplataforma:** Ofrece extensiones de navegador para Chrome y Firefox, así como aplicaciones móviles para iOS y Android.
- **Preservación de datos:** Combate el "link rot" (enlaces rotos) guardando archivos offline de las páginas que guardas.
- **Extracción de contenido:** Incluye OCR para extraer texto de imágenes.

## Ventajas

- **Auto-alojado:** Tienes control total sobre tus datos y privacidad.
- **Organizador todo en uno:** Actúa como un centro neurálgico para todo tu contenido digital, no solo enlaces.
- **Moderno y en desarrollo activo:** Construido con un stack tecnológico moderno y con una comunidad activa.
- **Personalizable:** Un motor basado en reglas permite una gestión personalizada de tus marcadores.

<div class="obsidian-meta-links" style="position: relative;"><a href="https://github.com/karakeep-app/karakeep" target="_blank" style="border: 1px solid var(--background-modifier-border); margin: 20px 0; border-radius: 3px; width: 100%; display: flex; text-decoration: none !important; background-color: var(--background-primary);"><div style="height: 100%; width: 35%; min-width: 120px; overflow: hidden; border-right: 1px solid var(--background-modifier-border);"><div style="background-image: url(https://opengraph.githubassets.com/1/karakeep-app/karakeep); background-position: center center; background-size: cover; background-repeat: no-repeat; padding-bottom: 120px; background-color: var(--background-secondary);"></div></div><div style="padding: 8px; width: 75%; overflow: hidden;"><h5 style="font-family: sans-serif; font-size: 1.125rem; margin: 0 0 4px 0; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; color: var(--text-normal);">GitHub - karakeep-app/karakeep: A self-hostable bookmark-everything app with a touch of AI.</h5><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-muted); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">A self-hostable bookmark-everything app with a touch of AI. Contribute to karakeep-app/karakeep development by creating an account on GitHub.</p><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-faint); display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;">https://github.com/karakeep-app/karakeep</p></div></a></div>

## Docker compose

```yml
services:
  web:
    image: ghcr.io/karakeep-app/karakeep:${KARAKEEP_VERSION:-release}
    restart: unless-stopped
    volumes:
      - data:/data
    ports:
      - 3000:3000
    env_file:
      - .env
    environment:
      MEILI_ADDR: http://meilisearch:7700
      BROWSER_WEB_URL: http://chrome:9222
      DATA_DIR: /data # DON'T CHANGE THIS
  chrome:
    image: gcr.io/zenika-hub/alpine-chrome:124
    restart: unless-stopped
    command:
      - --no-sandbox
      - --disable-gpu
      - --disable-dev-shm-usage
      - --remote-debugging-address=0.0.0.0
      - --remote-debugging-port=9222
      - --hide-scrollbars
  meilisearch:
    image: getmeili/meilisearch:v1.13.3
    restart: unless-stopped
    env_file:
      - .env
    environment:
      MEILI_NO_ANALYTICS: "true"
    volumes:
      - meilisearch:/meili_data
volumes:
  meilisearch:
  data:
```

## Archivo de Entorno (`.env`)

Crea un archivo `.env` y define las siguientes variables. Es **crítico** usar valores aleatorios y seguros.

```
KARAKEEP_VERSION=release
NEXTAUTH_SECRET=super_random_string
MEILI_MASTER_KEY=another_random_string
NEXTAUTH_URL=http://localhost:3000
```

- `NEXTAUTH_URL`: Cámbialo por la URL de tu servidor.
