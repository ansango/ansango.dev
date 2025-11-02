/**
 * 📚 Content Collections Manager
 * 
 * @description Core utilities for managing Astro content collections.
 * Handles fetching, filtering, sorting, pagination, and grouping of entries.
 * 
 * @module lib/collections
 * 
 * @compatible
 * - 📄 Used throughout the site for content retrieval
 * - 🏷️ Tag extraction and grouping
 * - 🔢 Pagination support
 * - 📅 Date-based sorting and grouping
 * - 🔍 Filtering published content
 */

import {
  getCollection,
  type InferEntrySchema,
  type RenderedContent,
} from "astro:content";
import { slugify } from "./utils";
import { collectionNames, type CollectionName } from "@/content.config";
import { site } from "@/constants";

/**
 * Represents a single content entry from an Astro collection.
 *
 * @property {string} id - Unique entry identifier.
 * @property {InferEntrySchema<CollectionName>} data - Frontmatter data inferred from the collection schema.
 * @property {string} body - Raw content body (markdown) as string.
 * @property {string} [filePath] - Optional file path for the source file.
 * @property {RenderedContent} rendered - The rendered content produced by Astro.
 * @property {CollectionName} collection - The collection name this entry belongs to.
 */
export type Entry = {
  id: string;
  data: InferEntrySchema<CollectionName>;
  body: string;
  filePath?: string;
  rendered: RenderedContent;
  collection: CollectionName;
};

/**
 * Array of content entries.
 * @typedef {Entry[]} Entries
 */
export type Entries = Entry[];

/**
 * Load all configured content collections concurrently and flatten the result.
 *
 * @returns {Promise<Entries>} Promise resolving to all entries from all collections (unfiltered).
 */
export const getAllPromiseCollections = async () => {
  const collections = await Promise.all(
    collectionNames.map((name: any) => getCollection(name)),
  );
  return collections.flat() as Entries;
};

/**
 * Retrieve all published entries from all collections, normalize tags (slugify), and sort by date desc.
 *
 * @returns {Promise<Entries>} Sorted and filtered entries.
 */
export const getAllCollections = async () => {
  const collections = await getAllPromiseCollections();
  return collections
    .filter(({ data: { published } }) => published)
    .map((entry) => {
      return {
        ...entry,
        data: {
          ...entry.data,
          tags: entry.data.tags?.map((tag: string) => slugify(tag)) || [],
        },
      };
    })
    .sort((a, b) => {
      return (
        new Date(b.data.date || 0).getTime() -
        new Date(a.data.date || 0).getTime()
      );
    });
};

/**
 * Group all collections by their collection name and return a sorted mapping by collection key.
 *
 * @returns {Promise<Record<string, Entries>>} An object keyed by collection name containing entries for each collection.
 */
export const getAllCollectionsByCategory = async (): Promise<
  Record<CollectionName, Entries>
> => {
  const content = await getAllCollections();
  const contentByCategory = content.reduce(
    (acc: { [key: string]: any }, entry) => {
      if (!acc[entry.collection]) {
        acc[entry.collection] = [];
      }
      acc[entry.collection].push(entry);
      return acc;
    },
    {},
  );

  const sortedContentByCategory: { [key: string]: Entries } = {};

  Object.keys(contentByCategory)
    .sort()
    .forEach((key) => {
      sortedContentByCategory[key] = contentByCategory[key];
    });

  return sortedContentByCategory as Record<CollectionName, Entries>;
};

/**
 * Return the most recent `entriesLength` entries across all collections.
 *
 * @param {number} [entriesLength=1] Number of entries to return (default 1).
 * @returns {Promise<Entries>} The sliced array of entries.
 */
export const getLastEntriesByAllCollections = async (entriesLength = 1) => {
  const collections = await getAllCollections();
  return collections.slice(0, entriesLength);
};

/**
 * Compute page numbers for pagination given a total number of posts and entries per page.
 *
 * @param {number} numberOfPosts Total posts to paginate.
 * @param {number} entriesPerPage Posts per page.
 * @returns {number[]} Array of page numbers (1-based).
 */
export const getPageNumbers = (
  numberOfPosts: number,
  entriesPerPage: number,
) => {
  const numberOfPages = numberOfPosts / Number(entriesPerPage);

  let pageNumbers: number[] = [];
  for (let i = 1; i <= Math.ceil(numberOfPages); i++) {
    pageNumbers = [...pageNumbers, i];
  }

  return pageNumbers;
};

/**
 * Build paginated route descriptors (pageNumber + collection) for all collections
 * respecting the `entriesPerPage` configured in `site.pages`.
 *
 * @returns {Promise<Array<{pageNumber: number, collection: string}>>}
 */
export const getAllNumberPaths = async () => {
  const contentByCategory = await getAllCollectionsByCategory();
  return Object.keys(contentByCategory)
    .map((collection) => {
      const collectionContent = contentByCategory[collection as CollectionName];
      const entriesPerPage =
        site.pages[collection as CollectionName]?.entriesPerPage || 10;
      const pathNumbers = getPageNumbers(
        collectionContent.length,
        entriesPerPage,
      );
      return pathNumbers.map((pageNumber) => ({
        pageNumber,
        collection,
      }));
    })
    .flat();
};

/**
 * Collect all unique tags (slugified) from published collections and return them sorted.
 *
 * @returns {Promise<string[]>} Sorted unique tag slugs.
 */
export const getUniqueTags = async () => {
  const collections = await getAllCollections();
  const tags = new Set<string>();
  for (const collection of collections) {
    if (collection.data?.tags) {
      for (const tag of collection.data.tags) {
        tags.add(slugify(tag));
      }
    }
  }

  return Array.from(tags).sort();
};

const abc = "abcdefghijklmnopqrstuvwxyz".split("");

/**
 * Return up to `limitAtLetter` tags for each starting letter (a-z) and non-alphabetical tags grouped under '#'.
 * The result is a flattened array of the selected tags.
 *
 * @param {number} [limitAtLetter=3] Maximum tags to select per starting letter.
 * @returns {Promise<string[]>} Flattened array of tags limited by letter.
 */
export const getTagsLimitedByLetter = async (limitAtLetter = 3) => {
  const tags = await getUniqueTags();
  const mappedTags = tags.reduce((acc: Record<string, string[]>, tag) => {
    const letter = tag[0].toLowerCase();
    if (!abc.includes(letter)) {
      acc["#"] = acc["#"] || [];
      acc["#"].push(tag);
    } else {
      acc[letter] = acc[letter] || [];
      acc[letter].push(tag);
    }
    return acc;
  }, {});

  return Object.values(mappedTags)
    .map((tags) => {
      return tags.slice(0, limitAtLetter);
    })
    .flat();
};

/**
 * Props used by the `getPagination` helper.
 *
 * @template T
 * @property {T} entries The entries array to paginate.
 * @property {string|number} page The requested page number.
 * @property {boolean} [isIndex] Whether this is the index page (defaults to false).
 * @property {number} entriesPerPage Number of entries per page.
 */
type GetPaginationProps<T> = {
  entries: T;
  page: string | number;
  isIndex?: boolean;
  entriesPerPage: number;
};

/**
 * Paginate an array of entries.
 *
 * @template T
 * @param {Object} params
 * @param {T[]} params.entries The array of entries to paginate.
 * @param {string|number} params.page Requested page number.
 * @param {boolean} [params.isIndex=false] If true, returns first page entries.
 * @param {number} params.entriesPerPage Number of entries per page.
 * @returns {{ totalPages: number, currentPage: number, paginatedEntries: T[] }} Pagination metadata and paginated items.
 */
export const getPagination = <T>({
  entries,
  page,
  isIndex = false,
  entriesPerPage,
}: GetPaginationProps<T[]>) => {
  const totalPagesArray = getPageNumbers(entries.length, entriesPerPage);
  const totalPages = totalPagesArray.length;

  const currentPage = isIndex
    ? 1
    : page && !isNaN(Number(page)) && totalPagesArray.includes(Number(page))
      ? Number(page)
      : 0;

  const lastEntry = isIndex ? entriesPerPage : currentPage * entriesPerPage;
  const startEntry = isIndex ? 0 : lastEntry - entriesPerPage;
  const paginatedEntries = entries.slice(startEntry, lastEntry);

  return {
    totalPages,
    currentPage,
    paginatedEntries,
  };
};

/**
 * Filter collections to those that include the provided tag.
 *
 * @param {string} tag Tag to filter by (slugified expected).
 * @returns {Promise<Entries>} Array of entries that contain the tag.
 */
export const getCollectionsByTag = async (tag: string) => {
  const collections = await getAllCollections();
  return collections.filter((collection) => {
    return collection.data.tags?.includes(tag);
  });
};

/**
 * Group unique tags by their starting letter (a-z). Non-alphabetic tags are excluded here.
 *
 * @returns {Promise<Record<string, string[]>>} Mapping of letter (a-z) to tags.
 */
export const getTagsGroupedByLetter = async () => {
  const tags = await getUniqueTags();
  return abc.reduce((acc: Record<string, string[]>, letter) => {
    acc[letter] = tags.filter((tag) => tag.startsWith(letter));
    return acc;
  }, {});
};

/**
 * Return all collections sorted by publication year (descending).
 *
 * @returns {Promise<Entries>} Array of entries sorted by year descending.
 */
export const getSortedCollectionsByYear = async () => {
  const collections = await getAllCollections();
  return collections.sort((a, b) => {
    if (!a.data.date) return -1;
    if (!b.data.date) return 1;
    return (
      new Date(b.data.date).getFullYear() - new Date(a.data.date).getFullYear()
    );
  });
};

/**
 * Group a list of collections by publication year.
 * The input array is left unmodified (a copy is used) to avoid side effects.
 *
 * @param {Entries} collections Array of entries to group by year.
 * @returns {Record<string | number, Entries>} Mapping of year to entries published that year.
 */
export const getCollectionsByYear = (collections: Entries) => {
  collections.sort((a, b) => {
    if (!a.data.date) return -1;
    if (!b.data.date) return 1;
    return (
      new Date(b.data.date).getFullYear() - new Date(a.data.date).getFullYear()
    );
  });

  return collections.reduce(
    (acc, publication) => {
      const year = new Date(publication.data.date ?? "").getFullYear();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(publication);
      return acc;
    },
    {} as Record<string | number, typeof collections>,
  );
};

/**
 * Determines whether a collection is simple based on its entries.
 * @param entries - Optional array of entries to check
 * @returns `true` if entries exist and at least one entry has `data.index` set to `true`, otherwise `false`
 */
export const getIsSimpleCollection = (entries?: Entries) => {
  if (!entries || entries.length === 0) return false;
  return entries.some(({ data }: { data: any }) => data.index === true);
};
