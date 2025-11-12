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

import { fetcher } from "./utils";

export type Album = {
  position: number;
  name: string;
  artist: string;
  url: string;
  playcount: number;
  image: string | null;
};

export type Artist = {
  position: number;
  name: string;
  url: string;
  playcount: number;
  image: string | null;
};

export type RecentTrack = {
  position: number;
  name: string;
  artist: string;
  album: string;
  timestamp: string | null;
  url: string;
  nowPlaying: boolean;
  image: string | null;
};

/**
 * Represents cached Last.fm data including recent tracks, top artists, and top albums.
 *
 * @property tracks - An array of recent track objects from Last.fm.
 * @property artists - An array of top artist objects from Last.fm.
 * @property albums - An array of top album objects from Last.fm.
 */
export type CacheLastfmData = {
  tracks: RecentTrack[];
  artists: Artist[];
  albums: Album[];
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

  const { tracks } = await fetcher<{
    tracks: RecentTrack[];
  }>(`${import.meta.env.SERVICE_URL}/music/ansango/tracks/recent?limit=11`, {
    headers: {
      Authorization: `Bearer ${import.meta.env.SERVICE_API_KEY}`,
    },
  });

  const { artists } = await fetcher<{
    artists: Artist[];
  }>(`${import.meta.env.SERVICE_URL}/music/ansango/artists/weekly?limit=10`, {
    headers: {
      Authorization: `Bearer ${import.meta.env.SERVICE_API_KEY}`,
    },
  });

  const { albums } = await fetcher<{
    albums: Album[];
  }>(`${import.meta.env.SERVICE_URL}/music/ansango/albums/monthly?limit=12`, {
    headers: {
      Authorization: `Bearer ${import.meta.env.SERVICE_API_KEY}`,
    },
  });

  cacheLastfmData = {
    tracks: tracks.filter((track) => !track.nowPlaying).slice(0, 10),
    artists,
    albums,
  };

  return cacheLastfmData;
};

export type Tracks = Awaited<ReturnType<typeof getLastfmData>>["tracks"];
export type Artists = Awaited<ReturnType<typeof getLastfmData>>["artists"];
export type Albums = Awaited<ReturnType<typeof getLastfmData>>["albums"];
