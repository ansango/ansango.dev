import { collectionNames } from "@/content.config";
import { getPageNumbers } from "./utils";
import { site } from "@/constants";
import {
  getAllCollections,
  getAllNumberPaths,
  getSortedCollectionsByYear,
  getUniqueTags,
} from "@/lib/collections";
import { getBookmarksByCollection,getCollectionsExcludingReading, getRaindropData } from "./cached";

export const getCollectionStaticPaths = () => {
  return collectionNames.map((collection) => ({
    params: { collection },
  }));
};
export const getCollectionStaticPathsSlug = async () => {
  const content = await getAllCollections();
  const pagesPaths = await getAllNumberPaths();
  const contentResult = content
    .map((entry) => {
      if (entry.data.index) {
        return null;
      }
      return {
        params: { collection: entry.collection, slug: entry.id },
        props: { entry },
      };
    })
    .filter((v) => v !== null);

  const pagesResult = pagesPaths
    .map(({ collection, pageNumber }) => {
      if (pageNumber === 1) {
        return null;
      }
      return {
        params: { collection, slug: pageNumber.toString() },
        props: { entry: null },
      };
    })
    .filter((v) => v !== null);

  return [...contentResult, ...pagesResult];
};

export const getArchiveStaticPathsPage = async () => {
  const content = await getSortedCollectionsByYear();

  const totalPages = getPageNumbers(
    content.length,
    site.pages.archive.entriesPerPage || 10
  );

  return totalPages.map((page) => {
    return {
      params: { page },
    };
  });
};
export const getTagStaticPaths = async () => {
  const tags = await getUniqueTags();
  return tags.map((tag) => {
    return {
      params: { tag },
      props: { tag },
    };
  });
};
export const getTagStaticPathsPage = async () => {
  const content = await getAllCollections();
  const tags = await getUniqueTags();
  return tags.flatMap((tag) => {
    const allCollections = content.filter((collection) =>
      collection.data.tags?.includes(tag)
    );

    const totalPages = getPageNumbers(
      allCollections.length,
      site.pages.tags.entriesPerPage
    );
    return totalPages.map((page) => {
      return {
        params: {
          tag,
          page,
        },
      };
    });
  });
};




export const getReadingStaticPathsPage = async () => {
  const entries = await getBookmarksByCollection("reading");
  const totalPages = getPageNumbers(
    entries.length,
    site.pages.reading.entriesPerPage
  );

  return totalPages.map((page) => {
    return {
      params: { page },
    };
  });
};


export const getBookmarksStaticPaths = async () => {
  const collections = await getCollectionsExcludingReading();
  return collections.map(({ title }) => {
    return {
      params: { collection: title },
    };
  });
}

export const getBookmarksStaticPathsPage = async () => {
    const { bookmarks,collections} = await getRaindropData();
    return collections.flatMap((collection) => {
        const items = bookmarks.filter(b => b.collectionId === collection._id);
        const totalPages = getPageNumbers(items.length, site.pages.bookmarks.entriesPerPage);
        return totalPages.map((page) => {
            return {
                params: {
                    collection: collection.title,
                    page,
                },
            };
        });
    });
}