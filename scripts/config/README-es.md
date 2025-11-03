# 🔐 Sistema de Headers HTTP Automatizado

Sistema de generación automática de headers HTTP con Content Security Policy (CSP) para ansango.dev.

## 🎯 Quick Start

```bash
# Modificar configuración
vim config/headers.config.js

# Regenerar headers (automático en build)
npm run generate:headers

# Build con headers actualizados
npm run build
```

## 📂 Estructura

```
ansango.dev/
├── 
├── scripts/
│   ├── config/
│   │   └── headers.config.js       # ⚙️ Configuración central (EDITAR AQUÍ)
│   │   └── generate-headers.js     # 🤖 Generador automático
│   public/
│       └── _headers                # 📄 Generado automáticamente (NO EDITAR)
└── docs/
    └── csp-automated-system.md # 📖 Documentación completa
```

## 🔄 Workflow

### 1. Modificar Configuración

Edita `config/headers.config.js`:

```javascript
export default {
  csp: {
    inlineScripts: [
      { file: 'src/components/theme.script.astro', description: 'Theme toggle' },
    ],
    directives: {
      'script-src': ["'self'", 'https://giscus.app'],
    },
  },
  cache: {
    html: { maxAge: 0, directive: 'public, max-age=0, must-revalidate' },
    immutable: { maxAge: 31536000, patterns: ['/*.js', '/*.css'] },
  },
};
```

### 2. Regenerar Headers

```bash
npm run generate:headers
```

El script:
- ✅ Extrae scripts inline automáticamente
- ✅ Calcula hashes SHA-256
- ✅ Genera CSP completo
- ✅ Configura cache headers
- ✅ Crea backup del archivo anterior

### 3. Build

```bash
npm run build
```

**Nota:** El build ejecuta `generate:headers` automáticamente.

## 📝 Casos de Uso Comunes

### Añadir Script Inline

```javascript
// config/headers.config.js
inlineScripts: [
  // ... existentes
  {
    file: 'src/components/mi-script.astro',
    description: 'Mi nuevo script',
  },
]
```

### Permitir Dominio Externo

```javascript
// config/headers.config.js
directives: {
  'script-src': [
    "'self'",
    'https://nuevo-dominio.com', // ← Añadir aquí
  ],
}
```

### Ajustar Cache

```javascript
// config/headers.config.js
cache: {
  images: {
    maxAge: 604800, // 1 semana
    patterns: ['/images/*'],
  },
}
```

## 🧪 Testing

```bash
# 1. Regenerar y build
npm run build

# 2. Preview local
npm run preview

# 3. Verificar en DevTools
# Console → No debe haber errores CSP
# Network → Headers → Content-Security-Policy presente

# 4. Producción
curl -I https://ansango.dev | grep "Content-Security-Policy"
```

## 🐛 Troubleshooting

### CSP bloquea un script

1. Verifica que el dominio esté en `config/headers.config.js`
2. Regenera: `npm run generate:headers`
3. Rebuild: `npm run build`

### Hash incorrecto

1. Modificaste un script inline
2. Regenera automáticamente: `npm run generate:headers`

### Headers no se actualizan

1. Verifica que `public/_headers` se generó correctamente
2. Cloudflare Pages toma hasta 1 min en actualizar
3. Purge cache si es necesario

## 📚 Documentación

- **[Sistema Completo](docs/csp-automated-system.md)** - Guía detallada
- **[Testing](docs/csp-testing-checklist.md)** - Checklist de validación
- **[Scripts](scripts/README-ES.md)** - Documentación de scripts

## ⚙️ Configuración Actual

### Scripts Inline Trackeados

- `theme.script.astro` - Toggle tema
- `clipboard.script.astro` - Copiar código
- `searcher.script.astro` - Modal búsqueda
- `head.astro` - Animaciones SVG

### Dominios Whitelistados

- `https://giscus.app` - Comentarios
- `https://pagefind.app` - Búsqueda
- `https://ws.audioscrobbler.com` - Last.fm API
- `https://api.raindrop.io` - Raindrop API

### Políticas de Cache

- HTML: `max-age=0, must-revalidate`
- JS/CSS: `max-age=31536000, immutable`
- Imágenes: `max-age=604800, stale-while-revalidate=86400`
- RSS: `max-age=3600`

## 🔒 Security Headers

- `Content-Security-Policy` - Generado automáticamente
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: geolocation=(), microphone=(), camera=()`

---

**⚠️ Importante:**

- ✅ EDITAR: `config/headers.config.js`
- ❌ NO EDITAR: `public/_headers` (se genera automáticamente)

---

**Última actualización:** 2 de noviembre, 2025
