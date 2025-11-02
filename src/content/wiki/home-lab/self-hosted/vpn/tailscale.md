---
title: Tailscale
description: description
date: 2024-12-17
mod: 2025-10-25
published: true
tags: [mesh, networking, security, vpn]
---

# Tailscale

Tailscale es un servicio de VPN que crea una red privada y segura entre tus dispositivos, sin importar dónde se encuentren. Se basa en el protocolo WireGuard y se enfoca en la simplicidad y la configuración cero, permitiendo crear una red de malla (mesh network) de forma rápida y sencilla.

## Funcionalidades clave

- **Red de malla (Mesh Network):** A diferencia de las VPN tradicionales, Tailscale crea conexiones directas punto a punto entre los dispositivos, lo que reduce la latencia y mejora la velocidad.
- **Configuración cero:** No requiere abrir puertos en el firewall ni configuraciones complejas. Funciona en la mayoría de las condiciones de red gracias a su capacidad para atravesar NAT.
- **Cifrado de extremo a extremo:** Toda la comunicación a través de la red Tailscale está cifrada de extremo a extremo.
- **Control de acceso (ACLs):** Permite definir reglas de acceso para controlar qué dispositivos pueden comunicarse entre sí.
- **MagicDNS:** Asigna nombres de host a los dispositivos de la red, permitiendo acceder a ellos por su nombre en lugar de su dirección IP.
- **Multiplataforma:** Compatible con una amplia gama de sistemas operativos, incluyendo Linux, Windows, macOS, Android, iOS y más.

## Ventajas

- **Facilidad de uso:** Es extremadamente fácil de instalar y configurar, incluso para usuarios sin experiencia en redes.
- **Rendimiento:** Las conexiones directas punto a punto ofrecen un rendimiento superior al de las VPN tradicionales.
- **Seguridad:** Construido sobre WireGuard, utiliza criptografía moderna y un modelo de seguridad sólido.
- **Flexibilidad:** Ideal para conectar de forma segura servidores, contenedores, dispositivos personales y servicios en la nube.
- **Acceso remoto simplificado:** Permite acceder a cualquier dispositivo de tu red privada desde cualquier lugar del mundo.

<div class="obsidian-meta-links" style="position: relative;"><a href="https://github.com/tailscale/tailscale" target="_blank" style="border: 1px solid var(--background-modifier-border); margin: 20px 0; border-radius: 3px; width: 100%; display: flex; text-decoration: none !important; background-color: var(--background-primary);"><div style="height: 100%; width: 35%; min-width: 120px; overflow: hidden; border-right: 1px solid var(--background-modifier-border);"><div style="background-image: url(https://opengraph.githubassets.com/c1a1b1c1a1b1c1a1b1c1a1b1c1a1b1c1a1b1c1a1b1c1a1b1c1a1b1c1a1b1/tailscale/tailscale); background-position: center center; background-size: cover; background-repeat: no-repeat; padding-bottom: 120px; background-color: var(--background-secondary);"></div></div><div style="padding: 8px; width: 75%; overflow: hidden;"><h5 style="font-family: sans-serif; font-size: 1.125rem; margin: 0 0 4px 0; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; color: var(--text-normal);">GitHub - tailscale/tailscale: The easiest, most secure way to use WireGuard and 2FA.</h5><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-muted); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">The easiest, most secure way to use WireGuard and 2FA. - tailscale/tailscale</p><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-faint); display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;">https://github.com/tailscale/tailscale</p></div></a></div>

## Docker compose (como sidecar)

Este ejemplo muestra cómo usar Tailscale como un "sidecar" para exponer un servicio (en este caso, un servidor Nginx) a tu red de Tailscale.

```yml
services:
  nginx:
    image: nginx:latest
    network_mode: service:tailscale
    depends_on:
      - tailscale

  tailscale:
    image: tailscale/tailscale:latest
    container_name: tailscale
    hostname: my-nginx-server
    environment:
      - TS_AUTHKEY=tskey-auth-xxxxxxxxxxxxxxxxxxxx
      - TS_STATE_DIR=/var/lib/tailscale
    volumes:
      - ./tailscale_state:/var/lib/tailscale
      - /dev/net/tun:/dev/net/tun
    cap_add:
      - NET_ADMIN
      - SYS_MODULE
    restart: unless-stopped
```

- **network_mode: service:tailscale:** Hace que el contenedor `nginx` use la red del contenedor `tailscale`.
- **hostname:** El nombre que aparecerá en tu panel de administración de Tailscale.
- **TS_AUTHKEY:** Una clave de autenticación que puedes generar en el panel de administración de Tailscale. Se recomienda usar una clave reutilizable y efímera.
