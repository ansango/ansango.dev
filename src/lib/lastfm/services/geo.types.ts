import type {
  ArtistName,
  Country,
  Duration,
  Image,
  ItemsPerPage,
  Limit,
  Listeners,
  Loc,
  Mbid,
  Page,
  Rank,
  Total,
  TotalPages,
  TrackName,
  Url,
} from "./base.types";

export type GeoGetTopArtistsRequest = {
  country: Country;
  limit?: Limit;
  page?: Page;
};
export type GeoGetTopArtistsResponse = {
  topartists: {
    artist: Array<{
      name: ArtistName;
      listeners: Listeners;
      mbid: Mbid;
      url: Url;
      image: Array<Image>;
    }>;
    "@attr": {
      country: Country;
      page: Page;
      perPage: ItemsPerPage;
      totalPages: TotalPages;
      total: Total;
    };
  };
};

export type GeoGetTopTracksRequest = {
  country: Country;
  location?: Loc;
  limit?: Limit;
  page?: Page;
};
export type GeoGetTopTracksResponse = {
  tracks: {
    track: Array<{
      name: TrackName;
      duration: Duration;
      listeners: Listeners;
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
      country: Country;
      page: Page;
      perPage: ItemsPerPage;
      totalPages: TotalPages;
      total: Total;
    };
  };
};
