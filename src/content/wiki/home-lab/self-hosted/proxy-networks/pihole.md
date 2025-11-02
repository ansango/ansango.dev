---
title: Pi-hole
description: description
date: 2024-12-17
mod: 2025-10-25
published: true
tags: [ad-blocker, dns, networking, security]
---

# Pi-hole

Pi-hole es un bloqueador de anuncios y rastreadores a nivel de red que actúa como un sumidero de DNS (DNS sinkhole). Se instala en una red privada y protege a todos los dispositivos conectados a ella sin necesidad de instalar software en cada uno de ellos. Al bloquear los dominios de anuncios antes de que se descarguen, mejora la velocidad de la red y la privacidad.

## Funcionalidades clave

- **Bloqueo de anuncios en toda la red:** Bloquea anuncios en cualquier dispositivo de la red, incluyendo televisores inteligentes, teléfonos móviles y ordenadores.
- **Mejora del rendimiento de la red:** Al evitar la descarga de contenido no deseado, reduce el consumo de ancho de banda y acelera la carga de las páginas web.
- **Panel de control web:** Ofrece una interfaz web para ver estadísticas en tiempo real, gestionar listas de bloqueo y analizar el tráfico de DNS.
- **Servidor DHCP:** Puede funcionar como un servidor DHCP para la red, permitiendo una gestión centralizada de las direcciones IP.
- **Listas de bloqueo personalizables:** Permite añadir listas de bloqueo de terceros o crear listas blancas y negras personalizadas.
- **API y registros detallados:** Proporciona una API para integraciones y registros detallados de todas las consultas DNS.

## Ventajas

- **Protección centralizada:** No es necesario instalar un bloqueador de anuncios en cada dispositivo.
- **Eficaz contra anuncios en aplicaciones:** Bloquea anuncios en lugares donde las extensiones de navegador no pueden, como en las aplicaciones móviles.
- **Mejora de la privacidad:** Impide que los rastreadores recopilen información sobre los hábitos de navegación.
- **Código abierto:** Es un software gratuito y de código abierto con una gran comunidad de usuarios.
- **Ligero:** Puede funcionar en hardware de bajos recursos, como una Raspberry Pi.

<div class="obsidian-meta-links" style="position: relative;"><a href="https://github.com/pi-hole/pi-hole" target="_blank" style="border: 1px solid var(--background-modifier-border); margin: 20px 0; border-radius: 3px; width: 100%; display: flex; text-decoration: none !important; background-color: var(--background-primary);"><div style="height: 100%; width: 35%; min-width: 120px; overflow: hidden; border-right: 1px solid var(--background-modifier-border);"><div style="background-image: url(https://opengraph.githubassets.com/c1a1b1c1a1b1c1a1b1c1a1b1c1a1b1c1a1b1c1a1b1c1a1b1c1a1b1c1a1b1/pi-hole/pi-hole); background-position: center center; background-size: cover; background-repeat: no-repeat; padding-bottom: 120px; background-color: var(--background-secondary);"></div></div><div style="padding: 8px; width: 75%; overflow: hidden;"><h5 style="font-family: sans-serif; font-size: 1.125rem; margin: 0 0 4px 0; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; color: var(--text-normal);">GitHub - pi-hole/pi-hole: A black hole for Internet advertisements</h5><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-muted); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">A black hole for Internet advertisements. Contribute to pi-hole/pi-hole development by creating an account on GitHub.</p><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-faint); display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;">https://github.com/pi-hole/pi-hole</p></div></a></div>

## Docker compose

```yml
services:
  pihole:
    container_name: pihole
    image: pihole/pihole:latest
    ports:
      - "53:53/tcp"
      - "53:53/udp"
      - "80:80/tcp"
    environment:
      TZ: 'America/New_York'
      WEBPASSWORD: 'YOUR_PASSWORD_HERE'
    volumes:
      - './etc-pihole:/etc/pihole'
      - './etc-dnsmasq.d:/etc/dnsmasq.d'
    restart: unless-stopped
```

- **TZ:** Tu zona horaria.
- **WEBPASSWORD:** La contraseña para acceder a la interfaz de administración web.
