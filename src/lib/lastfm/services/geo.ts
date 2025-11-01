import type {
  GeoGetTopArtistsRequest,
  GeoGetTopArtistsResponse,
  GeoGetTopTracksRequest,
  GeoGetTopTracksResponse,
} from "./geo.types";
import { fetcher } from "@/lib/utils";
import { buildUrl, method } from "..";

export type GeoApiMethods = {
  /**
   * Get the most popular artists on Last.fm by country.
   * @param {GeoGetTopArtistsRequest} params
   * @param {RequestInit} init
   * @returns {Promise<GeoGetTopArtistsResponse>}
   * https://www.last.fm/api/show/geo.getTopArtists
   * */
  getTopArtists: (
    params: GeoGetTopArtistsRequest,
    init?: RequestInit,
  ) => Promise<GeoGetTopArtistsResponse>;
  /**
   * Get the most popular tracks on Last.fm by country.
   * @param {GeoGetTopTracksRequest} params
   * @param {RequestInit} init
   * @returns {Promise<GeoGetTopTracksResponse>}
   * https://www.last.fm/api/show/geo.getTopTracks
   * */
  getTopTracks: (
    params: GeoGetTopTracksRequest,
    init?: RequestInit,
  ) => Promise<GeoGetTopTracksResponse>;
};

export const geoApiMethods: GeoApiMethods = {
  getTopArtists: (params, init) =>
    fetcher<GeoGetTopArtistsResponse>(
      buildUrl(method.geo.getTopArtists, params),
      init,
    ),
  getTopTracks: (params, init) =>
    fetcher<GeoGetTopTracksResponse>(
      buildUrl(method.geo.getTopTracks, params),
      init,
    ),
};
