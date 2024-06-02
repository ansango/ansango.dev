import rss from '@astrojs/rss';
import { getAllCollections } from '../lib/collections';
import { site } from '@/consts';

export async function GET(context) {
  const collections = await getAllCollections();
  return rss({
    title: site.name,
    description: site.pages.home.description,
    site: context.site,
    items: collections.map(({ slug, collection, data: { title, description, date: pubDate } }) => ({
      title,
      description,
      pubDate,
      link: `${site.url}/${collection}/${slug}`,
    })),
    customData: `<language>es</language>`,
  });
}