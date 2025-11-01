import type {
  ArtistName,
  Count,
  Image,
  ItemsPerPage,
  Limit,
  Mbid,
  Page,
  Playcount,
  Total,
  TotalPages,
  Url,
  UserName,
} from "./base.types";

export type LibraryGetArtistsRequest = {
  user: UserName;
  limit?: Limit;
  page?: Page;
};
export type LibraryGetArtistsResponse = {
  artists: {
    artist: Array<{
      tagCount: Count;
      image: Array<Image>;
      mbid: Mbid;
      url: Url;
      playcount: Playcount;
      name: ArtistName;
    }>;
    "@attr": {
      user: UserName;
      totalPages: TotalPages;
      page: Page;
      perPage: ItemsPerPage;
      total: Total;
    };
  };
};
