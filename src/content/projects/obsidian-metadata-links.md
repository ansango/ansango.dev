---
title: Obsidian-metadata-links
description: Plugin para Obsidian que permite seleccionar enlaces en tus notas y visualizar su metadata de forma estructurada y rápida.
date: 2025-10-19
mod: 2025-10-19
published: true
tags: [links, metadata, obsidian, plugin, project, typescript]
---

# Obsidian-metadata-links

**obsidian-metadata-links** es un plugin para Obsidian que mejora la experiencia de toma de notas permitiendo seleccionar enlaces y visualizar su metadata asociada de manera clara y estructurada. Ideal para usuarios que gestionan grandes volúmenes de enlaces y necesitan acceder rápidamente a información relevante.

Repositorio: https://github.com/ansango/obsidian-metadata-links

## Introducción

Este plugin está diseñado para facilitar la gestión de enlaces dentro de tus notas en Obsidian. Permite seleccionar uno o varios enlaces y ver su metadata (información asociada) en un formato legible, optimizando el flujo de trabajo y la revisión de referencias.

## Características

- Selección fácil de enlaces dentro de las notas.
- Visualización de metadata asociada a los enlaces seleccionados.
- Opción para deseleccionar enlaces y gestionar la selección de forma flexible.

## Stack técnico

- TypeScript

## Requisitos y configuración

1. Clona el repositorio en la carpeta `plugins` de tu vault de Obsidian:

   ```bash
   git clone https://github.com/ansango/obsidian-metadata-links.git
   ```

2. Instala dependencias y compila el plugin:

   ```bash
   cd obsidian-metadata-links
   npm install
   npm run build
   ```

3. Activa el plugin en Obsidian: ve a `Settings > Community plugins` y habilita "Metadata Links".

## Quick start

- Selecciona los enlaces que quieras dentro de una nota.
- El plugin mostrará la metadata asociada en un formato estructurado.
- Para deseleccionar, haz clic de nuevo en el enlace o usa la opción de deselección.

## Seguridad y privacidad

- El plugin no envía datos fuera de tu vault ni recopila información personal.
- Todo el procesamiento se realiza localmente en Obsidian.

## Licencia

MIT

## Enlaces relevantes

- Código fuente: https://github.com/ansango/obsidian-metadata-links
- Documentación oficial de Obsidian: https://obsidian.md/
