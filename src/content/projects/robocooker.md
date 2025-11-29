---
title: Robocooker
description: Red social de recetas para robots de cocina, desarrollada como proyecto de máster en la UOC. Stack Next.js monolito, MongoDB Atlas y despliegue en Vercel.
date: 2025-10-19
mod: 2025-11-02
published: true
tags: [mongodb, nextjs, project, recetas, social, uoc, vercel]
---

# Robocooker

Robocooker es una red social de recetas orientada a usuarios de robots de cocina. Fue desarrollada como proyecto final del Máster Universitario en Desarrollo de Sitios y Aplicaciones Web en la Universitat Oberta de Catalunya (UOC).

Sitio: https://robocooker.vercel.app  
Repositorio: https://github.com/ansango/robocooker

## Introducción

La plataforma permite a los usuarios crear, compartir y descubrir recetas adaptadas a diferentes procesadores de alimentos (Thermomix, Mambo, Mycook, etc.), interactuar con la comunidad y seguir tendencias culinarias. El objetivo es centralizar el conocimiento y la experiencia de los "robousers" en un entorno social y colaborativo.

## Características

- Registro y perfil de usuario (robouser).
- Creación y edición de recetas para robots de cocina.
- Navegación por categorías, tendencias y procesadores.
- Feed de últimas recetas y usuarios destacados.
- Búsqueda avanzada y filtrado por ingredientes, tipo de robot y categoría.
- Sistema de comentarios y favoritos.
- Responsive y optimizado para dispositivos móviles.

## Stack técnico

- Next.js (monolito: frontend y backend en el mismo repo)
- React
- MongoDB Atlas (base de datos cloud)
- Vercel (despliegue y hosting)
- Cloudinary (gestión de imágenes)
- Node.js, Express (API Next.js)

## Requisitos y configuración

1. Clona el repositorio:

   ```bash
   git clone https://github.com/ansango/robocooker.git
   ```

2. Instala dependencias:

   ```bash
   npm install
   # o yarn install
   ```

3. Configura las variables de entorno en `.env.local`:

   ```
   MONGODB_URI=tu_uri_mongodb
   CLOUDINARY_CLOUD_NAME=tu_cloud_name
   CLOUDINARY_API_KEY=tu_api_key
   CLOUDINARY_API_SECRET=tu_api_secret
   WEB_URI=https://robocooker.vercel.app
   NEXT_PUBLIC_WEB_URI=https://robocooker.vercel.app
   NODEMAILER_PORT=tu_puerto
   NODEMAILER_HOST=tu_host
   NODEMAILER_USER=tu_usuario
   NODEMAILER_PASS=tu_contraseña
   NOTION_KEY=tu_notion_key
   NOTION_DATABASE_ID=tu_notion_db_id
   ```

4. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   # o yarn dev
   ```

## Quick start

- Accede a https://robocooker.vercel.app y regístrate como robouser.
- Explora recetas por procesador, categoría o tendencia.
- Crea y comparte tus propias recetas.
- Interactúa con la comunidad: comenta, guarda y sigue usuarios.

## Seguridad y privacidad

- Las credenciales y claves se gestionan mediante variables de entorno y nunca se exponen en el frontend.
- El sistema de autenticación y gestión de datos sigue buenas prácticas de seguridad y privacidad.

## Licencia

MIT

## Enlaces relevantes

- Código fuente: https://github.com/ansango/robocooker
- Demo: https://robocooker.vercel.app
- Máster UOC: https://www.uoc.edu/es/estudios/masters/master-universitario-desarrollo-sitios-aplicaciones-web

## Integración con Notion

- Sistema de reporte de incidencias: los usuarios pueden enviar comentarios o incidencias desde la interfaz cuando encuentran un problema o desean reportar mejoras.
- Notion como backend de seguimiento: las incidencias se registran en una base de datos de Notion y se visualizan en un tablero Kanban para gestión y priorización de tareas.
- Flujo de trabajo: nuevos comentarios/errores se crean como tarjetas en Notion; el equipo los revisa, asigna responsables y mueve las tarjetas por columnas (To Do / In Progress / Done) para gestionar el ciclo de vida del issue.
