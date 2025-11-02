---
title: Traefik
description: description
date: 2024-12-17
mod: 2025-10-25
published: true
tags: [containers, docker, load-balancer, networking, reverse-proxy, self-hosted, sysadmin]
---

# Traefik

Traefik es un moderno proxy inverso y balanceador de carga diseñado para entornos dinámicos y nativos de la nube, destacando especialmente con sistemas de orquestación de contenedores como Docker y Kubernetes. Se configura automáticamente al integrarse con los componentes de infraestructura existentes, eliminando la necesidad de recargas manuales cuando se añaden, eliminan o escalan servicios.

## Funcionalidades clave

- **Configuración dinámica y descubrimiento de servicios:** Detecta y gestiona automáticamente el enrutamiento a nuevos servicios.
- **SSL/TLS automático:** Maneja la terminación SSL/TLS y obtiene y renueva automáticamente certificados de Let's Encrypt.
- **Balanceo de carga:** Distribuye eficientemente las solicitudes entrantes entre múltiples instancias de un servicio.
- **Middleware:** Soporta componentes de middleware para modificar o mejorar solicitudes y respuestas.
- **Métricas y trazado:** Proporciona métricas para sistemas como Prometheus y Datadog, y soporta trazado distribuido.
- **Interfaz web (Dashboard):** Ofrece un panel de control web integrado para monitorear el tráfico y la configuración en tiempo real.
- **Soporte de protocolos:** Soporta HTTP/2, HTTP/3, WebSockets y gRPC.

## Ventajas

- **Gestión simplificada:** Su configuración dinámica y el descubrimiento automático de servicios simplifican la gestión de sistemas distribuidos complejos.
- **Diseño nativo de la nube:** Diseñado específicamente para entornos contenerizados y arquitecturas de microservicios.
- **Facilidad de uso:** Configuración sencilla, especialmente con sistemas de orquestación de contenedores.
- **Rendimiento mejorado:** Asegura una distribución óptima del tráfico de red.
- **Flexibilidad:** Amplias opciones de configuración e integración perfecta en diversas plataformas.


<div class="obsidian-meta-links" style="position: relative;"><a href="https://github.com/traefik/traefik" target="_blank" style="border: 1px solid var(--background-modifier-border); margin: 20px 0; border-radius: 3px; width: 100%; display: flex; text-decoration: none !important; background-color: var(--background-primary);"><div style="height: 100%; width: 35%; min-width: 120px; overflow: hidden; border-right: 1px solid var(--background-modifier-border);"><div style="background-image: url(https://repository-images.githubusercontent.com/42408804/c33c7380-1e83-11eb-925d-89b86ce9ffc4); background-position: center center; background-size: cover; background-repeat: no-repeat; padding-bottom: 120px; background-color: var(--background-secondary);"></div></div><div style="padding: 8px; width: 75%; overflow: hidden;"><h5 style="font-family: sans-serif; font-size: 1.125rem; margin: 0 0 4px 0; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; color: var(--text-normal);">GitHub - traefik/traefik: The Cloud Native Application Proxy</h5><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-muted); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">The Cloud Native Application Proxy. Contribute to traefik/traefik development by creating an account on GitHub.</p><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-faint); display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;">https://github.com/traefik/traefik</p></div></a></div>

## Docker compose

```yml
services:
  traefik:
    image: "traefik:v3.5"
    container_name: "traefik"
    command:
      #- "--log.level=DEBUG"
      - "--api.insecure=true"
      - "--providers.docker=true"
      - "--providers.docker.exposedbydefault=false"
      - "--entryPoints.web.address=:80"
    ports:
      - "80:80"
      - "8080:8080"
    volumes:
      - "/var/run/docker.sock:/var/run/docker.sock:ro"

  whoami:
    image: "traefik/whoami"
    container_name: "simple-service"
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.whoami.rule=Host(`whoami.localhost`)"
      - "traefik.http.routers.whoami.entrypoints=web"
```

Sustituye `whoami.localhost` por tu dominio con la etiqueta `traefik.http.routers.whoami.rule`.
