---
title: Directus-instance-dev
description: Script en bash para automatizar la creación y configuración de instancias de Directus para desarrollo, con soporte para extensiones y SQLite.
date: 2024-09-18
mod: 2025-10-25
published: true
tags: [bash, devtools, directus, project, script, sqlite]
---

# Directus-instance-dev

**directus-instance-dev** es un script en bash que automatiza la instalación y configuración de una instancia de Directus orientada a desarrollo local, incluyendo soporte para extensiones y base de datos SQLite. Permite ahorrar tiempo y evitar errores manuales al preparar entornos de desarrollo para proyectos con Directus.

Repositorio: https://github.com/ansango/directus-instance-dev

> ⚠️ Este script está diseñado para versiones de Directus anteriores a la v11 (Node.js 18.x). A partir de Directus v11 es necesario utilizar Node.js 22 y este script puede no ser compatible sin modificaciones.

## Introducción

El script está pensado para desarrolladores que trabajan con Directus y necesitan levantar entornos rápidamente, con las dependencias y configuraciones necesarias para probar extensiones o personalizaciones. Realiza comprobaciones de versión de Node.js, instala Directus, configura variables de entorno, crea un usuario admin y prepara scripts útiles para el ciclo de desarrollo.

## Características

- Instalación automática de la última versión de Directus.
- Verificación de Node.js 18.x (requisito de Directus).
- Configuración de base de datos SQLite por defecto.
- Generación de claves y tokens aleatorios para el entorno.
- Creación de usuario admin y configuración inicial.
- Instalación de dependencias de desarrollo (nodemon, concurrently).
- Scripts npm para desarrollo y gestión de extensiones.
- Opción para crear y gestionar extensiones de Directus desde el propio entorno.

## Stack técnico

- Bash
- Node.js 18.x
- Directus
- SQLite (por defecto, modificable)

## Requisitos y configuración

- Tener instalado Node.js 18.x y npm.
- Entorno bash (Linux, macOS o WSL en Windows).

Pasos rápidos:

1. Descarga el script:

   ```bash
   wget https://raw.githubusercontent.com/ansango/directus-instance-dev/main/directus-instance-dev.sh
   ```

2. Hazlo ejecutable:

   ```bash
   chmod +x directus-instance-dev.sh
   ```

3. Ejecuta el script:

   ```bash
   ./directus-instance-dev.sh
   ```

4. Sigue los prompts para configurar el nombre del proyecto, puerto, email y contraseña admin.

## Quick start

- Tras la instalación, entra en la carpeta del proyecto y ejecuta:

   ```bash
   npm run dev
   # o para modo normal
   npm start
   ```

- Para crear una extensión:

   ```bash
   npm run extension
   ```

## Seguridad y privacidad

- El script genera claves y contraseñas aleatorias y las guarda en `.env`.
- Se recomienda cambiar la contraseña admin tras el primer login.
- No expone datos sensibles fuera del entorno local.

## Licencia

MIT

## Enlaces relevantes

- Código fuente: https://github.com/ansango/directus-instance-dev
- Documentación oficial: https://docs.directus.io/
