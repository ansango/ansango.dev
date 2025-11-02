/**
 * 🎵 Last.fm Music Data Integration
 * 
 * @description Fetches and caches music data from Last.fm API.
 * Retrieves recent tracks, top artists, and top albums for display.
 * 
 * @module lib/music
 * 
 * @compatible
 * - 🎶 Powers PlayNow and music pages
 * - ⏱️ Caches data to minimize API calls
 * - 🔊 Displays current listening activity
 * - 📈 Shows top artists and albums statistics
 */

import {
  userApiMethods,
  type RecentTracks,
  type TopAlbums,
  type TopArtists,
} from "./lastfm/services";

const { getRecentTracks, getTopArtists, getTopAlbums } = userApiMethods;

/**
 * Represents cached Last.fm data including recent tracks, top artists, and top albums.
 *
 * @property tracks - An array of recent track objects from Last.fm.
 * @property artists - An array of top artist objects from Last.fm.
 * @property albums - An array of top album objects from Last.fm.
 */
export type CacheLastfmData = {
  tracks: RecentTracks["track"];
  artists: TopArtists["artist"];
  albums: TopAlbums["album"];
};

/**
 * Caches the most recently fetched Last.fm data to optimize repeated access and reduce redundant API calls.
 *
 * @remarks
 * This variable holds the cached data in memory for the current session. It is initialized as `null`
 * and should be updated whenever new Last.fm data is retrieved.
 *
 * @see CacheLastfmData
 */
let cacheLastfmData: CacheLastfmData | null = null;

/**
 * Fetches and caches Last.fm data for the user "ansango".
 *
 * This function retrieves the user's recent tracks, top artists (for the last 7 days),
 * and top albums (for the last month) from Last.fm. It caches the result to avoid
 * redundant API calls on subsequent invocations.
 *
 * @returns {Promise<{ tracks: any[]; artists: any[]; albums: any[] }>}
 *   An object containing arrays of recent tracks, top artists, and top albums.
 */
export const getLastfmData = async () => {
  if (cacheLastfmData) {
    console.info("Returning cached Last.fm data");
    return cacheLastfmData;
  }

  const { recenttracks } = await getRecentTracks({
    user: "ansango",
    limit: 11,
  });
  const {
    topartists: { artist: artists },
  } = await getTopArtists({
    user: "ansango",
    limit: 10,
    period: "7day",
  });
  const {
    topalbums: { album: albums },
  } = await getTopAlbums({
    user: "ansango",
    limit: 12,
    period: "1month",
  });

  const tracks = recenttracks.track
    .filter((track) => !track["@attr"]?.nowplaying)
    .slice(0, 10);

  cacheLastfmData = {
    tracks,
    artists,
    albums,
  };

  return cacheLastfmData;
};

export type Tracks = Awaited<ReturnType<typeof getLastfmData>>["tracks"];
export type Artists = Awaited<ReturnType<typeof getLastfmData>>["artists"];
export type Albums = Awaited<ReturnType<typeof getLastfmData>>["albums"];