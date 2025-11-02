# 🗺️ ansango.dev Roadmap

> Mejoras y nuevas funcionalidades planificadas para el sitio

---

## 🚀 Performance & Optimización

### Cache & Build Optimization
- [x] Configurar Cache-Control headers óptimos en Cloudflare Pages
- [ ] Implementar service worker para offline support y PWA
- [ ] Auto-rebuild schedule con GitHub Actions (cada 6-12h para música/bookmarks)
- [ ] Optimizar build time (análisis de dependencias pesadas)
- [ ] Pre-compress assets (gzip/brotli) en build time
- [ ] Implementar stale-while-revalidate strategy para assets

### Image Optimization
- [ ] Generar automáticamente formatos WebP/AVIF
- [ ] Añadir blur placeholders para lazy loading
- [ ] Integrar `sharp` para mejor compresión en build
- [ ] Optimizar tamaños de imagen responsive

### Bundle Size
- [ ] Instalar y configurar `rollup-plugin-visualizer`
- [ ] Analizar y optimizar tamaño de bundles
- [ ] Code splitting más agresivo
- [ ] Tree-shaking de dependencias no usadas

---

## 🧪 Testing & Quality

### Unit Tests
- [ ] Configurar Vitest + Testing Library
- [ ] Tests para `utils.ts` (slugify, formatDate, etc.)
- [ ] Tests para `collections.ts` helpers
- [ ] Tests para `tree-node.ts` functions
- [ ] Coverage mínimo del 80%

### Component Tests
- [ ] Tests para componentes Svelte (PlayNow, PlayNowMini)
- [ ] Tests para componentes Astro críticos
- [ ] Visual regression tests

### Integration Tests
- [ ] Tests de integración con Last.fm API
- [ ] Tests de integración con Raindrop API
- [ ] Mock de APIs externas
- [ ] Tests de caché y rate limiting

### E2E Tests
- [ ] Configurar Playwright
- [ ] Tests de navegación principal
- [ ] Tests de búsqueda (Pagefind)
- [ ] Tests de dark/light mode
- [ ] Tests de formularios y acciones

---

## 🔒 Seguridad & Best Practices

### Content Security Policy
- [ ] Implementar CSP headers
- [ ] Configurar nonces para scripts inline
- [ ] Whitelist de dominios externos
- [ ] Reportar violaciones de CSP

### Rate Limiting
- [ ] Rate limiter para Last.fm API
- [ ] Rate limiter para Raindrop API
- [ ] Backoff exponencial en errores
- [ ] Queue system para requests

### Security Headers
- [ ] X-Frame-Options
- [ ] X-Content-Type-Options
- [ ] Referrer-Policy
- [ ] Permissions-Policy

---

## 📱 Nuevas Funcionalidades

### 🌟 Features de Alto Impacto

#### Sistema de Comentarios
- [ ] Integrar Giscus (GitHub Discussions)
- [ ] Configurar categorías de discusión
- [ ] Modales para comentarios
- [ ] Notificaciones de nuevos comentarios
- **Alternativa:** Implementar Webmentions

#### Search Mejorado
- [ ] Filtros por fecha en Pagefind
- [ ] Filtros por tags
- [ ] Filtros por colección
- [ ] Filtros por tiempo de lectura
- [ ] Ordenamiento de resultados (relevancia, fecha, etc.)
- [ ] Historial de búsquedas

#### Analytics Dashboard
- [ ] Página `/stats` pública
- [ ] Integración con GoatCounter API
- [ ] Top posts más visitados
- [ ] Tendencias de visitas (gráficos)
- [ ] Estadísticas por colección
- [ ] Exportar datos en CSV/JSON

#### Newsletter/RSS Features
- [ ] RSS por tag individual
- [ ] RSS por colección
- [ ] Full-text RSS (opcional)
- [ ] RSS con imágenes optimizadas
- [ ] Integración con Buttondown/ConvertKit

#### Related Posts
- [ ] Algoritmo de similitud basado en tags
- [ ] Mostrar 3-5 posts relacionados
- [ ] Cache de relaciones
- [ ] Fallback a posts recientes
- [ ] Widget en sidebar o footer de artículos

#### Reading Progress Bar
- [ ] Barra de progreso en top de página
- [ ] Animación smooth
- [ ] Responsive design
- [ ] Guardar posición de lectura (localStorage)
- [ ] Indicador de tiempo restante

#### Estadísticas de Contenido
- [ ] Dashboard interno `/admin/stats`
- [ ] Total de palabras escritas
- [ ] Posts por mes/año (gráfico)
- [ ] Tags más usados (nube de palabras)
- [ ] Tiempo promedio de lectura
- [ ] Gráfico de crecimiento de contenido

#### Dark/Light Mode Avanzado
- [ ] Preferencia por página (localStorage)
- [ ] Auto-switching basado en hora
- [ ] Modo "system" mejorado
- [ ] Transiciones suaves entre modos
- [ ] Preview de ambos modos

#### Bookmarks Import Tool
- [ ] CLI para importar desde Chrome
- [ ] CLI para importar desde Firefox
- [ ] CLI para importar desde Pocket
- [ ] Validación y deduplicación
- [ ] Preservar tags y fechas

#### Wiki Graph Visualization
- [ ] Network graph con D3.js o Cytoscape
- [ ] Visualización de conexiones entre páginas
- [ ] Nodos clickeables para navegación
- [ ] Filtros por categoría
- [ ] Zoom y pan interactivo
- [ ] Export como imagen

---

## 🔧 Developer Experience

### Pre-commit Hooks
- [ ] Instalar Husky
- [ ] Configurar lint-staged
- [ ] Pre-commit: format + lint
- [ ] Pre-commit: type-check
- [ ] Pre-commit: run tests
- [ ] Pre-push: build check

### Better Scripts
- [ ] `npm run test` - Vitest
- [ ] `npm run test:ui` - Vitest UI
- [ ] `npm run test:coverage` - Coverage report
- [ ] `npm run lint` - ESLint
- [ ] `npm run type-check` - Type checking
- [ ] `npm run analyze` - Bundle analysis
- [ ] `npm run clean` - Clean build artifacts

### TypeScript Strict Mode
- [ ] Habilitar `strict: true`
- [ ] `noUncheckedIndexedAccess: true`
- [ ] `noImplicitReturns: true`
- [ ] `noFallthroughCasesInSwitch: true`
- [ ] Resolver todos los errores de tipo

### Development Tools
- [ ] Configurar ESLint con reglas estrictas
- [ ] Prettier config más específica
- [ ] EditorConfig para consistencia
- [ ] VSCode workspace settings
- [ ] Debugging configuration

---

## 📚 Content Features

### Drafts System
- [ ] Añadir `draft: boolean` a frontmatter
- [ ] Ocultar drafts en producción
- [ ] Mostrar drafts en dev mode
- [ ] Preview URLs para drafts
- [ ] Lista de drafts en dashboard

### Series/Multi-part Posts
- [ ] Esquema para series en frontmatter
- [ ] Navegación entre partes de serie
- [ ] Índice de serie completa
- [ ] Auto-linking de posts relacionados
- [ ] Badge visual de "Serie"

### Table of Contents
- [ ] Auto-generar TOC desde headings
- [ ] TOC sticky en sidebar
- [ ] Highlight de sección actual
- [ ] Smooth scroll a secciones
- [ ] Colapsable/expandible

### Estimated Read Date
- [ ] Calcular basado en palabras por minuto
- [ ] Personalizable por usuario
- [ ] "Puedes terminar esto en X minutos"
- [ ] Mostrar en card de preview

### Content Scheduling
- [ ] Publicación programada (date future)
- [ ] Preview de contenido futuro
- [ ] Notificación al publicar
- [ ] Queue de publicaciones

---

## 🎨 UI/UX Improvements

### Skeleton Loaders
- [ ] Skeleton para PlayNow mientras carga
- [ ] Skeleton para bookmarks
- [ ] Skeleton para listas de posts
- [ ] Animaciones smooth

### Toasts/Notifications
- [ ] Integrar `svelte-sonner` o similar
- [ ] Toast para "URL copiada"
- [ ] Toast para "Guardado"
- [ ] Toast para errores
- [ ] Toast customizable

### Command Palette (⌘K)
- [ ] Integrar `cmdk-sv` o `ninja-keys`
- [ ] Quick search de contenido
- [ ] Navegación rápida
- [ ] Shortcuts de teclado
- [ ] Acciones rápidas (cambiar tema, etc.)

### Print Styles
- [ ] CSS optimizado para impresión
- [ ] Ocultar navegación en print
- [ ] QR code para URL en footer
- [ ] Table of contents en primera página

### Accessibility Improvements
- [ ] Audit completo de ARIA labels
- [ ] Keyboard navigation mejorada
- [ ] Focus visible en todos los elementos
- [ ] Skip to content link
- [ ] Contrast ratio AAA

### Micro-interactions
- [ ] Animaciones hover sutiles
- [ ] Loading states mejorados
- [ ] Transiciones de página
- [ ] Easter eggs divertidos

---

## 🔄 Automation & CI/CD

### GitHub Actions CI
- [ ] Crear workflow de CI
- [ ] Run tests on PR
- [ ] Type checking
- [ ] Linting
- [ ] Build check
- [ ] Deploy preview environments

### Scheduled Rebuilds
- [ ] Workflow para rebuild automático (2x/día)
- [ ] Manual trigger con workflow_dispatch
- [ ] Notificaciones de builds fallidos
- [ ] Cache de node_modules entre builds
- [ ] Invalidación de CDN después de deploy

### Lighthouse CI
- [ ] Integrar Lighthouse CI
- [ ] Performance budgets
- [ ] Fallar CI si performance baja
- [ ] Reportes automáticos
- [ ] Tracking de métricas en el tiempo

### Dependency Management
- [ ] Configurar Renovate o Dependabot
- [ ] Auto-merge de patches seguros
- [ ] Grouped updates
- [ ] Security updates prioritarias

### Automated Releases
- [ ] Semantic versioning
- [ ] Changelog automático
- [ ] Release notes
- [ ] Git tags

---

## 📊 Monitoring & Analytics

### Error Tracking
- [ ] Integrar Sentry
- [ ] Source maps en producción
- [ ] Error boundaries
- [ ] User feedback en errores
- [ ] Alertas de errores críticos

### Performance Monitoring
- [ ] Web Vitals tracking
- [ ] Custom metrics
- [ ] Real User Monitoring (RUM)
- [ ] Performance budgets
- [ ] Alertas de degradación

### Uptime Monitoring
- [ ] UptimeRobot o Better Uptime
- [ ] Status page pública
- [ ] Notificaciones de downtime
- [ ] Incident management

### Custom Analytics
- [ ] Track eventos específicos
- [ ] Conversion funnels
- [ ] A/B testing capability
- [ ] Heatmaps (opcional)

---

## 🎯 Prioridades de Implementación

### 🔥 Phase 1 - Quick Wins (1-2 semanas)

**Crítico:**
1. ✅ Tests básicos (Vitest setup + tests de utils)
2. ✅ Pre-commit hooks (Husky + lint-staged)
3. ✅ GitHub Actions CI/CD
4. ✅ Related posts feature
5. ✅ Reading progress bar

**Valor alto, esfuerzo bajo:**
- Skeleton loaders
- Toasts/notifications
- Better scripts en package.json
- Print styles básicos

### 🌟 Phase 2 - Core Features (3-4 semanas)

**Features principales:**
1. Sistema de comentarios (Giscus)
2. Search filters mejorados
3. Analytics dashboard
4. Drafts system
5. Table of Contents auto-generado

**Developer Experience:**
- TypeScript strict mode
- ESLint configuración
- Component tests

### 🚀 Phase 3 - Advanced Features (1-2 meses)

**Features avanzadas:**
1. Wiki graph visualization
2. Newsletter integration
3. Command palette (⌘K)
4. Series/multi-part posts
5. Bookmarks import tool

**Performance:**
- Scheduled rebuild automation
- Image optimization avanzada
- Bundle size optimization
- Service worker & PWA implementation

### 📈 Phase 4 - Polish & Scale (ongoing)

**Optimización continua:**
- E2E tests completos
- Performance monitoring
- Error tracking
- A/B testing
- Content scheduling
- Accessibility audit completo

---

## 📝 Notas

### Decisiones Técnicas Pendientes

- [x] **Output mode:** Mantener `static` - SSG es perfecto para este caso de uso
- [ ] **Testing library:** ¿Vitest + Testing Library o alternativa?
- [ ] **Comments:** ¿Giscus, Webmentions, o ambos?
- [ ] **Newsletter:** ¿Buttondown, ConvertKit, o self-hosted?
- [ ] **Error tracking:** ¿Sentry (paid) o alternativa open-source?
- [ ] **Rebuild frequency:** ¿Cada 6h, 12h, o manual trigger solamente?

### Métricas de Éxito

- **Performance:** Lighthouse score > 95 en todas las categorías
- **Quality:** Test coverage > 80%
- **SEO:** Top 10 en búsquedas relevantes
- **Engagement:** Bounce rate < 40%
- **Accessibility:** WCAG AAA compliance

### Recursos Necesarios

- **Time:** ~200-300 horas para completar todo
- **Budget:** Servicios pagos opcionales (Sentry, analytics premium)
- **Tools:** GitHub Actions (free tier suficiente)

---

## 🤝 Contribuciones

Si quieres contribuir a alguna de estas features:

1. Abre un issue discutiendo la implementación
2. Fork el repositorio
3. Crea una branch: `feature/nombre-feature`
4. Implementa con tests
5. Abre un PR con descripción detallada

---

**Última actualización:** 2 de noviembre, 2025
