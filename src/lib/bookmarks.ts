/**
 * 🔖 Bookmarks Utility Functions
 *
 * @description Helper functions for working with bookmarks data from external service.
 * Fetches, filters, and transforms bookmark collections and entries.
 *
 * @module lib/bookmarks
 *
 * @compatible
 * - 🗂️ Collection management and filtering
 * - 📅 Date-based sorting
 * - 📊 Latest entries retrieval
 * - 🔄 Data transformation and mapping
 */

import { fetcher } from "./utils";

/**
 * Represents a cached bookmark entry from the external service.
 *
 * @property _id - Unique identifier for the bookmark
 * @property link - The URL of the bookmarked resource
 * @property title - The title of the bookmark
 * @property excerpt - A short excerpt or summary
 * @property note - Additional notes (any format)
 * @property type - Type of the bookmark resource
 * @property cover - URL to the cover image
 * @property tags - Array of tags associated with the bookmark
 * @property important - Flag indicating if bookmark is marked as important
 * @property removed - Flag indicating if bookmark has been removed
 * @property created - Creation date in ISO string format
 * @property collectionId - ID of the collection containing this bookmark
 * @property domain - Domain of the bookmarked URL
 * @property lastUpdate - Last update timestamp in ISO string format
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
 * Represents a cached collection from the external service.
 *
 * @property _id - Unique identifier of the collection
 * @property title - Title of the collection
 * @property description - Description of the collection (any format)
 * @property isPublic - Flag indicating if collection is public
 * @property count - Number of bookmarks in the collection
 * @property sort - Sort order value
 * @property lastAction - Timestamp of last action in ISO string format
 * @property created - Creation date in ISO string format
 * @property lastUpdate - Last update timestamp in ISO string format
 * @property lastSyncedAt - Last sync timestamp in ISO string format
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

/**
 * Fetches all bookmarks and collections from the external service.
 * Uses in-memory caching to avoid redundant API calls.
 *
 * @async
 * @returns Promise resolving to an object containing bookmarks and collections arrays
 * @throws Error if the service URL or API key is not configured
 * @throws Error if the API request fails
 *
 * @example
 * const { bookmarks, collections } = await getAllBookmarksData();
 */
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
 * Fetches all collections excluding the "reading" collection.
 * Useful for displaying general bookmarks collections separately from reading list.
 *
 * @async
 * @returns Promise resolving to array of collections (excluding "reading")
 * @throws Propagates any error thrown by getAllBookmarksData
 *
 * @example
 * const collections = await getCollectionsExcludingReading();
 * console.log(collections); // All collections except "reading"
 */
export const getCollectionsExcludingReading = async () => {
  const { collections } = await getAllBookmarksData();
  return collections.filter((c) => c.title !== "reading");
};

/**
 * Retrieves all bookmarks belonging to a specific collection by its title.
 * If the collection is not found, logs a warning and returns an empty array.
 *
 * @async
 * @param collection - The exact title of the collection (case-sensitive)
 * @returns Promise resolving to array of bookmarks in the specified collection
 *
 * @example
 * const bookmarks = await getBookmarksByCollection('Web Development');
 * // Returns all bookmarks in the "Web Development" collection
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
 * Bookmarks are sorted by creation date (newest first) and limited to specified count.
 * Each bookmark is augmented with a `collection` property set to "reading".
 *
 * @async
 * @param limit - Maximum number of bookmarks to return
 * @returns Promise resolving to array of latest reading bookmarks
 *
 * @example
 * const latestFive = await getLatestReading(5);
 * // Returns the 5 most recent bookmarks from "reading" collection
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
 * Fetches and transforms the latest reading bookmarks into a normalized format.
 * Maps bookmark data to a consistent structure suitable for display components.
 *
 * @async
 * @param limit - Maximum number of bookmarks to fetch and transform
 * @returns Promise resolving to array of mapped bookmark objects with normalized structure
 *
 * @example
 * const entries = await latestReadingMapped(10);
 * // Returns 10 latest bookmarks with structure:
 * // { collection, link, external: true, data: { title, description, date } }
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
