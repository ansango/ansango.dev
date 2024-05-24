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

const abc = "abcdefghijklmnopqrstuvwxyz".split("");

export const getTagsGroupedByLetter = async () => {
  const tags = await getUniqueTags();
  return abc.reduce((acc: Record<string, string[]>, letter) => {
    acc[letter] = tags.filter((tag) => tag.startsWith(letter));
    return acc;
  }, {});
};

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

  return Object.values(mappedTags).map((tags) => {
    return tags.slice(0, limitAtLetter);
  }).flat();

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

type BreadcrumbItem = {
  breadcrumb: string[];
  slug: string;
  name: string;
  type: "file";
};

export type Item = {
  name: string;
  level: number;
  type: "folder" | "file";
  slug?: string;
  children: Item[];
};

const buildNestedArray = (items: BreadcrumbItem[]): Item[] => {
  const root: Item[] = [];
  items.forEach((item) => {
    let currentLevel = root;
    item.breadcrumb.forEach((name, i) => {
      const existingPath = currentLevel.find((folder) => folder.name === name);
      if (existingPath) {
        currentLevel = existingPath.children as Item[];
      } else {
        const newFolder: Item = {
          name,
          level: i,
          type: i === item.breadcrumb.length - 1 ? "file" : "folder",
          slug: i === item.breadcrumb.length - 1 ? item.slug : undefined,
          children: [],
        };
        currentLevel.push(newFolder);
        currentLevel = newFolder.children as Item[];
      }
    });
  });
  return root;
};

export const getDirectoryWikiFolders = (entries: Collection[]) => buildNestedArray(entries.map((entry) => {
  return {
    breadcrumb: entry.slug.split("/"),
    slug: "/wiki/" + entry.slug as string,
    name: entry.data.title,
    type: "file" as const,
  };
}).sort((a, b) => a.slug.localeCompare(b.slug)));


