---
title: uziq—Vinyl Scrobbler
description: Mini aplicación para scrobblear vinilos desde Discogs a Last.fm, construida con Svelte 5, TailwindCSS y TanStack Query.
date: 2025-10-19
mod: 2025-10-25
published: true
tags: [discogs, lastfm, music, project, scrobble, svelte]
---

# uziq—Vinyl Scrobbler

Uziq es una mini aplicación web que facilita el scrobbling de tus vinilos desde Discogs hacia Last.fm. Está construida con Svelte 5 (SvelteKit), TypeScript, TailwindCSS y TanStack Query. Ofrece un flujo de autenticación doble (Last.fm + Discogs) para garantizar un intercambio de datos seguro y controlado.

Site: https://uziq.vercel.app  
Código fuente: https://github.com/ansango/uziq

## Características principales

- Autenticación con Last.fm y Discogs (doble flujo OAuth/API).
- Importación de vinilos desde tu cuenta de Discogs.
- Scrobbling de reproducciones a Last.fm, incluida la firma requerida por la API.
- Interfaz ligera y responsive con Svelte 5 y TailwindCSS.
- Fetching y caché con TanStack Query para una experiencia fluida.

## Stack técnico

- Svelte 5 / SvelteKit
- TypeScript
- TailwindCSS
- TanStack Query
- APIs: Last.fm y Discogs
- Despliegue: Vercel

## Requisitos y configuración

Copiar en `.env` (ejemplo):

```
LASTFM_API_KEY=your_lastfm_api_key  
LASTFM_SHARED_SECRET=your_lastfm_shared_secret  
LASTFM_CALLBACK_URL=http://localhost:5173/auth/callback/lastfm  
LASTFM_API_BASE_URL=https://ws.audioscrobbler.com/2.0

DISCOGS_API_TOKEN=your_discogs_api_token  
DISCOGS_CLIENT_KEY=your_discogs_client_key  
DISCOGS_SECRET_KEY=your_discogs_secret_key  
DISCOGS_CALLBACK_URL=http://localhost:5173/auth/callback/discogs  
DISCOGS_API_BASE_URL=https://api.discogs.com

PUBLIC_BASE_URI=http://localhost:5173
```

Instrucciones rápidas:

1. git clone https://github.com/ansango/uziq  
2. npm install  
3. npm run dev  
4. Accede a http://localhost:5173 y autentica con Last.fm y Discogs.

## Seguridad y privacidad

- Mantén las claves en variables de entorno y fuera del repositorio.
- El flujo de autenticación evita exponer credenciales del usuario.

## Licencia

MIT
