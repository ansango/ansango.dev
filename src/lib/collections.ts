import { getCollection, type InferEntrySchema, type RenderedContent } from "astro:content";
import { slugify } from "./utils";
import { collectionNames, type CollectionName } from "@/content.config";
import { site } from "@/constants";


export type Entry = {
  id: string;
  data: InferEntrySchema<CollectionName>;
  body: string;
  filePath?: string;
  rendered: RenderedContent;
  collection: CollectionName;
};

export type Entries = Entry[];

export const getAllPromiseCollections = async () => {
  const collections = await Promise.all(
    collectionNames.map((name: any) => getCollection(name)),
  );
  return collections.flat() as Entries;
};

export const getAllCollections = async () => {
  const collections = await getAllPromiseCollections();
  return collections.filter(({ data: { published } }) => published)
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

export const getAllCollectionsByCategory = async () => {
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

  return sortedContentByCategory;
};

export const getLastEntriesByAllCollections = async (entriesLength = 1) => {
  const collections = await getAllCollections();
  return collections.slice(0, entriesLength);
};

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

export const getAllNumberPaths = async () => {
  const contentByCategory = await getAllCollectionsByCategory();
  return Object.keys(contentByCategory)
    .map((collection) => {
      const collectionContent = contentByCategory[collection];
      const entriesPerPage = site.pages[collection as CollectionName]?.entriesPerPage || 10;
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

type GetPaginationProps<T> = {
  entries: T;
  page: string | number;
  isIndex?: boolean;
  entriesPerPage: number;
};

export const getPagination = <T>({ entries, page, isIndex = false, entriesPerPage }: GetPaginationProps<T[]>) => {
  const totalPagesArray = getPageNumbers(entries.length, entriesPerPage);
  const totalPages = totalPagesArray.length;

  const currentPage = isIndex ? 1 : page && !isNaN(Number(page)) && totalPagesArray.includes(Number(page)) ? Number(page) : 0;

  const lastEntry = isIndex ? entriesPerPage : currentPage * entriesPerPage;
  const startEntry = isIndex ? 0 : lastEntry - entriesPerPage;
  const paginatedEntries = entries.slice(startEntry, lastEntry);

  return {
    totalPages,
    currentPage,
    paginatedEntries,
  };
};


export const getCollectionsByTag = async (tag: string) => {
  const collections = await getAllCollections();
  return collections.filter((collection) => {
    return collection.data.tags?.includes(tag);
  });
};

export const getTagsGroupedByLetter = async () => {
  const tags = await getUniqueTags();
  return abc.reduce((acc: Record<string, string[]>, letter) => {
    acc[letter] = tags.filter((tag) => tag.startsWith(letter));
    return acc;
  }, {});
};

export const getSortedCollectionsByYear = async () => {
  const collections = await getAllCollections()
  return collections.sort((a, b) => {
    if (!a.data.date) return -1
    if (!b.data.date) return 1
    return new Date(b.data.date).getFullYear() - new Date(a.data.date).getFullYear()
  })
}

export const getCollectionsByYear = (collections: Entries) => {

  collections.sort((a, b) => {
    if (!a.data.date) return -1
    if (!b.data.date) return 1
    return new Date(b.data.date).getFullYear() - new Date(a.data.date).getFullYear()
  })

  return collections
    .reduce(
      (acc, publication) => {
        const year = new Date(publication.data.date ?? "").getFullYear()
        if (!acc[year]) {
          acc[year] = [];
        }
        acc[year].push(publication);
        return acc;
      },
      {} as Record<string | number, typeof collections>,
    );
}

