import rss from "@astrojs/rss";
import { site } from "@/constants";
import { getAllCollectionsByCategory } from "@/lib/collections";

export const GET = async () => {
  const { name: title, description, url, author, email, lang } = site;
  const allCollections = await getAllCollectionsByCategory();

  // Get all entries and sort by date (newest first)
  const items = Object.entries(allCollections)
    .flatMap(([collection, entries]) => {
      return entries
        .filter(({ data: { index } }) => !index)
        .map(({ data, id }) => ({
          title: data.title,
          description: data.description,
          pubDate: new Date(data.date || 0),
          link: `${url}/${collection}/${id}`,
          categories: data.tags || [],
          author: `${email} (${author})`,
          // Add updated date if available
          customData: data.mod
            ? `<updated>${new Date(data.mod).toUTCString()}</updated>`
            : undefined,
        }));
    })
    .sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  return rss({
    title,
    description,
    site: url,
    items,
    customData: [
      `<language>${lang}</language>`,
      `<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>`,
      `<managingEditor>${email} (${author})</managingEditor>`,
      `<webMaster>${email} (${author})</webMaster>`,
      `<image>`,
      `  <url>${url}/og-default.jpg</url>`,
      `  <title>${title}</title>`,
      `  <link>${url}</link>`,
      `</image>`,
      `<generator>Astro v4</generator>`,
      `<docs>https://www.rssboard.org/rss-specification</docs>`,
    ].join("\n"),
  });
};
