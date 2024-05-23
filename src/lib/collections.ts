import { collectionNames, type CommonData } from "@/content/config";
import { getCollection, type AnyEntryMap, type CollectionEntry } from "astro:content";
import { getPageNumbers, slugify } from "./utils";


interface Render {
  '.md': Promise<{
    Content: import('astro').MarkdownInstance<{}>['Content'];
    headings: import('astro').MarkdownHeading[];
    remarkPluginFrontmatter: Record<string, any>;
  }>;
}

export type C = keyof AnyEntryMap;

export type Collection = CollectionEntry<C> & {
  id: string;
  slug: string;
  body: string;
  collection: C,
  data: CommonData,
  render(): Render[".md"]
};

export type Collections = Collection[];

export const getAllPromiseCollections = async () => {
  const collections = await Promise.all(
    // @ts-expect-error - take care of this
    collectionNames.map((name: any) => getCollection(name, (entry) => entry.data.published))
  )
  return collections.flat() as Collections
}

export const getAllCollections = async () => {
  const collections = await getAllPromiseCollections();
  return collections.map((entry) => {
    return {
      ...entry,
      data: {
        ...entry.data,
        tags: entry.data.tags.map((tag: string) => slugify(tag)),
      },
    };
  }).sort((a, b) => {
    return new Date(b.data.date).getTime() - new Date(a.data.date).getTime();
  });
}

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

  const sortedContentByCategory: { [key: string]: Collection[] } = {};

  Object.keys(contentByCategory).sort().forEach((key) => {
    sortedContentByCategory[key] = contentByCategory[key];
  });

  return sortedContentByCategory;
}

export const getAllNumberPaths = async (entriesPerPage = 10) => {
  const contentByCategory = await getAllCollectionsByCategory();
  return Object.keys(contentByCategory).map((collection) => {
    const collectionContent = contentByCategory[collection];
    const pathNumbers = getPageNumbers(collectionContent.length, entriesPerPage);
    return pathNumbers.map((pageNumber) => ({ pageNumber, collection }));
  }).flat()
}

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

  return Array.from(tags).sort()
};

export const getCollectionsByTag = async (tag: string) => {
  const collections = await getAllCollections();
  return collections.filter((collection) => {
    return collection.data.tags?.includes(tag);
  });
};

export const getLastEntriesByAllCollections = async (entriesLength = 1) => {
  const collections = await getAllCollections();
  return collections.slice(0, entriesLength);
}