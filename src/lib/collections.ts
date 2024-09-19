import { collectionNames } from "@/content/config";
import { getCollection } from "astro:content";
import { getPageNumbers, slugify } from "./utils";

interface Render {
  ".md": Promise<{
    Content: import("astro").MarkdownInstance<{}>["Content"];
    headings: import("astro").MarkdownHeading[];
    remarkPluginFrontmatter: Record<string, any>;
  }>;
}

export const getAllPromiseCollections = async () => {
  const collections = await Promise.all(
    // @ts-expect-error - take care of this
    collectionNames.map((name: any) => getCollection(name, (entry) => entry.data.published))
  );
  return collections.flat() as Entries;
};

export const getAllCollections = async () => {
  const collections = await getAllPromiseCollections();
  return collections
    .map((entry: any) => {
      return {
        ...entry,
        data: {
          ...entry.data,
          tags: entry.data.tags.map((tag: string) => slugify(tag)),
        },
      };
    })
    .sort((a, b) => {
      return new Date(b.data.date).getTime() - new Date(a.data.date).getTime();
    });
};

export const getAllCollectionsByCategory = async () => {
  const content = await getAllCollections();
  const contentByCategory = content.reduce((acc: { [key: string]: any }, entry) => {
    if (!acc[entry.collection]) {
      acc[entry.collection] = [];
    }
    acc[entry.collection].push(entry);
    return acc;
  }, {});

  const sortedContentByCategory: { [key: string]: Entries } = {};

  Object.keys(contentByCategory)
    .sort()
    .forEach((key) => {
      sortedContentByCategory[key] = contentByCategory[key];
    });

  return sortedContentByCategory;
};

export const getAllNumberPaths = async (entriesPerPage = 10) => {
  const contentByCategory = await getAllCollectionsByCategory();
  return Object.keys(contentByCategory)
    .map((collection) => {
      const collectionContent = contentByCategory[collection];
      const pathNumbers = getPageNumbers(collectionContent.length, entriesPerPage);
      return pathNumbers.map((pageNumber) => ({ pageNumber, collection }));
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

  return Object.values(mappedTags)
    .map((tags) => {
      return tags.slice(0, limitAtLetter);
    })
    .flat();
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
};

export type Entry = {
  id: string;
  slug: string;
  body: string;
  collection: string;
  render(): Render[".md"];
  data: {
    title: string;
    description: string;
    tags: string[];
    date: string;
    mod: string;
    published: boolean;
    guide?: boolean;
    step?: number;
  };
};

export type Entries = Entry[];

interface Item {
  slug: string;
  breadcrumb: string[];
  guide: boolean | undefined;
  step: number | undefined;
  title: string;
}

const mapperEntriesTree = (entries: Entries) =>
  entries.map(({ data, slug, collection }) => {
    const { guide, step, title } = data;
    return { slug: `/${collection}/${slug}`, breadcrumb: slug.split("/"), guide, step, title };
  }) as Item[];

// Interfaces
export interface TreeNode {
  title?: string;
  name: string;
  level: number;
  type: "file" | "folder";
  children?: TreeNode[];
  isGuide?: boolean;
  step?: number;
  slug?: string;
}

function sortTree(node: TreeNode): void {
  if (node.children) {
    node.children.forEach(sortTree);
    node.children.sort((a, b) => {
      if (a.type !== b.type) {
        return a.type === "file" ? -1 : 1;
      }
      if (a.type === "file" && b.type === "file" && a.step !== undefined && b.step !== undefined) {
        return a.step - b.step;
      }

      return a.name.localeCompare(b.name);
    });
  }
}

export function createNestedTree(entries: Entries): TreeNode {
  const items = mapperEntriesTree(entries);
  const root: TreeNode = { name: "", type: "folder", children: [], level: 0 };

  items.forEach((item) => {
    let currentNode = root;
    const pathParts = item.breadcrumb;

    pathParts.forEach((part, index) => {
      const isLastPart = index === pathParts.length - 1;
      const existingChild = currentNode.children?.find((child) => child.name === part);

      if (existingChild) {
        currentNode = existingChild;
      } else {
        const newNode: TreeNode = {
          name: part,
          type: isLastPart ? "file" : "folder",
          children: isLastPart ? undefined : [],
          title: isLastPart ? item.title : undefined,
          level: index + 1,
          slug: isLastPart ? item.slug : undefined,
        };

        if (isLastPart) {
          newNode.isGuide = item.guide;
          newNode.step = item.step;
        }

        currentNode.children = currentNode.children || [];
        currentNode.children.push(newNode);
        currentNode = newNode;
      }
    });
  });

  return root;
}

export const treeNestedSorted = (entries: Entries) => {
  const tree = createNestedTree(entries);
  sortTree(tree);
  return tree;
};

function getTreeFolders(node: TreeNode): TreeNode[] {
  let folders: TreeNode[] = [];

  if (node.type === "folder" && node.children && node.children.length > 0) {
    const allImmediateChildrenAreGuides = !node.children.every((child) => child.type === "file" && child.isGuide);

    if (allImmediateChildrenAreGuides) {
      folders.push(node);
    }
  }

  if (node.children) {
    node.children.forEach((child) => {
      folders = folders.concat(getTreeFolders(child));
    });
  }

  return folders;
}

export const getTreeNameFolders = (node: TreeNode) =>
  getTreeFolders(node)
    .map((folder) => folder.name)
    .filter((name) => name !== "");

function getGuideFolders(node: TreeNode): TreeNode[] {
  let guideFolders: TreeNode[] = [];

  if (node.type === "folder" && node.children && node.children.length > 0) {
    const allImmediateChildrenAreGuides = node.children.every((child) => child.type === "file" && child.isGuide);

    if (allImmediateChildrenAreGuides) {
      guideFolders.push(node);
    }
  }

  if (node.children) {
    node.children.forEach((child) => {
      if (child.type === "folder") {
        guideFolders = guideFolders.concat(getGuideFolders(child));
      }
    });
  }

  return guideFolders;
}

export const getGuideNameFolders = (node: TreeNode) =>
  getGuideFolders(node)
    .map((folder) => folder.name)
    .filter((name) => name !== "");

function findParentNode(root: TreeNode, target: TreeNode): TreeNode | null {
  if (root.children) {
    for (const child of root.children) {
      if (child === target) {
        return root;
      }
      const found = findParentNode(child, target);
      if (found) return found;
    }
  }
  return null;
}

export const getSiblings = async (entry: Entry) => {
  const entries = (await getAllCollectionsByCategory())[entry.collection];
  const tree: TreeNode = treeNestedSorted(entries);

  const findNode = (node: TreeNode): TreeNode | null => {
    if (node.slug === `/${entry.collection}/${entry.slug}`) {
      return node;
    }
    if (node.children) {
      for (const child of node.children) {
        const found = findNode(child);
        if (found) return found;
      }
    }
    return null;
  };

  const currentNode = findNode(tree);

  if (!currentNode || !currentNode.isGuide) {
    return { prev: null, next: null };
  }

  const parent = findParentNode(tree, currentNode);

  if (!parent || !parent.children) {
    return { prev: null, next: null };
  }

  const guideFiles = parent.children
    .filter((child) => child.type === "file" && child.isGuide && child.step !== undefined)
    .sort((a, b) => a.step! - b.step!);

  const currentIndex = guideFiles.findIndex((file) => file === currentNode);
  if (currentIndex === -1) {
    return { prev: null, next: null };
  }

  const prev = currentIndex > 0 ? guideFiles[currentIndex - 1] : null;
  const next = currentIndex < guideFiles.length - 1 ? guideFiles[currentIndex + 1] : null;

  return { prev, next, all: guideFiles, guide: parent };
};
