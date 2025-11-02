---
title: "Guía SEO: Checklist de Optimización"
description: Una guía práctica para auditar y optimizar el SEO de proyectos web, con énfasis en meta tags, structured data y métricas clave.
date: 2025-11-02
mod: 2025-11-02
published: true
tags: [analytics, checklist, metrics, performance, production, seo]
---

# Guía SEO: Checklist de Optimización

Una guía práctica para auditar y optimizar el SEO de proyectos web, con énfasis en meta tags, structured data y métricas clave.

## Meta Tags Fundamentales

### Esenciales

- **Title**: Formato `"Título | Nombre del Sitio"` (50-60 caracteres)
- **Description**: Resumen único por página (150-160 caracteres)
- **Viewport**: `width=device-width, initial-scale=1.0`
- **Canonical**: URL canónica para evitar contenido duplicado
- **Robots**: Control de indexación (`index,follow` o `noindex,nofollow`)

### Opcionales pero Recomendados

- **Author**: Autor del contenido
- **Keywords**: Solo si son relevantes y específicos
- **Language**: Atributo `lang` en el tag `<html>`

## Open Graph (OG)

Optimiza cómo se comparte tu contenido en redes sociales:

```html
<meta property="og:title" content="Título del contenido" />
<meta property="og:description" content="Descripción breve" />
<meta property="og:image" content="https://ejemplo.com/imagen.jpg" />
<meta property="og:image:alt" content="Descripción de la imagen" />
<meta property="og:url" content="https://ejemplo.com/pagina" />
<meta property="og:type" content="article" /> <!-- o "website" -->
<meta property="og:site_name" content="Nombre del Sitio" />
<meta property="og:locale" content="es_ES" />
```

### Para Artículos de Blog

```html
<meta property="article:published_time" content="2024-01-15T10:00:00Z" />
<meta property="article:modified_time" content="2024-01-20T15:30:00Z" />
<meta property="article:author" content="Nombre del Autor" />
<meta property="article:tag" content="SEO" />
<meta property="article:tag" content="Web Development" />
```

---

## Twitter Cards

Personaliza la apariencia en Twitter/X:

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@nombreusuario" />
<meta name="twitter:creator" content="@nombreautor" />
<meta name="twitter:title" content="Título del contenido" />
<meta name="twitter:description" content="Descripción breve" />
<meta name="twitter:image" content="https://ejemplo.com/imagen.jpg" />
<meta name="twitter:image:alt" content="Descripción de la imagen" />
```

---

## Structured Data (JSON-LD)

Ayuda a los motores de búsqueda a entender tu contenido:

### Para Artículos

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Título del Artículo",
  "description": "Descripción del contenido",
  "author": {
    "@type": "Person",
    "name": "Nombre del Autor"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Nombre del Sitio",
    "logo": {
      "@type": "ImageObject",
      "url": "https://ejemplo.com/logo.png"
    }
  },
  "datePublished": "2024-01-15T10:00:00Z",
  "dateModified": "2024-01-20T15:30:00Z",
  "image": "https://ejemplo.com/imagen.jpg",
  "keywords": ["SEO", "Web Development"]
}
```

### Para el Sitio Web

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Nombre del Sitio",
  "url": "https://ejemplo.com",
  "description": "Descripción del sitio",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://ejemplo.com/buscar?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

---

## Recursos Adicionales

### Feeds y Sitemaps

- **RSS Feed**: `<link rel="alternate" type="application/rss+xml" href="/rss.xml" />`
- **Sitemap**: Incluye `<lastmod>`, `<changefreq>` y `<priority>`
- **robots.txt**: Define reglas de crawling

## RSS Feed: Mejores Prácticas

### Configuración Básica

```xml
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Nombre del Blog</title>
    <link>https://ejemplo.com</link>
    <description>Descripción breve del contenido</description>
    <language>es</language>
    <atom:link href="https://ejemplo.com/rss.xml" rel="self" type="application/rss+xml"/>
    <lastBuildDate>Mon, 15 Jan 2024 10:00:00 GMT</lastBuildDate>
    
    <item>
      <title>Título del Artículo</title>
      <link>https://ejemplo.com/articulo</link>
      <guid isPermaLink="true">https://ejemplo.com/articulo</guid>
      <pubDate>Mon, 15 Jan 2024 10:00:00 GMT</pubDate>
      <dc:creator>Nombre del Autor</dc:creator>
      <category>SEO</category>
      <description><![CDATA[Resumen del artículo...]]></description>
      <content:encoded><![CDATA[<p>Contenido completo del artículo...</p>]]></content:encoded>
    </item>
  </channel>
</rss>
```

### Tips Esenciales

**1. Autodescubrimiento**

```html
<!-- En el <head> de todas las páginas -->
<link rel="alternate" type="application/rss+xml" 
      title="Nombre del Blog - RSS Feed" 
      href="https://ejemplo.com/rss.xml" />

<!-- Atom feed (alternativa) -->
<link rel="alternate" type="application/atom+xml" 
      title="Nombre del Blog - Atom Feed" 
      href="https://ejemplo.com/atom.xml" />
```

**2. Contenido del Feed**
- **Incluye contenido completo**: Usa `<content:encoded>` con el HTML completo del artículo
- **O resumen estratégico**: Si prefieres tráfico al sitio, usa solo `<description>` con 150-200 palabras
- **Imágenes**: Incluye rutas absolutas (no relativas) en el HTML
- **CDATA**: Envuelve HTML en `<![CDATA[…]]>` para evitar errores de parsing

**3. Metadatos Importantes**

```xml
<item>
  <!-- GUID único y permanente -->
  <guid isPermaLink="true">https://ejemplo.com/articulo-slug</guid>
  
  <!-- Fecha en formato RFC 822 -->
  <pubDate>Mon, 15 Jan 2024 10:00:00 GMT</pubDate>
  
  <!-- Autor (requiere namespace dc) -->
  <dc:creator>Nombre del Autor</dc:creator>
  
  <!-- Categorías múltiples -->
  <category>SEO</category>
  <category>Web Development</category>
  
  <!-- Enclosure para podcasts/videos -->
  <enclosure url="https://ejemplo.com/audio.mp3" 
             length="12345678" 
             type="audio/mpeg" />
</item>
```

**4. Optimización para SEO**
- **Límite de items**: 10-50 artículos más recientes (balance entre tamaño y contenido)
- **Cache**: Configura cabeceras HTTP para cache (1-2 horas)
- **Compresión**: Habilita Gzip para el archivo XML
- **Validación**: Usa [W3C Feed Validator](https://validator.w3.org/feed/)

**5. Namespaces Útiles**

```xml
<rss version="2.0"
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:dc="http://purl.org/dc/elements/1.1/"
     xmlns:media="http://search.yahoo.com/mrss/">
  <!-- Media RSS para imágenes destacadas -->
  <item>
    <media:content url="https://ejemplo.com/imagen.jpg" 
                   type="image/jpeg" 
                   medium="image">
      <media:title>Título de la imagen</media:title>
      <media:description>Descripción de la imagen</media:description>
    </media:content>
  </item>
</rss>
```

**6. Páginas de Suscripción**
- Crea una landing específica: `/subscribe` o `/rss`
- Explica qué es RSS y cómo suscribirse
- Ofrece alternativas: Email newsletter, servicios como Feedly
- Botón visual en el sitio (sidebar o footer)

**7. Herramientas de Testing**
- [W3C Feed Validator](https://validator.w3.org/feed/): Valida sintaxis XML
- [FeedBurner](https://feedburner.google.com/): Estadísticas y proxy (legacy)
- [RSS.app](https://rss.app/): Previsualización y conversión
- Lectores RSS: Feedly, Inoreader, NewsBlur para probar la experiencia

**8. Errores Comunes a Evitar**
- ❌ URLs relativas en imágenes o links
- ❌ HTML mal formado sin CDATA
- ❌ Fechas en formato incorrecto
- ❌ GUIDs que cambian entre builds
- ❌ Caracteres especiales sin escapar
- ❌ Feed sin namespace `atom:link` para self-reference
- ❌ Contenido truncado sin indicación

**9. RSS vs Atom**

```xml
<!-- Atom feed (alternativa moderna) -->
<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>Nombre del Blog</title>
  <link href="https://ejemplo.com" />
  <link rel="self" href="https://ejemplo.com/atom.xml" />
  <updated>2024-01-15T10:00:00Z</updated>
  <id>https://ejemplo.com</id>
  
  <entry>
    <title>Título del Artículo</title>
    <link href="https://ejemplo.com/articulo" />
    <id>https://ejemplo.com/articulo</id>
    <updated>2024-01-15T10:00:00Z</updated>
    <published>2024-01-15T10:00:00Z</published>
    <author>
      <name>Nombre del Autor</name>
    </author>
    <summary>Resumen del artículo...</summary>
    <content type="html"><![CDATA[<p>Contenido completo...</p>]]></content>
  </entry>
</feed>
```

**10. Estrategia de Contenido**
- **Full Text**: Mejor para lectores leales, menor tráfico web
- **Partial Text**: Incentiva visitas al sitio, menor satisfacción
- **Hybrid**: Resumen + "Leer más" con primeros 2-3 párrafos
- **Considera tu audiencia**: Desarrolladores prefieren full text, blogs comerciales partial

### Checklist RSS

- [ ] Feed XML bien formado y validado
- [ ] Autodescubrimiento en `<head>`
- [ ] GUIDs únicos y permanentes
- [ ] Fechas en formato RFC 822 o ISO 8601
- [ ] URLs absolutas en todos los recursos
- [ ] Namespace `atom:link` incluido
- [ ] 10-50 items más recientes
- [ ] Contenido completo o resumen estratégico
- [ ] Imágenes con rutas absolutas
- [ ] Cache HTTP configurado
- [ ] Probado en lectores RSS populares

### Performance

- **Preconnect**: Para recursos externos críticos

  ```html
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  ```

- **DNS Prefetch**: Para recursos de terceros

  ```html
  <link rel="dns-prefetch" href="https://analytics.google.com" />
  ```

---

## Herramientas de Testing

### Validación

- **Google Rich Results Test**: Valida structured data
- **Facebook Sharing Debugger**: Verifica Open Graph
- **Twitter Card Validator**: Valida Twitter Cards
- **Schema.org Validator**: Verifica sintaxis JSON-LD

### Auditoría Completa

- **Google Search Console**: Indexación y errores
- **Google Lighthouse**: SEO, performance, accesibilidad
- **Screaming Frog**: Crawling y análisis técnico
- **PageSpeed Insights**: Core Web Vitals

## Core Web Vitals

Métricas clave de Google para la experiencia de usuario:

| Métrica | Objetivo | Descripción |
|---------|----------|-------------|
| **LCP** | < 2.5s | Largest Contentful Paint |
| **FID** | < 100ms | First Input Delay |
| **CLS** | < 0.1 | Cumulative Layout Shift |
| **INP** | < 200ms | Interaction to Next Paint |

---

## Checklist Rápido

### Antes de Lanzar

- [ ] Títulos únicos en cada página
- [ ] Descripciones únicas y atractivas
- [ ] URLs canónicas configuradas
- [ ] Imágenes OG (1200x630px recomendado)
- [ ] JSON-LD sin errores de sintaxis
- [ ] RSS feed funcional
- [ ] Sitemap.xml generado y enviado
- [ ] robots.txt configurado correctamente
- [ ] HTTPS habilitado

### Revisión Continua

- [ ] Core Web Vitals dentro de objetivos
- [ ] Páginas indexadas correctamente
- [ ] Sin errores de rastreo críticos
- [ ] Backlinks monitoreados
- [ ] Contenido actualizado regularmente

---

## Optimizaciones Avanzadas

### Internacionalización

- **hreflang**: Para sitios multiidioma

  ```html
  <link rel="alternate" hreflang="es" href="https://ejemplo.com/es/" />
  <link rel="alternate" hreflang="en" href="https://ejemplo.com/en/" />
  ```

### Structured Data Adicional

- **BreadcrumbList**: Mejora navegación en resultados
- **FAQPage**: Para preguntas frecuentes
- **VideoObject**: Para contenido multimedia
- **Product**: Para e-commerce
- **Organization**: Información corporativa

### Rendimiento

- **Critical CSS**: Inline del CSS crítico
- **Lazy Loading**: Para imágenes y videos
- **Code Splitting**: División de JavaScript
- **CDN**: Para recursos estáticos
- **Compression**: Gzip/Brotli habilitado

---

## Recursos Externos

- [Google SEO Starter Guide](https://developers.google.com/search/docs/beginner/seo-starter-guide)
- [Schema.org Documentation](https://schema.org/docs/documents.html)
- [Web.dev: Core Web Vitals](https://web.dev/vitals/)
- [MDN: SEO Best Practices](https://developer.mozilla.org/en-US/docs/Glossary/SEO)
