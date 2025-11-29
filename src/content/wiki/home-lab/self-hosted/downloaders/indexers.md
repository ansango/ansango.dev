---
title: Stack de Indexadores y Gestión de Medios
description: "Stack de indexadores y gestión de medios: Prowlarr, Jackett, Sonarr, Radarr para automatizar búsqueda y descarga de contenido multimedia"
date: 2025-09-02
mod: 2025-10-25
published: true
tags: [docker, jackett, media, prowlarr, radarr, self-hosted, sonarr]
---

# Stack de Indexadores y Gestión de Medios

Este stack, comúnmente conocido como el "arr stack", es una suite de servicios diseñados para automatizar la búsqueda, descarga y organización de contenido multimedia. Funciona integrando indexadores de torrents y Usenet con gestores de contenido para películas y series.

## Componentes del Stack

### Indexadores

- **Prowlarr**: Un gestor de indexadores que se integra perfectamente con Sonarr, Radarr y otros. Centraliza la configuración de todos tus trackers de torrents y sitios de Usenet, simplificando la gestión.
- **Jackett**: Actúa como un servidor proxy que traduce las consultas de aplicaciones como Sonarr y Radarr a consultas específicas de cada tracker. Es una alternativa a Prowlarr y soporta una gran cantidad de trackers.

### Gestión de Medios

- **Sonarr**: Un PVR (Grabador de Video Personal) para series de TV. Monitoriza los episodios nuevos, los descarga automáticamente a través de tu cliente de torrents y los organiza en tu biblioteca.
- **Radarr**: Similar a Sonarr, pero enfocado en películas. Gestiona tu colección de películas, busca lanzamientos de alta calidad y los descarga automáticamente.

## Docker Compose

Este archivo `docker-compose.yml` despliega el stack completo.

```yml
services:
  # Indexadores
  prowlarr:
    image: lscr.io/linuxserver/prowlarr:latest
    container_name: prowlarr
    hostname: prowlarr
    restart: unless-stopped
    volumes:
      - ${ARRPATH}prowlarr/config:/config
      - ${ARRPATH}prowlarr/backup:/data/backup
      - ${ARRPATH}downloads:/downloads
    ports:
      - "9696:9696"       # Interfaz Web
    env_file:
      - ./.env

  jackett:
    image: lscr.io/linuxserver/jackett:latest
    container_name: jackett
    hostname: jackett
    restart: unless-stopped
    volumes:
      - ${ARRPATH}jackett/data:/config
      - ${ARRPATH}blackhole:/downloads
    ports:
      - "9117:9117"       # Interfaz Web
    env_file:
      - ./.env

  # Gestión de Medios (Películas y Series)
  sonarr:
    image: lscr.io/linuxserver/sonarr:latest
    container_name: sonarr
    hostname: sonarr
    restart: unless-stopped
    volumes:
      - ${ARRPATH}sonarr/config:/config
      - ${ARRPATH}sonarr/backup:/data/backup
      - ${ARRPATH}sonarr/tvshows:/data/tvshows
      - ${ARRPATH}downloads:/downloads
    ports:
      - "8989:8989"       # Interfaz Web
    env_file:
      - ./.env

  radarr:
    image: lscr.io/linuxserver/radarr:latest
    container_name: radarr
    hostname: radarr
    restart: unless-stopped
    volumes:
      - ${ARRPATH}radarr/config:/config
      - ${ARRPATH}radarr/movies:/data/movies
      - ${ARRPATH}radarr/backup:/data/backup
      - ${ARRPATH}downloads:/downloads
    ports:
      - "7878:7878"       # Interfaz Web
    env_file:
      - ./.env
```

## Archivo de Entorno (`.env`)

Es necesario crear un archivo `.env` en el mismo directorio que el `docker-compose.yml` para definir las variables globales.

```
# Ruta base para los volúmenes de datos.
# CUIDADO! mantener la barra del final al cambiar la ruta.
ARRPATH=/media/

# Variables globales de usuario y zona horaria
TZ=Europe/Madrid
PUID=1000
PGID=1000
```
