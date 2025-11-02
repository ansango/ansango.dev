---
title: Nextcloud
description: description
date: 2024-12-17
mod: 2025-10-25
published: true
tags: [cloud, collaboration, file-sharing, self-hosted]
---

# Nextcloud

Nextcloud es una plataforma de código abierto para la sincronización de archivos, la colaboración en línea y el almacenamiento en la nube. Permite a los usuarios crear su propia nube privada, dándoles control total sobre sus datos. Es una alternativa popular a servicios como Google Drive, Dropbox y Microsoft 365.

## Funcionalidades clave

- **Sincronización y compartición de archivos:** Permite acceder y sincronizar archivos, fotos y documentos en todos los dispositivos.
- **Colaboración en tiempo real:** Incluye Nextcloud Office (basado en Collabora Online) para la edición de documentos en tiempo real, así como calendarios, contactos y correo electrónico.
- **Videollamadas y chat:** Nextcloud Talk ofrece una plataforma de comunicación segura para videollamadas, chat y seminarios web.
- **Seguridad y control de acceso:** Ofrece cifrado de extremo a extremo, autenticación de dos factores y reglas de acceso granulares.
- **Amplia gama de aplicaciones:** Se puede ampliar con cientos de aplicaciones para añadir funcionalidades como gestión de tareas, notas, mapas y mucho más.
- **Clientes de escritorio y móviles:** Dispone de clientes para Windows, macOS, Linux, Android e iOS.

## Ventajas

- **Privacidad y control de datos:** Al ser autoalojado, tienes el control total sobre tus datos, sin depender de terceros.
- **Código abierto:** Es un software gratuito y de código abierto, con una gran comunidad que lo respalda.
- **Flexibilidad y personalización:** Se puede adaptar a las necesidades de cualquier usuario u organización gracias a su ecosistema de aplicaciones.
- **Solución todo en uno:** Combina almacenamiento en la nube, colaboración en línea y comunicación en una sola plataforma.
- **Escalabilidad:** Adecuado tanto para uso personal como para grandes empresas.

<div class="obsidian-meta-links" style="position: relative;"><a href="https://github.com/nextcloud/server" target="_blank" style="border: 1px solid var(--background-modifier-border); margin: 20px 0; border-radius: 3px; width: 100%; display: flex; text-decoration: none !important; background-color: var(--background-primary);"><div style="height: 100%; width: 35%; min-width: 120px; overflow: hidden; border-right: 1px solid var(--background-modifier-border);"><div style="background-image: url(https://opengraph.githubassets.com/c1a1b1c1a1b1c1a1b1c1a1b1c1a1b1c1a1b1c1a1b1c1a1b1c1a1b1c1a1b1/nextcloud/server); background-position: center center; background-size: cover; background-repeat: no-repeat; padding-bottom: 120px; background-color: var(--background-secondary);"></div></div><div style="padding: 8px; width: 75%; overflow: hidden;"><h5 style="font-family: sans-serif; font-size: 1.125rem; margin: 0 0 4px 0; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; color: var(--text-normal);">GitHub - nextcloud/server: ☁️ Nextcloud server, a safe home for all your data</h5><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-muted); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">☁️ Nextcloud server, a safe home for all your data - nextcloud/server</p><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-faint); display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;">https://github.com/nextcloud/server</p></div></a></div>

## Docker compose

Este ejemplo utiliza una base de datos MariaDB y Redis para el almacenamiento en caché.

```yml
services:
  db:
    image: mariadb:lts
    command: --transaction-isolation=READ-COMMITTED --binlog-format=ROW
    restart: always
    volumes:
      - db:/var/lib/mysql
    environment:
      - MYSQL_ROOT_PASSWORD=your_strong_root_password
      - MYSQL_PASSWORD=your_strong_db_password
      - MYSQL_DATABASE=nextcloud
      - MYSQL_USER=nextcloud

  redis:
    image: redis:alpine
    restart: always

  app:
    image: nextcloud
    restart: always
    ports:
      - 8080:80
    volumes:
      - nextcloud:/var/www/html
    environment:
      - MYSQL_PASSWORD=your_strong_db_password
      - MYSQL_DATABASE=nextcloud
      - MYSQL_USER=nextcloud
      - MYSQL_HOST=db
      - REDIS_HOST=redis
    depends_on:
      - db
      - redis

volumes:
  nextcloud:
  db:
```

- **MYSQL_ROOT_PASSWORD:** Contraseña de root para la base de datos.
- **MYSQL_PASSWORD:** Contraseña para el usuario de la base de datos de Nextcloud.
- Es **imprescindible** cambiar las contraseñas por unas seguras.
