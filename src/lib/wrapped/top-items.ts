/**
 * 🎵 Top Items Fetching Module
 *
 * @description
 * Handles retrieval of top tracks, artists, albums, and tags for a specific year.
 * Uses Last.fm weekly chart methods which support from/to timestamp filtering.
 *
 * @module wrapped/top-items
 */

import { client, USERNAME } from "../lastfm";
import { getYearStart, getYearEnd, withRateLimit } from "./utils";

/**
 * 📀 Fetch top tracks for a specific year using weekly charts
 *
 * @param year - Target year
 * @param limit - Maximum number of tracks to return (default: 50)
 * @returns Array of tracks sorted by playcount descending
 *
 * @description
 * Uses user.getWeeklyTrackChart with from/to timestamps to filter by year.
 * Returns tracks with name, artist, playcount, and other metadata.
 * Automatically applies rate limiting.
 *
 * @example
 * ```ts
 * const tracks = await getTopTracksForYear(2023, 50);
 * console.log(tracks[0]);
 * // {
 * //   name: 'Territory',
 * //   artist: { name: 'The Blaze' },
 * //   playcount: '426'
 * // }
 * ```
 */
export async function getTopTracksForYear(year: number, limit = 50) {
  console.log(`   📀 Obteniendo top ${limit} tracks de ${year}...`);

  return withRateLimit(async () => {
    const from = getYearStart(year);
    const to = getYearEnd(year);

    const response = await client.user.getWeeklyTrackChart({
      user: USERNAME,
      from: from.toString(),
      to: to.toString(),
    });

    // Ordenar por playcount y limitar
    const sortedTracks = response.weeklytrackchart.track
      .sort((a, b) => parseInt(b.playcount) - parseInt(a.playcount))
      .slice(0, limit);

    return sortedTracks;
  }, `getTopTracksForYear(${year})`);
}

/**
 * 🎤 Fetch top artists for a specific year using weekly charts
 *
 * @param year - Target year
 * @param limit - Maximum number of artists to return (default: 20)
 * @returns Array of artists sorted by playcount descending
 *
 * @description
 * Uses user.getWeeklyArtistChart with from/to timestamps to filter by year.
 * Returns artists with name, playcount, and other metadata.
 * Automatically applies rate limiting.
 *
 * @example
 * ```ts
 * const artists = await getTopArtistsForYear(2023, 20);
 * console.log(artists[0]);
 * // {
 * //   name: 'The Blaze',
 * //   playcount: '552'
 * // }
 * ```
 */
export async function getTopArtistsForYear(year: number, limit = 20) {
  console.log(`   🎤 Obteniendo top ${limit} artistas de ${year}...`);

  return withRateLimit(async () => {
    const from = getYearStart(year);
    const to = getYearEnd(year);

    const response = await client.user.getWeeklyArtistChart({
      user: USERNAME,
      from: from.toString(),
      to: to.toString(),
    });

    // Ordenar por playcount y limitar
    const sortedArtists = response.weeklyartistchart.artist
      .sort((a, b) => parseInt(b.playcount) - parseInt(a.playcount))
      .slice(0, limit);

    return sortedArtists;
  }, `getTopArtistsForYear(${year})`);
}

/**
 * 💿 Fetch top albums for a specific year using weekly charts
 *
 * @param year - Target year
 * @param limit - Maximum number of albums to return (default: 20)
 * @returns Array of albums sorted by playcount descending
 *
 * @description
 * Uses user.getWeeklyAlbumChart with from/to timestamps to filter by year.
 * Returns albums with name, artist, playcount, and other metadata.
 * Automatically applies rate limiting.
 *
 * @example
 * ```ts
 * const albums = await getTopAlbumsForYear(2023, 20);
 * console.log(albums[0]);
 * // {
 * //   name: 'JUNGLE',
 * //   artist: { name: 'The Blaze' },
 * //   playcount: '512'
 * // }
 * ```
 */
export async function getTopAlbumsForYear(year: number, limit = 20) {
  console.log(`   💿 Obteniendo top ${limit} álbumes de ${year}...`);

  return withRateLimit(async () => {
    const from = getYearStart(year);
    const to = getYearEnd(year);

    const response = await client.user.getWeeklyAlbumChart({
      user: USERNAME,
      from: from.toString(),
      to: to.toString(),
    });

    // Ordenar por playcount y limitar
    const sortedAlbums = response.weeklyalbumchart.album
      .sort((a, b) => parseInt(b.playcount) - parseInt(a.playcount))
      .slice(0, limit);

    return sortedAlbums;
  }, `getTopAlbumsForYear(${year})`);
}

/**
 * 🏷️ Fetch genre/style tags for a specific artist
 *
 * @param artistName - Name of the artist
 * @param limit - Maximum number of tags to return (default: 5)
 * @returns Array of tag names (strings)
 *
 * @description
 * Uses artist.getTopTags from Last.fm API.
 * Returns empty array if tags cannot be fetched (artist not found, etc.).
 * Automatically applies rate limiting.
 *
 * @example
 * ```ts
 * const tags = await getArtistTags('The Blaze', 10);
 * console.log(tags);
 * // ['electronic', 'french', 'house', 'electronica', 'dance']
 * ```
 */
export async function getArtistTags(artistName: string, limit = 5) {
  return withRateLimit(async () => {
    try {
      const response = await client.artist.getTopTags({
        artist: artistName,
      });

      return response.toptags.tag.slice(0, limit).map((tag) => tag.name);
    } catch (error) {
      console.log(`      ⚠ No se pudieron obtener tags para ${artistName}`);
      return [];
    }
  }, `getArtistTags(${artistName})`);
}

/**
 * 👥 Count unique artists listened to in a specific year
 *
 * @param year - Target year
 * @returns Total count of unique artists
 *
 * @description
 * Uses weekly artist chart which returns all unique artists for the year.
 * More efficient than fetching all scrobbles and deduplicating.
 * Automatically applies rate limiting.
 *
 * @example
 * ```ts
 * const uniqueArtists = await getUniqueArtists(2023);
 * console.log(uniqueArtists);                 // 1000
 * ```
 */
export async function getUniqueArtists(year: number): Promise<number> {
  console.log(`   👥 Calculando artistas únicos de ${year}...`);

  return withRateLimit(async () => {
    const from = getYearStart(year);
    const to = getYearEnd(year);

    // Usamos weekly artist chart que sí acepta from/to
    const response = await client.user.getWeeklyArtistChart({
      user: USERNAME,
      from: from.toString(),
      to: to.toString(),
    });

    // Todos los artistas en el weekly chart son únicos
    return response.weeklyartistchart.artist.length;
  }, `getUniqueArtists(${year})`);
}

/**
 * 🆕 Detect new genre tags discovered in current year
 *
 * @param year - Current year (for logging only)
 * @param currentYearTags - All tags from current year
 * @param previousYearsTags - Accumulated tags from all previous years
 * @returns Array of tags that appear in current year but not in previous years
 *
 * @description
 * Compares current year tags against historical tags to find new discoveries.
 * Used to track musical exploration and genre diversification over time.
 *
 * @example
 * ```ts
 * const newTags = getNewTags(
 *   2024,
 *   ['hardcore', 'punk', 'electronic', 'house'],
 *   ['electronic', 'house', 'techno']
 * );
 * console.log(newTags);                       // ['hardcore', 'punk']
 * ```
 */
export function getNewTags(
  year: number,
  currentYearTags: string[],
  previousYearsTags: string[],
): string[] {
  console.log(`   🏷️  Detectando tags nuevos de ${year}...`);

  const newTags = currentYearTags.filter(
    (tag) => !previousYearsTags.includes(tag),
  );

  return newTags;
}
