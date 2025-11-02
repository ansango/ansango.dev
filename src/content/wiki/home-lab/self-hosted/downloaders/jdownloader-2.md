---
title: JDownloader 2 (Docker)
description: Un gestor de descargas de código abierto que se ejecuta en un contenedor Docker con interfaz web.
date: 2025-09-02
mod: 2025-10-25
published: true
tags: [docker, downloader, self-hosted]
---

# JDownloader 2 (Docker)

Esta es una implementación de [JDownloader 2](https://jdownloader.org/), un popular gestor de descargas de código abierto, dentro de un contenedor Docker. La imagen, mantenida por [jlesage](https://github.com/jlesage/docker-jdownloader-2), permite acceder a la interfaz gráfica de usuario (GUI) completa de JDownloader a través de un navegador web.

JDownloader 2 simplifica y automatiza la descarga de archivos de cientos de servicios de alojamiento de archivos.

## Funcionalidades clave

- **Gestión de descargas:** Permite iniciar, detener y pausar descargas.
- **Límites de ancho de banda:** Configuración de límites para no saturar la conexión a internet.
- **Extracción automática:** Descomprime archivos (rar, zip, etc.) automáticamente una vez finalizada la descarga.
- **Captura de enlaces:** Monitoriza el portapapeles en busca de enlaces de descarga.
- **Resolución de CAPTCHAs:** Soporte para la resolución automática de muchos tipos de CAPTCHAs.
- **Acceso remoto:** La interfaz web permite gestionar las descargas desde cualquier dispositivo en la red.

## Ventajas (del contenedor Docker)

- **Aislamiento:** La aplicación se ejecuta en un entorno aislado, sin afectar al sistema anfitrión.
- **Fácil instalación:** Se despliega rápidamente con una sola configuración de Docker Compose.
- **Acceso web:** No requiere un escritorio físico en el servidor; se accede a la GUI a través del navegador.
- **Persistencia:** La configuración y las descargas se guardan en volúmenes, sobreviviendo a reinicios y actualizaciones del contenedor.

<div class="obsidian-meta-links" style="position: relative;"><a href="https://github.com/jlesage/docker-jdownloader-2" target="_blank" style="border: 1px solid var(--background-modifier-border); margin: 20px 0; border-radius: 3px; width: 100%; display: flex; text-decoration: none !important; background-color: var(--background-primary);"><div style="height: 100%; width: 35%; min-width: 120px; overflow: hidden; border-right: 1px solid var(--background-modifier-border);"><div style="background-image: url(https://opengraph.githubassets.com/1/jlesage/docker-jdownloader-2); background-position: center center; background-size: cover; background-repeat: no-repeat; padding-bottom: 120px; background-color: var(--background-secondary);"></div></div><div style="padding: 8px; width: 75%; overflow: hidden;"><h5 style="font-family: sans-serif; font-size: 1.125rem; margin: 0 0 4px 0; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; color: var(--text-normal);">GitHub - jlesage/docker-jdownloader-2: Docker container for JDownloader 2</h5><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-muted); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">Docker container for JDownloader 2. Contribute to jlesage/docker-jdownloader-2 development by creating an account on GitHub.</p><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-faint); display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;">https://github.com/jlesage/docker-jdownloader-2</p></div></a></div>

## Docker compose

```yml
version: '3.8'
services:
  jdownloader-2:
    image: jlesage/jdownloader-2
    container_name: jdownloader-2
    ports:
      - "5800:5800"
    volumes:
      - ./jdownloader-config:/config
      - ./jdownloader-output:/output
```
