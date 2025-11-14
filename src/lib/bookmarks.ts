/**
 * 🧰 Raindrop Utility Functions
 *
 * @description Helper functions for working with Raindrop data.
 * Filters collections, fetches bookmarks by collection, and maps data.
 *
 * @module lib/raindrop/utils
 *
 * @compatible
 * - 🔍 Filters reading vs other collections
 * - 📅 Date-based sorting
 * - 📊 Latest entries retrieval
 * - 🗂️ Data transformation for entries
 */

import { fetcher } from "./utils";

/**
 * Represents the cached data structure for a bookmark.
 *
 * @property _id - Unique identifier for the bookmark.
 * @property title - The title of the bookmark.
 * @property created - The creation date of the bookmark in ISO string format.
 * @property excerpt - A short excerpt or summary of the bookmark.
 * @property collectionId - Identifier for the collection to which the bookmark belongs.
 * @property cover - (Optional) URL to the cover image of the bookmark.
 * @property link - The URL link of the bookmark.
 * @property tags - (Optional) Array of tags associated with the bookmark.
 */
export type CachedBookmarkData = {
  _id: number;
  link: string;
  title: string;
  excerpt: string;
  note: any;
  type: string;
  cover: string;
  tags: string[];
  important: boolean;
  removed: boolean;
  created: string;
  collectionId: number;
  domain: string;
  lastUpdate: string;
};

/**
 * Represents the cached data for a collection.
 *
 * @property _id - The unique identifier of the collection.
 * @property title - The title of the collection.
 * @property created - The creation date of the collection, as an ISO string.
 * @property description - A brief description of the collection.
 * @property count - The number of items in the collection.
 */
export type CachedCollectionData = {
  _id: number;
  title: string;
  description: any;
  isPublic: boolean;
  count: number;
  sort: number;
  lastAction: string;
  created: string;
  lastUpdate: string;
  lastSyncedAt: string;
};

let cachedBookmarksData: {
  bookmarks: CachedBookmarkData[];
  collections: CachedCollectionData[];
} | null = null;

export const getAllBookmarksData = async () => {
  if (cachedBookmarksData) {
    return cachedBookmarksData;
  }

  const serviceUrl = import.meta.env.SERVICE_URL;
  const apiKey = import.meta.env.SERVICE_API_KEY;
  const { bookmarks } = await fetcher<{
    bookmarks: CachedBookmarkData[];
  }>(`${serviceUrl}/bookmarks/all`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });

  const { collections } = await fetcher<{
    collections: CachedCollectionData[];
  }>(`${serviceUrl}/bookmarks/collections`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });

  cachedBookmarksData = { bookmarks, collections };

  return cachedBookmarksData;
};

/**
 * Fetches Raindrop collections and returns those whose title is not "reading".
 *
 * Calls `getRaindropData()` and filters the returned collections to exclude any
 * collection with a `title` exactly equal to "reading" (case-sensitive).
 *
 * @async
 * @returns {Promise<Collection[]>} Promise resolving to an array of collections excluding the "reading" collection.
 * @throws Propagates any error thrown by `getRaindropData()`.
 * @example
 * const collections = await getCollectionsExcludingReading();
 * console.log(collections);
 *
 * @see getRaindropData
 */
export const getCollectionsExcludingReading = async () => {
  const { collections } = await getAllBookmarksData();
  return collections.filter((c) => c.title !== "reading");
};

/**
 * Retrieve bookmarks belonging to a Raindrop collection identified by its title.
 *
 * Fetches the cached Raindrop data (bookmarks and collections), finds the collection
 * whose title exactly matches the provided `collection` string, and returns all
 * bookmarks with a matching `collectionId`. If the collection cannot be found,
 * a warning is logged and an empty array is returned.
 *
 * @param collection - The exact title of the collection to filter by (case-sensitive).
 * @returns A promise that resolves to an array of bookmarks for the specified collection,
 *          or an empty array if the collection is not found.
 * @async
 * @example
 * const bookmarks = await getBookmarksByCollection('Read Later');
 */
export const getBookmarksByCollection = async (collection: string) => {
  const { bookmarks, collections } = await getAllBookmarksData();

  const collectionId = collections.find((c) => c.title === collection)?._id;

  if (!collectionId) {
    console.warn(`Collection not found: ${collection}`);
    return [];
  }

  return bookmarks.filter((b) => b.collectionId === collectionId);
};

/**
 * Retrieves the latest bookmarks from the "reading" collection.
 *
 * Fetches all bookmarks in the "reading" collection, sorts them by their
 * `created` timestamp in descending order (newest first), and returns up to
 * `limit` items. Each returned bookmark is augmented with a `collection`
 * property set to `"reading"`.
 *
 * @async
 * @param limit - The maximum number of latest readings to return. Should be a
 *   non-negative integer; if `limit` exceeds available bookmarks, all bookmarks
 *   are returned. Note: a negative value follows Array.prototype.slice
 *   semantics and will exclude trailing items.
 * @returns A Promise that resolves to an array of bookmark objects (original
 *   properties preserved) each extended with `{ collection: "reading" }`.
 * @throws If fetching bookmarks via `getBookmarksByCollection("reading")`
 *   fails, the promise will reject with the underlying error.
 *
 * @remarks
 * - Sorting is performed by parsing the `created` field as a Date.
 * - The function does not mutate the original bookmark objects; new objects
 *   with the added `collection` property are returned.
 *
 * @example
 * const latestFive = await getLatestReading(5);
 */
export const getLatestReading = async (limit: number) => {
  const bookmarks = await getBookmarksByCollection("reading");
  const latestBookmarks = bookmarks.slice(0, limit);
  return latestBookmarks.map((b) => ({
    ...b,
    collection: "reading",
  }));
};

/**
 * Fetches the most recent reading/bookmark entries and maps them into a normalized shape.
 *
 * Calls getLatestReading(limit) to retrieve the latest bookmarks and transforms each entry
 * into an object containing the original collection and link, a flag indicating the entry
 * is external, and a data object with title, description (mapped from excerpt), and date
 * (mapped from created).
 *
 * @async
 * @param limit - Maximum number of recent bookmarks to fetch and map.
 * @returns A promise that resolves to an array of mapped bookmark objects:
 *   [
 *     {
 *       collection: string;
 *       link: string;
 *       external: true;
 *       data: {
 *         title: string;
 *         description?: string;
 *         date: string | Date;
 *       };
 *     },
 *     ...
 *   ]
 *
 * @throws Propagates any errors thrown by getLatestReading.
 */
export const latestReadingMapped = async (limit: number) => {
  const latestBookmarks = await getLatestReading(limit);
  return latestBookmarks.map(
    ({ title, excerpt: description, created: date, collection, link }) => {
      return {
        collection,
        link,
        external: true,
        data: {
          title,
          description,
          date,
        },
      };
    },
  );
};
