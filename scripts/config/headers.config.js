/**
 * Configuración centralizada para headers HTTP de Cloudflare Pages
 * 
 * Este archivo define todas las políticas de seguridad, cache y CSP del sitio.
 * El archivo public/_headers se genera automáticamente desde esta configuración.
 * 
 * Para regenerar headers: npm run generate:headers
 */

export default {
  /**
   * Configuración de features - Habilitar/deshabilitar secciones
   */
  features: {
    csp: true,              // Generar Content Security Policy
    security: true,         // Incluir security headers (X-Frame-Options, etc.)
    cache: true,            // Generar reglas de cache control
    inlineHashes: false,     // Calcular hashes para scripts inline
    reportUri: false,        // Añadir report-uri a CSP
  },

  /**
   * Content Security Policy (CSP)
   * Define qué recursos pueden cargarse y ejecutarse
   */
  csp: {
    // Scripts inline que necesitan hash SHA-256
    // El generador calculará automáticamente los hashes
    inlineScripts: [
      {
        file: 'src/components/layout/elements/theme.script.astro',
        description: 'Theme toggle script',
        enabled: false,  // Permite deshabilitar individualmente
      },
      {
        file: 'src/components/layout/elements/clipboard.script.astro',
        description: 'Clipboard copy script',
        enabled: false,
      },
      {
        file: 'src/components/molecules/searcher.script.astro',
        description: 'Search dialog script',
        enabled: false,
      },
      {
        file: 'src/components/layout/elements/head.astro',
        description: 'SVG animations script',
        extract: true,
        enabled: false,
      },
    ],

    // Hashes externos (de Pagefind u otros que no puedes controlar)
    externalHashes: {
      enabled: false,  // Deshabilitar si usas Astro experimental CSP
      hashes: [
        // Pagefind inline scripts (generados por astro-pagefind)
        "'sha256-sLUM3D2afZi+A9y4srA8GdLMNRz3COxjYKDK20Wj7/w='",
        "'sha256-QzWFZi+FLIx23tnm9SBU4aEgx4x8DsuASP07mfqol/c='",
        "'sha256-U7a72oKuFFz8D7GUHLA1NZ0ciymHmDOc9T9aVDg2rWU='",
      ],
    },

    // Dominios permitidos por directiva
    directives: {
      'default-src': ["'self'"],
      
      'script-src': [
        "'self'",
        "'unsafe-inline'", // Necesario si inlineHashes está deshabilitado
        'https://giscus.app',
        'https://pagefind.app',
        'https://gc.zgo.at',
        'https://*.goatcounter.com',
        'https://static.cloudflareinsights.com',
      ],
      
      'style-src': [
        "'self'",
        "'unsafe-inline'",  // Necesario para Tailwind CSS
        'https://giscus.app',
      ],
      
      'img-src': [
        "'self'",
        'data:',
        'https:',
        'blob:',
      ],
      
      'font-src': [
        "'self'",
        'data:',
      ],
      
      'connect-src': [
        "'self'",
        'https://ws.audioscrobbler.com',
        'https://api.raindrop.io',
        'https://giscus.app',
        'https://*.goatcounter.com',
        'https://cloudflareinsights.com',
      ],
      
      'frame-src': [
        'https://giscus.app',
      ],
      
      'object-src': ["'none'"],
      'base-uri': ["'self'"],
      'form-action': ["'self'"],
      'frame-ancestors': ["'none'"],
      'upgrade-insecure-requests': [],
    },

    // URI para reportes de violaciones CSP
    reportUri: '/api/csp-report',
  },

  /**
   * Security Headers adicionales
   */
  security: {
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains'
  },

  /**
   * Configuración de Cache Control
   * Tiempos en segundos
   */
  cache: {
    // HTML - Siempre revalidar para contenido fresco
    html: {
      enabled: true,
      maxAge: 0,
      directive: 'public, max-age=0, must-revalidate',
    },

    // Assets con hash en nombre - Cache inmutable 1 año
    immutable: {
      enabled: true,
      maxAge: 31536000,
      directive: 'public, max-age=31536000, immutable',
      patterns: [
        '/*.js',
        '/*.css',
        '/assets/*',
      ],
    },

    // Fuentes - Cache 1 año con CORS
    fonts: {
      enabled: true,
      maxAge: 31536000,
      directive: 'public, max-age=31536000, immutable',
      additionalHeaders: {
        'Access-Control-Allow-Origin': '*',
      },
      patterns: ['/fonts/*'],
    },

    // Imágenes - Cache 1 semana
    images: {
      enabled: true,
      maxAge: 604800,
      staleWhileRevalidate: 86400,
      directive: 'public, max-age=604800, stale-while-revalidate=86400',
      patterns: ['/images/*'],
    },

    // Favicons y manifests - Cache 1 día
    static: {
      enabled: true,
      maxAge: 86400,
      directive: 'public, max-age=86400',
      patterns: [
        '/*.png',
        '/*.ico',
        '/*.svg',
        '/*.webmanifest',
        '/*.xml',
      ],
    },

    // RSS Feed - Cache 1 hora
    rss: {
      enabled: true,
      maxAge: 3600,
      directive: 'public, max-age=3600',
      contentType: 'application/xml; charset=utf-8',
      patterns: ['/rss.xml'],
    },

    // Sitemap - Cache 1 día
    sitemap: {
      enabled: true,
      maxAge: 86400,
      directive: 'public, max-age=86400',
      contentType: 'application/xml; charset=utf-8',
      patterns: ['/sitemap*.xml'],
    },

    // robots.txt - Cache 1 día
    robots: {
      enabled: true,
      maxAge: 86400,
      directive: 'public, max-age=86400',
      contentType: 'text/plain; charset=utf-8',
      patterns: ['/robots.txt'],
    },

    // API endpoints - No cache
    api: {
      enabled: true,
      directive: 'no-store',
      patterns: ['/api/*'],
    },
  },

  /**
   * Configuración del generador
   */
  generator: {
    // Archivo de salida
    output: 'public/_headers',
    
    // Backup del archivo anterior
    backup: true,
    
    // Modo verbose
    verbose: true,
    
    // Validar hashes después de generar
    validate: true,

    // Comentarios en archivo generado
    comments: true,
  },
};
