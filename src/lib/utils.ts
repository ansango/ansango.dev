import type { TreeNode } from "@/constants";

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

export const capitalize = (s: string) => s && s[0].toUpperCase() + s.slice(1);
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

export const getFormatDate = (
  date: Date | string,
  locale: "en-US" | "es-ES" = "es-ES",
  options = formatDateOptionsDefault,
): string => Intl.DateTimeFormat(locale, options).format(new Date(date));

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

export const getPublishedEntries = (node: TreeNode) =>
  Object.entries(node).filter(([, { published }]) => published);
