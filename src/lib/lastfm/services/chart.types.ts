import type {
  ArtistName,
  Duration,
  Image,
  ItemsPerPage,
  Limit,
  Listeners,
  Mbid,
  Page,
  Playcount,
  Reach,
  TagName,
  Total,
  TotalPages,
  TrackName,
  Url,
} from "./base.types";

export type ChartGetTopArtistsRequest = {
  limit?: Limit;
  page?: Page;
};
export type ChartGetTopArtistsResponse = {
  artists: {
    artist: Array<{
      name: ArtistName;
      playcount: Playcount;
      mbid: Mbid;
      listeners: Listeners;
      url: Url;
      image: Array<Image>;
    }>;
    "@attr": {
      page: Page;
      perPage: ItemsPerPage;
      totalPages: TotalPages;
      total: Total;
    };
  };
};

export type ChartGetTopTagsRequest = {
  limit?: Limit;
  page?: Page;
};
export type ChartGetTopTagsResponse = {
  tags: {
    tag: Array<{
      name: TagName;
      url: Url;
      reach: Reach;
      taggings: string;
    }>;
    "@attr": {
      page: Page;
      perPage: ItemsPerPage;
      totalPages: TotalPages;
      total: Total;
    };
  };
};

export type ChartGetTopTracksRequest = {
  limit?: Limit;
  page?: Page;
};
export type ChartGetTopTracksResponse = {
  tracks: {
    track: Array<{
      name: TrackName;
      duration: Duration;
      listeners: Listeners;
      mbid: Mbid;
      url: Url;
      playcount: Playcount;
      artist: {
        name: ArtistName;
        mbid: Mbid;
        url: Url;
      };
      image: Array<Image>;
    }>;
    "@attr": {
      page: Page;
      perPage: ItemsPerPage;
      totalPages: TotalPages;
      total: Total;
    };
  };
};
