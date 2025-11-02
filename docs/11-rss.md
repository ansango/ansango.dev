
# 📡 RSS Feed

Automatic RSS feed generation with comprehensive metadata for all your published content.

## Overview

RSS feed is automatically generated at `/rss.xml` with full metadata including blog posts, wiki entries, and projects.

## Features

- ✅ **All Published Content**: Includes blog, wiki, and projects
- ✅ **Full Metadata**: Title, description, author, categories (tags)
- ✅ **Timestamps**: Publication and modification dates
- ✅ **Channel Information**: Language, managing editor, webmaster
- ✅ **Feed Image**: Site logo/default OG image
- ✅ **Sorted by Date**: Newest content first
- ✅ **Standards Compliant**: Follows RSS 2.0 specification

## Feed URL

Your RSS feed is available at:

```
https://yoursite.com/rss.xml
```

## Feed Structure

### Channel Metadata

```xml
<rss version="2.0">
  <channel>
    <title>Site Name</title>
    <description>Site description</description>
    <link>https://yoursite.com</link>
    <language>es</language>
    <lastBuildDate>Sat, 02 Nov 2025 00:00:00 GMT</lastBuildDate>
    <managingEditor>email@example.com (Author Name)</managingEditor>
    <webMaster>email@example.com (Author Name)</webMaster>
    <image>
      <url>https://yoursite.com/og-default.jpg</url>
      <title>Site Name</title>
      <link>https://yoursite.com</link>
    </image>
    <!-- Items here -->
  </channel>
</rss>
```

### Item Structure

Each content entry:

```xml
<item>
  <title>Article Title</title>
  <description>Article description</description>
  <link>https://yoursite.com/blog/article-slug</link>
  <pubDate>Fri, 11 Oct 2025 00:00:00 GMT</pubDate>
  <updated>Sat, 12 Oct 2025 00:00:00 GMT</updated>
  <category>tag1</category>
  <category>tag2</category>
  <author>email@example.com (Author Name)</author>
  <guid>https://yoursite.com/blog/article-slug</guid>
</item>
```

## Implementation

### Location

RSS feed is generated in `src/pages/rss.xml.ts`.

### Code Structure

```typescript
import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getAllCollectionsByCategory } from '@/lib/collections';
import site from '@/site.json';

export async function GET(context: APIContext) {
  // Fetch all published content
  const allEntries = await getAllCollectionsByCategory({
    published: true,
  });

  // Sort by date (newest first)
  const sortedEntries = allEntries.sort((a, b) => 
    b.data.date.getTime() - a.data.date.getTime()
  );

  return rss({
    title: site.name,
    description: site.description,
    site: context.site || site.url,
    language: site.lang,
    managingEditor: `${site.email} (${site.author})`,
    webMaster: `${site.email} (${site.author})`,
    xmlns: {
      atom: 'http://www.w3.org/2005/Atom',
    },
    customData: `
      <image>
        <url>${site.url}${site.image}</url>
        <title>${site.name}</title>
        <link>${site.url}</link>
      </image>
      <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    `,
    items: sortedEntries.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      link: `${site.url}${entry.slug}`,
      pubDate: entry.data.date,
      updated: entry.data.mod,
      categories: entry.data.tags || [],
      author: `${site.email} (${site.author})`,
    })),
  });
}
```

## Customization

### Change Feed Title

Edit `src/site.json`:

```json
{
  "name": "Your Feed Title"
}
```

### Change Feed Description

Edit `src/site.json`:

```json
{
  "description": "Your feed description"
}
```

### Filter Content

Include only specific collections:

```typescript
// Only blog posts
const blogEntries = await getAllCollectionsByCategory({
  published: true,
  category: 'blog',
});
```

Or exclude certain collections:

```typescript
const entries = allEntries.filter(
  entry => !entry.slug.startsWith('/wiki')
);
```

### Custom Item Fields

Add custom fields to items:

```typescript
items: sortedEntries.map((entry) => ({
  title: entry.data.title,
  description: entry.data.description,
  link: `${site.url}${entry.slug}`,
  pubDate: entry.data.date,
  // Custom fields
  customData: `
    <excerpt>${entry.data.excerpt}</excerpt>
    <image>${entry.data.image}</image>
  `,
}))
```

### Full Content vs Summaries

**Current**: Feed includes descriptions (summaries)

**Full content**: Include entire post content:

```typescript
import { getEntry } from 'astro:content';

items: await Promise.all(
  sortedEntries.map(async (entry) => {
    const content = await entry.render();
    return {
      title: entry.data.title,
      content: content.compiledContent(),  // Full HTML
      // ...
    };
  })
)
```

## Feed Image

### Default Image

Set in `src/site.json`:

```json
{
  "image": "/avatar.jpeg"
}
```

### Requirements

- **Format**: JPG or PNG
- **Size**: Ideally 512×512px (square)
- **Location**: `public/` directory
- **File size**: < 1MB recommended

### Custom Per-Entry Images

RSS 2.0 supports per-item images via `enclosure`:

```typescript
items: sortedEntries.map((entry) => ({
  title: entry.data.title,
  // ...
  enclosure: entry.data.image ? {
    url: `${site.url}${entry.data.image}`,
    type: 'image/jpeg',
    length: 0,  // Optional: file size in bytes
  } : undefined,
}))
```

## Related Documentation

- [@astrojs/rss Documentation](https://docs.astro.build/en/guides/rss/)
- [RSS 2.0 Specification](https://www.rssboard.org/rss-specification)
- [Content Management](./04-content-management.md)
- [SEO Optimization](./09-seo.md)
