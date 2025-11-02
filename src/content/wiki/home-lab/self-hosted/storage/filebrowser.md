---
title: FileBrowser
description: description
date: 2024-12-17
mod: 2025-10-25
published: true
tags: [file-manager, self-hosted, sysadmin]
---

# FileBrowser

FileBrowser es un gestor de archivos basado en la web que permite gestionar directorios y archivos en un servidor remoto. Ofrece una interfaz sencilla e intuitiva para interactuar con el sistema de archivos, permitiendo a los usuarios subir, descargar, editar y organizar sus datos.

## Funcionalidades clave

- **Gestión de archivos y directorios:** Permite crear, eliminar, renombrar, copiar y mover archivos y directorios.
- **Editor de texto en línea:** Incluye un editor de texto para modificar archivos directamente desde el navegador.
- **Vista previa de archivos:** Soporta la vista previa de imágenes, vídeos, audio y documentos PDF.
- **Gestión de usuarios:** Permite crear múltiples usuarios con directorios de inicio y permisos personalizados.
- **Comandos personalizados:** Posibilidad de ejecutar comandos personalizados en el servidor a través de la interfaz.
- **Interfaz personalizable:** Permite personalizar la apariencia de la interfaz de usuario.

## Ventajas

- **Ligero y rápido:** Consume pocos recursos del sistema y ofrece una experiencia de usuario fluida.
- **Fácil de instalar y configurar:** Se puede desplegar rápidamente como un único ejecutable o a través de Docker.
- **Acceso remoto seguro:** Permite acceder y gestionar archivos de forma remota a través de un navegador web.
- **Multiplataforma:** Compatible con Windows, macOS y Linux.
- **Código abierto:** Es un proyecto de código abierto con una comunidad activa.

<div class="obsidian-meta-links" style="position: relative;"><a href="https://github.com/filebrowser/filebrowser" target="_blank" style="border: 1px solid var(--background-modifier-border); margin: 20px 0; border-radius: 3px; width: 100%; display: flex; text-decoration: none !important; background-color: var(--background-primary);"><div style="height: 100%; width: 35%; min-width: 120px; overflow: hidden; border-right: 1px solid var(--background-modifier-border);"><div style="background-image: url(https://opengraph.githubassets.com/c1a1b1c1a1b1c1a1b1c1a1b1c1a1b1c1a1b1c1a1b1c1a1b1c1a1b1c1a1b1/filebrowser/filebrowser); background-position: center center; background-size: cover; background-repeat: no-repeat; padding-bottom: 120px; background-color: var(--background-secondary);"></div></div><div style="padding: 8px; width: 75%; overflow: hidden;"><h5 style="font-family: sans-serif; font-size: 1.125rem; margin: 0 0 4px 0; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; color: var(--text-normal);">GitHub - filebrowser/filebrowser: 📂 Web File Browser</h5><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-muted); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">📂 Web File Browser. Contribute to filebrowser/filebrowser development by creating an account on GitHub.</p><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-faint); display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;">https://github.com/filebrowser/filebrowser</p></div></a></div>

## Docker compose

```yml
services:
  filebrowser:
    image: filebrowser/filebrowser
    container_name: filebrowser
    user: "${PUID}:${PGID}"
    ports:
      - "8080:80"
    volumes:
      - "/:/srv"
      - "./database.db:/database/filebrowser.db"
      - "./.filebrowser.json:/config/settings.json"
    restart: unless-stopped
```
