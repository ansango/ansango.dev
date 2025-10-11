import rss from "@astrojs/rss"
import { site } from "@/constants"
import { getAllCollectionsByCategory } from "@/lib/collections"

export const GET = async () => {
    const { name: title, description, url, author } = site
    const allCollections = await getAllCollectionsByCategory();
    return rss({
        title,
        description,
        site: url,
        items: Object.entries(allCollections).flatMap(([collection, entries]) => {
            return entries.filter(({ data: { index } }) => !index
            ).map(({ data: { title, description, date, tags }, id }) => ({
                title,
                description,
                pubDate: new Date(date || 0),
                link: `${url}/${collection}/${id}`,
                categories: tags,
                author
            }))
        })
    })
}