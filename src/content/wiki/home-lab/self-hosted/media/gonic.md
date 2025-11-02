---
title: Gonic
description: description
date: 2024-12-17
mod: 2025-10-25
published: true
tags: [docker, gonic, music, self-hosted]
---

# Gonic

Gonic es un servidor de música escrito en `go` con las siguientes características principales:

1. Navegación por carpetas y etiquetas (compatible con varios formatos de audio)
2. Transcodificación y almacenamiento en caché de audio
3. Escaneo rápido de bibliotecas musicales
4. Soporte multiusuario con preferencias individuales
5. Integración con Last.fm para scrobbling y metadatos
6. Interfaz web para configuración y administración
7. Manejo de etiquetas de artistas de álbum
8. Desarrollado en Go, ligero y apto para dispositivos como Raspberry Pi
9. Autenticación por token
10. Compatible con varias aplicaciones cliente (dsub, jamstash, etc.)

Este servidor ofrece una solución eficiente y versátil para gestionar y reproducir colecciones de música, con énfasis en rendimiento y flexibilidad.

<div class="obsidian-meta-links" style="position: relative;"><a href="https://github.com/sentriz/gonic" target="_blank" style="border: 1px solid var(--background-modifier-border); margin: 20px 0; border-radius: 3px; width: 100%; display: flex; text-decoration: none !important; background-color: var(--background-primary);"><div style="height: 100%; width: 35%; min-width: 120px; overflow: hidden; border-right: 1px solid var(--background-modifier-border);"><div style="background-image: url(https://repository-images.githubusercontent.com/178435468/bc571280-6a12-11ea-9ace-552baa2df12f); background-position: center center; background-size: cover; background-repeat: no-repeat; padding-bottom: 120px; background-color: var(--background-secondary);"></div></div><div style="padding: 8px; width: 75%; overflow: hidden;"><h5 style="font-family: sans-serif; font-size: 1.125rem; margin: 0 0 4px 0; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; color: var(--text-normal);">GitHub - sentriz/gonic: music streaming server / free-software subsonic server API implementation</h5><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-muted); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">music streaming server / free-software subsonic server API implementation - sentriz/gonic</p><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-faint); display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;">https://github.com/sentriz/gonic</p></div></a></div>

## Docker compose

Creamos un archivo para docker compose con lo siguiente:

```yml
services:
  gonic_web:
    image: sentriz/gonic:latest
    container_name: gonic
    ports:
      - 4747:80
    volumes:
      - $HOME/music:/music:ro
      - $HOME/docker/gonic/data:/data
      - $HOME/docker/gonic/cache:/cache
      - $HOME/docker/gonic/podcasts:/podcasts
      - $HOME/docker/gonic/playlists:/playlists
```
