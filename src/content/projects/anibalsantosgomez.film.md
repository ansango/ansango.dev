---
title: anibalsantosgomez.film—only Films
description: Portfolio de fotografía analógica y proyecto web «only films» para mostrar series fotográficas, gestionar contenido con TinaCMS y un formulario de contacto.
date: 2024-05-01
mod: 2025-10-25
published: true
tags: [nextjs, photography, portfolio, project, tina]
---

# anibalsantosgomez.film—only Films

anibalsantosgomez.film "only films", es un portfolio de fotografía analógica recopilado en un sitio moderno y ligero. El proyecto busca mostrar series fotográficas (escaneos de film), con una experiencia visual cuidada y herramientas para gestionar contenido mediante TinaCMS.

Site: https://films.anibalsantosgomez.com

Repo: https://github.com/ansango/anibalsantosgomez.film

## Introducción

Este proyecto es un portfolio web centrado en fotografía química (film). Combina galerías de alto impacto visual con animaciones sutiles y una UI minimalista. Está pensado tanto para la exposición de series fotográficas como para facilitar la edición y publicación de contenidos.

## Características

- Galería de fotografías analógicas organizadas en series.
- Animaciones y microinteracciones con Framer Motion.
- Gestión de contenido mediante TinaCMS (edición in-place).
- Formulario de contacto con envío por correo (Nodemailer).
- Integración con un bucket S3 para almacenamiento de activos.
- Revalidación de contenido y optimización de imágenes.

## Stack técnico

- Next.js (App Router)
- React + TypeScript
- Tailwind CSS v3
- Framer Motion
- TinaCMS
- Nodemailer
- Zod para validaciones
- S3 para almacenamiento de imágenes

## Requisitos y configuración

Copia de ejemplo para `.env.local` (resumido):

```
NEXT_PUBLIC_TINA_CLIENT_ID=***
TINA_TOKEN=***
S3_REGION=***
S3_BUCKET=***
S3_ACCESS_KEY=***
S3_SECRET_KEY=***
NEXT_PUBLIC_BUCKET_URL=***
NODEMAILER_USER=***
NODEMAILER_PASS=***
NODEMAILER_HOST=***
NODEMAILER_PORT=***
NEXT_PUBLIC_WEB_URI=https://films.anibalsantosgomez.com
```

## Quick start

1. Clona el repositorio:

```bash
git clone https://github.com/ansango/anibalsantosgomez.film.git
cd anibalsantosgomez.film
```

1. Instala dependencias:

```bash
npm install
```

1. Configura `.env.local` con las claves necesarias.

2. Inicia el servidor de desarrollo:

```bash
npm run dev
```

## Seguridad y privacidad

- Mantén las claves (S3, Nodemailer, Tina) en variables de entorno fuera del repositorio.
- El formulario de contacto valida entrada con Zod y envía correos mediante Nodemailer configurado.

## Licencia

Proyecto bajo licencia MIT.

## Enlaces relevantes

- Código fuente: https://github.com/ansango/anibalsantosgomez.film
- Sitio: https://films.anibalsantosgomez.com
- Demo / producción: https://films.anibalsantosgomez.com
