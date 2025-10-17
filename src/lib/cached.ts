import { site } from "@/constants";

const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${import.meta.env.RAINDROP_ACCESS_TOKEN}`,
  },
};

const RAINDROP_API_URL = "https://api.raindrop.io/rest/v1";

export interface Raindrop {
  _id: number;
  link: string;
  title: string;
  excerpt: string;
  note: string;
  type: string;
  cover: string;
  tags: string[];
  important: boolean;
  removed: boolean;
  created: string;
  collection: { $ref: string; $id: number; oid: number };
  highlights: string[];
  lastUpdate: string;
  domain: string;
  collectionId: number;
}

interface RaindropCollection {
  _id: number;
  title: string;
  description: string;
  public: boolean;
  count: number;
  sort: number;
  lastAction: string;
  created: string;
  lastUpdate: string;
}

interface GetBookmarkItemsResponse {
  items: Raindrop[];
  count: number;
}

export const getBookmarkItems = async (
  id = 0,
  pageIndex = 0
): Promise<GetBookmarkItemsResponse | null> => {
  if (typeof pageIndex !== "number" || pageIndex < 0) {
    throw new Error("Invalid page index");
  }

  try {
    const response = await fetch(
      `${RAINDROP_API_URL}/raindrops/${id}?` +
        new URLSearchParams({
          page: String(pageIndex),
          perpage: String(50),
        }),
      options
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch bookmark items: ${error}`);
    return null;
  }
};

export const getAllBookmarkItems = async (id = 0) => {
  const allItems: Raindrop[] = [];
  let pageIndex = 0;
  let totalItems = 0;

  do {
    const data = await getBookmarkItems(id, pageIndex);
    if (data && data.items) {
      allItems.push(...data.items);
      totalItems = data.count || 0;
      pageIndex++;
      console.log(
        `Fetched page ${pageIndex}, total items so far: ${allItems.length}`
      );
    } else {
      break;
    }
  } while (allItems.length < totalItems);

  return allItems.sort(
    (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()
  );
};

interface GetCollectionsResponse {
  items: RaindropCollection[];
  result: boolean;
}

export const getRootCollections =
  async (): Promise<GetCollectionsResponse | null> => {
    try {
      const response = await fetch(`${RAINDROP_API_URL}/collections`, options);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Failed to fetch collections: ${error}`);
      return null;
    }
  };

const bookmarksMapper = (bookmarks: Raindrop[]) =>
  bookmarks.map(
    ({ _id, title, created, excerpt, collectionId, cover, link,tags }) => ({
      _id,
      title,
      created,
      excerpt,
      collectionId,
      cover,
      link,
      tags: tags.slice(0,3),
    })
  );

const collectionsMapper = ({ items }: GetCollectionsResponse) =>
  items
    .filter(({ title }) => title.includes(site.name))
    .map(({ _id, title, created, description }) => ({
      _id,
      title: title.replace(site.name.concat("."), ""),
      created,
      description,
    }));


export type CachedBookmarkData = {
  _id: number;
  title: string;
  created: string;
  excerpt: string;
  collectionId: number;
  cover: string;
  link: string;
  tags?: string[];
}

export type CachedCollectionData = {
  _id: number;
  title: string;
  created: string;
  description: string;
}

export type CacheRaindropData = { bookmarks: CachedBookmarkData[];
  collections: CachedCollectionData[] }

let cacheRaindropData: CacheRaindropData | null = null

export const getRaindropData = async () => {
  if (cacheRaindropData) {
    console.info("Returning cached data");
    return cacheRaindropData;
  }
  const bookmarks = await getAllBookmarkItems();
  const collections = await getRootCollections();

  cacheRaindropData = {
    bookmarks: bookmarksMapper(bookmarks),
    collections: collectionsMapper(collections!),
  };
  return cacheRaindropData;
};


export const getCollectionsExcludingReading = async () => {
  const {collections} = await getRaindropData();
  return collections.filter(c => c.title !== "reading");
}

export const getBookmarksByCollection = async (collection: string) => {
  const {bookmarks,collections} = await getRaindropData();
  const collectionId = collections.find(c => c.title === collection)?._id;
  if (!collectionId) {
    console.warn(`Collection not found: ${collection}`);
    return [];
  }
  return bookmarks.filter(b => b.collectionId === collectionId);
}