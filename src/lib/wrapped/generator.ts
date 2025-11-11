/**
 * 🎁 Main Wrapped Generator
 * 
 * @description
 * Orchestrates the complete wrapped generation process for a specific year.
 * Coordinates all data fetching, calculations, and aggregations.
 * This is the main entry point for generating a complete wrapped object.
 * 
 * @module wrapped/generator
 */

import { getTopTracksForYear, getTopArtistsForYear, getTopAlbumsForYear, getUniqueArtists, getArtistTags, getNewTags } from './top-items';
import { calculateListeningPatterns } from './patterns';
import { calculateDiversity } from './diversity';
import { calculateDiscoveries } from './discoveries';
import { calculateObsessions } from './obsessions';
import { calculateComparisons } from './comparisons';
import { calculateCuriosities } from './curiosities';

/**
 * 🎁 Generate complete wrapped statistics for a specific year
 * 
 * @param year - Target year to generate wrapped for
 * @param scrobbles - Total scrobbles for that year
 * @param threshold - Minimum scrobbles threshold (for metadata)
 * @param previousYearsTags - Accumulated tags from all previous years (default: [])
 * @returns Complete wrapped object with all sections
 * 
 * @description
 * Orchestrates the full wrapped generation pipeline:
 * 1. Fetch top tracks (50), artists (20), albums (20) in parallel
 * 2. Get unique artists count
 * 3. Fetch tags for each top artist (10 per artist)
 * 4. Detect new tags vs previous years
 * 5. Calculate patterns, diversity, discoveries, obsessions, curiosities
 * 6. Assemble complete wrapped object
 * 
 * Note: Comparisons are calculated separately in the endpoint with previous year data.
 * 
 * @example
 * ```ts
 * const wrapped2023 = await generateWrappedForYear(
 *   2023,
 *   31679,
 *   22427,
 *   ['electronic', 'house', 'techno']  // Tags from 2022
 * );
 * 
 * console.log(wrapped2023.year);                      // 2023
 * console.log(wrapped2023.summary.totalScrobbles);    // 31679
 * console.log(wrapped2023.summary.listeningHours);    // 1583
 * console.log(wrapped2023.top.tracks.length);         // 50
 * console.log(wrapped2023.top.artists.length);        // 20
 * console.log(wrapped2023.diversity.genreDiversity);  // 111
 * console.log(wrapped2023.newTags);                   // ['hardcore', 'punk']
 * ```
 */
export async function generateWrappedForYear(
  year: number,
  scrobbles: number,
  threshold: number,
  previousYearsTags: string[] = []
) {
  console.log(`🎵 Generando wrapped para ${year}...`);

  // Obtener tops del año (paralelizar para reducir tiempo total)
  const [tracks, artists, albums, uniqueArtists] = await Promise.all([
    getTopTracksForYear(year, 50),
    getTopArtistsForYear(year, 20),
    getTopAlbumsForYear(year, 20),
    getUniqueArtists(year),
  ]);

  // Obtener tags de los top artists
  console.log(`   🏷️  Obteniendo tags de artistas...`);
  const artistsWithTags = await Promise.all(
    artists.map(async (artist) => {
      const tags = await getArtistTags(artist.name, 10);
      return {
        ...artist,
        tags,
      };
    })
  );

  // Recopilar todos los tags del año
  const currentYearTags = Array.from(
    new Set(artistsWithTags.flatMap(artist => artist.tags))
  );

  // Detectar tags nuevos
  const newTags = getNewTags(year, currentYearTags, previousYearsTags);

  // Calcular patrones de escucha
  const patterns = await calculateListeningPatterns(year, scrobbles, tracks, artists);

  // Calcular diversidad musical
  const diversity = await calculateDiversity(year, tracks, artistsWithTags, scrobbles);

  // Calcular descubrimientos
  const discoveries = await calculateDiscoveries(year, artistsWithTags);

  // Calcular obsesiones
  const obsessions = await calculateObsessions(year, tracks, artistsWithTags, patterns.monthlyScrobbles);

  // Calcular curiosidades
  const curiosities = await calculateCuriosities(year, scrobbles, tracks, artistsWithTags, albums);

  return {
    year,
    metadata: {
      threshold,
      generated: new Date().toISOString(),
    },
    summary: {
      totalScrobbles: scrobbles,
      listeningHours: Math.floor((scrobbles * 3) / 60),
      uniqueArtists,
      avgScrobblesPerDay: Math.floor(scrobbles / 365),
    },
    top: {
      tracks,
      artists: artistsWithTags,
      albums,
    },
    patterns,
    diversity,
    discoveries,
    obsessions,
    comparisons: {}, // Calculado en el endpoint con datos del año anterior
    curiosities,
    newTags,
    allTags: currentYearTags, // Para usar en años siguientes
  };
}
