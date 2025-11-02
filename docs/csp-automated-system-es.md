# Content Security Policy - Sistema Automatizado

Este documento explica el sistema automatizado de generación de headers HTTP con CSP.

## 🎯 TL;DR - Guía Rápida

```bash
# ¿Modificaste un script inline o configuración?
npm run generate:headers

# El build automáticamente regenera headers
npm run build
```

**⚠️ NUNCA edites `public/_headers` manualmente** - Se genera automáticamente.

---

## 🏗️ Arquitectura del Sistema

### 1. Configuración Central (`config/headers.config.js`)

Archivo único donde defines:
- **Scripts inline** a hashear (rutas de archivos)
- **Dominios whitelistados** por directiva CSP
- **Políticas de cache** por tipo de recurso
- **Headers de seguridad** adicionales

### 2. Generador Automático (`scripts/generate-headers.js`)

Script Node.js que:
- Lee la configuración
- Extrae contenido de scripts inline
- Calcula hashes SHA-256 automáticamente
- Genera `public/_headers` completo
- Crea backup del archivo anterior

### 3. Integración en Build

El comando `npm run build` ejecuta automáticamente:
1. `npm run generate:headers` - Regenera headers
2. `astro build` - Build del sitio

---

## 📝 Cómo Modificar la Configuración

### Añadir un Script Inline Nuevo

Edita `config/headers.config.js`:

```javascript
csp: {
  inlineScripts: [
    // ... existentes
    {
      file: 'src/components/tu-nuevo-script.astro',
      description: 'Descripción del script',
    },
  ],
}
```

Luego ejecuta:
```bash
npm run generate:headers
```

El hash se calcula automáticamente. ✨

### Añadir Dominio Externo

Para permitir scripts de un nuevo dominio:

```javascript
csp: {
  directives: {
    'script-src': [
      "'self'",
      'https://giscus.app',
      'https://nuevo-dominio.com', // ← Añadir aquí
    ],
  },
}
```

Para otros tipos de recursos:
- `style-src` - Estilos CSS
- `img-src` - Imágenes
- `connect-src` - APIs/WebSockets
- `frame-src` - iFrames
- `font-src` - Fuentes

### Ajustar Políticas de Cache

Modifica tiempos en segundos:

```javascript
cache: {
  images: {
    maxAge: 604800, // 1 semana en segundos
    staleWhileRevalidate: 86400, // 1 día
    directive: 'public, max-age=604800, stale-while-revalidate=86400',
    patterns: ['/images/*'],
  },
}
```

Referencia de tiempos:
- `3600` = 1 hora
- `86400` = 1 día
- `604800` = 1 semana
- `2592000` = 30 días
- `31536000` = 1 año

### Modificar Headers de Seguridad

```javascript
security: {
  'X-Frame-Options': 'DENY',           // DENY, SAMEORIGIN, ALLOW-FROM
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
}
```

---

## 🔧 Scripts Disponibles

### `npm run generate:headers`
Regenera `public/_headers` basado en la configuración.

**Cuándo usar:**
- Modificaste un script inline
- Cambiaste configuración de CSP
- Añadiste/quitaste dominios
- Ajustaste políticas de cache

### `npm run build`
Build completo (regenera headers automáticamente).

### `npm run csp:generate` (DEPRECADO)
⚠️ Script legacy para generar hashes manualmente. Usar `generate:headers` en su lugar.

---

## 📋 Scripts Inline Actuales

El sistema trackea automáticamente estos scripts:

| Script | Descripción | Hash Auto-calculado |
|--------|-------------|---------------------|
| `theme.script.astro` | Toggle tema claro/oscuro | ✅ Automático |
| `clipboard.script.astro` | Copiar código | ✅ Automático |
| `searcher.script.astro` | Modal de búsqueda | ✅ Automático |
| `head.astro` | Animaciones SVG | ✅ Automático |

**Nota:** No necesitas memorizar hashes. El generador los calcula cada vez.

---

## 🌐 Dominios Whitelistados

### Scripts (`script-src`)
- `'self'` - Scripts del mismo origen
- `https://giscus.app` - Comentarios
- `https://pagefind.app` - Búsqueda

### Estilos (`style-src`)
- `'self'` - Estilos propios
- `'unsafe-inline'` - Necesario para Tailwind CSS
- `https://giscus.app` - Estilos de Giscus

### Imágenes (`img-src`)
- `'self'` - Imágenes propias
- `data:` - Data URIs
- `https:` - Cualquier imagen HTTPS
- `blob:` - Blob URLs

### Conexiones (`connect-src`)
- `'self'` - Mismo origen
- `https://ws.audioscrobbler.com` - Last.fm API
- `https://api.raindrop.io` - Raindrop API
- `https://giscus.app` - Giscus API

### Frames (`frame-src`)
- `https://giscus.app` - iFrame de comentarios

---

## 🧪 Testing y Validación

### Pre-Deploy

```bash
# 1. Regenerar headers
npm run generate:headers

# 2. Build local
npm run build

# 3. Preview
npm run preview

# 4. Abrir http://localhost:4321
# 5. DevTools → Console (no debe haber errores CSP)
```

### Verificar Headers Generados

```bash
# Ver el archivo generado
cat public/_headers

# Ver solo CSP
grep "Content-Security-Policy" public/_headers
```

### Producción

Después del deploy a Cloudflare Pages:

```bash
# Verificar headers HTTP
curl -I https://ansango.dev | grep -i "content-security"
```

---

## 🐛 Troubleshooting

### "Error: No se encontraron scripts en X"

**Causa:** El archivo no tiene etiquetas `<script>` o la ruta es incorrecta.

**Solución:**
1. Verifica que la ruta en `config/headers.config.js` sea correcta
2. Verifica que el archivo tenga `<script is:inline>`

### "Hash incorrecto después de modificar script"

**Causa:** Olvidaste regenerar headers.

**Solución:**
```bash
npm run generate:headers
```

El build también lo hace automáticamente, pero puedes forzarlo manualmente.

### "CSP bloquea un script externo nuevo"

**Causa:** El dominio no está whitelistado.

**Solución:**
1. Añade el dominio a `config/headers.config.js` en la directiva apropiada
2. Regenera: `npm run generate:headers`

### "Archivo _headers no se actualiza"

**Causa:** Error en el generador o configuración inválida.

**Solución:**
```bash
# Ver output detallado
npm run generate:headers

# Si hay errores, revisa config/headers.config.js
```

---

## 🔐 Seguridad Best Practices

### ✅ Hacer

- Usar el sistema automatizado
- Definir dominios específicos cuando sea posible
- Revisar reportes CSP en `/api/csp-report`
- Mantener `'unsafe-inline'` solo donde sea necesario
- Documentar nuevos dominios en config

### ❌ Evitar

- Editar `public/_headers` manualmente
- Usar `'unsafe-eval'` (nunca)
- Permitir `*` en dominios
- Añadir dominios sin revisar qué cargan
- Ignorar warnings del generador

---

## 📚 Referencias

### Documentación Oficial
- [MDN - Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [Cloudflare Pages Headers](https://developers.cloudflare.com/pages/platform/headers/)

### Herramientas
- [CSP Evaluator](https://csp-evaluator.withgoogle.com/) - Valida tu CSP
- [Security Headers](https://securityheaders.com/) - Analiza todos los headers
- [Report URI Hash Generator](https://report-uri.com/home/hash) - Generar hashes manualmente

### Archivos del Proyecto
- `config/headers.config.js` - Configuración central
- `scripts/generate-headers.js` - Generador automático
- `public/_headers` - Archivo generado (no editar)
- `src/pages/api/csp-report.ts` - Endpoint de reportes

---

## 🔄 Changelog del Sistema

### v2.0 - Sistema Automatizado (Actual)
- ✅ Generación automática de hashes
- ✅ Configuración centralizada en `config/headers.config.js`
- ✅ Integración en build process
- ✅ Backup automático de `_headers`
- ✅ Validación y logs detallados

### v1.0 - Manual (Deprecado)
- ❌ Hashes calculados manualmente
- ❌ `_headers` editado a mano
- ❌ Propenso a errores

---

**Última actualización:** 2 de noviembre, 2025
