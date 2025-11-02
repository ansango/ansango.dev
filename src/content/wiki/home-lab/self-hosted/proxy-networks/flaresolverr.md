---
title: Flaresolverr
description: "Flaresolverr: servidor proxy para eludir protecciones Cloudflare, automatización con Selenium y integración Docker"
date: 2024-12-17
mod: 2025-10-25
published: true
tags: [docker, proxy, self-hosted, sysadmin]
---

# Flaresolverr

FlareSolverr es un servidor proxy de código abierto diseñado para eludir las protecciones anti-bot de Cloudflare. Sus principales características son:

## Funcionamiento

- Actúa como intermediario entre las solicitudes del usuario y los sitios protegidos por Cloudflare
- Utiliza Python, Selenium y ChromeDriver para simular un navegador real
- Resuelve automáticamente los desafíos de Cloudflare (JavaScript, CAPTCHAs, etc.)
- Devuelve el código HTML y las cookies resultantes al usuario

## Ventajas

- Derivación automática de las protecciones de Cloudflare
- Permite el raspado web eficaz de sitios protegidos
- Mejora la accesibilidad a contenido restringido
- Se integra fácilmente con flujos de trabajo de raspado existentes

<div class="obsidian-meta-links" style="position: relative;"><a href="https://github.com/FlareSolverr/FlareSolverr" target="_blank" style="border: 1px solid var(--background-modifier-border); margin: 20px 0; border-radius: 3px; width: 100%; display: flex; text-decoration: none !important; background-color: var(--background-primary);"><div style="height: 100%; width: 35%; min-width: 120px; overflow: hidden; border-right: 1px solid var(--background-modifier-border);"><div style="background-image: url(https://opengraph.githubassets.com/eff4172f4cc60fc97fe89a5af82366c943dbdb2a4a1da50e57cac6382d2ec766/FlareSolverr/FlareSolverr); background-position: center center; background-size: cover; background-repeat: no-repeat; padding-bottom: 120px; background-color: var(--background-secondary);"></div></div><div style="padding: 8px; width: 75%; overflow: hidden;"><h5 style="font-family: sans-serif; font-size: 1.125rem; margin: 0 0 4px 0; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; color: var(--text-normal);">GitHub - FlareSolverr/FlareSolverr: Proxy server to bypass Cloudflare protection</h5><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-muted); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">Proxy server to bypass Cloudflare protection. Contribute to FlareSolverr/FlareSolverr development by creating an account on GitHub.</p><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-faint); display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;">https://github.com/FlareSolverr/FlareSolverr</p></div></a></div>

## Docker compose

```yml
services:
  flaresolverr:
    image: ghcr.io/flaresolverr/flaresolverr:latest
    container_name: flaresolverr
    environment:
      - LOG_LEVEL=${LOG_LEVEL:-info}
      - LOG_HTML=${LOG_HTML:-false}
      - CAPTCHA_SOLVER=${CAPTCHA_SOLVER:-none}
      - TZ=Europe/London
    ports:
      - "${PORT:-8191}:8191"
    restart: unless-stopped
```
