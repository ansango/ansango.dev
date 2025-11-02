/**
 * 🔖 Raindrop.io Integration
 * 
 * @description Main entry point for Raindrop.io bookmark management.
 * Fetches, caches, and provides access to bookmarks and collections.
 * 
 * @module lib/raindrop
 * 
 * @compatible
 * - 📚 Powers bookmarks and reading pages
 * - 💾 Caches data to minimize API calls
 * - 📁 Collection-based organization
 * - 🔗 External link management
 */

import { bookmarksMapper, collectionsMapper } from "@/lib/raindrop/mappers";
import {
  getAllBookmarkItems,
  getRootCollections,
} from "@/lib/raindrop/services";

export * from "@/lib/raindrop/utils";

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
  title: string;
  created: string;
  excerpt: string;
  collectionId: number;
  cover?: string;
  link: string;
  tags?: string[];
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
  created: string;
  description: string;
  count: number;
};

/**
 * Represents the cached data structure for Raindrop, including bookmarks and collections.
 *
 * @property bookmarks - An array of cached bookmark data objects.
 * @property collections - An array of cached collection data objects.
 */
export type CacheRaindropData = {
  bookmarks: CachedBookmarkData[];
  collections: CachedCollectionData[];
};

/**
 * Caches the current Raindrop data for reuse within the application.
 *
 * This variable holds the cached data of type `CacheRaindropData` or `null` if no data is cached.
 * It is used to avoid redundant data fetching and improve performance.
 */
let cacheRaindropData: CacheRaindropData | null = null;

/**
 * Retrieves and caches raindrop data, including bookmarks and collections.
 * If the data has already been cached, returns the cached data instead of fetching again.
 *
 * @returns {Promise<{ bookmarks: ReturnType<typeof bookmarksMapper>, collections: ReturnType<typeof collectionsMapper> }>}
 *   An object containing mapped bookmarks and collections.
 */
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
