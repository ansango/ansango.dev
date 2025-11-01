import type {
  AlbumName,
  ArtistName,
  Lang,
  Mbid,
  UserName,
  TagName,
  Url,
  Count,
  Limit,
  Page,
  Text,
  TotalResults,
  StartIndex,
  ItemsPerPage,
  For,
  Image,
  Duration,
  Name,
  Published,
  Summary,
  Content,
  Playcount,
  Listeners,
  Role,
  SearchTerms,
  StartPage,
} from "./base.types";

type AlbumTag = {
  tag?:
    | Array<{
        name: TagName;
        url: Url;
      }>
    | {
        name: TagName;
        url: Url;
      };
};

type AlbumTrackArtist = {
  name: ArtistName;
  mbid: Mbid;
  url: Url;
};

type AlbumTrack = {
  track: Array<{
    duration: Duration;
    name: Name;
    url: Url;
    artist: AlbumTrackArtist;
  }>;
};

type AlbumWiki = {
  published: Published;
  summary: Summary;
  content: Content;
};

/**
 * Album
 * @see https://www.last.fm/api/show/album.getInfo
 */

export type Album = {
  artist: ArtistName;
  mbid: Mbid;
  tags: AlbumTag;
  playcount: Playcount;
  image: Array<Image>;
  tracks?: AlbumTrack;
  url: Url;
  name: AlbumName;
  listeners: Listeners;
  wiki: AlbumWiki;
  userplaycount?: Playcount;
};

export type AlbumGetInfoRequest = {
  artist: ArtistName;
  album: AlbumName;
  mbid?: Mbid;
  username?: UserName;
  lang?: Lang;
};

export type AlbumGetInfoResponse = {
  album: Album;
};

export type AlbumGetTagsRequest = {
  artist: ArtistName;
  album: AlbumName;
  mbid?: Mbid;
  user: UserName;
};
export type AlbumGetTagsResponse = {
  tags: {
    tag: Array<{
      name: TagName;
      url: Url;
    }>;
  };
  "@attr": {
    album: AlbumName;
    artist: ArtistName;
  };
};

export type AlbumGetTopTagsRequest = {
  artist: ArtistName;
  album: AlbumName;
  mbid?: Mbid;
};
export type AlbumGetTopTagsResponse = {
  tags: {
    tag: Array<{
      name: TagName;
      url: Url;
      count: Count;
    }>;
  };
  "@attr": {
    album: AlbumName;
    artist: ArtistName;
  };
};

export type AlbumSearchRequest = {
  album: AlbumName;
  limit?: Limit;
  page?: Page;
};
export type AlbumSearchResponse = {
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
    albummatches: {
      album: Array<{
        name: AlbumName;
        artist: ArtistName;
        url: Url;
        image: Array<Image>;
        mbid: Mbid;
      }>;
    };

    "@attr": {
      for: For;
    };
  };
};
