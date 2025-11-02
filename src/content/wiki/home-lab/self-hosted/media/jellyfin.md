---
title: Jellyfin
description: description
date: 2024-12-17
mod: 2025-10-25
published: true
tags: [docker, media, self-hosted, sysadmin]
---

# Jellyfin

Jellyfin es un servidor multimedia software libre y gratuito. Ofrece privacidad total para el contenido multimedia y fotos/vídeos personales, sin conexión a servidores externos. Es multiplataforma y se puede instalar en Windows, Linux y Mac. 

## Características Principales

- **Streaming personal**: Convierte tus archivos de video y música en una biblioteca similar a Netflix
- **Multiplataforma**: Compatible con dispositivos como smart TVs, smartphones, navegadores web
- **Gratuito y sin anuncios**: Totalmente libre, sin costos de suscripción
- **Control total**: Administración completa de tu biblioteca multimedia

## Funcionalidades Destacadas

- Análisis automático de archivos multimedia
- Obtención de metadatos (carátulas, géneros, actores)
- Transmisión remota
- Soporte para múltiples formatos de video y audio
- Plugins para extensión de funcionalidades
- Control parental
- Sincronización de reproducción entre usuarios


<div class="obsidian-meta-links" style="position: relative;"><a href="https://github.com/jellyfin/jellyfin" target="_blank" style="border: 1px solid var(--background-modifier-border); margin: 20px 0; border-radius: 3px; width: 100%; display: flex; text-decoration: none !important; background-color: var(--background-primary);"><div style="height: 100%; width: 35%; min-width: 120px; overflow: hidden; border-right: 1px solid var(--background-modifier-border);"><div style="background-image: url(https://opengraph.githubassets.com/7ff9e8c97ae8a911ae056dd5f4742d0d3758fd4421901a6ec4336e9b8b4cca52/jellyfin/jellyfin); background-position: center center; background-size: cover; background-repeat: no-repeat; padding-bottom: 120px; background-color: var(--background-secondary);"></div></div><div style="padding: 8px; width: 75%; overflow: hidden;"><h5 style="font-family: sans-serif; font-size: 1.125rem; margin: 0 0 4px 0; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; color: var(--text-normal);">GitHub - jellyfin/jellyfin: The Free Software Media System - Server Backend & API</h5><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-muted); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">The Free Software Media System - Server Backend & API - jellyfin/jellyfin</p><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-faint); display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;">https://github.com/jellyfin/jellyfin</p></div></a></div>

## Docker compose

```yml
services:
  jellyfin:
    image: jellyfin/jellyfin:latest
    container_name: jellyfin
    network_mode: "host"
    volumes:
      - ./config:/config
      - ./cache:/cache
      - type: bind
        source: /mnt/worker/library
        target: /media
    restart: "unless-stopped"
```
