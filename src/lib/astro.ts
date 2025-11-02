/**
 * 🗂️ Astro Static Path Generators
 * 
 * @description Collection of functions to generate static paths for Astro SSG.
 * Handles routing for collections, archives, tags, bookmarks, and pagination.
 * 
 * @module lib/astro
 * 
 * @compatible
 * - 📄 Used in [...slug].astro and [page].astro routes
 * - 🔢 Handles pagination for all content types
 * - 🏷️ Tag-based routing and filtering
 * - 🔖 Raindrop.io bookmark collections
 */

import { collectionNames } from "@/content.config";
import { getPageNumbers } from "./utils";
import { site } from "@/constants";
import {
  getAllCollections,
  getAllNumberPaths,
  getSortedCollectionsByYear,
  getUniqueTags,
} from "@/lib/collections";

import {
  getBookmarksByCollection,
  getCollectionsExcludingReading,
  getRaindropData,
} from "@/lib/raindrop";

/**
 * Generates an array of static path objects for each collection name.
 *
 * @returns An array of objects, each containing a `params` property with the collection name.
 * This is typically used for static site generation to define dynamic routes based on collection names.
 */

export const getCollectionStaticPaths = () => {
  return collectionNames.map((collection) => ({
    params: { collection },
  }));
};

/**
 * Generates an array of static path objects for collections and paginated pages.
 *
 * This function retrieves all content collections and paginated paths, then maps them
 * into objects suitable for static site generation. For each collection entry (excluding
 * those marked as index), it creates a path with the collection name and entry ID as the slug.
 * For paginated paths (excluding the first page), it creates a path with the collection name
 * and the page number as the slug.
 *
 * @returns {Promise<Array<{ params: { collection: string; slug: string }, props: { entry: any } }>>}
 *   A promise that resolves to an array of objects containing route parameters and props for static generation.
 */

export const getCollectionStaticPathsSlug = async () => {
  const content = await getAllCollections();
  const pagesPaths = await getAllNumberPaths();
  const contentResult = content
    .map((entry) => {
      if (entry.data.index) {
        return null;
      }
      return {
        params: { collection: entry.collection, slug: entry.id },
        props: { entry },
      };
    })
    .filter((v) => v !== null);

  const pagesResult = pagesPaths
    .map(({ collection, pageNumber }) => {
      if (pageNumber === 1) {
        return null;
      }
      return {
        params: { collection, slug: pageNumber.toString() },
        props: { entry: null },
      };
    })
    .filter((v) => v !== null);

  return [...contentResult, ...pagesResult];
};

/**
 * Generates the static paths for paginated archive pages.
 *
 * This function retrieves all content collections grouped by year,
 * calculates the total number of archive pages based on the configured
 * number of entries per page, and returns an array of path parameters
 * for each archive page.
 *
 * @returns {Promise<Array<{ params: { page: number } }>>}
 *   A promise that resolves to an array of objects, each containing
 *   the `page` parameter for static path generation.
 */

export const getArchiveStaticPathsPage = async () => {
  const content = await getSortedCollectionsByYear();

  const totalPages = getPageNumbers(
    content.length,
    site.pages.archive.entriesPerPage || 10,
  );

  return totalPages.map((page) => {
    return {
      params: { page },
    };
  });
};

/**
 * Generates static paths for each unique tag.
 *
 * This function retrieves all unique tags using `getUniqueTags` and returns
 * an array of objects, each containing `params` and `props` for a tag.
 * Typically used in static site generation to pre-render pages for each tag.
 *
 * @returns {Promise<Array<{ params: { tag: string }, props: { tag: string } }>>}
 *   A promise that resolves to an array of objects with `params` and `props` for each tag.
 */

export const getTagStaticPaths = async () => {
  const tags = await getUniqueTags();
  return tags.map((tag) => {
    return {
      params: { tag },
      props: { tag },
    };
  });
};

/**
 * Generates static paths for paginated tag pages.
 *
 * This function retrieves all unique tags and, for each tag, determines the number of pages
 * required based on the number of collections associated with that tag and the configured
 * number of entries per page. It returns an array of path parameter objects for each tag and page.
 *
 * @returns {Promise<Array<{ params: { tag: string; page: number } }>>}
 *   A promise that resolves to an array of objects, each containing the tag and page number
 *   as route parameters for static generation.
 */

export const getTagStaticPathsPage = async () => {
  const content = await getAllCollections();
  const tags = await getUniqueTags();
  return tags.flatMap((tag) => {
    const allCollections = content.filter((collection) =>
      collection.data.tags?.includes(tag),
    );

    const totalPages = getPageNumbers(
      allCollections.length,
      site.pages.tags.entriesPerPage,
    );
    return totalPages.map((page) => {
      return {
        params: {
          tag,
          page,
        },
      };
    });
  });
};

/**
 * Generates the static paths for paginated "reading" bookmark pages.
 *
 * This function retrieves all bookmarks from the "reading" collection,
 * calculates the total number of pages based on the configured entries per page,
 * and returns an array of path parameter objects for each page.
 *
 * @returns {Promise<Array<{ params: { page: number } }>>}
 *   A promise that resolves to an array of objects, each containing the page number as a route parameter.
 */

export const getReadingStaticPathsPage = async () => {
  const entries = await getBookmarksByCollection("reading");
  const totalPages = getPageNumbers(
    entries.length,
    site.pages.reading.entriesPerPage,
  );

  return totalPages.map((page) => {
    return {
      params: { page },
    };
  });
};

/**
 * Asynchronously generates static paths for bookmark collections, excluding those marked as "reading".
 *
 * This function retrieves all bookmark collections except those related to reading,
 * and maps each collection to an object containing route parameters for static site generation.
 *
 * @returns {Promise<Array<{ params: { collection: string } }>>}
 *   A promise that resolves to an array of objects, each representing a static path
 *   with the collection title as a route parameter.
 */

export const getBookmarksStaticPaths = async () => {
  const collections = await getCollectionsExcludingReading();
  return collections.map(({ title }) => {
    return {
      params: { collection: title },
    };
  });
};

/**
 * Generates static paths for paginated bookmark collections.
 *
 * This function retrieves bookmark and collection data, then computes
 * the necessary static paths for each page of bookmarks within each collection.
 * Each path includes the collection title and the page number as parameters.
 *
 * @returns {Promise<Array<{ params: { collection: string; page: number } }>>}
 *   A promise that resolves to an array of path objects, each containing
 *   the collection title and page number for static generation.
 */

export const getBookmarksStaticPathsPage = async () => {
  const { bookmarks, collections } = await getRaindropData();
  return collections.flatMap((collection) => {
    const items = bookmarks.filter((b) => b.collectionId === collection._id);
    const totalPages = getPageNumbers(
      items.length,
      site.pages.bookmarks.entriesPerPage,
    );
    return totalPages.map((page) => {
      return {
        params: {
          collection: collection.title,
          page,
        },
      };
    });
  });
};
