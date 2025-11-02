---
title: Vaultwarden
description: description
date: 2024-12-17
mod: 2025-10-25
published: true
tags: [password-manager, security, self-hosted]
---

# Vaultwarden

Vaultwarden es una implementación alternativa del servidor de Bitwarden escrita en Rust. Es una solución de código abierto que permite autoalojar un gestor de contraseñas compatible con los clientes oficiales de Bitwarden, ofreciendo una opción más ligera y con menos consumo de recursos que el servidor oficial.

## Funcionalidades clave

- **Compatibilidad con clientes de Bitwarden:** Funciona con las aplicaciones de escritorio, extensiones de navegador y aplicaciones móviles de Bitwarden.
- **Ligero y eficiente:** Diseñado para un bajo consumo de memoria y CPU, ideal para dispositivos de baja potencia como Raspberry Pi.
- **Sincronización de contraseñas:** Permite sincronizar de forma segura las contraseñas y otros datos entre todos tus dispositivos.
- **Generador de contraseñas seguras:** Incluye una herramienta para generar contraseñas fuertes y únicas.
- **Organizaciones y colecciones:** Soporta la creación de organizaciones para compartir contraseñas de forma segura con otros usuarios.
- **Autenticación de dos factores (2FA):** Compatible con varios métodos de 2FA para una capa adicional de seguridad.

## Ventajas

- **Control total sobre los datos:** Al autoalojar el servidor, tienes el control total sobre tus contraseñas y datos sensibles.
- **Código abierto:** Totalmente gratuito y de código abierto, con una comunidad activa que contribuye a su desarrollo.
- **Fácil de desplegar:** Se puede instalar fácilmente a través de Docker.
- **Alternativa económica:** Ofrece la mayoría de las funciones premium de Bitwarden de forma gratuita.
- **Seguridad:** Mantiene el mismo modelo de cifrado de extremo a extremo que Bitwarden.

<div class="obsidian-meta-links" style="position: relative;"><a href="https://github.com/dani-garcia/vaultwarden" target="_blank" style="border: 1px solid var(--background-modifier-border); margin: 20px 0; border-radius: 3px; width: 100%; display: flex; text-decoration: none !important; background-color: var(--background-primary);"><div style="height: 100%; width: 35%; min-width: 120px; overflow: hidden; border-right: 1px solid var(--background-modifier-border);"><div style="background-image: url(https://opengraph.githubassets.com/c1a1b1c1a1b1c1a1b1c1a1b1c1a1b1c1a1b1c1a1b1c1a1b1c1a1b1c1a1b1/dani-garcia/vaultwarden); background-position: center center; background-size: cover; background-repeat: no-repeat; padding-bottom: 120px; background-color: var(--background-secondary);"></div></div><div style="padding: 8px; width: 75%; overflow: hidden;"><h5 style="font-family: sans-serif; font-size: 1.125rem; margin: 0 0 4px 0; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; color: var(--text-normal);">GitHub - dani-garcia/vaultwarden: Unofficial Bitwarden compatible server written in Rust, formerly known as bitwarden_rs</h5><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-muted); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">Unofficial Bitwarden compatible server written in Rust, formerly known as bitwarden_rs. Contribute to dani-garcia/vaultwarden development by creating an account on GitHub.</p><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-faint); display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;">https://github.com/dani-garcia/vaultwarden</p></div></a></div>

## Docker compose

```yml
services:
  vaultwarden:
    image: vaultwarden/server:latest
    container_name: vaultwarden
    restart: unless-stopped
    volumes:
      - ./vw-data:/data
    ports:
      - 8000:80
```
