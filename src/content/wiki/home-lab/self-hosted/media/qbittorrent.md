---
title: qBittorrent
description: Cliente BitTorrent de código abierto, multiplataforma y sin publicidad.
date: 2025-08-28
mod: 2025-10-25
published: true
tags: [bittorrent, downloader, p2p, self-hosted, sysadmin]
---

# qBittorrent

qBittorrent es un cliente BitTorrent multiplataforma, gratuito y de código abierto. Es una alternativa a otros clientes populares, destacando por no incluir publicidad y por su bajo consumo de recursos.

## Funcionalidades clave

- Interfaz de usuario web para gestión remota, muy similar a la aplicación de escritorio.
- Motor de búsqueda de torrents integrado y personalizable.
- Soporte para RSS con filtros de descarga avanzados para automatización.
- Control total sobre torrents, trackers y peers.
- Herramienta para crear torrents.
- Descarga secuencial para previsualizar archivos multimedia.
- Programador de ancho de banda.

## Ventajas

- Completamente gratuito, sin anuncios ni software espía.
- Ligero, rápido y eficiente en el uso de CPU y memoria.
- Proyecto de código abierto con una comunidad activa.
- Ofrece una experiencia de usuario limpia y directa.

<div class="obsidian-meta-links" style="position: relative;"><a href="https://github.com/qbittorrent/qBittorrent" target="_blank" style="border: 1px solid var(--background-modifier-border); margin: 20px 0; border-radius: 3px; width: 100%; display: flex; text-decoration: none !important; background-color: var(--background-primary);"><div style="height: 100%; width: 35%; min-width: 120px; overflow: hidden; border-right: 1px solid var(--background-modifier-border);"><div style="background-image: url(https://opengraph.githubassets.com/1/qbittorrent/qBittorrent); background-position: center center; background-size: cover; background-repeat: no-repeat; padding-bottom: 120px; background-color: var(--background-secondary);"></div></div><div style="padding: 8px; width: 75%; overflow: hidden;"><h5 style="font-family: sans-serif; font-size: 1.125rem; margin: 0 0 4px 0; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; color: var(--text-normal);">GitHub - qbittorrent/qBittorrent: qBittorrent BitTorrent client</h5><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-muted); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">qBittorrent BitTorrent client. Contribute to qbittorrent/qBittorrent development by creating an account on GitHub.</p><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-faint); display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;">https://github.com/qbittorrent/qBittorrent</p></div></a></div>

## Docker compose

```yml
services:
  qbittorrent:
    image: lscr.io/linuxserver/qbittorrent:latest
    container_name: qbittorrent
    restart: unless-stopped
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Etc/UTC
      - WEBUI_PORT=8080
    volumes:
      - ./qbittorrent-config:/config
      - ./downloads:/downloads
    ports:
      - 8080:8080
      - 6881:6881
      - 6881:6881/udp
```
