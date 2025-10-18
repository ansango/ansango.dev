---
title: Composerize
description: "description"
draft: false
date: 2024-12-17
mod: 2025-08-28
published: true
order: 0
tags: [development, docker, tool]
---

# Composerize

Composerize es una herramienta que convierte comandos `docker run` en formato de archivo `docker-compose.yml`. Simplifica el proceso de migración de un contenedor Docker independiente a una configuración de Docker Compose, permitiendo una gestión más sencilla de aplicaciones multicontenedor.

## Funcionalidades clave

- **Conversión automática:** Transforma la sintaxis y las opciones de un comando `docker run` a la estructura de un servicio de Docker Compose.
- **Interfaz web y CLI:** Disponible como una herramienta en línea en `composerize.com` y como un paquete de `npm` para su uso en la línea de comandos.
- **Soporte para la mayoría de las opciones de `docker run`:** Reconoce y convierte volúmenes, puertos, variables de entorno, y otras opciones comunes.
- **Decomposerize:** Incluye una herramienta inversa, `decomposerize`, que convierte un archivo `docker-compose.yml` de nuevo a comandos `docker run`.

## Ventajas

- **Ahorro de tiempo:** Automatiza la creación de archivos `docker-compose.yml`, reduciendo el esfuerzo manual.
- **Facilita el aprendizaje:** Ayuda a los usuarios a entender la sintaxis de Docker Compose al mostrar la correspondencia directa con los comandos `docker run`.
- **Mejora la gestión de contenedores:** Facilita la transición a Docker Compose para una mejor organización y reproducibilidad de los entornos.
- **Flexibilidad:** Se puede utilizar tanto en un navegador web como localmente en un entorno de desarrollo.

<div class="obsidian-meta-links" style="position: relative;"><a href="https://github.com/magicmark/composerize" target="_blank" style="border: 1px solid var(--background-modifier-border); margin: 20px 0; border-radius: 3px; width: 100%; display: flex; text-decoration: none !important; background-color: var(--background-primary);"><div style="height: 100%; width: 35%; min-width: 120px; overflow: hidden; border-right: 1px solid var(--background-modifier-border);"><div style="background-image: url(https://opengraph.githubassets.com/c1a1b1c1a1b1c1a1b1c1a1b1c1a1b1c1a1b1c1a1b1c1a1b1c1a1b1c1a1b1/magicmark/composerize); background-position: center center; background-size: cover; background-repeat: no-repeat; padding-bottom: 120px; background-color: var(--background-secondary);"></div></div><div style="padding: 8px; width: 75%; overflow: hidden;"><h5 style="font-family: sans-serif; font-size: 1.125rem; margin: 0 0 4px 0; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; color: var(--text-normal);">GitHub - magicmark/composerize: преобразование docker run в docker-compose</h5><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-muted); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">преобразование docker run в docker-compose. Contribute to magicmark/composerize development by creating an account on GitHub.</p><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-faint); display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;">https://github.com/magicmark/composerize</p></div></a></div>

## Uso

### Interfaz web

1. Visita [composerize.com](https://www.composerize.com/).
2. Pega tu comando `docker run` en el campo de entrada.
3. La herramienta generará automáticamente el contenido del archivo `docker-compose.yml` correspondiente.

### Línea de comandos

1. Instala Composerize globalmente usando `npm`:

   ```bash
   npm install -g composerize
   ```

2. Ejecuta Composerize con un comando `docker run` entre comillas:

   ```bash
   composerize "docker run -d -p 80:80 -v /var/run/docker.sock:/tmp/docker.sock:ro --name my-container some-image"
   ```

Esto imprimirá el `docker-compose.yml` resultante en la salida estándar.
