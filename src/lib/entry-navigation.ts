/**
 * 🧭 Entry Navigation Helper
 *
 * @description Provides prev/next navigation logic for blog, projects, and wiki entries.
 * Handles different sorting strategies per collection type.
 *
 * @module lib/entry-navigation
 *
 * @compatible
 * - 📝 Blog: Chronological order (newest first)
 * - 📦 Projects: Chronological order (newest first)
 * - 📚 Wiki: Depth-first pre-order tree traversal with alphabetical fallback
 */

import type { Entry, Entries } from "@/lib/collections";
import { getTreeNode, type NodeItem } from "@/lib/tree-node";

/**
 * Represents a navigation entry with title and path.
 * Null if no prev/next entry exists.
 */
export type NavigationEntry = {
  title: string;
  path: string;
} | null;

/**
 * Navigation data for prev/next entries.
 */
export type EntryNavigation = {
  prev: NavigationEntry;
  next: NavigationEntry;
};

/**
 * Flatten a tree structure into a depth-first pre-order array of file nodes.
 * Pre-order: parent → children → siblings
 *
 * @param nodes Tree structure to flatten
 * @param result Accumulator for flattened nodes
 * @returns Flattened array of file nodes in traversal order
 */
function flattenTreePreOrder(
  nodes: NodeItem[],
  result: NodeItem[] = [],
): NodeItem[] {
  for (const node of nodes) {
    if (node.type === "file") {
      result.push(node);
    }
    if (node.children && node.children.length > 0) {
      flattenTreePreOrder(node.children, result);
    }
  }
  return result;
}

/**
 * Get ordered entries for wiki collection using tree traversal.
 * Falls back to alphabetical sorting for orphaned entries.
 *
 * @param entries All entries from all collections
 * @returns Ordered wiki entries
 */
function getOrderedWikiEntries(entries: Entries): Entry[] {
  const wikiEntries = entries.filter((e) => e.collection === "wiki");

  if (wikiEntries.length === 0) {
    return [];
  }

  // Build tree structure
  const tree = getTreeNode(entries, "wiki");

  // Flatten tree in pre-order traversal
  const treeNodes = flattenTreePreOrder(tree);

  // Create a map of paths to entries for quick lookup
  const entryMap = new Map<string, Entry>();
  wikiEntries.forEach((entry) => {
    const path = `/${entry.collection}/${entry.id}`;
    entryMap.set(path, entry);
  });

  // Map tree nodes to entries
  const orderedEntries: Entry[] = [];
  const usedIds = new Set<string>();

  treeNodes.forEach((node) => {
    const entry = entryMap.get(node.path);
    if (entry) {
      orderedEntries.push(entry);
      usedIds.add(entry.id);
    }
  });

  // Add orphaned entries (not in tree) alphabetically at the end
  const orphanedEntries = wikiEntries
    .filter((entry) => !usedIds.has(entry.id))
    .sort((a, b) => a.data.title.localeCompare(b.data.title));

  return [...orderedEntries, ...orphanedEntries];
}

/**
 * Get prev/next navigation entries for the current entry.
 *
 * @param currentEntry The current entry being viewed
 * @param allEntries All published entries from all collections
 * @returns Navigation object with prev/next entries
 */
export function getEntryNavigation(
  currentEntry: Entry,
  allEntries: Entries,
): EntryNavigation {
  const collection = currentEntry.collection;
  let orderedEntries: Entry[];

  if (collection === "wiki") {
    // Wiki: depth-first pre-order tree traversal with alphabetical fallback
    orderedEntries = getOrderedWikiEntries(allEntries);
  } else {
    // Blog and projects: chronological (newest first)
    orderedEntries = allEntries
      .filter((e) => e.collection === collection)
      .sort((a, b) => {
        const dateA = new Date(a.data.date || 0).getTime();
        const dateB = new Date(b.data.date || 0).getTime();
        return dateB - dateA; // Newest first
      });
  }

  // Find current entry index
  const currentIndex = orderedEntries.findIndex(
    (e) => e.id === currentEntry.id,
  );

  if (currentIndex === -1) {
    // Current entry not found in ordered list
    return { prev: null, next: null };
  }

  // Get prev (older for blog/projects, previous in tree for wiki)
  const prevEntry = orderedEntries[currentIndex + 1] || null;

  // Get next (newer for blog/projects, next in tree for wiki)
  const nextEntry = orderedEntries[currentIndex - 1] || null;

  return {
    prev: prevEntry
      ? {
          title: prevEntry.data.title,
          path: `/${prevEntry.collection}/${prevEntry.id}`,
        }
      : null,
    next: nextEntry
      ? {
          title: nextEntry.data.title,
          path: `/${nextEntry.collection}/${nextEntry.id}`,
        }
      : null,
  };
}
