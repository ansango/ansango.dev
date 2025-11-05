/**
 * 🎵 Last.fm Client Configuration
 *
 * @description
 * Centralized Last.fm client instance for the wrapped system.
 * Uses the lastfm-client-ts package with API credentials from environment variables.
 *
 * @module wrapped/client
 */

import { LastFmClient } from "lastfm-client-ts";

const apiKey = import.meta.env.PUBLIC_LASTFM_API_KEY;
const sharedSecret = import.meta.env.LASTFM_SHARED_SECRET;
const baseUrl = import.meta.env.PUBLIC_LASTFM_API_BASE_URL;

if (!apiKey) {
  throw new Error(
    "PUBLIC_LASTFM_API_KEY is not defined in environment variables",
  );
}

/**
 * 🎯 Shared Last.fm client instance
 *
 * @description
 * Pre-configured client with API credentials.
 * Use this for all Last.fm API requests in the wrapped system.
 *
 * @example
 * ```ts
 * import { client } from './client';
 *
 * const userInfo = await client.user.getInfo({ user: 'ansango' });
 * const topArtists = await client.user.getTopArtists({ user: 'ansango' });
 * ```
 */
export const client = new LastFmClient({
  apiKey,
  sharedSecret,
  baseUrl,  
});

/** 👤 Last.fm username for data fetching */
export const USERNAME = "ansango";
