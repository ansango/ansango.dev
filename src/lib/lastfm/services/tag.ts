import type {
  TagGetInfoRequest,
  TagGetInfoResponse,
  TagGetSimilarRequest,
  TagGetSimilarResponse,
  TagGetTopAlbumsRequest,
  TagGetTopAlbumsResponse,
  TagGetTopArtistsRequest,
  TagGetTopArtistsResponse,
  TagGetTopTagsRequest,
  TagGetTopTagsResponse,
  TagGetTopTracksRequest,
  TagGetTopTracksResponse,
  TagGetWeeklyChartListRequest,
  TagGetWeeklyChartListResponse,
} from "./tag.types";
import { fetcher } from "@/lib/utils";
import { buildUrl, method } from "..";

export type TagApiMethods = {
  /**
   * Get the metadata for a tag on Last.fm. Includes biography.
   * @param {TagGetInfoRequest} params
   * @param {RequestInit} init
   * @returns {Promise<TagGetInfoResponse>}
   * https://www.last.fm/api/show/tag.getInfo
   * */
  getInfo: (
    params: TagGetInfoRequest,
    init?: RequestInit,
  ) => Promise<TagGetInfoResponse>;
  /**
   * Get the similar tags for this tag, based on listening data.
   * @param {TagGetSimilarRequest} params
   * @param {RequestInit} init
   * @returns {Promise<TagGetSimilarResponse>}
   * https://www.last.fm/api/show/tag.getSimilar
   * */
  getSimilar: (
    params: TagGetSimilarRequest,
    init?: RequestInit,
  ) => Promise<TagGetSimilarResponse>;
  /**
   * Get the top albums tagged by this tag, ordered by tag count.
   * @param {TagGetTopAlbumsRequest} params
   * @param {RequestInit} init
   * @returns {Promise<TagGetTopAlbumsResponse>}
   * https://www.last.fm/api/show/tag.getTopAlbums
   * */
  getTopAlbums: (
    params: TagGetTopAlbumsRequest,
    init?: RequestInit,
  ) => Promise<TagGetTopAlbumsResponse>;
  /**
   * Get the top artists tagged by this tag, ordered by tag count.
   * @param {TagGetTopArtistsRequest} params
   * @param {RequestInit} init
   * @returns {Promise<TagGetTopArtistsResponse>}
   * https://www.last.fm/api/show/tag.getTopArtists
   * */
  getTopArtists: (
    params: TagGetTopArtistsRequest,
    init?: RequestInit,
  ) => Promise<TagGetTopArtistsResponse>;
  /**
   *  Get the top tags on Last.fm, ordered by tag count.
   * @param {TagGetTopTagsRequest} params
   * @param {RequestInit} init
   * @returns {Promise<TagGetTopTagsResponse>}
   * https://www.last.fm/api/show/tag.getTopTags
   * */
  getTopTags: (
    params: TagGetTopTagsRequest,
    init?: RequestInit,
  ) => Promise<TagGetTopTagsResponse>;
  /**
   * Get the top tracks tagged by this tag, ordered by tag count.
   * @param {TagGetTopTracksRequest} params
   * @param {RequestInit} init
   * @returns {Promise<TagGetTopTracksResponse>}
   * https://www.last.fm/api/show/tag.getTopTracks
   * */
  getTopTracks: (
    params: TagGetTopTracksRequest,
    init?: RequestInit,
  ) => Promise<TagGetTopTracksResponse>;
  /**
   * Get a list of available charts for this tag, expressed as date ranges which can be sent to the chart services.
   * @param {TagGetWeeklyChartListRequest} params
   * @param {RequestInit} init
   * @returns {Promise<TagGetWeeklyChartListResponse>}
   * https://www.last.fm/api/show/tag.getWeeklyChartList
   * */
  getWeeklyChartList: (
    params: TagGetWeeklyChartListRequest,
    init?: RequestInit,
  ) => Promise<TagGetWeeklyChartListResponse>;
};

export const tagApiMethods: TagApiMethods = {
  getInfo: (params, init) =>
    fetcher<TagGetInfoResponse>(buildUrl(method.tag.getInfo, params), init),
  getSimilar: (params, init) =>
    fetcher<TagGetSimilarResponse>(
      buildUrl(method.tag.getSimilar, params),
      init,
    ),
  getTopAlbums: (params, init) =>
    fetcher<TagGetTopAlbumsResponse>(
      buildUrl(method.tag.getTopAlbums, params),
      init,
    ),
  getTopArtists: (params, init) =>
    fetcher<TagGetTopArtistsResponse>(
      buildUrl(method.tag.getTopArtists, params),
      init,
    ),
  getTopTags: (params, init) =>
    fetcher<TagGetTopTagsResponse>(
      buildUrl(method.tag.getTopTags, params),
      init,
    ),
  getTopTracks: (params, init) =>
    fetcher<TagGetTopTracksResponse>(
      buildUrl(method.tag.getTopTracks, params),
      init,
    ),
  getWeeklyChartList: (params, init) =>
    fetcher<TagGetWeeklyChartListResponse>(
      buildUrl(method.tag.getWeeklyChartList, params),
      init,
    ),
};
