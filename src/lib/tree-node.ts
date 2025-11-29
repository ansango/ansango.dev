/**
 * 🌳 Tree Structure Builder
 *
 * @description Builds hierarchical tree structures from flat entry lists.
 * Creates folder/file navigation trees for wiki and nested content.
 *
 * @module lib/tree-node
 *
 * @compatible
 * - 📁 Used by WikiTree component
 * - 📄 Converts flat lists to nested structures
 * - 📊 Counts entries and categories
 * - 🔄 Supports recursive sorting and traversal
 */

import type { CollectionName } from "@/content.config";
import type { Entries } from "@/lib/collections";

/**
 * Represents a node in a hierarchical tree structure for wiki/content navigation.
 *
 * - `name`: Display name for the node (folder or file title).
 * - `type`: Either 'folder' or 'file'.
 * - `path`: The URL path for the item.
 * - `children`: Optional nested child nodes.
 * - `level`: Depth level (0-based) in the tree.
 */
export type NodeItem = {
  name: string;
  type: string;
  path: string;
  children?: NodeItem[];
  level: number;
};

/**
 * Build a tree structure from a flat list of entries for a given collection.
 *
 * It filters the entries by collection, maps them into a path/title shape,
 * then constructs a nested folder/file hierarchy. The resulting top-level
 * array is sorted to show folders before files and alphabetically within type.
 * Series entries are sorted by serieOrder within the same folder.
 *
 * @param {Entries} entries Array of entries to build the tree from.
 * @param {CollectionName} collectionName Collection to filter by.
 * @returns {NodeItem[]} Structured tree suitable for navigation components.
 */
export const getTreeNode = (
  entries: Entries,
  collectionName: CollectionName,
) => {
  // Keep reference to original entries for series data
  const entryDataMap = new Map<string, any>();
  
  const mappedEntries = entries
    .filter(({ collection }) => collection === collectionName)
    .map((entry) => {
      const { collection, id, data } = entry;
      const { title } = data;
      const path = `/${collection}/${id}`;
      entryDataMap.set(path, data);
      return { path, title, collection, id, data };
    })
    .sort((a, b) => a.title.localeCompare(b.title));

  const structure: NodeItem[] = [];

  mappedEntries.forEach((entry) => {
    const parts = entry.path
      .split("/")
      .filter((part) => part !== "wiki" && part !== "");
    let currentLevel = structure;

    parts.forEach((part, index) => {
      let existingPath = currentLevel.find((item) => item.name === part);
      const type = index === parts.length - 1 ? "file" : "folder";
      if (!existingPath) {
        existingPath = {
          name: type == "file" ? entry.title : part,
          type,
          path: `/${entry.collection}/${entry.id}`,
          children: [],
          level: index,
        };
        currentLevel.push(existingPath);
      }
      currentLevel = existingPath.children || [];
    });
  });

  // Sort with series awareness
  const sortWithSeries = (nodes: NodeItem[]): NodeItem[] => {
    return nodes.sort((a, b) => {
      // Folders before files
      if (a.type !== b.type) {
        return a.type === "folder" ? -1 : 1;
      }
      
      // Both are files - check if they're part of the same series
      if (a.type === "file" && b.type === "file") {
        const aData = entryDataMap.get(a.path);
        const bData = entryDataMap.get(b.path);
        
        const aSerieId = aData?.serieId;
        const bSerieId = bData?.serieId;
        
        // If both are in the same series, sort by serieOrder
        if (aSerieId && bSerieId && aSerieId === bSerieId) {
          const aOrder = aData?.serieOrder || 0;
          const bOrder = bData?.serieOrder || 0;
          return aOrder - bOrder;
        }
        
        // If only one is a series, series entries come first
        if (aSerieId && !bSerieId) return -1;
        if (!aSerieId && bSerieId) return 1;
        
        // If both are series but different series, or neither is series
        // sort alphabetically
        return a.name.localeCompare(b.name);
      }
      
      // Both are folders - alphabetical
      return a.name.localeCompare(b.name);
    });
  };

  // Apply recursive sorting
  const sortTreeRecursive = (nodes: NodeItem[]): NodeItem[] => {
    const sorted = sortWithSeries(nodes);
    return sorted.map(node => ({
      ...node,
      children: node.children ? sortTreeRecursive(node.children) : undefined,
    }));
  };

  return sortTreeRecursive(structure);
};

/**
 * Count how many file nodes are contained within a tree (recursive).
 *
 * @param {NodeItem[]} nodes The root nodes to traverse.
 * @returns {number} The total number of file nodes.
 */
export function countEntries(nodes: NodeItem[]) {
  let count = 0;
  for (const node of nodes) {
    if (node.type === "file") {
      count++;
    }
    if (node.children) {
      count += countEntries(node.children);
    }
  }
  return count;
}

/**
 * Count top-level category folders (level 0) plus their nested folders.
 *
 * @param {NodeItem[]} nodes Root nodes to traverse.
 * @returns {number} Count of categories and nested folder counts.
 */
export function countCategories(nodes: NodeItem[]) {
  let count = 0;
  for (const node of nodes) {
    if (node.type === "folder" && node.level === 0) {
      count++;
      if (node.children) {
        count += countCategories(node.children);
      }
    }
  }
  return count;
}

/**
 * Recursively sort a tree so file nodes appear before folder nodes, and
 * names are sorted alphabetically within each type.
 *
 * @param {NodeItem[]} nodes The tree nodes to sort.
 * @returns {NodeItem[]} Sorted array (new objects created via shallow clone).
 */
export function sortTreeNodeFilesFirst(nodes: NodeItem[]): NodeItem[] {
  return nodes
    .map((node) => ({
      ...node,
      children: node.children
        ? sortTreeNodeFilesFirst(node.children)
        : undefined,
    }))
    .sort((a, b) => {
      if (a.type === b.type) {
        return a.name.localeCompare(b.name);
      }

      return a.type === "file" ? -1 : 1;
    });
}
