---
title: Duplicati
description: description
date: 2024-12-17
mod: 2025-10-25
published: true
tags: [backup, self-hosted, sysadmin]
---

# Duplicati

Duplicati es un cliente de copia de seguridad de código abierto que permite almacenar copias de seguridad cifradas, incrementales y comprimidas en una amplia variedad de servicios de almacenamiento en la nube y sistemas de archivos locales.

## Funcionalidades clave

- **Cifrado fuerte:** Utiliza cifrado AES-256 para proteger los datos antes de que salgan del sistema.
- **Copias de seguridad incrementales:** Después de la primera copia de seguridad completa, solo se transfieren las partes modificadas de los archivos para ahorrar ancho de banda y espacio de almacenamiento.
- **Soporte para múltiples destinos:** Compatible con servicios en la nube como Amazon S3, Google Drive, Microsoft OneDrive, y protocolos estándar como FTP, SFTP y WebDAV.
- **Programación y retención:** Permite programar copias de seguridad automáticas y definir políticas de retención personalizadas.
- **Interfaz web y línea de comandos:** Ofrece una interfaz de usuario web para una gestión sencilla y una interfaz de línea de comandos para usuarios avanzados.
- **Verificación de copias de seguridad:** Comprueba la integridad de las copias de seguridad para garantizar que se puedan restaurar.

## Ventajas

- **Código abierto y gratuito:** Sin costes de licencia y con una comunidad activa.
- **Seguridad y privacidad:** El cifrado del lado del cliente garantiza que solo el usuario pueda acceder a los datos.
- **Eficiencia:** Las copias de seguridad incrementales y la compresión reducen los costes de almacenamiento y el tiempo de transferencia.
- **Flexibilidad:** Amplia compatibilidad con diferentes proveedores de almacenamiento y sistemas operativos.
- **Recuperación ante desastres:** Permite restaurar archivos incluso si Duplicati no está instalado, utilizando herramientas estándar.

<div class="obsidian-meta-links" style="position: relative;"><a href="https://github.com/duplicati/duplicati" target="_blank" style="border: 1px solid var(--background-modifier-border); margin: 20px 0; border-radius: 3px; width: 100%; display: flex; text-decoration: none !important; background-color: var(--background-primary);"><div style="height: 100%; width: 35%; min-width: 120px; overflow: hidden; border-right: 1px solid var(--background-modifier-border);"><div style="background-image: url(https://opengraph.githubassets.com/b74f4a49b6695deeb84854c1a2f9b2d9e6e7b9b9f8e7e5e6f8e7e5e6f8e7e5e6/duplicati/duplicati); background-position: center center; background-size: cover; background-repeat: no-repeat; padding-bottom: 120px; background-color: var(--background-secondary);"></div></div><div style="padding: 8px; width: 75%; overflow: hidden;"><h5 style="font-family: sans-serif; font-size: 1.125rem; margin: 0 0 4px 0; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; color: var(--text-normal);">GitHub - duplicati/duplicati: Store securely encrypted backups on cloud storage services!</h5><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-muted); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">Store securely encrypted backups on cloud storage services! Contribute to duplicati/duplicati development by creating an account on GitHub.</p><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-faint); display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;">https://github.com/duplicati/duplicati</p></div></a></div>

## Docker compose

```yml
services:
  duplicati:
    image: lscr.io/linuxserver/duplicati:latest
    container_name: duplicati
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Etc/UTC
    volumes:
      - ./config:/config
      - ./backups:/backups
      - ./source:/source
    ports:
      - 8200:8200
    restart: unless-stopped
```
