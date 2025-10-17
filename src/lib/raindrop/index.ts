import { bookmarksMapper, collectionsMapper } from "./mappers";
import { getAllBookmarkItems, getRootCollections } from "./services";

export type CachedBookmarkData = {
  _id: number;
  title: string;
  created: string;
  excerpt: string;
  collectionId: number;
  cover: string;
  link: string;
  tags?: string[];
};

export type CachedCollectionData = {
  _id: number;
  title: string;
  created: string;
  description: string;
};

export type CacheRaindropData = {
  bookmarks: CachedBookmarkData[];
  collections: CachedCollectionData[];
};

let cacheRaindropData: CacheRaindropData | null = null;

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
  const { collections } = await getRaindropData();
  return collections.filter((c) => c.title !== "reading");
};

export const getBookmarksByCollection = async (collection: string) => {
  const { bookmarks, collections } = await getRaindropData();
  const collectionId = collections.find((c) => c.title === collection)?._id;
  if (!collectionId) {
    console.warn(`Collection not found: ${collection}`);
    return [];
  }
  return bookmarks.filter((b) => b.collectionId === collectionId);
};

export const getLatestReading = async (limit: number) => {
  const bookmarks = await getBookmarksByCollection("reading");
  const sortedBookmarks = bookmarks.sort(
    (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime(),
  );
  const latestBookmarks = sortedBookmarks.slice(0, limit);
  return latestBookmarks.map((b) => ({
    ...b,
    collection: "reading",
  }));
};
