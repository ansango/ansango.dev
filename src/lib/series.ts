/**
 * 📚 Series Management Utilities
 * 
 * @description Utilities for managing multi-part content series.
 * Handles series grouping, navigation, and completeness validation.
 * 
 * @module lib/series
 * 
 * @compatible
 * - 📝 Works across blog, projects, and wiki collections
 * - 🔢 Dynamic total calculation (no frontmatter total needed)
 * - 🔍 Gap detection for incomplete series
 * - 🧭 Series-specific navigation logic
 */

import type { Entry, Entries } from "@/lib/collections";

/**
 * Metadata for a single series entry.
 */
export type SeriesMetadata = {
  id: string;
  title: string;
  order: number;
};

/**
 * Complete information about a series.
 */
export type serieInfo = {
  id: string;
  title: string;
  total: number;
  entries: Entries;
  missingParts: MissingParts;
};

/**
 * Missing parts information.
 */
export type MissingParts = {
  numbers: number[];
  ranges: string[]; // e.g., ["2-4", "7"]
};

/**
 * Get all entries that belong to a specific series.
 * Filters by serieId and sorts by serieOrder.
 *
 * @param serieId - The ID of the series
 * @param allEntries - All published entries
 * @returns Sorted array of entries in the series
 */
export function getSeriesEntries(
  serieId: string,
  allEntries: Entries,
): Entry[] {
  return allEntries
    .filter((entry) => entry.data.serieId === serieId)
    .sort((a, b) => (a.data.serieOrder || 0) - (b.data.serieOrder || 0));
}

/**
 * Detect missing parts in a series.
 * Returns gap numbers formatted as ranges (e.g., "2-4" or "7").
 *
 * @param entries - Array of series entries
 * @returns Object with missing part numbers and formatted ranges
 */
export function detectMissingParts(entries: Entry[]): MissingParts {
  if (entries.length === 0) {
    return { numbers: [], ranges: [] };
  }

  // Get all existing order numbers
  const existingOrders = entries
    .map((e) => e.data.serieOrder || 0)
    .sort((a, b) => a - b);

  // Calculate total (max order)
  const total = Math.max(...existingOrders);

  // Find missing numbers
  const missingNumbers: number[] = [];
  for (let i = 1; i <= total; i++) {
    if (!existingOrders.includes(i)) {
      missingNumbers.push(i);
    }
  }

  // Format as ranges
  const ranges = formatAsRanges(missingNumbers);

  return {
    numbers: missingNumbers,
    ranges,
  };
}

/**
 * Format an array of numbers into ranges.
 * Examples:
 * - [2, 3, 4, 7] → ["2-4", "7"]
 * - [2, 4, 6] → ["2", "4", "6"]
 * - [1, 2, 3] → ["1-3"]
 *
 * @param numbers - Sorted array of numbers
 * @returns Array of range strings
 */
function formatAsRanges(numbers: number[]): string[] {
  if (numbers.length === 0) {
    return [];
  }

  const ranges: string[] = [];
  let start = numbers[0];
  let end = numbers[0];

  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] === end + 1) {
      // Continue the range
      end = numbers[i];
    } else {
      // End current range and start a new one
      if (start === end) {
        ranges.push(String(start));
      } else {
        ranges.push(`${start}-${end}`);
      }
      start = numbers[i];
      end = numbers[i];
    }
  }

  // Add the last range
  if (start === end) {
    ranges.push(String(start));
  } else {
    ranges.push(`${start}-${end}`);
  }

  return ranges;
}

/**
 * Get all unique series from entries.
 * Groups entries by serieId and calculates metadata.
 *
 * @param allEntries - All published entries
 * @returns Array of series information with metadata
 */
export function getAllSeries(allEntries: Entries): serieInfo[] {
  const seriesMap = new Map<string, Entry[]>();

  // Group entries by serieId
  allEntries.forEach((entry) => {
    if (entry.data.serieId) {
      const existing = seriesMap.get(entry.data.serieId) || [];
      seriesMap.set(entry.data.serieId, [...existing, entry]);
    }
  });

  // Convert to serieInfo array
  return Array.from(seriesMap.entries()).map(([id, entries]) => {
    // Sort entries by order
    const sortedEntries = entries.sort(
      (a, b) => (a.data.serieOrder || 0) - (b.data.serieOrder || 0),
    );

    // Get series title from first entry
    const title = sortedEntries[0]?.data.serieTitle || id;

    // Calculate total (max order number)
    const total = Math.max(
      ...sortedEntries.map((e) => e.data.serieOrder || 0),
    );

    // Detect missing parts
    const missingParts = detectMissingParts(sortedEntries);

    return {
      id,
      title,
      total,
      entries: sortedEntries,
      missingParts,
    };
  });
}

/**
 * Get previous and next entries within a series.
 *
 * @param currentEntry - The current entry
 * @param seriesEntries - All entries in the series (must be sorted by order)
 * @returns Navigation object with prev/next entries
 */
export function getSeriesNavigation(
  currentEntry: Entry,
  seriesEntries: Entry[],
): { prev: Entry | null; next: Entry | null } {
  const currentIndex = seriesEntries.findIndex(
    (e) => e.id === currentEntry.id,
  );

  if (currentIndex === -1) {
    return { prev: null, next: null };
  }

  return {
    prev: seriesEntries[currentIndex - 1] || null,
    next: seriesEntries[currentIndex + 1] || null,
  };
}
