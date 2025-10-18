import type {
  BatchTracksScrobbleRequest,
  TrackGetInfoRequest,
  TrackGetInfoResponse,
  TrackGetSimilarRequest,
  TrackGetSimilarResponse,
  TrackGetTagsRequest,
  TrackGetTagsResponse,
  TrackGetTopTagsRequest,
  TrackGetTopTagsResponse,
  TrackSearchRequest,
  TrackSearchResponse,
} from "./track.types";
import { fetcher } from "@/lib/utils";
import { buildUrl, method } from "..";

export type TrackApiMethods = {
  /**
   * Get the metadata for a track on Last.fm using the artist/track name or a musicbrainz id.
   * @param {TrackGetInfoRequest} params
   * @param {RequestInit} init
   * @returns {Promise<TrackGetInfoResponse>}
   * https://www.last.fm/api/show/track.getInfo
   * */
  getInfo: (
    params: TrackGetInfoRequest,
    init?: RequestInit,
  ) => Promise<TrackGetInfoResponse>;
  /**
   * Get the tags applied by an individual user to a track on Last.fm.
   * @param {TrackGetSimilarRequest} params
   * @param {RequestInit} init
   * @returns {Promise<TrackGetSimilarResponse>}
   * https://www.last.fm/api/show/track.getSimilar
   * */
  getSimilar: (
    params: TrackGetSimilarRequest,
    init?: RequestInit,
  ) => Promise<TrackGetSimilarResponse>;
  /**
   * Get the tags applied by an individual user to a track on Last.fm.
   * @param {TrackGetTagsRequest} params
   * @param {RequestInit} init
   * @returns {Promise<TrackGetTagsResponse>}
   * https://www.last.fm/api/show/track.getTags
   * */
  getTags: (
    params: TrackGetTagsRequest,
    init?: RequestInit,
  ) => Promise<TrackGetTagsResponse>;
  /**
   * Get the top tags for a track on Last.fm, ordered by popularity.
   *  @param {TrackGetTopTagsRequest} params
   * @param {RequestInit} init
   * @returns {Promise<TrackGetTopTagsResponse>}
   * https://www.last.fm/api/show/track.getTopTags
   * */
  getTopTags: (
    params: TrackGetTopTagsRequest,
    init?: RequestInit,
  ) => Promise<TrackGetTopTagsResponse>;
  /**
   * Search for a track by track name. Returns track matches sorted by relevance.
   * @param {TrackSearchRequest} params
   * @param {RequestInit} init
   * @returns {Promise<TrackSearchResponse>}
   * https://www.last.fm/api/show/track.search
   * */
  search: (
    params: TrackSearchRequest,
    init?: RequestInit,
  ) => Promise<TrackSearchResponse>;
};

export const trackApiMethods: TrackApiMethods = {
  getInfo: (params, init) =>
    fetcher<TrackGetInfoResponse>(buildUrl(method.track.getInfo, params), init),
  getSimilar: (params, init) =>
    fetcher<TrackGetSimilarResponse>(
      buildUrl(method.track.getSimilar, params),
      init,
    ),
  getTags: (params, init) =>
    fetcher<TrackGetTagsResponse>(buildUrl(method.track.getTags, params), init),
  getTopTags: (params, init) =>
    fetcher<TrackGetTopTagsResponse>(
      buildUrl(method.track.getTopTags, params),
      init,
    ),
  search: (params, init) =>
    fetcher<TrackSearchResponse>(buildUrl(method.track.search, params), init),
};
