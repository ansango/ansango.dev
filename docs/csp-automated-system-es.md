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

### 1. Configuración Central (`scripts/config/headers.config.js`)

Archivo único donde defines:

- **Features habilitados/deshabilitados** (CSP, cache, security headers)
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
- Respeta flags de habilitación/deshabilitación

### 3. Integración en Build

El comando `npm run build` ejecuta automáticamente:

1. `npm run generate:headers` - Regenera headers
2. `astro build` - Build del sitio

---

## 📝 Cómo Modificar la Configuración

### Habilitar/Deshabilitar Features

Edita `scripts/config/headers.config.js`:

```javascript
csp: {
  directives: {
    'script-src': [
      "'self'",
      "'unsafe-inline'",  // Si lo necesitas
      'https://giscus.app',
      'https://nuevo-dominio.com', // ← Añadir aquí
    ],
  },
}
```

### Añadir un Script Inline Nuevo

Solo si `features.inlineHashes: true`:

```javascript
csp: {
  inlineScripts: [
    // ... existentes
    {
      file: 'src/components/tu-nuevo-script.astro',
      description: 'Descripción del script',
      enabled: true,
    },
  ],
}
```

### Añadir Dominio Externo

````javascript
csp: {
  inlineScripts: [
Para otros tipos de recursos:
- `style-src` - Estilos CSS
- `img-src` - Imágenes
- `connect-src` - APIs/WebSockets
- `frame-src` - iFrames
- `font-src` - Fuentes

### Deshabilitar Reglas de Cache Específicas

```javascript
cache: {
```javascript
cache: {
  images: {
    enabled: true,
    maxAge: 604800, // 1 semana en segundos
    staleWhileRevalidate: 86400, // 1 día
    directive: 'public, max-age=604800, stale-while-revalidate=86400',
    patterns: ['/images/*'],
  },
}
````

### Ajustar Políticas de Cache

Modifica tiempos en segundos:

```bash
npm run generate:headers
```

El hash se calcula automáticamente. ✨

### Añadir Dominio Externo

Para permitir scripts de un nuevo dominio:

````javascript
csp: {
  directives: {
    'script-src': [
      "'self'",
      'https://giscus.app',
## 🔧 Scripts Disponibles

### `npm run generate:headers`
Regenera `public/_headers` basado en la configuración.

**Cuándo usar:**
- Modificaste configuración de features
- Cambiaste CSP o dominios
- Ajustaste políticas de cache
- Modificaste security headers

### `npm run build`
Build completo (regenera headers automáticamente).

---

## 🌐 Configuración Actual (ansango.dev)

### Features Habilitados
- ✅ **CSP:** Habilitado con `'unsafe-inline'`
- ✅ **Security Headers:** Todos habilitados
- ✅ **Cache Control:** Habilitado
- ⚠️ **Inline Hashes:** Deshabilitado (usamos `'unsafe-inline'`)
- ✅ **Report URI:** Habilitado

### Dominios Whitelistados

#### Scripts (`script-src`)
- `'self'` - Scripts del mismo origen
- `'unsafe-inline'` - Scripts inline permitidos
- `https://giscus.app` - Comentarios
- `https://pagefind.app` - Búsqueda
- `https://gc.zgo.at` - GoatCounter analytics
- `https://*.goatcounter.com` - GoatCounter dominio
- `https://static.cloudflareinsights.com` - Cloudflare Web Analytics

#### Estilos (`style-src`)
- `'self'` - Estilos propios
- `'unsafe-inline'` - Necesario para Tailwind CSS
- `https://giscus.app` - Estilos de Giscus

#### Imágenes (`img-src`)
- `'self'` - Imágenes propias
- `data:` - Data URIs
- `https:` - Cualquier imagen HTTPS (covers Last.fm, avatares, etc.)
- `blob:` - Blob URLs

#### Conexiones (`connect-src`)
- `'self'` - Mismo origen
- `https://ws.audioscrobbler.com` - Last.fm API
- `https://api.raindrop.io` - Raindrop API
- `https://giscus.app` - Giscus API
- `https://*.goatcounter.com` - GoatCounter tracking
- `https://cloudflareinsights.com` - Cloudflare Web Analytics

#### Frames (`frame-src`)
- `https://giscus.app` - iFrame de comentarios
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

### Verificar Headers Generados

```bash
# Ver el archivo generado
cat public/_headers

# Ver solo CSP
grep "Content-Security-Policy" public/_headers

# Ver features habilitados (desde el script)
npm run generate:headers
````

### Producción - Herramientas Online

#### **1. Security Headers** ⭐ (Recomendado)

**URL:** https://securityheaders.com/

- Analiza todos los headers HTTP de seguridad
- Calificación: A+, A, B, C, D, F
- Explica qué falta y por qué es importante

## 🐛 Troubleshooting

### "Feature X está deshabilitado"

**Causa:** El feature está en `false` en `features` de la config.

**Solución:**

```javascript
features: {
  csp: true,  // ← Cambiar a true
}
```

### "CSP bloquea scripts inline"

**Causa:** Usas `inlineHashes: true` pero falta un hash.

**Solución:**

1. Añade el script a `inlineScripts` en config
2. Regenera: `npm run generate:headers`

**O usa `'unsafe-inline'`:**

```javascript
features: {
  inlineHashes: false,  // Deshabilitar hashes
}
directives: {
  'script-src': [
    "'self'",
    "'unsafe-inline'",  // Permitir todos los inline
  ],
}
```

### "CSP bloquea un script externo"

**Causa:** El dominio no está whitelistado.

**Solución:**

1. Añade el dominio a `directives` → `script-src`
2. Regenera: `npm run generate:headers`

### "Headers no se actualizan en producción"

## 🔐 Seguridad Best Practices

### ✅ Hacer

- Usar el sistema automatizado
- Definir dominios específicos cuando sea posible
- Revisar reportes CSP en `/api/csp-report`
- Usar `'unsafe-inline'` solo si es necesario (sitios estáticos SSG suele ser aceptable)
- Documentar nuevos dominios en config
- Probar con herramientas online regularmente

### ❌ Evitar

- Editar `public/_headers` manualmente
- Usar `'unsafe-eval'` (nunca)
- Permitir `*` en dominios
- Añadir dominios sin verificar qué cargan
- Ignorar warnings del generador
- Deshabilitar todos los headers de seguridad

### 📊 Calificación Objetivo

- **Security Headers:** A o A+
- **Mozilla Observatory:** 90+ puntos
- **SSL Labs:** A+
- **CSP Evaluator:** Sin high-severity issues

---

## 📚 Referencias

### Documentación Oficial

- [MDN - Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [Cloudflare Pages Headers](https://developers.cloudflare.com/pages/platform/headers/)
- [OWASP Secure Headers Project](https://owasp.org/www-project-secure-headers/)

### Herramientas de Testing

- [Security Headers](https://securityheaders.com/) - Análisis completo
- [Mozilla Observatory](https://observatory.mozilla.org/) - Security scan
- [CSP Evaluator](https://csp-evaluator.withgoogle.com/) - CSP específico
- [SSL Labs](https://www.ssllabs.com/ssltest/) - SSL/TLS testing
- [Report URI Hash Generator](https://report-uri.com/home/hash) - Generar hashes manualmente

### Archivos del Proyecto

- `scripts/config/headers.config.js` - Configuración central
- `scripts/generate-headers.js` - Generador automático
- `public/_headers` - Archivo generado (no editar)
- `src/pages/api/csp-report.ts` - Endpoint de reportes CSP

---

## 🔄 Changelog del Sistema

### v3.0 - Sistema Configurable (Actual)

- ✅ Features habilitables/deshabilitables
- ✅ Hashes externos configurables
- ✅ Scripts inline individuales habilitables
- ✅ Cache rules individuales habilitables
- ✅ Modo verbose mejorado
- ✅ Soporte para `'unsafe-inline'`

### v2.0 - Sistema Automatizado

- ✅ Generación automática de hashes
- ✅ Configuración centralizada
- ✅ Integración en build process
- ✅ Backup automático

### v1.0 - Manual (Deprecado)

- ❌ Hashes calculados manualmente
- ❌ `_headers` editado a mano
- ❌ Propenso a errores

---

**Última actualización:** 3 de noviembre, 2025

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

### "Archivo \_headers no se actualiza"

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
