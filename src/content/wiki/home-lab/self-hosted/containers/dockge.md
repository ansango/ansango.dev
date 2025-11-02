---
title: Dockge
description: description
date: 2024-12-17
mod: 2025-10-25
published: true
tags: [compose, containers, docker, management, self-hosted, sysadmin]
---

# Dockge

Dockge es una interfaz de usuario de Docker Compose de código abierto, ligera y fácil de usar. Está diseñada para simplificar la gestión de tus proyectos de Docker Compose, permitiéndote ver el estado de tus contenedores, iniciar, detener, reiniciar y actualizar tus stacks de forma sencilla a través de una interfaz web intuitiva.

## Funcionalidades clave

- Interfaz web para gestionar proyectos de Docker Compose.
- Edición de archivos `compose.yaml` directamente desde el navegador.
- Consola interactiva para cada contenedor.
- Visualización de logs en tiempo real.
- Actualización de stacks con un solo clic.
- Soporte para múltiples archivos `compose.yaml` en un mismo stack.
- Detección automática de cambios en los archivos `compose.yaml`.

## Ventajas

- Simplifica la gestión de aplicaciones basadas en Docker Compose.
- Facilita la edición y despliegue de configuraciones de contenedores.
- Proporciona una visión clara del estado de tus servicios.
- Ideal para usuarios que buscan una alternativa ligera a Portainer para la gestión de Compose.

<div class="obsidian-meta-links" style="position: relative;"><a href="https://github.com/louislam/dockge" target="_blank" style="border: 1px solid var(--background-modifier-border); margin: 20px 0; border-radius: 3px; width: 100%; display: flex; text-decoration: none !important; background-color: var(--background-primary);"><div style="height: 100%; width: 35%; min-width: 120px; overflow: hidden; border-right: 1px solid var(--background-modifier-border);"><div style="background-image: url(https://opengraph.githubassets.com/ec071c17ca01662d1fb1118bb83a78ce051e0d06f0115e3db281e9d8aa9eecd0/louislam/dockge); background-position: center center; background-size: cover; background-repeat: no-repeat; padding-bottom: 120px; background-color: var(--background-secondary);"></div></div><div style="padding: 8px; width: 75%; overflow: hidden;"><h5 style="font-family: sans-serif; font-size: 1.125rem; margin: 0 0 4px 0; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; color: var(--text-normal);">GitHub - louislam/dockge: A fancy, easy-to-use Docker Compose UI for managing your Docker projects</h5><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-muted); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">A fancy, easy-to-use Docker Compose UI for managing your Docker projects. Contribute to louislam/dockge development by creating an account on GitHub.</p><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-faint); display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;">https://github.com/louislam/dockge</p></div></a></div>

## Docker compose

```yml
services:
  dockge:
    image: louislam/dockge:1
    restart: unless-stopped
    ports:
      # Host Port : Container Port
      - 5001:5001
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - ./data:/app/data
        
      # If you want to use private registries, you need to share the auth file with Dockge:
      # - /root/.docker/:/root/.docker

      # Stacks Directory
      # ⚠️ READ IT CAREFULLY. If you did it wrong, your data could end up writing into a WRONG PATH.
      # ⚠️ 1. FULL path only. No relative path (MUST)
      # ⚠️ 2. Left Stacks Path === Right Stacks Path (MUST)
      - /opt/stacks:/opt/stacks
    environment:
      # Tell Dockge where is your stacks directory
      - DOCKGE_STACKS_DIR=/opt/stacks
```
