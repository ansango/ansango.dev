export type Name = string;
export type Mbid = string;
export type Url = string;
export type Playcount = string;
export type Duration = string;
export type Listeners = string;
export type Position = string;

export type Published = string;
export type Summary = string;
export type Content = string;

export type ArtistName = Name;
export type AlbumName = Name;
export type TagName = Name;
export type TrackName = Name;
export type UserName = Name;

export type Age = string;
export type Subscriber = string;
export type RealName = string;
export type Bootstrap = string;
export type ArtistCount = string;
export type AlbumCount = string;
export type TrackCount = string;
export type Country = string;
export type Playlists = string;
export type Gender = string;
export type Type = string;

export type Unixtime = number;

export type From = string;
export type To = string;

export type Rank = string;

export type Text = string;
export type Uts = string;

export type Lang = string;

export type Match = string;

export type Role = string;
export type SearchTerms = string;
export type StartPage = string;

export type DateProp = {
  uts: Uts;
  "#text": Text;
};

export type TotalPages = string;
export type Total = string | number;
export type Page = string | number;
export type Count = string | number;
export type Limit = string | number;

export type TotalResults = string;
export type StartIndex = string;
export type ItemsPerPage = string;

export type For = string;

export type Reach = number;

export type Loc = string;

export type Image = {
  "#text": Text;
  size: "small" | "medium" | "large" | "extralarge" | "mega";
};

export type Period =
  | "overall"
  | "7day"
  | "1month"
  | "3month"
  | "6month"
  | "12month";
