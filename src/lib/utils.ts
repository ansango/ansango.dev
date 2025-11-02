/**
 * 🧰 General Utility Functions
 * 
 * @description Collection of helper functions for common operations.
 * Includes string manipulation, date formatting, pagination, and HTTP utilities.
 * 
 * @module lib/utils
 * 
 * @compatible
 * - 🔗 Slugification for URLs and tags
 * - 📅 Date formatting with locale support
 * - 📚 Reading time estimation
 * - 📄 Pagination helpers
 * - 🌐 Generic fetch wrapper
 */

import type { TreeNode } from "@/constants";

/**
 * Convert a string to a URL-friendly slug.
 *
 * - Removes diacritics, lowercases, trims, replaces spaces with dashes,
 *   and removes non-word characters.
 *
 * @param {string} text The input string to slugify.
 * @returns {string} The slugified string.
 */
export const slugify = (text: string): string => {
  return text
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
};

/**
 * Capitalize the first character of a string.
 *
 * @param {string} s The string to capitalize.
 * @returns {string} The capitalized string, or empty if input is falsy.
 */
export const capitalize = (s: string) => s && s[0].toUpperCase() + s.slice(1);
/**
 * Estimate reading time in minutes for a given HTML string.
 *
 * Strips HTML tags, counts words, and divides by 200 wpm.
 *
 * @param {string} html The HTML content to analyze.
 * @returns {number} Estimated reading time in minutes (rounded).
 */
export const getReadingTime = (html: string): number => {
  const text = html.replace(/<[^>]+>/g, "");
  const wordCount = text.trim().split(/\s+/).length;
  const speedReadingWordsPerMinute = 200;
  return Math.round(wordCount / speedReadingWordsPerMinute);
};

const formatDateOptionsDefault: Intl.DateTimeFormatOptions = {
  month: "short",
  day: "2-digit",
  year: "numeric",
};

/**
 * Format a date as a localized string.
 *
 * @param {Date|string} date The date to format.
 * @param {"en-US"|"es-ES"} [locale="es-ES"] The locale for formatting.
 * @param {Intl.DateTimeFormatOptions} [options] Intl formatting options.
 * @returns {string} The formatted date string.
 */
export const getFormatDate = (
  date: Date | string,
  locale: "en-US" | "es-ES" = "es-ES",
  options = formatDateOptionsDefault,
): string => Intl.DateTimeFormat(locale, options).format(new Date(date));

/**
 * Compute an array of page numbers for pagination.
 *
 * @param {number} numberOfPosts Total number of posts.
 * @param {number} entriesPerPage Number of posts per page.
 * @returns {number[]} Array of page numbers (1-based).
 */
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

/**
 * Filter a TreeNode object to only include entries with published: true.
 *
 * @param {TreeNode} node The tree node object to filter.
 * @returns {Array<[string, any]>} Array of [key, value] pairs for published entries.
 */
export const getPublishedEntries = (node: TreeNode) =>
  Object.entries(node).filter(([, { published }]) => published);

/**
 * Fetches data from the specified endpoint using the provided options.
 *
 * @template T - The expected return type of the response.
 * @param {string} endpoint - The URL to fetch data from.
 * @param {RequestInit} [options={}] - Optional configuration for the fetch request.
 * @returns {Promise<T>} - A promise that resolves to the fetched data.
 * @throws {Error} - Throws an error if the response is not ok.
 */
export const fetcher = async <T>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<T> => {
  const response = await fetch(input, init);
  if (!response.ok) throw new Error(`Error: ${response.statusText}`);
  return response.json() as Promise<T>;
};


