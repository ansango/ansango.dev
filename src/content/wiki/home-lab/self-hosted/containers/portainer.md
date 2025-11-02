---
title: Portainer
description: description
date: 2024-12-17
mod: 2025-10-25
published: true
tags: [containers, docker, management, self-hosted, sysadmin]
---

# Portainer

Portainer es una plataforma de gestión de contenedores de código abierto que simplifica la administración de entornos Docker y Kubernetes. Sus características principales incluyen:

## Funcionalidades clave

- Interfaz web intuitiva para gestionar contenedores, imágenes, redes y volúmenes
- Compatibilidad con Docker, Docker Swarm y Kubernetes
- Gestión centralizada de múltiples clústeres desde una sola interfaz
- Control de acceso basado en roles (RBAC)
- Monitoreo y registro de contenedores
- Despliegue de aplicaciones mediante plantillas predefinidas o configuraciones personalizadas

## Ventajas

- Reduce la complejidad de la gestión de contenedores
- Mejora la productividad del equipo de DevOps
- Proporciona una visión centralizada de todo el ecosistema de contenedores
- Aumenta la seguridad mediante controles de acceso detallados

<div class="obsidian-meta-links" style="position: relative;"><a href="https://github.com/portainer/portainer" target="_blank" style="border: 1px solid var(--background-modifier-border); margin: 20px 0; border-radius: 3px; width: 100%; display: flex; text-decoration: none !important; background-color: var(--background-primary);"><div style="height: 100%; width: 35%; min-width: 120px; overflow: hidden; border-right: 1px solid var(--background-modifier-border);"><div style="background-image: url(https://opengraph.githubassets.com/ec071c17ca01662d1fb1118bb83a78ce051e0d06f0115e3db281e9d8aa9eecd0/portainer/portainer); background-position: center center; background-size: cover; background-repeat: no-repeat; padding-bottom: 120px; background-color: var(--background-secondary);"></div></div><div style="padding: 8px; width: 75%; overflow: hidden;"><h5 style="font-family: sans-serif; font-size: 1.125rem; margin: 0 0 4px 0; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; color: var(--text-normal);">GitHub - portainer/portainer: Making Docker and Kubernetes management easy.</h5><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-muted); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">Making Docker and Kubernetes management easy. Contribute to portainer/portainer development by creating an account on GitHub.</p><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-faint); display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;">https://github.com/portainer/portainer</p></div></a></div>

## Docker compose

```yml
services:
  portainer:
    image: portainer/portainer-ce:latest
    container_name: portainer
    restart: unless-stopped
    security_opt:
      - no-new-privileges:true
    volumes:
      - /etc/localtime:/etc/localtime:ro
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - ./portainer-data:/data
    ports:
      - 9000:9000
```
