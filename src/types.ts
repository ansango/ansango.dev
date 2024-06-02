export type EntriesPerPage = number;

export type Metadata = {
  title?: string;
  description: string;
  entriesPerPage: EntriesPerPage;
};

export type Site = {
  url: string;
  name: string;
  email: string;
  lang: string;
  pages: Record<string, Metadata>;
};
