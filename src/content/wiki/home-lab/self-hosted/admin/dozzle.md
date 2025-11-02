---
title: Dozzle
description: description
date: 2024-12-17
mod: 2025-10-25
published: true
tags: [docker, logs, self-hosted, sysadmin]
---

# Dozzle

Dozzle es un visor de registro de código abierto patrocinado por Docker OSS.

Ofrece streaming de registro en tiempo real, filtrado y búsqueda a través de una interfaz de usuario intuitiva. Permite acceder rápidamente a los logs generados por contenedores Docker para depurar y solucionar problemas.

Es fácil de instalar y configurar, lo que la convierte en una herramienta ideal para desarrolladores y administradores de sistemas. Está disponible bajo la licencia del MIT y está mantenida activamente.

<div class="obsidian-meta-links" style="position: relative;"><a href="https://github.com/amir20/dozzle" target="_blank" style="border: 1px solid var(--background-modifier-border); margin: 20px 0; border-radius: 3px; width: 100%; display: flex; text-decoration: none !important; background-color: var(--background-primary);"><div style="height: 100%; width: 35%; min-width: 120px; overflow: hidden; border-right: 1px solid var(--background-modifier-border);"><div style="background-image: url(https://repository-images.githubusercontent.com/155297903/cbdcd180-2571-11ea-9a3f-073207ffc1c5); background-position: center center; background-size: cover; background-repeat: no-repeat; padding-bottom: 120px; background-color: var(--background-secondary);"></div></div><div style="padding: 8px; width: 75%; overflow: hidden;"><h5 style="font-family: sans-serif; font-size: 1.125rem; margin: 0 0 4px 0; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; color: var(--text-normal);">GitHub - amir20/dozzle: Realtime log viewer for docker containers.</h5><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-muted); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">Realtime log viewer for docker containers. . Contribute to amir20/dozzle development by creating an account on GitHub.</p><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-faint); display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;">https://github.com/amir20/dozzle</p></div></a></div>

## Docker compose

```yml
services:
  dozzle:
    container_name: dozzle
    image: amir20/dozzle:latest
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
    ports:
      - 8080:8080
```
