---
title: Metube
description: Web GUI para descargar con youtube-dl soportando playlists
date: 2025-11-24
mod: 2025-11-24
published: true
tags: [docker, downloader, homelab, self-hosted, youtube, yt-dlp]
---

# Metube

**MeTube** es una interfaz web (GUI) de **youtube-dl / yt-dlp** para uso autoalojado (self-hosted). Permite descargar vídeos (y listas de reproducción) desde YouTube y otras decenas de sitios. 
<div class="obsidian-meta-links" style="position: relative;"><a href="https://github.com/alexta69/metube" target="_blank" style="border: 1px solid var(--background-modifier-border); margin: 20px 0; border-radius: 3px; width: 100%; display: flex; text-decoration: none !important; background-color: var(--background-primary);"><div style="height: 100%; width: 35%; min-width: 120px; overflow: hidden; border-right: 1px solid var(--background-modifier-border);"><div style="background-image: url(https://opengraph.githubassets.com/399ea1cc1ddabc53c8d6d835fbb095ebd47e4fb93178e68d87db53aa2d199fbd/alexta69/metube); background-position: center center; background-size: cover; background-repeat: no-repeat; padding-bottom: 120px; background-color: var(--background-secondary);"></div></div><div style="padding: 8px; width: 75%; overflow: hidden;"><h5 style="font-family: sans-serif; font-size: 1.125rem; margin: 0 0 4px 0; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; color: var(--text-normal);">GitHub - alexta69/metube: Self-hosted YouTube downloader (web UI for youtube-dl / yt-dlp)</h5><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-muted); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">Self-hosted YouTube downloader (web UI for youtube-dl / yt-dlp) - alexta69/metube</p><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-faint); display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;">https://github.com/alexta69/metube</p></div></a></div>

## Características

- Interfaz web para gestionar descargas con **yt-dlp** / **youtube-dl**. 
- Soporte para listas de reproducción, permitiendo descargar playlists completas. 
- Autoalojado: puedes correr MeTube en tu propio servidor.  
- Compatibilidad con múltiples sitios web (no solo YouTube). 
- Permite configurar el comportamiento de descarga (secuencial, concurrente, limitado). 
- Capacidad para borrar archivos descargados desde la interfaz (si se configura). 
- Soporte para HTTPS y uso detrás de un proxy inverso.
- Bookmarklet y atajos para enviar URLs directamente desde el navegador / iOS. 

## Uso e instalación

### Docker

Puedes ejecutar MeTube muy fácilmente con Docker:

```bash
docker run -d -p 8081:8081 -v /path/to/downloads:/downloads ghcr.io/alexta69/metube
```

### Docker compose

```yml
services:
  metube:
    image: ghcr.io/alexta69/metube
    container_name: metube
    restart: unless-stopped
    ports:
      - "8081:8081"
    volumes:
      - /path/to/downloads:/downloads
```

### Ejecución local

Si prefieres ejecutarlo sin Docker:

1. Necesitas Node.js y Python 3.13. [GitHub](https://github.com/alexta69/metube?utm_source=chatgpt.com)
2. Clona el repositorio, entra al directorio `ui`, instala dependencias con `npm install` y construye la UI con `ng build`. [GitHub](https://github.com/alexta69/metube)
3. Luego corre el servidor Python desde `app/main.py`

## Configuración

### Variables de entorno

MeTube se configura mediante variables de entorno (especialmente útil con Docker). Algunas de las más relevantes:

#### Comportamiento de descarga

- `DOWNLOAD_MODE`: controla cómo se gestionan las descargas. Opciones:
    - `sequential`: una descarga a la vez.
    - `concurrent`: todas las descargas se inician inmediatamente.
    - `limited`: descarga concurrente con un límite. Por defecto: `limited`. [GitHub](https://github.com/alexta69/metube?utm_source=chatgpt.com)
- `MAX_CONCURRENT_DOWNLOADS`: solo tiene efecto si `DOWNLOAD_MODE=limited`. Indica el número máximo de descargas concurrentes. Por defecto: `3`. [GitHub](https://github.com/alexta69/metube?utm_source=chatgpt.com)    
- `DELETE_FILE_ON_TRASHCAN`: si es `true`, los archivos se eliminan del servidor cuando se marcan como "borrados" en la interfaz. Por defecto: `false`. [GitHub](https://github.com/alexta69/metube?utm_source=chatgpt.com)
- `DEFAULT_OPTION_PLAYLIST_STRICT_MODE`: si es `true`, solo se descargan playlists cuando la URL apunta estrictamente a una playlist. [GitHub](https://github.com/alexta69/metube?utm_source=chatgpt.com)
- `DEFAULT_OPTION_PLAYLIST_ITEM_LIMIT`: límite máximo de ítems de la playlist que se pueden descargar. Por defecto `0` (sin límite). [GitHub](https://github.com/alexta69/metube?utm_source=chatgpt.com)

#### Almacenamiento y directorios

- `DOWNLOAD_DIR`: ruta donde se guardan las descargas. Por defecto `/downloads` dentro del contenedor. [GitHub](https://github.com/alexta69/metube?utm_source=chatgpt.com)
- `AUDIO_DOWNLOAD_DIR`: ruta para descargas solo de audio. Por defecto, es igual que `DOWNLOAD_DIR`. [GitHub](https://github.com/alexta69/metube?utm_source=chatgpt.com)
- `CUSTOM_DIRS`: habilita subdirectorios personalizados desde la UI para guardar descargas. Por defecto `true`. [GitHub](https://github.com/alexta69/metube?utm_source=chatgpt.com)
- `CREATE_CUSTOM_DIRS`: si es `true`, se crearán subdirectorios desde la UI. Por defecto `true`. [GitHub](https://github.com/alexta69/metube?utm_source=chatgpt.com)
- `CUSTOM_DIRS_EXCLUDE_REGEX`: expresión regular para excluir ciertos nombres de directorios. Por defecto `(^|/)[.@].*$`. [GitHub](https://github.com/alexta69/metube?utm_source=chatgpt.com)
- `DOWNLOAD_DIRS_INDEXABLE`: si es `true`, los directorios se hacen accesibles por web (indexables). Por defecto `false`. [GitHub](https://github.com/alexta69/metube?utm_source=chatgpt.com)
- `STATE_DIR`: ruta donde se guarda el estado de la cola (persistence). Por defecto `/downloads/.metube` dentro del contenedor. [GitHub](https://github.com/alexta69/metube?utm_source=chatgpt.com)
- `TEMP_DIR`: ruta temporal para descargas intermedias. Por defecto `/downloads` también. Se recomienda ponerla en un SSD o un sistema de ficheros RAM para mejorar rendimiento. [GitHub](https://github.com/alexta69/metube?utm_source=chatgpt.com)

#### Naming de archivos y opciones de yt-dlp

- `OUTPUT_TEMPLATE`: plantilla para nombrar los archivos descargados (vídeos). Por defecto `%(title)s.%(ext)s`. [GitHub](https://github.com/alexta69/metube?utm_source=chatgpt.com)
- `OUTPUT_TEMPLATE_CHAPTER`: plantilla para capítulos si se dividen. Por defecto `%(title)s - %(section_number)s %(section_title)s.%(ext)s`. [GitHub](https://github.com/alexta69/metube?utm_source=chatgpt.com)
- `OUTPUT_TEMPLATE_PLAYLIST`: para carpetas de playlist. Por defecto `%(playlist_title)s/%(title)s.%(ext)s`. Si está vacía, se usa `OUTPUT_TEMPLATE`. [GitHub](https://github.com/alexta69/metube?utm_source=chatgpt.com)
- `YTDL_OPTIONS`: JSON con opciones para pasar a **yt-dlp**, como postprocesadores, recodificación, etc. [GitHub](https://github.com/alexta69/metube?utm_source=chatgpt.com)
- `YTDL_OPTIONS_FILE`: ruta a un archivo JSON con las opciones de `YTDL_OPTIONS`. Si ambos (`YTDL_OPTIONS` y `YTDL_OPTIONS_FILE`) están configurados, las opciones definidas en `YTDL_OPTIONS` tienen prioridad. [GitHub](https://github.com/alexta69/metube?utm_source=chatgpt.com)

#### Servidor web y URL

- `URL_PREFIX`: prefijo de la URL base para el servidor web, útil si va detrás de un proxy inverso. Por defecto `/`. [GitHub](https://github.com/alexta69/metube?utm_source=chatgpt.com)
- `PUBLIC_HOST_URL`: URL base pública para los enlaces de descarga mostrados en la UI. Si tus ficheros descargados se sirven desde otro servidor, puedes especificar esta URL. [GitHub](https://github.com/alexta69/metube?utm_source=chatgpt.com)
- `PUBLIC_HOST_AUDIO_URL`: lo mismo que `PUBLIC_HOST_URL`, pero para descargas de audio. [GitHub](https://github.com/alexta69/metube?utm_source=chatgpt.com)
- `HTTPS`: si se establece a `true`, MeTube usará HTTPS. Debes especificar `CERTFILE` y `KEYFILE`. [GitHub](https://github.com/alexta69/metube?utm_source=chatgpt.com)
- `CERTFILE` / `KEYFILE`: rutas a los archivos de certificado SSL y clave si usas HTTPS. [GitHub](https://github.com/alexta69/metube?utm_source=chatgpt.com)
- `ROBOTS_TXT`: puedes montar un `robots.txt` para controlar el indexado de tu instancia de MeTube. [GitHub](https://github.com/alexta69/metube?utm_source=chatgpt.com)

#### Otros ajustes básicos

- `UID`: usuario bajo el cual corre MeTube. Por defecto `1000`. [GitHub](https://github.com/alexta69/metube?utm_source=chatgpt.com)
- `GID`: grupo para MeTube. Por defecto `1000`. [GitHub](https://github.com/alexta69/metube?utm_source=chatgpt.com)
- `UMASK`: máscara de permisos (umask). Por defecto `022`. [GitHub](https://github.com/alexta69/metube?utm_source=chatgpt.com)
- `DEFAULT_THEME`: tema por defecto de la UI. Opciones: `light`, `dark`, `auto`. Por defecto `auto`. [GitHub](https://github.com/alexta69/metube?utm_source=chatgpt.com)
- `LOGLEVEL`: nivel de logs. Puede ser `DEBUG`, `INFO`, `WARNING`, `ERROR`, `CRITICAL`, `NONE`. Por defecto `INFO`. [GitHub](https://github.com/alexta69/metube?utm_source=chatgpt.com)
- `ENABLE_ACCESSLOG`: si activas los logs de acceso HTTP. Por defecto `false`. [GitHub](https://github.com/alexta69/metube?utm_source=chatgpt.com)
