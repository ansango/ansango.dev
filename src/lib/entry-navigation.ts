/**
 * 🧭 Entry Navigation Helper
 *
 * @description Provides global prev/next navigation logic across all entries.
 * Simple chronological navigation (newest first) that works across all collections.
 *
 * @module lib/entry-navigation
 *
 * @compatible
 * - 📝 Global navigation across blog, projects, and wiki
 * - 📅 Chronological order (newest first)
 * - 🔄 Works seamlessly with all entry types
 */

import type { Entry, Entries } from "@/lib/collections";

/**
 * Represents a navigation entry with title and path.
 * Null if no prev/next entry exists.
 */
export type NavigationEntry = {
  title: string;
  path: string;
  collection: string;
} | null;

/**
 * Navigation data for prev/next entries.
 */
export type EntryNavigation = {
  prev: NavigationEntry;
  next: NavigationEntry;
};

/**
 * Get prev/next navigation entries for the current entry.
 * Global navigation across all collections in chronological order.
 * Excludes single-page entries (where index: true in frontmatter).
 *
 * @param currentEntry The current entry being viewed
 * @param allEntries All published entries from all collections
 * @returns Navigation object with prev/next entries
 */
export function getEntryNavigation(
  currentEntry: Entry,
  allEntries: Entries,
): EntryNavigation {
  // Filter entries with dates and exclude single-page entries (index: true)
  const orderedEntries = allEntries
    .filter((e) => e.data.date && !("index" in e.data && e.data.index))
    .sort((a, b) => {
      const dateA = new Date(a.data.date || 0).getTime();
      const dateB = new Date(b.data.date || 0).getTime();
      return dateB - dateA; // Newest first
    });

  // Find current entry index
  const currentIndex = orderedEntries.findIndex(
    (e) => e.id === currentEntry.id && e.collection === currentEntry.collection,
  );

  if (currentIndex === -1) {
    // Current entry not found in ordered list
    return { prev: null, next: null };
  }

  // Get prev (older entry)
  const prevEntry = orderedEntries[currentIndex + 1] || null;

  // Get next (newer entry)
  const nextEntry = orderedEntries[currentIndex - 1] || null;

  return {
    prev: prevEntry
      ? {
          title: prevEntry.data.title,
          path: `/${prevEntry.collection}/${prevEntry.id}`,
          collection: prevEntry.collection,
        }
      : null,
    next: nextEntry
      ? {
          title: nextEntry.data.title,
          path: `/${nextEntry.collection}/${nextEntry.id}`,
          collection: nextEntry.collection,
        }
      : null,
  };
}
