import type {
  AlbumName,
  ArtistName,
  Content,
  Count,
  Duration,
  For,
  Image,
  ItemsPerPage,
  Limit,
  Listeners,
  Match,
  Mbid,
  Page,
  Playcount,
  Position,
  Published,
  Role,
  SearchTerms,
  StartIndex,
  StartPage,
  Summary,
  TagName,
  TotalResults,
  TrackName,
  Url,
  UserName,
} from "./base.types";

export type TrackArtist = {
  name: ArtistName;
  mbid: Mbid;
  url: Url;
};

export type TrackAlbum = {
  artist: ArtistName;
  title: AlbumName;
  mbid: Mbid;
  url: Url;
  image: Array<Image>;
  "@attr": {
    position: Position;
  };
};

export type TrackTopTag = {
  tag: Array<{
    name: TagName;
    url: Url;
  }>;
};

export type TrackWiki = {
  published: Published;
  summary: Summary;
  content: Content;
};

/**
 * Track
 * @see https://www.last.fm/api/show/track.getInfo
 */

export type Track = {
  name: TrackName;
  mbid: Mbid;
  url: Url;
  duration: Duration;
  listeners: Listeners;
  playcount: Playcount;
  artist: TrackArtist;
  album: TrackAlbum;
  topTags: TrackTopTag;
  wiki: TrackWiki;
  userplaycount: Playcount;
};

export type TrackGetInfoRequest = {
  artist: ArtistName;
  track: TrackName;
  mbid?: Mbid;
  username?: UserName;
};
export type TrackGetInfoResponse = {
  track: Track;
};

export type TrackGetSimilarRequest = {
  artist: ArtistName;
  track: TrackName;
  mbid?: Mbid;
  limit?: Limit;
};
export type TrackGetSimilarResponse = {
  similartracks: {
    track: Array<{
      name: TrackName;
      playcount: Playcount;
      mbid: Mbid;
      match: Match;
      url: Url;
      duration: Duration;
      artist: {
        name: ArtistName;
        mbid: Mbid;
        url: Url;
      };
      image: Array<Image>;
    }>;
    "@attr": {
      artist: ArtistName;
    };
  };
};

export type TrackGetTagsRequest = {
  artist: ArtistName;
  track: TrackName;
  mbid?: Mbid;
  user?: UserName;
};
export type TrackGetTagsResponse = {
  tags: {
    tag: Array<{
      name: TagName;
      url: Url;
    }>;
    "@attr": {
      artist: ArtistName;
      track: TrackName;
    };
  };
};

export type TrackGetTopTagsRequest = {
  artist: ArtistName;
  track: TrackName;
  mbid?: Mbid;
};
export type TrackGetTopTagsResponse = {
  toptags: {
    tag: Array<{
      name: TagName;
      url: Url;
      count: Count;
    }>;
    "@attr": {
      artist: ArtistName;
      track: TrackName;
    };
  };
};

export type TrackSearchRequest = {
  track: TrackName;
  limit?: Limit;
  page?: Page;
  artist?: ArtistName;
};
export type TrackSearchResponse = {
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
    trackmatches: {
      track: Array<{
        name: TrackName;
        artist: ArtistName;
        url: Url;
        listeners: Listeners;
        image: Array<Image>;
        mbid: Mbid;
      }>;
    };
    "@attr": {
      for: For;
    };
  };
};

export type TrackScrobbleRequest = {
  artist: ArtistName;
  track: TrackName;
  timestamp: string;
  sk: string;
  album?: AlbumName;
};
export type TrackScrobbleResponse = {
  scrobbles: {
    scrobble: {
      artist: {
        corrected: string;
        "#text": ArtistName;
      };
      album: {
        corrected: string;
      };
      track: {
        corrected: string;
        "#text": TrackName;
      };
      ignoredMessage: { code: string; "#text": string };
      albumArtist: {
        corrected: string;
        "#text": AlbumName;
      };
      timestamp: string;
    };
    "@attr": {
      accepted: number;
      ignored: number;
    };
  };
};

export type BatchTracksScrobbleRequest = {
  tracks: Array<Omit<TrackScrobbleRequest, "sk">>;
  sk: string;
};
