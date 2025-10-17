import { site } from "@/constants";
import type { GetCollectionsResponse, Raindrop } from "./services";

export const bookmarksMapper = (bookmarks: Raindrop[]) =>
  bookmarks.map(
    ({ _id, title, created, excerpt, collectionId, cover, link, tags }) => ({
      _id,
      title,
      created,
      excerpt,
      collectionId,
      cover,
      link,
      tags: tags.slice(0, 3),
    }),
  );

export const collectionsMapper = ({ items }: GetCollectionsResponse) =>
  items
    .filter(({ title }) => title.includes(site.name))
    .map(({ _id, title, created, description }) => ({
      _id,
      title: title.replace(site.name.concat("."), ""),
      created,
      description,
    }));
