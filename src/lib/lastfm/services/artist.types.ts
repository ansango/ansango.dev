import type {
  ArtistName,
  Content,
  Count,
  For,
  Image,
  ItemsPerPage,
  Lang,
  Limit,
  Listeners,
  Match,
  Mbid,
  Page,
  Playcount,
  Published,
  Rank,
  Role,
  SearchTerms,
  StartIndex,
  StartPage,
  Summary,
  TagName,
  Text,
  Total,
  TotalPages,
  TotalResults,
  Url,
  UserName,
} from "./base.types";

export type ArtistStats = {
  listeners: Listeners;
  playcount: Playcount;
  userplaycount?: Playcount;
};
export type ArtistSimilar = {
  artist: Array<{
    name: ArtistName;
    url: Url;
    image: Array<Image>;
  }>;
};
export type ArtistTags = {
  tag: Array<{
    name: TagName;
    url: Url;
  }>;
};
export type ArtistBio = {
  links: {
    link: {
      "#text": Text;
      rel: string;
      href: string;
    };
  };
  published: Published;
  summary: Summary;
  content: Content;
};

/**
 * Artist
 * @see https://www.last.fm/api/show/artist.getInfo
 */

export type Artist = {
  name: ArtistName;
  mbid: Mbid;
  url: Url;
  image: Array<Image>;
  ontour: string;
  stats: ArtistStats;
  similar: ArtistSimilar;
  tags: ArtistTags;
  bio: ArtistBio;
};

export type ArtistGetInfoRequest = {
  artist: ArtistName;
  mbid?: Mbid;
  lang?: Lang;
  user?: UserName;
};
export type ArtistGetInfoResponse = {
  artist: Artist;
};

export type ArtistGetTagsRequest = {
  artist: ArtistName;
  mbid?: Mbid;
  limit?: Limit;
};
export type ArtistGetTagsResponse = {
  tags: {
    tag: Array<{
      name: TagName;
      url: Url;
    }>;
    "@attr": {
      artist: ArtistName;
    };
  };
};

export type ArtistGetSimilarRequest = {
  artist: ArtistName;
  mbid?: Mbid;
  limit?: Limit;
};
export type ArtistGetSimilarResponse = {
  similarartists: {
    artist: Array<{
      name: ArtistName;
      match: Match;
      url: Url;
      image: Array<Image>;
    }>;
    "@attr": {
      artist: ArtistName;
    };
  };
};

export type ArtistGetTopAlbumsRequest = {
  artist: ArtistName;
  mbid?: Mbid;
  limit?: Limit;
  page?: Page;
};
export type ArtistGetTopAlbumsResponse = {
  topalbums: {
    album: Array<{
      name: ArtistName;
      playcount: Playcount;
      mbid: Mbid;
      url: Url;
      artist: {
        name: ArtistName;
        mbid: Mbid;
        url: Url;
      };
      image: Array<Image>;
    }>;
    "@attr": {
      artist: ArtistName;
      page: Page;
      perPage: ItemsPerPage;
      totalPages: TotalPages;
      total: Total;
    };
  };
};

export type ArtistGetTopTagsRequest = {
  artist: ArtistName;
  mbid?: Mbid;
};
export type ArtistGetTopTagsResponse = {
  toptags: {
    tag: Array<{
      name: TagName;
      url: Url;
      count: Count;
    }>;

    "@attr": {
      artist: ArtistName;
    };
  };
};

export type ArtistGetTopTracksRequest = {
  artist: ArtistName;
  mbid?: Mbid;
  limit?: Limit;
  page?: Page;
};
export type ArtistGetTopTracksResponse = {
  toptracks: {
    track: Array<{
      name: ArtistName;
      playcount: Playcount;
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
      artist: ArtistName;
      page: Page;
      perPage: ItemsPerPage;
      totalPages: TotalPages;
      total: Total;
    };
  };
};

export type ArtistSearchRequest = {
  artist: ArtistName;
  limit?: Limit;
  page?: Page;
};
export type ArtistSearchResponse = {
  results: {
    "opensearch:Query": {
      "#text": Text;
      role: Role;
      searchTerms: SearchTerms;
      startPage: StartPage;
    };
    "opensearch:totalResults": TotalResults;
    "opensearch:startIndex": StartIndex;
    "opensearch:itemsPerPage": ItemsPerPage;
    artistmatches: {
      artist: Array<{
        name: ArtistName;
        listeners: Listeners;
        mbid: Mbid;
        url: Url;
        image: Array<Image>;
      }>;
    };
    "@attr": {
      for: For;
    };
  };
};
