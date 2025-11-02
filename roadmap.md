# 🗺️ ansango.dev Roadmap

> Mejoras y nuevas funcionalidades planificadas para el sitio

---

## 🚀 Performance & Optimización

### Cache & Build Optimization
- [x] Configurar Cache-Control headers óptimos en Cloudflare Pages
- [x] Implementar service worker para offline support y PWA
- [x] Auto-rebuild schedule con GitHub Actions (cada 6-12h para música/bookmarks)
- [x] Optimizar build time (análisis de dependencias pesadas)
- [x] Pre-compress assets (gzip/brotli) en build time
- [x] Implementar stale-while-revalidate strategy para assets

### Image Optimization
- [x] Generar automáticamente formatos WebP/AVIF
- [x] Añadir blur placeholders para lazy loading
- [x] Integrar `sharp` para mejor compresión en build
- [x] Optimizar tamaños de imagen responsive

### Bundle Size
- [x] Instalar y configurar `rollup-plugin-visualizer`
- [x] Analizar y optimizar tamaño de bundles
- [x] Code splitting más agresivo
- [x] Tree-shaking de dependencias no usadas


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

#### Music Stats Dashboard
**Página completa de estadísticas musicales en `/music/stats`**

**🪩 1. Encabezado Dinámico (Hero Section)**
- [ ] Título: "🎧 Música"
- [ ] Subtítulo editorial: "Mi banda sonora digital: lo que estoy escuchando, descubriendo y repitiendo"
- [ ] Mini reproductor Now Playing (API Last.fm tiempo real)
- [ ] Dato resumen rápido: "He escuchado X canciones desde YYYY"
- [ ] Fondo dinámico con cover actual borroso o collage de portadas recientes
- [ ] Componente: `HeroNowPlaying.astro` con imagen de fondo blur
- [ ] Actualización en tiempo real con Svelte Islands
- [ ] Efecto soundwave animado en hero

**📈 2. Estadísticas Generales (Overview Cuantitativo)**
- [ ] **Total de scrobbles:** histórico o del mes/semana
  - Visual: número grande + icono 🎧
- [ ] **Tiempo total de escucha:** aproximado (ej: 3000 scrobbles ≈ 10 días)
  - Visual: indicador tipo "reloj musical" ⏱️
- [ ] **Promedio de scrobbles por día:** cuánto escuchas de media
  - Visual: mini gráfico de barras semanales
- [ ] **Día/hora de escucha más activa:** cuándo escuchas más
  - Visual: heatmap o texto tipo "soy más de escuchar por la noche 🌙"
- [ ] **Artista más reproducido:** del mes/año con reproducciones y enlace Last.fm
  - Visual: tarjeta destacada con carátula del artista
- [ ] Componente: `StatsOverview.astro` con grid de stat cards (2-3 columnas)
- [ ] Tarjetas compactas con íconos y colores distintivos
- [ ] Visual: números grandes + micro-gráficos + emojis contextuales

**🧠 3. Comportamiento Musical (Insights de Escucha)**
- [ ] **Géneros más escuchados:** inferidos a partir de tags del artista/álbum
  - Visual: nube de etiquetas o gráfico circular/donut
- [ ] **Tendencia temporal:** comparar artistas o géneros a lo largo de los meses
  - Visual: gráfico de líneas o área
- [ ] **"Artista del descubrimiento":** primer artista escuchado ese mes que no habías escuchado antes
  - Visual: tarjeta "descubrimiento del mes" 🧭
- [ ] **"Artista de confort":** el que más repites, mes tras mes
  - Visual: tarjeta tipo "mi zona segura" 🛋️
- [ ] **Porcentaje de repeticiones vs descubrimientos:** mide si estás explorando o repitiendo
  - Visual: barra comparativa ("80% repeat · 20% new")
- [ ] Texto tipo insight: "Este mes he explorado más indie rock y menos electrónica"
- [ ] Componente: `ListeningHabits.astro` con columnas o slider cards
- [ ] Visualización: Chart.js, Recharts o D3.js para gráficos
- [ ] Layout de insights cards con texto narrativo y emojis

**💿 4. Álbumes y Canciones Destacadas (Editorial)**
- [ ] **Canción más reproducida:** total o del mes
  - Visual: carátula + texto destacado prominente
- [ ] **Álbum más reproducido:** del mes/año con blurb auto-generado
  - Visual: card con fondo del cover (blur o gradient)
- [ ] **Top 5 canciones del mes:** lista con mini portadas
  - Visual: ranking numerado (#1, #2, etc.)
- [ ] **Canción con más días consecutivos escuchada:** "mi obsesión reciente"
  - Visual: tarjeta divertida tipo "en bucle 🎢"
- [ ] **Primer scrobble y último del mes:** marca el inicio y cierre musical
  - Visual: texto tipo "Abrí el mes con X, lo cerré con Y"
- [ ] Implementar `generateAlbumBlurb(album)` para descripción automática
- [ ] Componente: `AlbumsAndSongs.astro` con cards grandes
- [ ] Layout: carátulas + texto editorial descriptivo + emojis
- [ ] Links a Last.fm/Spotify para cada álbum/canción

**🔥 5. Curiosidades & Highlights (Sección Divertida)**
- [ ] **"Artista que desapareció y volvió":** escuchado hace mucho y vuelve a sonar
  - Visual: tarjeta "comeback del mes" 🔙
- [ ] **"Top descubrimiento random":** canción escuchada solo una vez pero diferente
  - Visual: mini sección curiosa con icono 🎲
- [ ] **"Compatibilidad con tus meses anteriores":** grado de cambio de gustos
  - Visual: gráfico de radar o porcentaje de similitud
- [ ] **"Energía promedio del mes":** si enriqueces datos con Spotify Audio Features
  - Visual: indicador tipo termómetro 🎚️ o barra de energía
  - Muestra si escuchas más chill o energético
- [ ] **"Canción más saltada":** ideal si trackeas eventos manuales (opcional)
  - Visual: icono de 🚫 o 😂 con humor
- [ ] Componente: `Highlights.astro` con badges y frases divertidas
- [ ] Visual: emojis, barras animadas, texto tipo "Mi mes fue 73% más electrónico"
- [ ] Tarjetas de curiosidades con colores vibrantes y diseño lúdico

**🎧 6. Historial Reciente (Recently Played)**
- [ ] Últimas 10-20 canciones escuchadas
- [ ] Mostrar: carátula, artista, título, hora/dispositivo
- [ ] Scroll horizontal o tabla compacta con covers
- [ ] Componente: `RecentlyPlayed.astro` lista o carrusel
- [ ] Enlace "Ver todo en Last.fm" al final
- [ ] Actualización en tiempo real (opcional, con polling)

**🪄 7. Editorial / Resumen del Mes (Narrativo)**
- [ ] Bloque de texto narrativo tipo bitácora musical
- [ ] Ejemplo: "Este mes he vuelto a obsesionarme con la producción nostálgica de los 2000..."
- [ ] Puede ser auto-generado con IA o escrito manualmente
- [ ] Mencionar: álbum favorito, descubrimientos, tema en bucle
- [ ] Componente: `MonthlySummary.astro` con párrafo editorial
- [ ] Incluir fecha de actualización del resumen

**💫 8. Pie Musical (Footer de Sección)**
- [ ] Fecha última actualización: "Datos actualizados el DD de MMM"
- [ ] Enlaces a: Last.fm / Spotify / MusicBrainz
- [ ] Frase de cierre: "Cada scrobble cuenta una historia" o similar
- [ ] Créditos a APIs utilizadas

**🔧 Infraestructura Técnica**
- [ ] Script `/src/scripts/updateLastfmData.js` para cache pre-build
- [ ] Guardar datos en `/src/content/music.json` (opcional)
- [ ] Prerenderizar info estática con `Astro.fetchContent` o server load
- [ ] Endpoint API `/api/music/stats` para datos dinámicos
- [ ] Rate limiting y error handling para Last.fm API
- [ ] Fallback cuando API no disponible
- [ ] TypeScript types para todos los datos de música

**🎨 Mejoras Visuales y UX**
- [ ] Animaciones smooth entre secciones (scroll fluido)
- [ ] Skeleton loaders mientras cargan stats
- [ ] Transiciones entre estados (cargando → datos)
- [ ] Responsive design optimizado para móvil
- [ ] Dark/light mode para todos los componentes
- [ ] Hover effects en cards de álbumes/canciones
- [ ] Loading states para Now Playing en tiempo real
- [ ] Tooltips explicativos en métricas complejas

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

#### Recomendador de Artículos (Content Recommender)
- [ ] Sistema de recomendaciones basado en tags comunes
- [ ] Algoritmo por similaridad de contenido (TF-IDF)
- [ ] Recomendaciones por categoría/colección
- [ ] "Artículos que también te pueden interesar" en sidebar
- [ ] Tracking de artículos más leídos juntos
- [ ] Recomendaciones personalizadas (localStorage)
- [ ] Widget de "Artículos populares" en home
- [ ] Algoritmo híbrido (tags + contenido + popularidad)
- [ ] Excluir artículo actual de recomendaciones
- [ ] Límite configurable (3-6 artículos sugeridos)

#### Reading Progress Bar
- [ ] Barra de progreso en top de página
- [ ] Animación smooth
- [ ] Responsive design
- [ ] Guardar posición de lectura (localStorage)
- [ ] Indicador de tiempo restante

#### Navegación Entre Entradas (Entry Navigation)
- [ ] Botones prev/next al final de cada entrada
- [ ] Navegación entre entradas de blog (cronológico)
- [ ] Navegación entre proyectos (alfabético o por fecha)
- [ ] Navegación en wiki (según estructura de árbol)
- [ ] Mostrar título de entrada anterior/siguiente
- [ ] Atajos de teclado (← →) para navegar
- [ ] Responsive design para móviles
- [ ] Transiciones suaves entre páginas

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
