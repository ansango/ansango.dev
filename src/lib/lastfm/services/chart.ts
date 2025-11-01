import type {
  ChartGetTopArtistsRequest,
  ChartGetTopArtistsResponse,
  ChartGetTopTagsRequest,
  ChartGetTopTagsResponse,
  ChartGetTopTracksRequest,
  ChartGetTopTracksResponse,
} from "./chart.types";

import { fetcher } from "@/lib/utils";
import { buildUrl, method } from "..";

export type ChartApiMethods = {
  /**
   * Get the top artists chart
   * @param {ChartGetTopArtistsRequest} params
   * @param {RequestInit} init
   * @returns {Promise<ChartGetTopArtistsResponse>}
   * https://www.last.fm/api/show/chart.getTopArtists
   * */
  getTopArtists: (
    params: ChartGetTopArtistsRequest,
    init?: RequestInit,
  ) => Promise<ChartGetTopArtistsResponse>;
  /**
   * Get the top tags chart
   * @param {ChartGetTopTagsRequest} params
   * @param {RequestInit} init
   * @returns {Promise<ChartGetTopTagsResponse>}
   * https://www.last.fm/api/show/chart.getTopTags
   * */
  getTopTags: (
    params: ChartGetTopTagsRequest,
    init?: RequestInit,
  ) => Promise<ChartGetTopTagsResponse>;
  /**
   * Get the top tracks chart
   * @param {ChartGetTopTracksRequest} params
   * @param {RequestInit} init
   * @returns {Promise<ChartGetTopTracksResponse>}
   * https://www.last.fm/api/show/chart.getTopTracks
   * */
  getTopTracks: (
    params: ChartGetTopTracksRequest,
    init?: RequestInit,
  ) => Promise<ChartGetTopTracksResponse>;
};

export const chartApiMethods: ChartApiMethods = {
  getTopArtists: (params, init) =>
    fetcher<ChartGetTopArtistsResponse>(
      buildUrl(method.chart.getTopArtists, params),
      init,
    ),
  getTopTags: (params, init) =>
    fetcher<ChartGetTopTagsResponse>(
      buildUrl(method.chart.getTopTags, params),
      init,
    ),
  getTopTracks: (params, init) =>
    fetcher<ChartGetTopTracksResponse>(
      buildUrl(method.chart.getTopTracks, params),
      init,
    ),
};
