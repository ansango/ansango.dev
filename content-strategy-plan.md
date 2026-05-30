# Plan Estratégico de Contenido para ansango.dev

> Análisis exhaustivo y plan de acción para reorganizar, consolidar y elevar la calidad del blog, wiki y proyectos.

---

## 1. Diagnóstico General

### 1.1 Métricas de contenido actual

| Colección | Archivos | Publicados | Borradores / Ocultos | Problemas críticos |
|-----------|----------|------------|----------------------|-------------------|
| **Blog**  | 10       | 10         | 0                    | Desigualdad de calidad, inconsistencia de tono, fechas dispersas |
| **Wiki**  | ~100     | ~85        | ~15                  | Fragmentación extrema, duplicación, contenido esqueleto, profundidad desigual |
| **Projects**| 6      | 6          | 0                    | Descripciones genéricas, falta de resultados/medidas |
| **Páginas fijas** | 4 | 4         | 0                    | OK, pero `now.md` necesita actualización frecuente |

### 1.2 Problemas transversales detectados

1. **Duplicación de contenido**: Existen múltiples "resúmenes" que se solapan (`resumen de Javascript` vs `javascript.md`, `resumen de arrays` vs `métodos de arrays`, `resumen de mongodb` vs `mongodb.md`).
2. **Fragmentación excesiva**: Temas que podrían ser una guía completa están partidos en 2-5 notas de 100-300 palabras (caso React, caso Arch Linux instalación, caso pacman/yay).
3. **Contenido esqueleto / placeholder**: Archivos con `description: description`, sin contenido real o con solo enlaces sin curar (`javascript.md` tiene enlaces sin explicar y notas tipo "REVISAR ESTE").
4. **Inconsistencia de frontmatter**: Fechas `mod` que no reflejan cambios reales, tags desordenados, descripciones genéricas o vacías.
5. **Enlaces internos rotos o ambiguos**: Se usan wikilinks de Obsidian que no siempre se resuelven correctamente en Astro (ej. `[[node]]`, `[[deno]]` que no existen como archivos).
6. **Tono y estilo desigual**: Algunos posts son conversacionales y personales (`Hello World`, `Astro feat Svelte`), otros son manuales técnicos secos (`Configurar Ubuntu`), y otros son chuletas mecánicas (`Resumen de arrays`).
7. **Contenido obsoleto**: Guías de instalación para versiones antiguas (Ubuntu 22.04 mencionado como actual, `create-react-app` en la wiki de React, Robo 3T en lugar de Studio 3T / MongoDB Compass).
8. **Falta de narrativa**: Los proyectos carecen de "storytelling" (por qué se hizo, qué se aprendió, qué falló).

---

## 2. Análisis por Colección

### 2.1 Blog (10 posts)

| Post | Calidad | Tono | Estado | Veredicto |
|------|---------|------|--------|-----------|
| Hello World | ⭐⭐⭐ | Personal/Intro | Base | ✅ Mantener como pieza fundacional, actualizar "aún me quedan cosas" |
| Anatomía de Headers HTTP | ⭐⭐⭐⭐⭐ | Ensayo técnico | Obra maestra | ✅ **Referente de calidad**. Serie de "Arquitectura Web" |
| Proteger Node.js en prod | ⭐⭐⭐⭐ | Manual | Sólido | ✅ Serie "Seguridad Web" |
| Astro feat Svelte | ⭐⭐⭐⭐ | Opinión/Técnico | Fresco | ✅ Serie "Stack & Arquitectura" |
| Buenas prácticas con IA | ⭐⭐⭐⭐ | Opinión/Ponencia | Bueno | ✅ Serie "Ingeniería de Software" |
| Vue 3 + TanStack Query | ⭐⭐⭐ | Tutorial | Medio | ⚠️ **Fusionar/expandir** en "Guía de TanStack Query" multi-framework |
| Empezando con Go | ? | ? | No leído en esta revisión | Revisar |
| Headless CMS y JavaScript | ? | ? | No leído | Revisar |
| Automatizar Directus en desarrollo | ? | ? | No leído | Revisar |
| Anatomía de headers (duplicado wiki) | - | - | Duplicado | ❌ Unificar con el post del blog |

**Problema del blog**: Hay solo 10 posts en más de un año. La frecuencia es baja y el nicho oscila entre opinión arquitectónica y tutoriales puntuales. Falta una **línea editorial clara**.

### 2.2 Wiki (~100 notas)

#### 2.2.1 Development (Frontend / JavaScript / React)

**Problema grave**: React está partido en 8 notas pequeñas que parecen notas de estudio de FreeCodeCamp, no una wiki profesional.

- `introduccion a react.md` + `javascript para react - parte 1/2` + `class components` + `functional components` + `hooks` + `router.md` + `context-api.md` + `conceptos avanzados.md`
- **Veredicto**: Unificar en **una guía completa de React** o una **serie de 3 posts** en el blog (Introducción, Hooks & Patterns, Router & Estado Global). Eliminar las notas sueltas de la wiki o convertirlas en anexos.

**JavaScript**:
- `javascript.md`: Es un índice roto con enlaces sin curar y notas tipo "REVISAR ESTE". **Eliminar o reescribir** como "Guía de recursos JavaScript" curada.
- `resumen de Javascript.md`: Chuleta masiva de FreeCodeCamp. **Mover a `cheatsheets/javascript.md`** y reducir a lo esencial + ejemplos propios.
- `resumen de arrays.md` + `métodos de arrays.md` + `explicando array reduce.md` + `trucos con spread.md`: **Unificar** en una sola cheatsheet "Arrays en JavaScript".
- `fetch api.md` + `usando ajax con async await.md`: **Fusionar** en "Fetching Data en JavaScript".
- `libros.md` + `librerias.md`: **Fusionar** en "Recursos JavaScript".

**MongoDB**:
- `mongodb.md` (publicado: false, solo enlaces) + `resumen de mongodb.md` (chuleta gigante). **Unificar** en una cheatsheet MongoDB.

#### 2.2.2 Home Lab & Self-Hosted

**Problema**: Es la sección más grande y caótica. Hay una estructura de carpetas profunda pero muchas notas son solo una descripción de 2 líneas + enlace.

- `home lab.md`: Índice general OK, pero los enlaces internos a veces usan rutas de Obsidian no resolubles.
- **Self-Hosted / Apps individuales**: ~30 notas de 1 párrafo cada una (Portainer, Dockge, Traefik, etc.).
- **Veredicto**: Las notas de 1 párrafo no aportan valor como wiki pública. Opciones:
  1. **Expandirlas** a guías de instalación propias con docker-compose y tips.
  2. **Fusionarlas** en guías temáticas: "Stack de Media" (Jellyfin + qBittorrent + Gonic), "Stack de Seguridad" (Vaultwarden + Duplicati), "Stack de Red" (Pi-hole + AdGuard + Traefik).
  3. **Mover a un sistema de bookmarks** (Raindrop ya está integrado en el sitio). Los servicios que no tengas guía propia, linkearlos en Raindrop con tag `selfhosted`.

#### 2.2.3 Sistemas Operativos

**Arch Linux**:
- 3 notas de instalación + 6 de pacman + 6 de yay = 15 notas para un proceso que es lineal.
- **Veredicto**: Convertir en **una guía serializada** (Serie "Instalación de Arch Linux") de 3-4 capítulos, o un script/documento único. Eliminar las notas sueltas.

**Ubuntu**:
- `configurar ubuntu.md`: Guía de instalación de software básica (Git, zsh, NVM, MongoDB). Está bien pero mezcla demasiado: utilidades, dev tools, drivers, settings de UI.
- **Veredicto**: Dividir en "Ubuntu para Desarrolladores" (dev tools) y "Ubuntu Post-Install" (UI tweaks). Eliminar `instalar mongodb y robo3T` (obsoleto, Robo 3T está abandonado).

**Debian**:
- `diagnostico de problemas de red.md` vs `cheat diagnostico network.md`. **Fusionar**.
- **Veredicto**: Mantener las guías de diagnóstico, son útiles y específicas.

**Proxmox**:
- 7 notas. Índice (`proxmox.md`) + instalación + VMs + CTs + red + storage + permisos.
- **Veredicto**: Convertir en **Serie "Proxmox desde cero"** de 4 partes (Instalación, Red/Almacenamiento, VMs, CTs/LXC). Fusionar las 2 notas de red/networking.

**TrueNAS**:
- 4 notas cortas. **Fusionar** en una guía única "TrueNAS Scale: Primeros pasos".

#### 2.2.4 Tooling

**Docker**:
- 5 notas: `docker.md`, `docker compose.md`, `composerize.md`, `instalar docker en linux.md`, `instalar docker en mac.md`.
- **Veredicto**: Fusionar instalaciones en "Instalar Docker". `docker.md` y `docker compose.md` unificar en "Guía Docker & Compose". `composerize` como apéndice o eliminar si no se usa.

**Git**:
- 4 notas: alias, config usuario, credenciales, lista de comandos.
- **Veredicto**: Unificar en una **cheatsheet Git** o **Serie "Git para sobrevivir"** de 2 partes (Configuración + Flujo de trabajo). La nota "lista de commands" usa un repo ajeno en los ejemplos (`susannalles/MinimalEditions`), debería usar un repo propio o genérico.

**Terminal**:
- 5 notas de comandos esenciales Linux.
- **Veredicto**: Unificar en una **mega-cheatsheet "Terminal Linux"** o dividir en "Gestión de archivos", "Procesos y sistema", "Redes".

#### 2.2.5 Web

- `cloudflare tunnels.md`: Guía corta pero útil. Expandir con tips de seguridad.
- `cache control header.md` + `automatizacion de headers csp y cache control.md`: **Fusionar** con el post del blog. La wiki debería tener la guía práctica, el blog la reflexión arquitectónica.
- `guia seo checklist.md`: No leída. Si es una lista, convertir en checklist interactivo o publicarla.

#### 2.2.6 Apps

- **Obsidian**: 3 notas (`clipper`, `configurar llama`, `crear un plugin`). `clipper.md` es un bookmarklet gigante que ralentiza el build y es difícil de mantener. **Mover el código a un Gist de GitHub** y enlazarlo. `crear un plugin` y `configurar llama`: mantener si son guías propias.
- **Música**: `beets.md`, `rythmbox.md`, `yt-dpl.md`. Si no son guías propias detalladas, **mover a bookmarks**.
- **Navegadores**: `tidy reader.md`, `tidy url.md`. Si son extensiones propias, documentar como proyectos. Si no, eliminar o mover a bookmarks.

#### 2.2.7 Documentación y Manuales

- **Kindle**: `downgrade-kindle-pw.md` + `jailbreak-pw.md`. `jailbreak-pw.md` está en `published: false` y es copy-paste de Mobileread. **Eliminar o reescribir** desde cero si es un proceso que hiciste tú. Si no, linkear a la fuente original.
- **GMK 67**: `manuales/gmk-67.md`. Si es un manual de teclado, mantener como nota rápida o expandir con tu experiencia de modding.

---

## 3. Propuesta de Reorganización

### 3.1 Nueva arquitectura de carpetas (wiki)

```
src/content/wiki/
├── index.md                 # Índice visual de la wiki, con búsqueda y categorías
├── README.md                # Cómo contribuir / usar la wiki
|
├── dev/                     # DESARROLLO (unificado)
│   ├── javascript/
│   │   ├── index.md         # Guía curada de recursos
│   │   ├── arrays-cheatsheet.md
│   │   ├── async-data-fetching.md
│   │   └── regex-cheatsheet.md
│   ├── react/
│   │   └── (serie migrada al blog o guía única aquí)
│   ├── astro/
│   ├── nodejs/
│   └── mongodb/
│       └── cheatsheet.md    # Fusión de resumen + índice
|
├── homelab/                 # HOME LAB (consolidado)
│   ├── index.md             # Filosofía y stack actual
│   ├── proxmox/
│   │   └── serie-4-partes   # O guía única larga
│   ├── networking/
│   │   ├── vpn-wireguard.md
│   │   ├── cloudflare-tunnels.md
│   │   └── adguard-vs-pihole.md   # Comparativa propia
│   └── selfhosted-stacks/
│       ├── media-stack.md   # Jellyfin + qBit + Gonic + Booklore
│       ├── security-stack.md # Vaultwarden + Duplicati
│       └── dev-stack.md     # Gitea + Docmost + CI/CD
│
├── sysadmin/                # SISTEMAS
│   ├── linux/
│   │   ├── terminal-cheatsheet.md   # Fusión de las 5 notas
│   │   ├── debian-network-troubleshooting.md
│   │   └── arch-install-guide.md    # Serie consolidada
│   └── docker/
│       └── docker-and-compose.md    # Fusión
│
└── web/                     # WEB / INFRA
    ├── csp-cache-headers.md         # Fusión blog-wiki
    └── nginx-letsencrypt.md
```

**Regla de oro**: Si una nota tiene menos de 300 palabras y no es una chuleta densa de código, debe fusionarse con otra o eliminarse.

### 3.2 Series recomendadas (blog)

Migrar contenido de wiki profundo al blog en formato serie para mejor SEO y narrativa:

1. **"Arquitectura Web Defensiva"** (3 partes)
   - Parte 1: CSP y Headers de Seguridad (ya existe, expandir)
   - Parte 2: Cache Control y Performance (ya existe, expandir)
   - Parte 3: Cloudflare Tunnels + VPN como capa de red

2. **"Proxmox: Tu Data Center en Casa"** (4-5 partes)
   - Migrar las notas sueltas de wiki a posts serializados con screenshots propios.

3. **"React Desde Cero"** (3 partes)
   - Fundamentos + Hooks + Patterns Avanzados. Migrar de wiki a blog.

4. **"JavaScript: Más Allá del Tutorial"**
   - Arrays, Async, Regex como posts individuales con ejemplos reales de proyectos propios.

5. **"Stack Comparisons"**
   - Astro vs SvelteKit vs Next.js (ya existe, convertir en serie con más profundidad)

---

## 4. Plan de Eliminación / Deprecación

### 4.1 Wikis a eliminar (sin remordimiento)

| Archivo | Razón | Acción |
|---------|-------|--------|
| `wiki/development/javascript/javascript.md` (índice roto) | Enlaces sin curar, notas tipo "REVISAR", contenido esqueleto | Eliminar. Reemplazar por `dev/javascript/index.md` curado. |
| `wiki/development/backend/mongodb/mongodb.md` (published:false) | Solo un enlace a awesome-mongodb y un wikilink | Eliminar. Fusionar con `resumen de mongodb.md`. |
| `wiki/apps/navegadores/tidy reader.md` | No se sabe qué es, 2 líneas probablemente | Eliminar o mover a bookmarks Raindrop. |
| `wiki/apps/navegadores/tidy url.md` | Ídem | Eliminar o mover a bookmarks Raindrop. |
| `wiki/apps/musica/rythmbox.md` | Si no es guía propia detallada | Eliminar o mover a bookmarks. |
| `wiki/documentacion y manuales/kindle/jailbreak-pw.md` (published:false) | Copy-paste de Mobileread, no aporta valor propio | Eliminar. Linkear a la guía original si es necesario. |
| `wiki/sistemas/ubuntu/instalar mongodb y robo3T.md` | Robo 3T está abandonado desde ~2020 | Eliminar o reescribir con MongoDB Compass /mongosh. |
| `wiki/sistemas/ubuntu/restaurar drivers nvidia.md` | Si es un one-liner o workaround antiguo | Evaluar. Fusionar en "Ubuntu Post-Install". |
| `wiki/sistemas/ubuntu/restaurar touchpad.md` | Ídem | Fusionar en "Ubuntu Post-Install". |
| `wiki/sistemas/arch-linux/instalar snap.md` | Snap en Arch es marginal, y ya existe `instalar flutter.md` como el único caso de uso | Fusionar con Flutter o eliminar. |
| `wiki/sistemas/arch-linux/aplicaciones recomendadas.md` | Lista sin curar | Convertir en página de bookmarks o eliminar. |
| `wiki/sistemas/ubuntu/aplicaciones.md` | Lista de apps sin contexto | Fusionar en "Ubuntu Post-Install". |
| `wiki/sistemas/ubuntu/+recursos.md` | Enlaces sueltos | Fusionar en índice de recursos o eliminar. |

### 4.2 Wikis a fusionar (unificación masiva)

| Grupo | Notas actuales | Nueva entidad |
|-------|---------------|---------------|
| JavaScript Arrays | `resumen de arrays`, `métodos de arrays`, `explicando array reduce`, `trucos con spread` | `dev/javascript/arrays-cheatsheet.md` |
| JavaScript Async | `fetch api`, `usando ajax con async await` | `dev/javascript/async-data-fetching.md` |
| Git | `alias en git`, `configurar un usuario`, `credenciales`, `lista de comandos` | `dev/tooling/git-cheatsheet.md` o serie blog |
| Docker | `docker.md`, `docker compose.md`, `instalar docker en linux`, `instalar docker en mac` | `sysadmin/docker-guide.md` |
| Proxmox | `instalacion`, `configuracion-red`, `configuracion-almacenamiento`, `crear-contenedores`, `crear-maquinas-virtuales`, `permisos de disco en lxc`, `proxmox lxc networking` | Serie blog o `homelab/proxmox-guide.md` |
| Arch Instalación | 3 notas de instalación | `sysadmin/arch-install-guide.md` |
| Pacman | 3 notas | Sección dentro de Arch Guide |
| Yay | 5 notas | Sección dentro de Arch Guide |
| Ubuntu Config | `configurar ubuntu`, `aplicaciones`, `+recursos`, `instalar firefox developer`, `restaurar drivers nvidia`, `restaurar touchpad` | `sysadmin/ubuntu-developer-setup.md` |
| Debian Net | `cheat diagnostico network`, `diagnostico de problemas de red` | `sysadmin/debian-network-troubleshooting.md` |
| TrueNAS | 4 notas | `homelab/truenas-guide.md` |
| Terminal | 5 notas de comandos esenciales | `sysadmin/terminal-cheatsheet.md` |
| React Wiki | 8 notas sueltas | Serie blog "React Desde Cero" o guía única `dev/react/complete-guide.md` |

---

## 5. Estrategia de Tags y Taxonomía

### 5.1 Problema actual

Los tags son inconsistentes: mezclan tecnología (`astro`), concepto (`security`), tipo de contenido (`cheatsheet` no existe, pero debería), y acción (`fix`). Hay tags con typos (`tag` en el post de Vue 3) y tags excesivamente granulares que generan nubes de tags de 1 elemento.

### 5.2 Taxonomía propuesta (máx. 5 tags por entrada)

Usar un sistema de **3 capas**:

1. **Dominio** (obligatorio, 1-2): `development`, `homelab`, `sysadmin`, `web`, `personal`
2. **Tecnología** (1-2): `astro`, `react`, `docker`, `proxmox`, `javascript`
3. **Formato** (1): `tutorial`, `opinion`, `cheatsheet`, `serie`, `project`

**Tags a eliminar/renombrar**:
- `tag` (error en Vue 3 post) → quitar
- `code`, `ia-engineering` → estandarizar
- `fix` → `troubleshooting`
- `3d-printer`, `bambulab`, `keyboards` en posts técnicos → si es relevante para el post, OK; si no, mover a `personal` o `uses`

---

## 6. Calidad y Estilo

### 6.1 Guía de estilo recomendada

1. **Longitud mínima**: Blog posts >= 800 palabras. Wiki guides >= 400 palabras. Cheatsheets pueden ser densas de código pero deben tener introducción y conclusiones.
2. **Estructura obligatoria** para posts:
   - Hook (por qué leer esto)
   - Contexto / Prerrequisitos
   - Desarrollo (con subtítulos claros)
   - Conclusión / TL;DR
   - Links relacionados (posts internos + externas curadas)
3. **Voz**: Mantener el tono conversacional-experto de "Anatomía de Headers HTTP" y "Astro feat Svelte". Evitar el tono de manual de usuario genérico (caso `Configurar Ubuntu`).
4. **Código**: Todo bloque de código debe ser copiable y funcional. Si usa variables del usuario, marcarlas con `<TU_VARIABLE>`.
5. **Imágenes**: Todas las imágenes deben tener texto alternativo descriptivo. Los diagramas de arquitectura son altamente recomendables.
6. **Enlaces internos**: Usar rutas relativas de Astro en lugar de wikilinks de Obsidian cuando sea posible, o asegurar que el parser de Obsidian→Astro resuelve correctamente.

### 6.2 Contenido a reescribir (no solo fusionar)

| Entrada | Problema | Acción |
|---------|----------|--------|
| `Configurar Ubuntu` | Tono de manual genérico, mezcla UI y dev | Reescribir como "Mi Ubuntu para desarrollar: setup 202X" con opinión y justificación de cada elección |
| `Proteger Node.js` | Buena base pero falta de ejemplos propios | Añadir caso real: "Cómo securicé [proyecto X]" |
| `Vue 3 + TanStack Query` | Tutorial genérico, código con Vuetify sin contexto | Reescribir con ejemplo propio o convertir en comparativa Vue vs React con TanStack |
| `Hello World` | Está bien como manifiesto, pero los "aún me quedan cosas" deben actualizarse | Actualizar con las funcionalidades ya implementadas vs roadmap pendiente |
| Proyectos (`robocooker.md`, etc.) | Descripciones de README copiadas | Reescribir como "post-mortem" o "lecciones aprendidas": qué salió mal, qué cambiaría, métricas |

---

## 7. Calendarización y Roadmap de Acción

### Fase 1: Fundamentos (Semanas 1-2)

- [ ] Auditar y listar todos los archivos `published: false`. Decidir: activar, fusionar o eliminar.
- [ ] Corregir frontmatter de TODO el contenido: `mod` igual a fecha real de última revisión, `description` con frase completa, `tags` estandarizados (máx 5).
- [ ] Implementar taxonomía de tags. Crear un `tag-registry.md` interno con los tags permitidos.
- [ ] Crear redirecciones (si Astro lo permite) o al menos un índice de "Contenido movido".

### Fase 2: Consolidación Wiki (Semanas 3-6)

- [ ] Fusionar todos los grupos de la tabla de fusión (Sección 4.2).
- [ ] Eliminar los archivos de la tabla de eliminación (Sección 4.1).
- [ ] Reescribir los índices de cada sección (`home lab.md`, `javascript.md`, etc.) como verdaderos índices con descripción de cada página hija.
- [ ] Mover contenido profundo de wiki al blog como series (Proxmox, React, etc.).

### Fase 3: Blog Editorial (Semanas 7-10)

- [ ] Definir **línea editorial**: 60% Arquitectura Web / DevOps, 25% Home Lab / Self-Hosted, 15% Opinión / IndieWeb.
- [ ] Escribir posts para cerrar las series propuestas.
- [ ] Establecer frecuencia mínima: 1 post cada 2 semanas.
- [ ] Crear template de post (`blog-template.md`) con la estructura obligatoria.

### Fase 4: Proyectos (Semanas 11-12)

- [ ] Reescribir cada proyecto como "Caso de estudio" con: problema, solución, stack, desafíos, resultado, repo.
- [ ] Añadir screenshots de los proyectos en funcionamiento.
- [ ] Incluir métricas reales (Lighthouse, usuarios, etc.) si existen.

### Fase 5: Automatización y Mantenimiento (Contínuo)

- [ ] Script de CI que verifique: wikilinks rotos, imágenes sin alt, descripciones vacías, tags no permitidos.
- [ ] Revisión trimestral de contenido obsoleto (especialmente guías de instalación).
- [ ] Rotación de `now.md`: actualizar mensualmente.

---

## 8. Métricas de Éxito

| Métrica | Actual | Objetivo (6 meses) |
|---------|--------|-------------------|
| Posts publicados | 10 | 22 (+12 nuevos) |
| Notas wiki | ~100 | 40-50 (consolidadas) |
| Promedio palabras / post | ~1200 | >= 1500 |
| Posts con "relacionados" internos | ~2 | 100% |
| Tags únicos | ~80 | 30-40 (estandarizados) |
| Contenido `published: false` | ~15 | 0 (decidido) |
| Frecuencia de publicación | Esporádica | 2 semanas |
| Lighthouse Content Score | ? | > 90 en todos los posts |

---

## 9. Notas Finales y Principios Directores

1. **Menos es más**: Es mejor tener 40 notas excelentes que 100 notas mediocres.
2. **Contenido vivo o muerto**: Si una guía no se actualiza en 12 meses, añadir banner de "Posiblemente obsoleto" o eliminarla.
3. **Wiki vs Blog**: La wiki es para consulta rápida (cheatsheets, checklists, índices). El blog es para narrativa, opinión y series profundas. No duplicar: si está en blog, la wiki debe tener solo un resumen + enlace.
4. **Opinión es valor**: Los posts más fuertes (`Anatomía de Headers`, `Astro feat Svelte`, `IA`) funcionan porque tienen **voz propia**. Los tutoriales genéricos compiten con la documentación oficial y con Midudev. La opinión arquitectónica no.
5. **El sitio eres tú**: `about.md`, `now.md`, `uses.md`, `blogroll.md` son los mejor posicionados del sitio. Mantenerlos actualizados y sincronizados con lo que realmente haces.

---

*Plan generado el 30 de mayo de 2026. Revisión recomendada: 30 de agosto de 2026.*
