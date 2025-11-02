/**
 * 🗂️ Raindrop Data Mappers
 * 
 * @description Transforms Raindrop.io API responses into normalized formats.
 * Filters, maps, and sanitizes bookmark and collection data.
 * 
 * @module lib/raindrop/mappers
 * 
 * @compatible
 * - 🧹 Normalizes API data structures
 * - 🔒 HTTPS enforcement for covers
 * - 🏷️ Tag limiting and management
 * - 🔤 Filters by site name
 */

import { site } from "@/constants";
import type { GetCollectionsResponse, Raindrop } from "./services";

/**
 * Maps an array of Raindrop objects to a normalized format for bookmarks.
 *
 * - Normalizes the `cover` property: if empty, sets to `undefined`; if present, ensures it uses HTTPS.
 * - Limits the `tags` array to the first 3 tags.
 *
 * @param bookmarks - The array of Raindrop objects to map.
 * @returns An array of mapped bookmark objects with normalized properties.
 */
export const bookmarksMapper = (bookmarks: Raindrop[]) =>
  bookmarks.map(
    ({
      _id,
      title,
      created,
      excerpt,
      collectionId,
      cover,
      link,
      tags,
      important: favorite,
    }) => ({
      _id,
      title,
      created,
      excerpt,
      collectionId,
      cover:
        cover === "" ? undefined : cover.replace(/^http?:\/\//, "https://"), // Normalize empty covers and use i.raindrop.io for better performance
      link,
      tags: tags.slice(0, 3),
      favorite,
    }),
  );

/**
 * Maps and filters collections from the Raindrop API response.
 *
 * - Filters collections whose titles include the current site's name.
 * - Removes the site name (with a trailing dot) from the collection title.
 * - Returns a simplified object with `_id`, `title`, `created`, `description`, and `count`.
 * - Sorts the resulting collections alphabetically by title.
 *
 * @param {GetCollectionsResponse} param0 - The response object containing the collections array.
 * @returns {Array<{ _id: number; title: string; created: string; description: string; count: number }>}
 *          The filtered, mapped, and sorted collections.
 */
export const collectionsMapper = ({ items }: GetCollectionsResponse) =>
  items
    .filter(({ title }) => title.includes(site.name))
    .map(({ _id, title, created, description, count }) => ({
      _id,
      title: title.replace(site.name.concat("."), ""),
      created,
      description,
      count,
    }))
    .sort((a, b) => a.title.localeCompare(b.title));
