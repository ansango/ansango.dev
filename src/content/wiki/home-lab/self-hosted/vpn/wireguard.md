---
title: WireGuard VPN
description: description
date: 2024-12-17
mod: 2025-10-25
published: true
tags: [networking, security, self-hosted, vpn]
---

# WireGuard VPN

WireGuard es un protocolo de VPN (Red Privada Virtual) moderno, rápido y seguro. Se destaca por su simplicidad, su base de código reducida y su alto rendimiento en comparación con otros protocolos de VPN como OpenVPN e IPsec. Utiliza criptografía de última generación para garantizar la seguridad de las comunicaciones.

## Funcionalidades clave

- **Alto rendimiento:** Ofrece velocidades de conexión rápidas y baja latencia, ideal para streaming, juegos y transferencias de archivos.
- **Seguridad robusta:** Utiliza criptografía moderna como ChaCha20, Poly1305 y Curve25519.
- **Base de código simple:** Su código es mucho más pequeño que el de otras soluciones de VPN, lo que facilita su auditoría y reduce la superficie de ataque.
- **Fácil de configurar:** La configuración es más sencilla en comparación con otros protocolos de VPN.
- **Multiplataforma:** Compatible con una amplia gama de sistemas operativos, incluyendo Linux, Windows, macOS, Android e iOS.
- **Conexión estable:** Permite una reconexión rápida y estable al cambiar entre redes.

## Ventajas

- **Velocidad:** Es significativamente más rápido que los protocolos de VPN tradicionales.
- **Simplicidad:** Fácil de implementar y gestionar, tanto para usuarios domésticos como para empresas.
- **Seguridad:** Considerado muy seguro debido a su criptografía moderna y su código minimalista.
- **Eficiencia:** Consume menos recursos del sistema, lo que mejora la duración de la batería en dispositivos móviles.
- **Código abierto:** Es un proyecto de código abierto con un desarrollo activo.

<div class="obsidian-meta-links" style="position: relative;"><a href="https://github.com/wg-easy/wg-easy" target="_blank" style="border: 1px solid var(--background-modifier-border); margin: 20px 0; border-radius: 3px; width: 100%; display: flex; text-decoration: none !important; background-color: var(--background-primary);"><div style="height: 100%; width: 35%; min-width: 120px; overflow: hidden; border-right: 1px solid var(--background-modifier-border);"><div style="background-image: url(https://opengraph.githubassets.com/c1a1b1c1a1b1c1a1b1c1a1b1c1a1b1c1a1b1c1a1b1c1a1b1c1a1b1c1a1b1/wg-easy/wg-easy); background-position: center center; background-size: cover; background-repeat: no-repeat; padding-bottom: 120px; background-color: var(--background-secondary);"></div></div><div style="padding: 8px; width: 75%; overflow: hidden;"><h5 style="font-family: sans-serif; font-size: 1.125rem; margin: 0 0 4px 0; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; color: var(--text-normal);">GitHub - wg-easy/wg-easy: The easiest way to run WireGuard VPN + Web-based Admin UI.</h5><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-muted); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">The easiest way to run WireGuard VPN + Web-based Admin UI. - wg-easy/wg-easy</p><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-faint); display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;">https://github.com/wg-easy/wg-easy</p></div></a></div>

## Docker compose (con wg-easy)

`wg-easy` es una herramienta que proporciona una interfaz de usuario web para gestionar un servidor WireGuard de forma sencilla.

```yml
services:
  wg-easy:
    image: ghcr.io/wg-easy/wg-easy
    container_name: wg-easy
    environment:
      - WG_HOST=YOUR_SERVER_IP
      - PASSWORD=YOUR_ADMIN_PASSWORD
    volumes:
      - .:/etc/wireguard
    ports:
      - "51820:51820/udp"
      - "51821:51821/tcp"
    cap_add:
      - NET_ADMIN
      - SYS_MODULE
    sysctls:
      - net.ipv4.ip_forward=1
      - net.ipv6.conf.all.forwarding=1
    restart: unless-stopped
```

- **WG_HOST:** La IP pública o el nombre de dominio de tu servidor.
- **PASSWORD:** La contraseña para acceder a la interfaz de administración web.
- El puerto `51820/udp` es para el tráfico de la VPN.
- El puerto `51821/tcp` es para la interfaz web de `wg-easy`.
