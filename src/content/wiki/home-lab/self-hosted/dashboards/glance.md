---
title: Glance
description: Un dashboard auto-alojado para agregar todas tus fuentes de información en una sola vista.
date: 2025-09-02
mod: 2025-10-25
published: true
tags: [dashboard, monitoring, self-hosted, sysadmin]
---

# Glance

Glance es un dashboard de código abierto y auto-alojado que te permite agregar varias fuentes de información en una única vista personalizable. Está diseñado para ser rápido, ligero y fácil de configurar.

## Funcionalidades clave

- **Múltiples Widgets:** Soporta una amplia gama de widgets, incluyendo feeds RSS, Subreddits, Hacker News, clima, canales de YouTube, streams de Twitch, precios de mercado, estado de contenedores Docker y estadísticas del servidor.
- **Personalización:** Altamente personalizable con diferentes diseños, páginas ilimitadas y numerosas opciones de configuración para cada widget. También soporta CSS personalizado y temas.
- **Ligero:** Tiene un bajo consumo de memoria, dependencias mínimas y se distribuye como un único binario pequeño o contenedor Docker.
- **Adaptado a móviles:** La interfaz está optimizada para su uso en dispositivos móviles.
- **Widgets personalizados:** Puedes crear tus propios widgets usando iframes, HTML sin procesar o obteniendo datos de APIs personalizadas.

## Ventajas

- **Vista todo en uno:** Consolida la información de muchas fuentes en un solo lugar, evitando tener que revisar múltiples sitios.
- **Auto-alojado:** Tienes control total sobre tus datos y la aplicación.
- **Rendimiento:** Diseñado para ser rápido y eficiente, con páginas que normalmente se cargan en menos de un segundo.
- **Facilidad de configuración:** Utiliza archivos YAML simples para la configuración.

<div class="obsidian-meta-links" style="position: relative;"><a href="https://github.com/glanceapp/glance" target="_blank" style="border: 1px solid var(--background-modifier-border); margin: 20px 0; border-radius: 3px; width: 100%; display: flex; text-decoration: none !important; background-color: var(--background-primary);"><div style="height: 100%; width: 35%; min-width: 120px; overflow: hidden; border-right: 1px solid var(--background-modifier-border);"><div style="background-image: url(https://opengraph.githubassets.com/1/glanceapp/glance); background-position: center center; background-size: cover; background-repeat: no-repeat; padding-bottom: 120px; background-color: var(--background-secondary);"></div></div><div style="padding: 8px; width: 75%; overflow: hidden;"><h5 style="font-family: sans-serif; font-size: 1.125rem; margin: 0 0 4px 0; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; color: var(--text-normal);">GitHub - glanceapp/glance: A self-hosted dashboard that puts all your feeds in one place</h5><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-muted); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">A self-hosted dashboard that puts all your feeds in one place. Contribute to glanceapp/glance development by creating an account on GitHub.</p><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-faint); display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;">https://github.com/glanceapp/glance</p></div></a></div>

## Docker compose

```yml
services:
  glance:
    container_name: glance
    image: glanceapp/glance
    restart: unless-stopped
    volumes:
      - ./config:/app/config
    ports:
      - 8080:8080
```
