# Plan: Generador de Wrapped Anual de Last.fm

Generar archivos JSON estáticos con estadísticas musicales anuales de Last.fm, creando wraps solo para años completados (después del 31 de diciembre) que cumplan umbrales automáticos de scrobbles basados en la media de actividad de escucha.

## Tareas

### 1. Crear script de build para generar wraps ✅

**Implementación**: Endpoints estáticos de Astro (en lugar de script separado)

**Archivos creados**:
- `src/lib/wrapped.ts` - Utilidades compartidas para cálculo y validación
- `src/pages/data/wrapped/index.json.ts` - Endpoint que genera el índice
- `src/pages/data/wrapped/[year].json.ts` - Endpoint dinámico para cada año

**Ventajas**:
- ✅ Se ejecuta automáticamente durante `npm run build`
- ✅ Usa el cliente TypeScript existente sin duplicación
- ✅ Integrado con el sistema de build de Astro
- ✅ Genera archivos estáticos en `dist/data/wrapped/`
- ✅ No requiere dependencias adicionales (sin tsx, sin dotenv)
- ✅ Aprovecha `getStaticPaths()` para generación dinámica

**Funcionamiento**:
- ✅ Obtener fecha de registro del usuario de Last.fm
- ✅ Calcular scrobbles por año para todos los años desde el registro
- ✅ Calcular umbral automático (media de scrobbles excluyendo el año actual)
- ✅ Filtrar años válidos:
  - Año completado (después del 31 de diciembre)
  - Scrobbles mayor que cero y mayor o igual al umbral
- ✅ Generar wraps solo para años válidos (no incremental, regenera en cada build)
- ✅ Guardar umbral usado en el momento de generación

**Archivos generados** (en `dist/data/wrapped/`):
- `index.json` - Índice con años disponibles, umbrales y totales
- `2023.json` - Wrapped de 2023 (31,679 scrobbles)
- `2024.json` - Wrapped de 2024 (28,492 scrobbles)

**Comando**: Se ejecuta automáticamente con `npm run build`

### 2. Extender métodos de API de Last.fm ✅

**Archivo**: `src/lib/wrapped.ts` extendido con funciones para obtener datos

**Implementado**:
- ✅ Peticiones con rangos de tiempo usando timestamps unix (`from`, `to`)
- ✅ Usar `user.getWeeklyTrackChart`, `user.getWeeklyArtistChart`, `user.getWeeklyAlbumChart` (soportan `from`/`to`)
- ✅ Obtener por año:
  - Top 50 canciones (`getTopTracksForYear`)
  - Top 20 artistas (`getTopArtistsForYear`)
  - Top 20 álbumes (`getTopAlbumsForYear`)
  - Tags de artistas vía `artist.getTopTags` (top 10 tags por artista)
  - Artistas únicos usando weekly artist chart
- ✅ Calcular métricas:
  - Total de scrobbles del año
  - Horas de escucha estimadas (scrobbles × 3 minutos promedio)
  - Cantidad de artistas únicos (usando weekly chart completo)
  - Tags nuevos descubiertos (comparando contra tags acumulados de años anteriores)

**Resultado**: 
- Wrapped de 2023: 50 tracks, 20 artistas con tags, 20 álbumes, 1000 artistas únicos, 111 tags nuevos
- Wrapped de 2024: 50 tracks, 20 artistas con tags, 20 álbumes, datos completos

**Ejemplo de artista con tags**:
```json
{
  "name": "The Blaze",
  "playcount": "552",
  "tags": ["House", "electronic", "deep house", "french", "electronica"]
}
```

### 2. Extender métodos de API de Last.fm

**Archivo**: `src/lib/lastfm/services/user.ts` y otros servicios

- Implementar peticiones con rangos de tiempo usando timestamps unix (`from`, `to`)
- Obtener por año:
  - Top 50 canciones (`user.getTopTracks`)
  - Top 20 artistas (`user.getTopArtists`)
  - Top 20 álbumes (`user.getTopAlbums`)
  - Tags de artistas vía `artist.getTopTags` para los top 20 artistas
  - Scrobbles diarios completos del año para análisis de patrones
  - Scrobbles mensuales para evolución temporal
- Calcular métricas adicionales:
  - Total de scrobbles del año
  - Horas de escucha estimadas (scrobbles × 3 minutos promedio)
  - Cantidad de artistas únicos
  - Tags nuevos descubiertos (comparando contra tags acumulados de años anteriores)

### 3. Calcular estadísticas avanzadas

**Procesamiento de datos en el script**

#### 📊 Stats Básicas
- Top 50 canciones con playcount
- Top 20 artistas con playcount y tags
- Top 20 álbumes con playcount
- Scrobbles totales del año
- Horas escuchadas estimadas
- Artistas únicos del año
- Tags nuevos descubiertos

#### 🔥 Patrones de Escucha
- **Top por mes**: Canción/artista/álbum más escuchado cada mes (evolución del año)
- **Racha más larga**: Días consecutivos con al menos 1 scrobble
- **Día pico**: Fecha con más scrobbles del año + cantidad
- **Mes más activo**: Mes con más scrobbles
- **Mes menos activo**: Mes con menos scrobbles
- **Promedio diario**: Scrobbles promedio por día del año

#### 🎨 Diversidad
- **Índice de concentración**: % que representan los top 10 artistas del total de scrobbles
- **One-hit wonders**: Artistas de los que solo escuchaste 1 canción en todo el año
- **Ratio descubrimiento**: % artistas nuevos vs artistas repetidos del año anterior

#### 🆕 Descubrimientos
- **Primera canción del año**: Primer scrobble de enero (fecha, hora, canción)
- **Última canción del año**: Último scrobble de diciembre (fecha, hora, canción)
- **Sleeper hits**: Canciones descubiertas en segundo semestre que acabaron en top 50
- **Artistas persistentes**: Artistas descubiertos en Q1 que permanecieron en tops todo el año

#### 🎯 Obsesiones
- **Maratón máximo**: Canción con más reproducciones consecutivas en un día
- **Canción del verano**: Más escuchada en jun-ago
- **Canción del invierno**: Más escuchada en dic-feb
- **Canción de primavera**: Más escuchada en mar-may
- **Canción de otoño**: Más escuchada en sep-nov
- **Artista de inicio**: Artista más escuchado en enero
- **Artista de cierre**: Artista más escuchado en diciembre

#### 📈 Comparativas (requiere año anterior)
- **Crecimiento anual**: % diferencia de scrobbles vs año anterior
- **Tags abandonados**: Tags presentes año anterior, ausentes este año
- **Tags adoptados**: Tags nuevos este año vs año anterior
- **Artistas abandonados**: Artistas en top 20 del año anterior, ausentes este año
- **Artistas recuperados**: Artistas que no estaban en top año anterior y ahora sí

#### 🎲 Curiosidades
- **Milestones**: Tracks en posición scrobble #1000, #5000, #10000 del año
- **Track más raro**: Canción con menos listeners globales en Last.fm (de tu top 50)
- **Artista más raro**: Artista con menos listeners globales en Last.fm (de tu top 20)
- **Álbum más oscuro**: Álbum con menos listeners globales (de tu top 20)

### 4. Generar archivos JSON estáticos

**Directorio**: `public/data/wrapped/`

- Crear estructura de carpetas si no existe
- Generar `{year}.json` por cada año con todas las stats agrupadas por secciones:
  ```json
  {
    "year": 2024,
    "metadata": {
      "threshold": 850,
      "generated": "2025-01-01T00:00:00Z"
    },
    "summary": {
      "totalScrobbles": 12543,
      "listeningHours": 627,
      "uniqueArtists": 456,
      "avgScrobblesPerDay": 34.4
    },
    "top": {
      "tracks": [...],
      "artists": [...],
      "albums": [...]
    },
    "patterns": {
      "longestStreak": 45,
      "peakDay": { "date": "2024-06-15", "scrobbles": 120 },
      "mostActiveMonth": "June",
      "leastActiveMonth": "February",
      "monthlyTop": [...]
    },
    "diversity": {
      "concentrationIndex": 35.6,
      "oneHitWonders": [...],
      "newArtistsRatio": 42.3
    },
    "discoveries": {
      "firstTrack": {...},
      "lastTrack": {...},
      "sleeperHits": [...],
      "persistentArtists": [...]
    },
    "obsessions": {
      "maxMarathon": {...},
      "seasonalTracks": {
        "summer": {...},
        "winter": {...},
        "spring": {...},
        "fall": {...}
      },
      "yearArtists": {
        "start": {...},
        "end": {...}
      }
    },
    "comparisons": {
      "growth": 15.3,
      "tagsAbandoned": [...],
      "tagsAdopted": [...],
      "artistsAbandoned": [...],
      "artistsRecovered": [...]
    },
    "curiosities": {
      "milestones": [...],
      "rarestTrack": {...},
      "rarestArtist": {...},
      "rarestAlbum": {...}
    },
    "newTags": [...]
  }
  ```

- Generar `index.json` con:
  ```json
  {
    "years": [2024, 2023, 2022, ...],
    "thresholds": {
      "2024": 850,
      "2023": 820,
      ...
    },
    "totals": {
      "2024": 12543,
      "2023": 11234,
      ...
    },
    "lastGenerated": "2025-01-01T00:00:00Z"
  }
  ```

- Añadir script `wrapped` a `package.json`:
  ```json
  "scripts": {
    "wrapped": "node scripts/generate-wrapped.js"
  }
  ```

### 5. Crear páginas de wrapped

**Archivos**: `src/pages/wrapped/`

- `index.astro`: Página principal de wrapped
  - Leer `public/data/wrapped/index.json`
  - Mostrar timeline/lista de años disponibles ordenados descendente
  - Cards por año con preview:
    - Total scrobbles
    - Top artista del año
    - Top canción del año
    - Horas escuchadas
  - Enlace a cada wrapped individual
  
- `[year].astro`: Dashboard completo del wrapped por año
  - Leer `public/data/wrapped/{year}.json`
  - Hero con año y stats principales (scrobbles, horas, artistas únicos)
  - Secciones organizadas:
    
    **🎵 Tops del Año**
    - Grid de top 50 canciones (con playcount)
    - Grid de top 20 artistas (con playcount y tags)
    - Grid de top 20 álbumes (con playcount)
    
    **📅 Patrones de Escucha**
    - Gráfico/timeline de evolución mensual
    - Top por mes (carrusel o grid)
    - Stats de racha, día pico, mes activo/inactivo
    - Promedio diario
    
    **🎨 Diversidad Musical**
    - Visualización del índice de concentración
    - Lista de one-hit wonders
    - Ratio de descubrimiento vs artistas conocidos
    
    **✨ Descubrimientos**
    - Primera y última canción del año (cards especiales)
    - Sleeper hits destacados
    - Artistas persistentes del año
    
    **🔥 Obsesiones**
    - Maratón máximo (canción más repetida en un día)
    - Canciones de cada estación
    - Artistas de inicio y cierre del año
    
    **📊 Comparativa** (si existe año anterior)
    - % crecimiento/decrecimiento
    - Tags abandonados vs adoptados
    - Artistas abandonados vs recuperados
    
    **🎲 Curiosidades**
    - Milestones del año
    - Tracks/artistas/álbumes más raros
    - Tags nuevos descubiertos
    
- Componentes reutilizables:
  - `TrackCard.astro` - Card de canción con imagen, título, artista, plays
  - `ArtistCard.astro` - Card de artista con imagen, nombre, plays, tags
  - `AlbumCard.astro` - Card de álbum con imagen, título, artista, plays
  - `StatCard.astro` - Card para stats numéricas
  - `ComparisonChart.svelte` - Gráfico de comparación año a año
  - `MonthlyEvolution.svelte` - Timeline/gráfico de evolución mensual

### 6. Integrar wrapped en el sitio

**Archivos a modificar**:

- `src/constants.ts`: Añadir metadata de wrapped
  ```typescript
  wrapped: {
    title: "Wrapped",
    description: "Resumen anual de mi música en Last.fm - estadísticas, descubrimientos y obsesiones por año",
    entriesPerPage: 0,
    url: "/wrapped",
    published: true,
  }
  ```

- `src/pages/music.astro`: 
  - Añadir sección/card destacada de "Ver Wrapped" 
  - Enlace al wrapped más reciente disponible
  - Preview de stats del último año

- `src/components/layout/elements/header.astro`: 
  - (Opcional) Añadir "Wrapped" a navegación principal
  - O como sub-item bajo "Music"

- `README.md` / docs:
  - Documentar el sistema de wrapped
  - Explicar cómo se genera
  - Comandos disponibles (`npm run wrapped`)
