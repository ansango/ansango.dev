---
title: BookLore
description: Una aplicación web auto-alojada para gestionar y leer tu colección de libros y cómics digitales.
date: 2025-09-02
mod: 2025-10-25
published: true
tags: [books, comics, reading, self-hosted]
---

# BookLore

BookLore es una aplicación web de código abierto y auto-alojada para organizar, gestionar y leer tu colección personal de libros y cómics. Es compatible con formatos como PDF, EPUB y CBZ, y ofrece una interfaz moderna e intuitiva.

## Funcionalidades clave

- **Organización inteligente:** Permite crear estanterías personalizadas, usar ordenación inteligente y aplicar filtros potentes para encontrar cualquier libro al instante.
- **Gestión multiusuario:** Soporta múltiples usuarios con permisos granulares para el acceso a la biblioteca.
- **Integración con Kobo:** Sincroniza tu biblioteca con dispositivos Kobo y convierte automáticamente EPUBs a KEPUBs.
- **Metadatos automáticos:** Obtiene detalles de los libros de fuentes como Goodreads, Amazon y Google Books.
- **Importación automática (BookDrop):** Detecta e importa automáticamente archivos desde una carpeta designada.
- **Soporte OPDS:** Permite conectar aplicaciones de lectura directamente a tu biblioteca para descargas inalámbricas.
- **Lector integrado:** Incluye un lector para PDF, EPUB y cómics con temas personalizables.

## Ventajas

- **Control total:** Al ser auto-alojado, mantienes la propiedad y privacidad de tus datos.
- **Despliegue sencillo:** Fácil de instalar utilizando Docker Compose.
- **Amplio soporte de formatos:** Compatible con los formatos de libros y cómics más populares.
- **Gestión centralizada:** Organiza toda tu biblioteca digital en un solo lugar, accesible desde cualquier navegador.

<div class="obsidian-meta-links" style="position: relative;"><a href="https://github.com/booklore-app/booklore" target="_blank" style="border: 1px solid var(--background-modifier-border); margin: 20px 0; border-radius: 3px; width: 100%; display: flex; text-decoration: none !important; background-color: var(--background-primary);"><div style="height: 100%; width: 35%; min-width: 120px; overflow: hidden; border-right: 1px solid var(--background-modifier-border);"><div style="background-image: url(https://opengraph.githubassets.com/1/booklore-app/booklore); background-position: center center; background-size: cover; background-repeat: no-repeat; padding-bottom: 120px; background-color: var(--background-secondary);"></div></div><div style="padding: 8px; width: 75%; overflow: hidden;"><h5 style="font-family: sans-serif; font-size: 1.125rem; margin: 0 0 4px 0; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; color: var(--text-normal);">GitHub - booklore-app/booklore: BookLore is a self-hosted app for managing and reading your books and comics.</h5><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-muted); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">BookLore is a self-hosted app for managing and reading your books and comics. - booklore-app/booklore</p><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-faint); display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;">https://github.com/booklore-app/booklore</p></div></a></div>

## Docker compose

```yml
version: '3.8'
services:
  booklore:
    image: booklore/booklore:latest
    container_name: booklore
    ports:
      - "8080:8080"
    volumes:
      - booklore_data:/app/data
      - ./books:/app/books
    environment:
      - SPRING_PROFILES_ACTIVE=docker
volumes:
  booklore_data:
```

- El volumen `./books:/app/books` mapea una carpeta local `books` donde puedes dejar tus archivos para que BookLore los importe.
