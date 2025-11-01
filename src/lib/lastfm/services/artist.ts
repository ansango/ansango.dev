import type {
  ArtistGetInfoRequest,
  ArtistGetInfoResponse,
  ArtistGetTagsRequest,
  ArtistGetTagsResponse,
  ArtistGetTopAlbumsRequest,
  ArtistGetTopAlbumsResponse,
  ArtistGetTopTagsRequest,
  ArtistGetTopTagsResponse,
  ArtistGetTopTracksRequest,
  ArtistGetTopTracksResponse,
  ArtistSearchRequest,
  ArtistSearchResponse,
  ArtistGetSimilarRequest,
  ArtistGetSimilarResponse,
} from "./artist.types";
import { fetcher } from "@/lib/utils";
import { buildUrl, method } from "..";

export type ArtistApiMethods = {
  /**
   * Get the metadata for an artist. Includes biography.
   * @param {ArtistGetInfoRequest} params
   * @param {RequestInit} init
   * @returns {Promise<ArtistGetInfoResponse>}
   * https://www.last.fm/api/show/artist.getInfo
   */
  getInfo: (
    params: ArtistGetInfoRequest,
    init?: RequestInit,
  ) => Promise<ArtistGetInfoResponse>;
  /**
   * Get the tags applied by an individual user to an artist on Last.fm.
   * @param {ArtistGetTagsRequest} params
   * @param {RequestInit} init
   * @returns {Promise<ArtistGetTagsResponse>}
   * https://www.last.fm/api/show/artist.getTags
   * */
  getTags: (
    params: ArtistGetTagsRequest,
    init?: RequestInit,
  ) => Promise<ArtistGetTagsResponse>;
  /**
   * Get the similar artists for this artist on Last.fm, based on listening data.
   * @param {ArtistGetSimilarRequest} params
   * @param {RequestInit} init
   * @returns {Promise<ArtistGetSimilarResponse>}
   * https://www.last.fm/api/show/artist.getSimilar
   * */
  getSimilar: (
    params: ArtistGetSimilarRequest,
    init?: RequestInit,
  ) => Promise<ArtistGetSimilarResponse>;
  /**
   * Get the top tags for an artist on Last.fm, ordered by popularity.
   * @param {ArtistGetTopTagsRequest} params
   * @param {RequestInit} init
   * @returns {Promise<ArtistGetTopTagsResponse>}
   * https://www.last.fm/api/show/artist.getTopTags
   * */
  getTopTags: (
    params: ArtistGetTopTagsRequest,
    init?: RequestInit,
  ) => Promise<ArtistGetTopTagsResponse>;
  /**
   * Get the top albums for an artist on Last.fm, ordered by popularity.
   * @param {ArtistGetTopAlbumsRequest} params
   * @param {RequestInit} init
   * @returns {Promise<ArtistGetTopAlbumsResponse>}
   * https://www.last.fm/api/show/artist.getTopAlbums
   * */
  getTopAlbums: (
    params: ArtistGetTopAlbumsRequest,
    init?: RequestInit,
  ) => Promise<ArtistGetTopAlbumsResponse>;
  /**
   * Get the top tracks by an artist on Last.fm, ordered by popularity.
   * @param {ArtistGetTopTracksRequest} params
   * @param {RequestInit} init
   * @returns {Promise<ArtistGetTopTracksResponse>}
   * https://www.last.fm/api/show/artist.getTopTracks
   * */
  getTopTracks: (
    params: ArtistGetTopTracksRequest,
    init?: RequestInit,
  ) => Promise<ArtistGetTopTracksResponse>;
  /**
   * Search for an artist by name. Returns artist matches sorted by relevance.
   * @param {ArtistSearchRequest} params
   * @param {RequestInit} init
   * @returns {Promise<ArtistSearchResponse>}
   * https://www.last.fm/api/show/artist.search
   * */
  search: (
    params: ArtistSearchRequest,
    init?: RequestInit,
  ) => Promise<ArtistSearchResponse>;
};

export const artistApiMethods: ArtistApiMethods = {
  getInfo: (params, init) =>
    fetcher<ArtistGetInfoResponse>(
      buildUrl(method.artist.getInfo, params),
      init,
    ),
  getTags: (params, init) =>
    fetcher<ArtistGetTagsResponse>(
      buildUrl(method.artist.getTags, params),
      init,
    ),
  getSimilar: (params, init) =>
    fetcher<ArtistGetSimilarResponse>(
      buildUrl(method.artist.getSimilar, params),
      init,
    ),
  getTopTags: (params, init) =>
    fetcher<ArtistGetTopTagsResponse>(
      buildUrl(method.artist.getTopTags, params),
      init,
    ),
  getTopAlbums: (params, init) =>
    fetcher<ArtistGetTopAlbumsResponse>(
      buildUrl(method.artist.getTopAlbums, params),
      init,
    ),
  getTopTracks: (params, init) =>
    fetcher<ArtistGetTopTracksResponse>(
      buildUrl(method.artist.getTopTracks, params),
      init,
    ),
  search: (params, init) =>
    fetcher<ArtistSearchResponse>(buildUrl(method.artist.search, params), init),
};
