
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

## Reader Compatibility

The RSS feed is compatible with all major RSS readers:

### Web-based Readers

- **Feedly** ✅
- **Inoreader** ✅
- **The Old Reader** ✅
- **NewsBlur** ✅

### Desktop Readers

- **NetNewsWire** (Mac) ✅
- **Reeder** (Mac) ✅
- **ReadKit** (Mac) ✅
- **FeedReader** (Windows) ✅

### Mobile Readers

- **Reeder** (iOS) ✅
- **NetNewsWire** (iOS) ✅
- **Feedly** (iOS/Android) ✅
- **Inoreader** (iOS/Android) ✅

### Browser Extensions

- **Feedbro** (Firefox, Chrome) ✅
- **RSS Feed Reader** (Chrome) ✅

## Autodiscovery

Add RSS autodiscovery to your site for easy subscription.

**Location**: `src/components/layout/elements/head.astro`

```html
<link 
  rel="alternate" 
  type="application/rss+xml" 
  title="{site.name} RSS Feed" 
  href="/rss.xml" 
/>
```

This allows:

- Browser extensions to detect your feed
- RSS readers to find your feed automatically
- One-click subscription from browsers

## Feed Validation

Validate your RSS feed before launching:

### Online Validators

- **W3C Feed Validator**: https://validator.w3.org/feed/
- **RSS Feed Validator**: https://www.rssboard.org/rss-validator/

### Common Issues

1. **Invalid date format**: Use ISO 8601 or RFC 822
2. **Missing required fields**: title, link, description
3. **Invalid characters**: Escape HTML entities
4. **Broken links**: Ensure all URLs are absolute
5. **Invalid image URLs**: Use absolute URLs for images

### Testing

```bash
# Build site
npm run build

# Preview
npm run preview

# Access feed
curl http://localhost:4321/rss.xml

# Validate output
xmllint --noout rss.xml  # If you have xmllint installed
```

## Best Practices

### Content

1. **Clear titles**: Descriptive, unique titles
2. **Good descriptions**: Compelling summaries (150-300 chars)
3. **All content**: Include all published posts
4. **Consistent author**: Use same author format

### Metadata

1. **Accurate dates**: Use publication and modification dates
2. **Proper categories**: Include tags as categories
3. **Valid language**: Use correct language code
4. **Contact info**: Include author email

### Performance

1. **Reasonable size**: Limit to last 50-100 entries if you have many posts
2. **Cache headers**: Set appropriate cache headers
3. **Compression**: Enable gzip/brotli compression

### Updates

1. **Rebuild regularly**: Trigger builds when content changes
2. **Update timestamp**: `lastBuildDate` reflects latest build
3. **Modified dates**: Update `updated` field when posts change

## Advanced Features

### Atom Namespace

Already included for enhanced compatibility:

```xml
<rss xmlns:atom="http://www.w3.org/2005/Atom">
```

### iTunes Podcast Support

Add podcast-specific fields:

```typescript
customData: `
  <itunes:author>${site.author}</itunes:author>
  <itunes:summary>${site.description}</itunes:summary>
  <itunes:category text="Technology" />
`,
```

### JSON Feed

Create an additional JSON feed at `/feed.json`:

```typescript
export async function GET() {
  const entries = await getAllCollectionsByCategory({ published: true });
  
  return new Response(JSON.stringify({
    version: "https://jsonfeed.org/version/1.1",
    title: site.name,
    home_page_url: site.url,
    feed_url: `${site.url}/feed.json`,
    items: entries.map(entry => ({
      id: `${site.url}${entry.slug}`,
      url: `${site.url}${entry.slug}`,
      title: entry.data.title,
      content_html: entry.data.description,
      date_published: entry.data.date.toISOString(),
      date_modified: entry.data.mod.toISOString(),
      tags: entry.data.tags || [],
    })),
  }), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
```

## Promoting Your Feed

### Add to Site

**Header link**:

```astro
<a href="/rss.xml" target="_blank">
  <RssIcon /> Subscribe
</a>
```

**Footer**:

```astro
<div>
  <a href="/rss.xml">RSS Feed</a>
</div>
```

### Social Media

Announce your RSS feed:

- Twitter/X: Share the RSS URL
- Mastodon: Add to profile
- LinkedIn: Mention in bio

### Directories

Submit to RSS directories:

- Feedly directory
- RSS.app
- Blogarama

## Troubleshooting

### Feed Not Generating

1. **Check build**: Ensure build completes successfully
2. **Verify file**: Look for `dist/rss.xml` after build
3. **Check errors**: Review build logs for errors
4. **Test locally**: Run `npm run preview` and access `/rss.xml`

### Empty Feed

1. **Published content**: Ensure content has `published: true`
2. **Content fetch**: Check `getAllCollectionsByCategory()` returns entries
3. **Date sorting**: Verify entries have valid dates
4. **Console logs**: Add logging to debug

### Invalid XML

1. **Escape content**: Ensure special characters are escaped
2. **Valid dates**: Use proper date formats
3. **Closed tags**: All XML tags must be properly closed
4. **Validator**: Use W3C validator to find issues

## Monitoring

Track RSS subscription engagement:

### Metrics to Track

- **Subscriber count**: Using FeedBurner or similar
- **Click-through rate**: From feed to site
- **Popular posts**: Which posts drive traffic
- **Reader platforms**: Which readers are used

### Tools

- **FeedBurner**: Track subscribers and stats (discontinued but still works)
- **Feedpress**: Modern RSS analytics
- **Google Analytics**: Track referrals from feed readers

## Related Documentation

- [@astrojs/rss Documentation](https://docs.astro.build/en/guides/rss/)
- [RSS 2.0 Specification](https://www.rssboard.org/rss-specification)
- [Content Management](./04-content-management.md)
- [SEO Optimization](./09-seo.md)
