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

export interface GetCollectionsResponse {
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
