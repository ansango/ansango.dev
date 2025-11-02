
# 🎯 SEO Optimization

The site is fully optimized for search engines and social sharing with comprehensive SEO features.

## Meta Tags & Social Cards

Complete meta tag implementation in `src/components/layout/elements/head.astro`.

### Basic Meta Tags

```html
<meta name="author" content="{site.author}" />
<meta name="description" content="{description}" />
<meta name="keywords" content="{tags.join(', ')}" />
<meta name="robots" content="index, follow" />
<meta name="googlebot" content="index, follow" />
```

### Canonical URLs

Every page has a canonical URL to prevent duplicate content issues:

```html
<link rel="canonical" href="{canonicalURL}" />
```

### Open Graph Tags

Full Open Graph protocol support for Facebook, LinkedIn, and other platforms:

```html
<meta property="og:type" content="{type}" />
<meta property="og:title" content="{title}" />
<meta property="og:description" content="{description}" />
<meta property="og:url" content="{url}" />
<meta property="og:image" content="{imageUrl}" />
<meta property="og:image:alt" content="{title}" />
<meta property="og:locale" content="{locale}" />
<meta property="og:site_name" content="{site.name}" />
```

**Article-specific tags**:

```html
<meta property="article:published_time" content="{publishedTime}" />
<meta property="article:modified_time" content="{modifiedTime}" />
<meta property="article:author" content="{author}" />
<meta property="article:tag" content="{tag}" />
```

### Twitter Cards

Summary large image cards for Twitter sharing:

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@{site.social.twitter}" />
<meta name="twitter:creator" content="@{site.social.twitter}" />
<meta name="twitter:title" content="{title}" />
<meta name="twitter:description" content="{description}" />
<meta name="twitter:image" content="{imageUrl}" />
```

### Custom Images

Override default OG image per page:

```markdown
---
title: "My Post"
image: "/assets/images/custom-og.jpg"
---
```

Or use the default from `site.json`:

```json
{
  "image": "/avatar.jpeg"
}
```

## Structured Data (JSON-LD)

Automatic JSON-LD structured data using Schema.org vocabulary.

### Article Schema

For blog posts, wiki entries, and projects:

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Article Title",
  "description": "Article description",
  "image": "https://yoursite.com/image.jpg",
  "author": {
    "@type": "Person",
    "name": "Author Name",
    "url": "https://yoursite.com"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Site Name",
    "logo": {
      "@type": "ImageObject",
      "url": "https://yoursite.com/logo.png"
    }
  },
  "datePublished": "2025-10-11",
  "dateModified": "2025-10-12",
  "keywords": "tag1, tag2, tag3"
}
```

### WebSite Schema

For static pages and collection indexes:

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Site Name",
  "url": "https://yoursite.com",
  "description": "Site description"
}
```

### Breadcrumbs

Hierarchical navigation for nested content (3+ path segments):

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://yoursite.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Blog",
      "item": "https://yoursite.com/blog"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Post Title",
      "item": "https://yoursite.com/blog/post-slug"
    }
  ]
}
```

**Implementation**: `src/lib/breadcrumbs.ts`

## Sitemap

Advanced XML sitemap at `/sitemap.xml` with intelligent prioritization.

### Priority Settings

| Page Type | Priority | Change Frequency |
|-----------|----------|------------------|
| Homepage | 1.0 | Daily |
| Blog posts | 0.9 | Monthly |
| Wiki entries | 0.8 | Monthly |
| Projects | 0.8 | Monthly |
| Collection indexes | 0.7 | Weekly |
| Static pages (about, uses, now) | 0.6 | Monthly |
| Paginated pages | 0.5 | Weekly |
| Other pages | 0.5 | Weekly |

### Implementation

Located in `src/lib/sitemap.ts`:

```typescript
export function serializeSitemap(item: SitemapItem): SitemapItem {
  const url = new URL(item.url);
  const path = url.pathname;
  
  // Homepage
  if (path === '/') {
    return { ...item, priority: 1.0, changefreq: 'daily' };
  }
  
  // Blog posts
  if (path.startsWith('/blog/') && !path.endsWith('/blog/')) {
    return { ...item, priority: 0.9, changefreq: 'monthly' };
  }
  
  // Add more rules...
  
  return item;
}
```

### Automatic Generation

Sitemap is automatically generated during build using `@astrojs/sitemap` integration.

**Configuration** in `astro.config.ts`:

```typescript
sitemap({
  serialize: serializeSitemap,
})
```

## SEO Best Practices

### Title Tags

Each page has a unique, descriptive title:

- **Homepage**: Site name + tagline
- **Collection**: Collection name + site name
- **Entry**: Entry title + site name
- **Limit**: 60 characters for optimal display

**Example**:

```typescript
const title = entry 
  ? `${entry.data.title} | ${site.name}`
  : `${collection.title} | ${site.name}`;
```

### Meta Descriptions

Every page has a unique meta description:

- **Length**: 150-160 characters
- **Unique**: Different for each page
- **Descriptive**: Summarizes page content
- **Actionable**: Encourages clicks

**Example**:

```markdown
---
description: "Learn how to optimize your Astro site for search engines with comprehensive meta tags, structured data, and sitemaps."
---
```

### Heading Hierarchy

Proper heading structure for accessibility and SEO:

1. **H1**: Page title (from frontmatter, H1 removed from markdown)
2. **H2**: Major sections
3. **H3**: Subsections
4. **H4-H6**: Further nesting as needed

**Implementation**: `rehypeRemoveH1` plugin removes H1 from markdown.

### Image Optimization

All images are optimized for SEO:

- **Alt text**: Descriptive alternative text
- **File names**: Descriptive, keyword-rich
- **Format**: WebP for better compression
- **Lazy loading**: Automatic via Astro Image
- **Dimensions**: Specified for better CLS

**Example**:

```astro
<Image
  src={imageSrc}
  alt="Descriptive alt text for SEO"
  width={800}
  height={600}
/>
```

### Internal Linking

Strong internal linking structure:

- **Breadcrumbs**: Hierarchical navigation
- **Related posts**: Tag-based linking
- **Wiki links**: Automatic tree navigation
- **Descriptive anchors**: Meaningful link text

### URL Structure

Clean, descriptive URLs:

- **Readable**: `/blog/getting-started` not `/blog/123`
- **Lowercase**: All lowercase for consistency
- **Hyphens**: Use hyphens not underscores
- **Short**: Concise but descriptive
- **Hierarchical**: Reflects content structure

## Social Sharing Optimization

### OG Image Requirements

For optimal social sharing:

- **Dimensions**: 1200×630px (Facebook, LinkedIn)
- **Format**: JPG or PNG (WebP not always supported)
- **File size**: < 8MB
- **Aspect ratio**: 1.91:1
- **Text**: Large, readable at small sizes

**Location**: `public/` directory for static access

**Default**: Specified in `site.json`

**Custom**: Per-page via frontmatter

### Twitter Card Types

- **summary_large_image**: Large image above content (recommended)
- **summary**: Smaller square image (alternative)

**Current implementation**: `summary_large_image`

### Testing Social Cards

Test your social cards before sharing:

- **Facebook**: [Sharing Debugger](https://developers.facebook.com/tools/debug/)
- **Twitter**: [Card Validator](https://cards-dev.twitter.com/validator)
- **LinkedIn**: Share URL and check preview

## Performance & SEO

Performance impacts SEO rankings (Core Web Vitals).
## SEO Checklist

### Before Launch

- [ ] Set correct `url` in `site.json` (production domain)
- [ ] Update `author` and `email` in `site.json`
- [ ] Set `twitter` handle for Twitter Cards
- [ ] Create default OG image (1200x630px)
- [ ] Verify all pages have unique titles
- [ ] Verify all pages have meta descriptions
- [ ] Check heading hierarchy (H1 → H2 → H3)
- [ ] Add alt text to all images
- [ ] Review internal linking structure

### After Launch

- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Verify robots.txt is accessible
- [ ] Test structured data with [Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Test Open Graph with [Facebook Debugger](https://developers.facebook.com/tools/debug/)
- [ ] Test Twitter Cards with [Card Validator](https://cards-dev.twitter.com/validator)
- [ ] Run Lighthouse SEO audit (aim for 100 score)
- [ ] Monitor Core Web Vitals in Search Console
- [ ] Set up Google Analytics or alternative
- [ ] Create Google My Business profile (if applicable)

## Testing Tools

### Google Tools

- **Search Console**: Monitor indexing and performance
- **PageSpeed Insights**: Test page speed and Core Web Vitals
- **Rich Results Test**: Validate structured data
- **Mobile-Friendly Test**: Check mobile compatibility

### Third-party Tools

- **Lighthouse**: Comprehensive SEO audit (in Chrome DevTools)
- **Screaming Frog**: Site crawling and analysis
- **Ahrefs**: Backlink analysis and keyword research
- **SEMrush**: Competitive analysis and SEO insights

### Validation

- **W3C Validator**: HTML validation
- **Schema.org Validator**: Structured data testing
- **Meta Tags Checker**: Verify meta tags
- **Broken Link Checker**: Find dead links

## Implementation Files

Key files for SEO:

- **`src/components/layout/elements/head.astro`**: Meta tags and JSON-LD
- **`src/lib/breadcrumbs.ts`**: Breadcrumb generation
- **`src/lib/sitemap.ts`**: Sitemap serialization
- **`src/pages/rss.xml.ts`**: RSS feed
- **`public/robots.txt`**: Crawler directives
- **`astro.config.ts`**: Site URL and integrations
