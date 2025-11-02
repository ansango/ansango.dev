---
title: AdGuard Home
description: Un servidor DNS para toda la red que bloquea anuncios y rastreadores en todos tus dispositivos.
date: 2025-09-02
mod: 2025-10-25
published: true
tags: [ad-blocker, dns, networking, security, self-hosted]
---

# AdGuard Home

AdGuard Home es un servidor DNS de código abierto para toda la red que bloquea anuncios y rastreadores. Protege todos los dispositivos de tu red sin necesidad de instalar software en cada uno de ellos, actuando como un sumidero de DNS que impide que tus dispositivos se conecten a servidores de publicidad y seguimiento.

## Funcionalidades clave

- **Bloqueo completo:** Bloquea anuncios, rastreadores, malware y dominios de phishing en toda la red.
- **Personalización y Monitoreo:** Ofrece una interfaz web para monitorear la actividad de la red, gestionar listas de bloqueo y crear reglas de filtrado personalizadas.
- **DNS cifrado:** Soporta DNS-over-HTTPS, DNS-over-TLS y DNSCrypt para mejorar la privacidad y la seguridad.
- **Controles parentales:** Incluye funciones para bloquear contenido para adultos y forzar la búsqueda segura en los motores de búsqueda.
- **Funcionalidad avanzada:** Ofrece un servidor DHCP incorporado, configuración por dispositivo y puede funcionar como un servidor DNS-over-HTTPS.

## Ventajas

- **Protección centralizada:** No es necesario instalar un bloqueador de anuncios en cada dispositivo.
- **Multiplataforma nativo:** Funciona en una amplia variedad de sistemas sin necesidad de privilegios de root.
- **Altamente configurable:** Permite un control granular sobre el filtrado de DNS.
- **Seguridad mejorada:** El soporte para DNS cifrado protege tus consultas de DNS de la interceptación.

<div class="obsidian-meta-links" style="position: relative;"><a href="https://github.com/AdguardTeam/AdGuardHome" target="_blank" style="border: 1px solid var(--background-modifier-border); margin: 20px 0; border-radius: 3px; width: 100%; display: flex; text-decoration: none !important; background-color: var(--background-primary);"><div style="height: 100%; width: 35%; min-width: 120px; overflow: hidden; border-right: 1px solid var(--background-modifier-border);"><div style="background-image: url(https://opengraph.githubassets.com/1/AdguardTeam/AdGuardHome); background-position: center center; background-size: cover; background-repeat: no-repeat; padding-bottom: 120px; background-color: var(--background-secondary);"></div></div><div style="padding: 8px; width: 75%; overflow: hidden;"><h5 style="font-family: sans-serif; font-size: 1.125rem; margin: 0 0 4px 0; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; color: var(--text-normal);">GitHub - AdguardTeam/AdGuardHome: Network-wide ads & trackers blocking DNS server</h5><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-muted); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">Network-wide ads & trackers blocking DNS server. Contribute to AdguardTeam/AdGuardHome development by creating an account on GitHub.</p><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-faint); display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;">https://github.com/AdguardTeam/AdGuardHome</p></div></a></div>

## Docker compose

```yml
services:
  adguardhome:
    image: adguard/adguardhome:latest
    container_name: adguardhome
    restart: unless-stopped
    ports:
      - "53:53/tcp"
      - "53:53/udp"
      - "80:80/tcp"
      - "3000:3000/tcp"
      - "853:853/tcp"
      - "443:443/tcp"
      - "443:443/udp"
      - "784:784/udp"
    volumes:
      - ./adguard_work:/opt/adguardhome/work
      - ./adguard_conf:/opt/adguardhome/conf
```
