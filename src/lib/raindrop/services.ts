/**
 * 🌐 Raindrop.io API Services
 * 
 * @description HTTP client for Raindrop.io REST API v1.
 * Handles authentication, pagination, and data fetching.
 * 
 * @module lib/raindrop/services
 * 
 * @compatible
 * - 🔐 Bearer token authentication
 * - 🔢 Automatic pagination handling
 * - 📁 Collections and bookmarks retrieval
 * - ⚠️ Error handling and logging
 */

/**
 * The base URL for the Raindrop.io REST API v1.
 *
 * @remarks
 * This constant is used as the root endpoint for all API requests to Raindrop.io.
 *
 * @see {@link https://developer.raindrop.io/}
 */

const RAINDROP_API_URL = "https://api.raindrop.io/rest/v1";

/**
 * HTTP request options for fetching data from the Raindrop API.
 *
 * @property method - The HTTP method to use for the request (e.g., "GET").
 * @property headers - An object containing HTTP headers, including:
 *   - "Content-Type": Specifies the media type of the request body as JSON.
 *   - "Authorization": Bearer token for authenticating with the Raindrop API, retrieved from environment variables.
 */
const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${import.meta.env.RAINDROP_ACCESS_TOKEN}`,
  },
};

/**
 * Represents a Raindrop item with its metadata and properties.
 *
 * @property _id - Unique identifier for the raindrop.
 * @property link - URL of the raindrop.
 * @property title - Title of the raindrop.
 * @property excerpt - Short excerpt or summary of the raindrop.
 * @property note - User's note attached to the raindrop.
 * @property type - Type of the raindrop (e.g., article, image).
 * @property cover - URL to the cover image of the raindrop.
 * @property tags - List of tags associated with the raindrop.
 * @property important - Indicates if the raindrop is marked as important.
 * @property removed - Indicates if the raindrop has been removed.
 * @property created - ISO string representing the creation date.
 * @property collection - Reference to the collection containing the raindrop.
 * @property highlights - List of highlights associated with the raindrop.
 * @property lastUpdate - ISO string representing the last update date.
 * @property domain - Domain name extracted from the link.
 * @property collectionId - Identifier of the collection containing the raindrop.
 */
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

/**
 * Metadata for a Raindrop collection (a grouping of saved items).
 *
 * @remarks
 * Captures identification, visibility, item counts, sort ordering, and timestamps used to manage and display a collection.
 *
 * Properties:
 * - _id: Unique numeric identifier for the collection.
 * - title: Human-readable title of the collection.
 * - description: Textual description or notes about the collection.
 * - public: Flag indicating whether the collection is publicly visible.
 * - count: Number of items (raindrops) contained in the collection.
 * - sort: Numeric value representing the sort order or sort mode for the collection.
 * - lastAction: Key describing the last performed action on the collection (e.g., "create", "update").
 * - created: ISO 8601 timestamp when the collection was created.
 * - lastUpdate: ISO 8601 timestamp of the most recent update to the collection.
 */
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

/**
 * Response returned when fetching bookmark items from the Raindrop service.
 *
 * Contains the list of bookmark entries and a count indicating how many total
 * items exist for the queried collection or criteria.
 *
 * @remarks
 * The items array may be a subset of the total results when pagination or limits
 * are applied. The count represents the total number of available items.
 *
 * @property items - Array of Raindrop objects representing individual bookmarks.
 * @property count - Total number of bookmarks in the result set.
 */
interface GetBookmarkItemsResponse {
  items: Raindrop[];
  count: number;
}

/**
 * Fetches bookmark items for a given raindrop (collection) ID with pagination.
 *
 * @param id - The raindrop (collection) identifier to retrieve bookmarks from. Defaults to 0.
 * @param pageIndex - Zero-based page index to fetch. Must be a non-negative number. Defaults to 0.
 * @returns A promise that resolves to the parsed GetBookmarkItemsResponse on success, or null if the fetch fails
 *          (e.g., network error, non-OK HTTP response, or JSON parsing error).
 * @throws {Error} If `pageIndex` is not a number or is negative.
 * @remarks
 * - Sends a GET request to `${RAINDROP_API_URL}/raindrops/${id}` with query parameters:
 *   `page` (pageIndex) and `perpage` (50).
 * - Network and HTTP errors are caught, logged to the console, and result in a `null` return value rather than
 *   propagating an exception.
 * - This function depends on `RAINDROP_API_URL` and `options` being defined in the surrounding scope.
 * @example
 * const response = await getBookmarkItems(123, 0);
 * if (response) {
 *   // process bookmarks
 * } else {
 *   // handle error or absence of data
 * }
 */

export const getBookmarkItems = async (
  id = 0,
  pageIndex = 0,
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
      options,
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

/**
 * Fetches all bookmark items for the provided identifier by paging through the API until all items are collected.
 *
 * @param id - Optional identifier of the bookmark collection to fetch. Defaults to 0.
 * @returns Promise<Raindrop[]> - A promise that resolves to an array of Raindrop items sorted by the `created` timestamp in descending order (newest first).
 *
 * @remarks
 * - This function calls `getBookmarkItems(id, pageIndex)` repeatedly, starting from pageIndex 0, and accumulates results into a single array.
 * - The loop continues until the accumulated items reach the total count reported by the API for that collection.
 * - Progress for each fetched page is logged to the console.
 * - Pages are fetched sequentially (one after another).
 *
 * @throws Error - Propagates any errors thrown by `getBookmarkItems` or network-related failures.
 */
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
        `Fetched page ${pageIndex}, total items so far: ${allItems.length}`,
      );
    } else {
      break;
    }
  } while (allItems.length < totalItems);

  return allItems.sort(
    (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime(),
  );
};

/**
 * Response returned when fetching Raindrop collections.
 *
 * @remarks
 * Includes the list of collections and a boolean indicating whether the request succeeded.
 *
 * @property items - The array of RaindropCollection objects returned by the API. May be empty.
 * @property result - True if the API operation succeeded; otherwise false.
 */
export interface GetCollectionsResponse {
  items: RaindropCollection[];
  result: boolean;
}

/**
 * Fetches the root-level collections from the Raindrop API.
 *
 * Performs an HTTP GET to `${RAINDROP_API_URL}/collections` using the configured request options.
 * If the response has an OK status, the response body is parsed as JSON and returned as a GetCollectionsResponse.
 * Network errors, non-OK HTTP responses, or JSON parsing failures are caught and logged; in such cases the function resolves to null.
 *
 * @returns A promise that resolves to the parsed GetCollectionsResponse on success, or null on failure.
 *
 * @remarks
 * - Requires RAINDROP_API_URL and options to be defined in the module scope.
 * - Callers should handle the possibility of a null return value.
 *
 * @example
 * const collections = await getRootCollections();
 * if (collections) {
 *   // handle collections
 * } else {
 *   // handle error or fallback
 * }
 */
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
