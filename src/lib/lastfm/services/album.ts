import { fetcher } from "@/lib/utils";
import { buildUrl, method } from "..";
import type {
  AlbumGetInfoRequest,
  AlbumGetInfoResponse,
  AlbumGetTagsRequest,
  AlbumGetTagsResponse,
  AlbumGetTopTagsRequest,
  AlbumGetTopTagsResponse,
  AlbumSearchRequest,
  AlbumSearchResponse,
} from "./album.types";

export type AlbumApiMethods = {
  /**
   * Get the metadata for an album on Last.fm using the album name or a musicbrainz id.
   * @param {AlbumGetInfoRequest} params
   * @param {RequestInit} init
   * @returns {Promise<AlbumGetInfoResponse>}
   * https://www.last.fm/api/show/album.getInfo
   */
  getInfo: (
    params: AlbumGetInfoRequest,
    init?: RequestInit,
  ) => Promise<AlbumGetInfoResponse>;
  /**
   * Get the tags applied by an individual user to an album on Last.fm.
   * @param {AlbumGetTagsRequest} params
   * @param {RequestInit} init
   * @returns {Promise<AlbumGetTagsResponse>}
   * https://www.last.fm/api/show/album.getTags
   */
  getTags: (
    params: AlbumGetTagsRequest,
    init?: RequestInit,
  ) => Promise<AlbumGetTagsResponse>;
  /**
   * Get the top tags for an album on Last.fm, ordered by popularity.
   * @param {AlbumGetTopTagsRequest} params
   * @param {RequestInit} init
   * @returns {Promise<AlbumGetTopTagsResponse>}
   * https://www.last.fm/api/show/album.getTopTags
   */
  getTopTags: (
    params: AlbumGetTopTagsRequest,
    init?: RequestInit,
  ) => Promise<AlbumGetTopTagsResponse>;
  /**
   * Search for an album by name. Returns album matches sorted by relevance.
   * @param {AlbumSearchRequest} params
   * @param {RequestInit} init
   * @returns {Promise<AlbumSearchResponse>}
   * https://www.last.fm/api/show/album.search
   */
  search: (
    params: AlbumSearchRequest,
    init?: RequestInit,
  ) => Promise<AlbumSearchResponse>;
};

export const albumApiMethods: AlbumApiMethods = {
  getInfo: (params, init) =>
    fetcher<AlbumGetInfoResponse>(buildUrl(method.album.getInfo, params), init),
  getTags: (params, init) =>
    fetcher<AlbumGetTagsResponse>(buildUrl(method.album.getTags, params), init),
  getTopTags: (params, init) =>
    fetcher<AlbumGetTopTagsResponse>(
      buildUrl(method.album.getTopTags, params),
      init,
    ),
  search: (params, init) =>
    fetcher<AlbumSearchResponse>(buildUrl(method.album.search, params), init),
};
