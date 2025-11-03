---
title: "Automatización de HTTP Headers: CSP y Cache Control"
description: descripcion
date: 2025-11-03
mod: 2025-11-03
published: true
tags:
  - cache
  - csp
  - https
  - headers
  - automate
---

# Automatización de HTTP Headers: CSP y Cache Control

## Descripción General

Esta guía documenta el diseño e implementación de un sistema automatizado de generación de headers HTTP, enfocado en Content Security Policy (CSP) y políticas de cache control.

---

## Problema

### Gestión Manual de Headers

La configuración tradicional de headers HTTP presenta varios problemas:

- **Propenso a errores**: Cálculo manual de hashes para CSP
- **Difícil mantenimiento**: Cientos de líneas de configuración
- **Conflictos en control de versiones**: Archivos de configuración extensos
- **Inconsistencias**: Headers diferentes entre entornos
- **Complejidad de actualización**: Cada cambio en scripts inline requiere recalcular hashes manualmente

### Solución Propuesta

Sistema automatizado que:

- Declara intenciones en un archivo de configuración
- Genera hashes automáticamente para scripts inline
- Construye directivas CSP programáticamente
- Genera archivos de headers listos para despliegue
- Se integra en el proceso de build

---

## Arquitectura del Sistema

### Componentes Principales

#### 1. Manifiesto de Configuración

Archivo JavaScript que actúa como única fuente de verdad para todas las políticas de headers.

#### 2. Script Generador

Script Node.js que procesa la configuración y genera el archivo final de headers.

#### 3. Archivo de Headers Generado

Artefacto de salida (ej: `_headers` o `.htaccess`) que no debe editarse manualmente.

---

## Content Security Policy (CSP)

### Conceptos Fundamentales

CSP implementa el principio de mínimo privilegio: solo se otorgan los permisos estrictamente necesarios para el funcionamiento del sitio.

### Directivas Principales

#### default-src

Define la política por defecto para todos los tipos de recursos.

```javascript
'default-src': ["'self'"]
```

#### script-src

Controla qué scripts pueden ejecutarse. Acepta:

- `'self'`: Scripts del mismo origen
- `'sha256-HASH'`: Scripts inline con hash específico
- URLs: Dominios permitidos explícitamente

```javascript
'script-src': [
  "'self'",
  "'sha256-abc123...'",
  'https://cdn.ejemplo.com'
]
```

#### style-src

Controla hojas de estilo CSS.

```javascript
'style-src': ["'self'", "'unsafe-inline'"]
```

#### img-src

Controla fuentes de imágenes.

```javascript
'img-src': ["'self'", 'data:', 'https:', 'blob:']
```

#### connect-src

Controla conexiones AJAX, WebSockets y EventSource.

```javascript
'connect-src': ["'self'", 'https://api.ejemplo.com']
```

### Gestión de Scripts Inline

Tres enfoques posibles:

| Método | Descripción | Uso Recomendado |
|--------|-------------|-----------------|
| `'unsafe-inline'` | Permite todos los scripts inline | Evitar en producción |
| Nonces | Tokens únicos por request | Aplicaciones dinámicas |
| Hashes SHA-256 | Firma criptográfica del contenido | Sitios estáticos (SSG) |

**Recomendación**: Para sitios generados estáticamente, usar hashes SHA-256 por ser reproducibles y no requerir servidor en runtime.

---

## Cache Control

### Estrategias de Caché

#### Assets Inmutables

Archivos con hash en el nombre pueden cachearse indefinidamente.

```javascript
{
  maxAge: 31536000, // 1 año
  directive: 'public, max-age=31536000, immutable',
  patterns: ['/*.js', '/*.css', '/assets/*']
}
```

#### HTML

Debe revalidarse siempre para asegurar contenido actualizado.

```javascript
{
  maxAge: 0,
  directive: 'public, max-age=0, must-revalidate'
}
```

#### Stale-While-Revalidate

Sirve contenido en caché mientras busca actualizaciones en segundo plano.

```javascript
{
  maxAge: 604800, // 1 semana
  staleWhileRevalidate: 86400, // 1 día
  directive: 'public, max-age=604800, stale-while-revalidate=86400'
}
```

### Tabla de Tiempos de Caché

| Duración | Segundos | Uso Recomendado |
|----------|----------|-----------------|
| 1 hora | 3600 | Feeds RSS, APIs con cambios frecuentes |
| 1 día | 86400 | Manifiestos, favicons, robots.txt |
| 1 semana | 604800 | Imágenes de contenido |
| 1 mes | 2592000 | Assets con versionado manual |
| 1 año | 31536000 | Assets con hash, fuentes, inmutables |

---

## Implementación

### Archivo de Configuración

```javascript
// config/headers.config.js
export default {
  csp: {
    inlineScripts: [
      {
        file: 'src/components/theme.script.astro',
        description: 'Script de cambio de tema',
      },
    ],

    directives: {
      'default-src': ["'self'"],
      'script-src': [
        "'self'",
        'https://analytics.example.com',
      ],
      'style-src': ["'self'", "'unsafe-inline'"],
      'img-src': ["'self'", 'data:', 'https:', 'blob:'],
      'connect-src': ["'self'", 'https://api.example.com'],
      'frame-src': ['https://widgets.example.com'],
      'object-src': ["'none'"],
      'base-uri': ["'self'"],
      'form-action': ["'self'"],
      'frame-ancestors': ["'none'"],
      'upgrade-insecure-requests': [],
    },

    reportUri: '/api/csp-report',
  },

  security: {
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
  },

  cache: {
    html: {
      maxAge: 0,
      directive: 'public, max-age=0, must-revalidate',
    },

    immutable: {
      maxAge: 31536000,
      directive: 'public, max-age=31536000, immutable',
      patterns: ['/*.js', '/*.css', '/assets/*'],
    },

    fonts: {
      maxAge: 31536000,
      directive: 'public, max-age=31536000, immutable',
      additionalHeaders: {
        'Access-Control-Allow-Origin': '*',
      },
      patterns: ['/fonts/*'],
    },

    images: {
      maxAge: 604800,
      staleWhileRevalidate: 86400,
      directive: 'public, max-age=604800, stale-while-revalidate=86400',
      patterns: ['/images/*'],
    },

    static: {
      maxAge: 86400,
      directive: 'public, max-age=86400',
      patterns: ['/*.png', '/*.ico', '/*.svg', '/*.webmanifest'],
    },

    rss: {
      maxAge: 3600,
      directive: 'public, max-age=3600',
      contentType: 'application/xml; charset=utf-8',
      patterns: ['/rss.xml'],
    },

    api: {
      directive: 'no-store',
      patterns: ['/api/*'],
    },
  },

  generator: {
    output: 'public/_headers',
    backup: true,
    verbose: true,
  },
};
```

### Script Generador

```javascript
#!/usr/bin/env node
import fs from 'node:fs';
import crypto from 'node:crypto';

/**
 * Extrae el contenido de scripts de un archivo
 */
function extractScriptContent(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const scriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/g;
  const matches = [];
  let match;
  
  while ((match = scriptRegex.exec(content)) !== null) {
    matches.push(match[1]);
  }
  
  return matches.join('\n');
}

/**
 * Genera hash SHA-256
 */
function generateHash(content) {
  return crypto
    .createHash('sha256')
    .update(content, 'utf8')
    .digest('base64');
}

/**
 * Procesa scripts inline y genera hashes
 */
function processInlineScripts(inlineScripts) {
  const hashes = [];
  
  for (const script of inlineScripts) {
    const content = extractScriptContent(script.file);
    const hash = generateHash(content);
    hashes.push(`'sha256-${hash}'`);
  }
  
  return hashes;
}

/**
 * Construye la directiva CSP completa
 */
function buildCSPDirective(directives, hashes) {
  const parts = [];
  
  for (const [directive, sources] of Object.entries(directives)) {
    if (directive === 'script-src') {
      const allSources = ["'self'", ...hashes, ...sources.filter(s => s !== "'self'")];
      parts.push(`${directive} ${allSources.join(' ')}`);
    } else if (sources.length > 0) {
      parts.push(`${directive} ${sources.join(' ')}`);
    } else {
      parts.push(directive);
    }
  }
  
  return parts.join('; ');
}

/**
 * Genera el contenido completo del archivo _headers
 */
function generateHeadersContent(config, hashes) {
  const lines = [];
  
  lines.push('# Headers HTTP - Generado Automáticamente');
  lines.push('# ⚠️ NO EDITAR MANUALMENTE');
  lines.push('');
  
  lines.push('/*');
  
  for (const [header, value] of Object.entries(config.security)) {
    lines.push(`  ${header}: ${value}`);
  }
  
  const csp = buildCSPDirective(config.csp.directives, hashes);
  const cspWithReport = config.csp.reportUri 
    ? `${csp}; report-uri ${config.csp.reportUri}`
    : csp;
  lines.push(`  Content-Security-Policy: ${cspWithReport}`);
  lines.push('');
  
  // Generar reglas de cache...
  
  return lines.join('\n');
}

async function main() {
  const config = await import('./config/headers.config.js');
  const hashes = processInlineScripts(config.default.csp.inlineScripts);
  const content = generateHeadersContent(config.default, hashes);
  
  fs.writeFileSync(config.default.generator.output, content, 'utf8');
  console.log('✨ Headers generados exitosamente');
}

main();
```

### Integración en Build

```json
{
  "scripts": {
    "generate:headers": "node scripts/generate-headers.js",
    "build": "npm run generate:headers && [comando-build]"
  }
}
```

---

## Endpoint de Reportes CSP

### Implementación

```javascript
// api/csp-report.js
export async function POST({ request }) {
  const report = await request.json();
  const violation = report['csp-report'] || report;
  
  console.error('CSP Violation:', {
    blockedUri: violation['blocked-uri'],
    violatedDirective: violation['violated-directive'],
    documentUri: violation['document-uri'],
  });
  
  // En producción: enviar a sistema de logging
  // await sendToSentry(violation);
  
  return new Response(null, { status: 204 });
}
```

### Utilidad

Los reportes CSP proporcionan información sobre:

- Qué recursos fueron bloqueados
- Qué directiva causó el bloqueo
- En qué página ocurrió la violación

---

## Mejores Prácticas

### Recomendaciones

- **Configuración como código**: Mantener configuración en control de versiones
- **Generación automática**: Eliminar intervención manual
- **Assets inmutables**: Usar hashes en nombres de archivo
- **Principio de mínimo privilegio**: Permitir solo lo necesario
- **Monitoreo**: Implementar endpoint de reportes CSP

### Evitar

- Hashes manuales
- `'unsafe-inline'` en script-src
- `'unsafe-eval'` bajo cualquier circunstancia
- Wildcards en dominios (ej: `*.example.com`)
- Cache indefinido en HTML
- Edición manual de archivos generados

---

## Ciclo de Desarrollo

### Desarrollo Local

```bash
# Modificar configuración
vim config/headers.config.js

# Regenerar headers (opcional)
npm run generate:headers

# Iniciar servidor de desarrollo
npm run dev
```

### Build y Deploy

```bash
# Build (regenera headers automáticamente)
npm run build

# Preview
npm run preview

# Deploy
npm run deploy
```

### Verificación en Producción

```bash
# Verificar headers aplicados
curl -I https://tu-sitio.com | grep "Content-Security-Policy"

# Revisar logs de reportes CSP
tail -f logs/csp-violations.log
```

---

## Casos de Uso

### Añadir Script Inline

1. Agregar a configuración:

```javascript
inlineScripts: [
  {
    file: 'src/components/nuevo-feature.script.js',
    description: 'Nueva funcionalidad',
  },
]
```

1. Ejecutar build:

```bash
npm run build
```

### Integrar Servicio Externo

1. Agregar dominios necesarios:

```javascript
directives: {
  'script-src': [
    "'self'",
    'https://www.googletagmanager.com',
  ],
  'connect-src': [
    "'self'",
    'https://www.google-analytics.com',
  ],
}
```

1. Regenerar y desplegar.

### Optimizar Cache de Imágenes

1. Ajustar política:

```javascript
images: {
  maxAge: 604800, // 1 semana
  staleWhileRevalidate: 86400, // revalidar en 1 día
}
```

---

## Troubleshooting

### CSP Bloqueó un Script

**Síntomas**: Error en consola del navegador

**Soluciones**:
- Verificar que script inline esté en `inlineScripts`
- Verificar que dominio externo esté whitelistado
- Regenerar headers si se modificó el script

```bash
npm run generate:headers
npm run build
```

### Imágenes No Cargan

**Síntomas**: Imágenes rotas, errores CSP

**Solución**: Verificar `img-src`:

```javascript
'img-src': [
  "'self'",
  'https:', // permite cualquier imagen HTTPS
  'data:',
  'blob:',
]
```

### Headers No se Aplican

**Verificar**:
- Archivo `_headers` existe en build output
- CDN/hosting soporta el formato
- Cache del CDN está purgado

---

## Referencia de Directivas CSP

| Directiva | Controla | Ejemplo |
|-----------|----------|---------|
| `default-src` | Fallback para todos los recursos | `'self'` |
| `script-src` | Scripts JavaScript | `'self' 'sha256-…' https://cdn.com` |
| `style-src` | Hojas de estilo CSS | `'self' 'unsafe-inline'` |
| `img-src` | Imágenes | `'self' data: https:` |
| `font-src` | Fuentes web | `'self' data:` |
| `connect-src` | Fetch, XHR, WebSockets | `'self' https://api.com` |
| `frame-src` | iFrames | `https://widgets.com` |
| `media-src` | Audio, video | `'self' https://cdn.com` |
| `object-src` | `<object>`, `<embed>` | `'none'` |
| `worker-src` | Web Workers | `'self'` |
| `manifest-src` | Web app manifests | `'self'` |
| `base-uri` | Tag `<base>` | `'self'` |
| `form-action` | Envío de formularios | `'self'` |
| `frame-ancestors` | Embedding del sitio | `'none'` |

## Valores Especiales CSP

| Valor | Significado |
|-------|-------------|
| `'none'` | Bloquea todo |
| `'self'` | Mismo origen (protocolo + dominio + puerto) |
| `'unsafe-inline'` | Permite scripts/styles inline |
| `'unsafe-eval'` | Permite eval() |
| `'sha256-…'` | Hash SHA-256 del contenido |
| `'nonce-…'` | Token aleatorio único |
| `https:` | Cualquier URL HTTPS |
| `data:` | Data URIs |
| `blob:` | Blob URLs |

---

## Referencias

- [MDN - Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [MDN - HTTP Caching](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching)
- [CSP Evaluator by Google](https://csp-evaluator.withgoogle.com/)
- [Security Headers Scanner](https://securityheaders.com/)

---

**Versión**: 1.0  
**Última actualización**: 3 de noviembre, 2025
