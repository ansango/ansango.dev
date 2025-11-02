---
title: Cache Control Header
description: Stale while revalidate, configurar Cache-Control headers óptimos en Cloudflare Pages
date: 2025-11-02
mod: 2025-11-02
published: true
tags: [cache, cloudflare, platform]
---

# Cache Control Header

Headers HTTP que le dicen al navegador cuánto tiempo cachear cada archivo.

**Implementación:**

```
# Cloudflare Pages Custom Headers
# https://developers.cloudflare.com/pages/platform/headers/

# HTML pages - Always revalidate (para contenido nuevo)
/*.html
  Cache-Control: public, max-age=0, must-revalidate
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin

# Root HTML
/
  Cache-Control: public, max-age=0, must-revalidate
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin

# JavaScript - Cachear 1 año (tienen hash en el nombre)
/*.js
  Cache-Control: public, max-age=31536000, immutable
  X-Content-Type-Options: nosniff

# CSS - Cachear 1 año (tienen hash en el nombre)
/*.css
  Cache-Control: public, max-age=31536000, immutable
  X-Content-Type-Options: nosniff

# Assets folder (todo lo de Astro con hash)
/assets/*
  Cache-Control: public, max-age=31536000, immutable

# Fonts - Cachear 1 año
/fonts/*
  Cache-Control: public, max-age=31536000, immutable
  Access-Control-Allow-Origin: *

# Images - Cache 1 semana con stale-while-revalidate
/images/*
  Cache-Control: public, max-age=604800, stale-while-revalidate=86400

# Favicons y manifests - Cache 1 día
/*.png
  Cache-Control: public, max-age=86400
/*.ico
  Cache-Control: public, max-age=86400
/*.svg
  Cache-Control: public, max-age=86400
/*.webmanifest
  Cache-Control: public, max-age=86400
/*.xml
  Cache-Control: public, max-age=86400

# RSS Feed - Cache 1 hora
/rss.xml
  Cache-Control: public, max-age=3600
  Content-Type: application/xml; charset=utf-8

# Sitemap - Cache 1 día
/sitemap*.xml
  Cache-Control: public, max-age=86400
  Content-Type: application/xml; charset=utf-8

# robots.txt - Cache 1 día
/robots.txt
  Cache-Control: public, max-age=86400
  Content-Type: text/plain; charset=utf-8

# Security headers globales
/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), microphone=(), camera=()
```

**Beneficio:**

- HTML: `max-age=0` → Siempre pide al servidor (para contenido nuevo)
- Assets con hash: `immutable` → Cachea 1 año (porque cambiar el hash = nuevo archivo)
- Imágenes: Cache 1 día, pero puede servir versión vieja mientras actualiza en background

## 📋 Cómo funciona

**Cloudflare Pages** lee automáticamente el archivo [_headers](vscode-file://vscode-app/usr/share/code-insiders/resources/app/out/vs/code/electron-browser/workbench/workbench.html) y aplica esos headers HTTP a las rutas especificadas.

## 🎯 Estrategia implementada

**HTML (max-age=0):**

- Siempre verifica con el servidor
- Asegura contenido fresco después de cada deploy

**Assets con hash (immutable, 1 año):**

- `/assets/*.js`, `*.css` → Astro genera nombres con hash
- Si cambia el contenido → cambia el hash → nueva URL
- Cacheo agresivo sin riesgo

**Imágenes (1 semana + stale-while-revalidate):**

- Cache 1 semana
- Puede servir versión vieja hasta 1 día mientras actualiza

**Security headers:**

- `X-Frame-Options: DENY` → Previene clickjacking
- `X-Content-Type-Options: nosniff` → Previene MIME sniffing
- `Referrer-Policy` → Controla qué info enviar en referer

### ✅ Verificar después del deploy

```markdown
# Ver headers aplicados
curl -I https://ansango.com/

# O en browser DevTools:
# Network tab → Click en recurso → Headers tab
```

**Deberías ver:**

```markdown
cache-control: public, max-age=0, must-revalidate
x-frame-options: DENY
x-content-type-options: nosniff
```
