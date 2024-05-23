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
  date: Date,
  locale: "en-US" | "es-ES" = "es-ES",
  options = formatDateOptionsDefault
): string => Intl.DateTimeFormat(locale, options).format(new Date(date));

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

export const getPageNumbers = (
  numberOfPosts: number,
  entriesPerPage: number
) => {
  const numberOfPages = numberOfPosts / Number(entriesPerPage);

  let pageNumbers: number[] = [];
  for (let i = 1; i <= Math.ceil(numberOfPages); i++) {
    pageNumbers = [...pageNumbers, i];
  }

  return pageNumbers;
};

type GetPaginationProps<T> = {
  entries: T;
  page: string | number;
  isIndex?: boolean;
  entriesPerPage: number;
};

export const getPagination = <T>({
  entries,
  page,
  isIndex = false,
  entriesPerPage,
}: GetPaginationProps<T[]>) => {
  const totalPagesArray = getPageNumbers(entries.length, entriesPerPage);
  const totalPages = totalPagesArray.length;

  const currentPage = isIndex
    ? 1
    : page && !isNaN(Number(page)) && totalPagesArray.includes(Number(page))
      ? Number(page)
      : 0;

  const lastEntry = isIndex ? entriesPerPage : currentPage * entriesPerPage;
  const startEntry = isIndex ? 0 : lastEntry - entriesPerPage;
  const paginatedEntries = entries.slice(startEntry, lastEntry);

  return {
    totalPages,
    currentPage,
    paginatedEntries,
  };
};

