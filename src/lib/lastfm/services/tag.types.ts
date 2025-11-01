import type {
  AlbumName,
  ArtistName,
  Content,
  Count,
  Duration,
  From,
  Image,
  ItemsPerPage,
  Lang,
  Limit,
  Mbid,
  Page,
  Rank,
  Reach,
  Summary,
  TagName,
  To,
  Total,
  TotalPages,
  TrackName,
  Url,
} from "./base.types";

export type TagWiki = {
  summary: Summary;
  content: Content;
};

/**
 * Tag
 * @see https://www.last.fm/api/show/tag.getInfo
 */

export type Tag = {
  name: TagName;
  url: Url;
  total: Total;
  reach: Reach;
  wiki: TagWiki;
};

export type TagGetInfoRequest = {
  tag: TagName;
  lang?: Lang;
};

export type TagGetInfoResponse = {
  tag: Tag;
};

export type TagGetSimilarRequest = {
  tag: TagName;
};
export type TagGetSimilarResponse = {
  similar: {
    tag: Array<{
      name: TagName;
      url: Url;
    }>;
    "@attr": {
      tag: TagName;
    };
  };
};

export type TagGetTopAlbumsRequest = {
  tag: TagName;
  limit?: Limit;
  page?: Page;
};
export type TagGetTopAlbumsResponse = {
  albums: {
    album: Array<{
      name: AlbumName;
      mbid: Mbid;
      url: Url;
      artist: {
        name: ArtistName;
        mbid: Mbid;
        url: Url;
      };
      image: Array<Image>;
      "@attr": {
        rank: Rank;
      };
    }>;
    "@attr": {
      tag: TagName;
      page: Page;
      perPage: ItemsPerPage;
      totalPages: TotalPages;
      total: Total;
    };
  };
};

export type TagGetTopArtistsRequest = {
  tag: TagName;
  limit?: Limit;
  page?: Page;
};
export type TagGetTopArtistsResponse = {
  topartists: {
    artist: Array<{
      name: ArtistName;
      mbid: Mbid;
      url: Url;
      image: Array<Image>;
      "@attr": {
        rank: Rank;
      };
    }>;
    "@attr": {
      tag: TagName;
      page: Page;
      perPage: ItemsPerPage;
      totalPages: TotalPages;
      total: Total;
    };
  };
};

export type TagGetTopTagsRequest = {
  limit?: Limit;
};
export type TagGetTopTagsResponse = {
  toptags: {
    tag: Array<{
      name: TagName;
      reach: Reach;
      count: Count;
    }>;
    "@attr": {
      offset: number;
      num_res: number;
      total: Total;
    };
  };
};

export type TagGetTopTracksRequest = {
  tag: TagName;
  limit?: Limit;
  page?: Page;
};
export type TagGetTopTracksResponse = {
  toptracks: {
    track: Array<{
      name: TrackName;
      duration: Duration;
      mbid: Mbid;
      url: Url;
      artist: {
        name: ArtistName;
        mbid: Mbid;
        url: Url;
      };
      image: Array<Image>;
      "@attr": {
        rank: Rank;
      };
    }>;
    "@attr": {
      tag: TagName;
      page: Page;
      perPage: ItemsPerPage;
      totalPages: TotalPages;
      total: Total;
    };
  };
};

export type TagGetWeeklyChartListRequest = {
  tag: TagName;
};
export type TagGetWeeklyChartListResponse = {
  weeklychartlist: {
    chart: Array<{
      from: From;
      to: To;
    }>;
    "@attr": {
      tag: TagName;
    };
  };
};
