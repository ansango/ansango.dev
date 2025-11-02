---
title: Gitea
description: Un servicio de Git auto-alojado, ligero y completo, similar a GitHub o GitLab.
date: 2025-09-02
mod: 2025-10-25
published: true
tags: [devops, git, self-hosted, vcs]
---

# Gitea

Gitea es un servicio de Git auto-alojado, de código abierto y escrito en Go. Su objetivo es proporcionar una forma fácil e indolora de configurar un servicio de Git auto-alojado. Es una alternativa ligera a otras soluciones como GitLab o GitHub, ideal para correr en hardware de bajos recursos.

## Funcionalidades clave

- **Alojamiento de repositorios Git:** Gestión completa de repositorios, incluyendo branches, tags y pull requests.
- **Revisión de código:** Herramientas para revisar y discutir cambios en el código.
- **Colaboración en equipo:** Gestión de usuarios, organizaciones y equipos con permisos granulares.
- **Registro de paquetes:** Soporte para más de 20 tipos de registros de paquetes (Docker, npm, Maven, etc.).
- **CI/CD integrado:** Incluye Gitea Actions, un sistema de CI/CD compatible con GitHub Actions.
- **Seguimiento de incidencias y Wiki:** Herramientas para la gestión de proyectos, incluyendo seguimiento de errores, tableros Kanban y una wiki para documentación.

## Ventajas

- **Ligero y rápido:** Bajo consumo de recursos, lo que permite su despliegue en casi cualquier servidor o incluso en una Raspberry Pi.
- **Auto-alojado y control total:** Tienes control completo sobre tus datos y tu infraestructura.
- **Fácil de instalar y mantener:** Se distribuye como un único binario y es fácil de desplegar con Docker.
- **Multiplataforma:** Compatible con Linux, macOS y Windows en diversas arquitecturas.
- **Código abierto:** Totalmente gratuito y con una comunidad activa.

<div class="obsidian-meta-links" style="position: relative;"><a href="https://github.com/go-gitea/gitea" target="_blank" style="border: 1px solid var(--background-modifier-border); margin: 20px 0; border-radius: 3px; width: 100%; display: flex; text-decoration: none !important; background-color: var(--background-primary);"><div style="height: 100%; width: 35%; min-width: 120px; overflow: hidden; border-right: 1px solid var(--background-modifier-border);"><div style="background-image: url(https://opengraph.githubassets.com/1/go-gitea/gitea); background-position: center center; background-size: cover; background-repeat: no-repeat; padding-bottom: 120px; background-color: var(--background-secondary);"></div></div><div style="padding: 8px; width: 75%; overflow: hidden;"><h5 style="font-family: sans-serif; font-size: 1.125rem; margin: 0 0 4px 0; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; color: var(--text-normal);">GitHub - go-gitea/gitea: Git with a cup of tea! Painless self-hosted all-in-one software development service, including Git hosting, code review, team collaboration, package registry and CI/CD.</h5><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-muted); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">Git with a cup of tea! Painless self-hosted all-in-one software development service, including Git hosting, code review, team collaboration, package registry and CI/CD. - go-gitea/gitea</p><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-faint); display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;">https://github.com/go-gitea/gitea</p></div></a></div>

## Docker compose (con SQLite3)

Esta es la configuración más sencilla, utilizando una base de datos SQLite3.

```yml
version: "3"

networks:
  gitea:
    external: false

services:
  server:
    image: gitea/gitea:latest
    container_name: gitea
    environment:
      - USER_UID=1000
      - USER_GID=1000
    restart: always
    networks:
      - gitea
    volumes:
      - ./gitea:/data
      - /etc/timezone:/etc/timezone:ro
      - /etc/localtime:/etc/localtime:ro
    ports:
      - "3000:3000"
      - "222:22"
```
