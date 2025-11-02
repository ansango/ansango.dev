
# 🔧 Configuration

Learn how to configure and customize your site.

## Environment Variables

Environment variables control integrations and features.

### Required Variables

Create a `.env` file based on `.env.sample`:

```bash
cp .env.sample .env
```

### Available Variables

```env
# Raindrop.io Integration (for bookmarks and reading)
RAINDROP_ACCESS_TOKEN=your_raindrop_access_token_here

# Last.fm Integration (for music)
PUBLIC_LASTFM_API_KEY=your_api_key_here
PUBLIC_LASTFM_APPNAME=ansango.dev
PUBLIC_LASTFM_API_BASE_URL=https://ws.audioscrobbler.com/2.0
LASTFM_SHARED_SECRET=your_shared_secret_here

# GoatCounter Analytics (optional)
PUBLIC_GOATCOUNTER_CODE=yoursite
```

### Public vs Private

Variables prefixed with `PUBLIC_` are exposed to client-side code:

- **PUBLIC_**: Available in browser (use for API keys that need client access)
- **No prefix**: Server-only (use for secrets and sensitive data)

**Example**:

```typescript
// Client-side (works)
const apiKey = import.meta.env.PUBLIC_LASTFM_API_KEY;

// Server-only (only works in .astro files, not in browser)
const token = import.meta.env.RAINDROP_ACCESS_TOKEN;
```

### Environment-specific Config

#### Development

Use `.env` file for local development.

#### Production

Set environment variables in your hosting provider:

## Site Metadata

Global site information is centralized in `src/site.json`.

### Structure

```json
{
  "url": "https://ansango.com",
  "name": "ansango",
  "description": "Notas de tecnología y desarrollo web.",
  "image": "/avatar.jpeg",
  "email": "anibalsantosgo@gmail.com",
  "lang": "es",
  "author": "Anibal Santos",
  "github": "ansango",
  "twitter": "iamasync_"
}
```

### Usage in Code

```typescript
import site from '@/site.json';

console.log(site.name);  // "Your Site Name"
console.log(site.url);   // "https://yoursite.com"
```

## Collection Metadata

Collection configuration is in `src/constants.ts`.

### Adding a New Collection

#### Step 1: Define Schema

Edit `src/content.config.ts`:

```typescript
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const path = "./src/content";

const newCollection = defineCollection({
  loader: glob({ 
    pattern: "**/*.md", 
    base: `${path}/new-collection` 
  }),
  schema: commonSchema, // or create custom schema
});

export const collections = {
  blog,
  wiki,
  projects,
  // ... existing collections
  newCollection,
};
```

#### Step 2: Add Metadata

Edit `src/constants.ts`:

```typescript
const contentCollections: Record<CollectionName, Meta> = {
  // ... existing collections
  newCollection: {
    title: "New Collection",
    description: "Description for this collection",
    entriesPerPage: 10,  // 0 for no pagination
    url: "/new-collection",
    published: true,
  },
};
```

#### Step 3: Create Content Folder

```bash
mkdir src/content/new-collection
```

#### Step 4: Add to Site Tree (Optional)

For navigation visibility, edit `src/constants.ts`:

```typescript
const tree: Tree = {
  content: {
    home: contentCollections.home,
    blog: contentCollections.blog,
    // ... existing
    newCollection: contentCollections.newCollection,
  },
};
```

#### Step 5: Create Route

Create `src/pages/new-collection/index.astro` or use the dynamic `[collection]` route.

### Custom Schema Example

Create a specialized schema for your collection:

```typescript
const portfolioSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.coerce.date(),
  published: z.boolean().default(false),
  image: z.string().optional(),
  url: z.string().url().optional(),
  technologies: z.array(z.string()).default([]),
  github: z.string().url().optional(),
});

const portfolio = defineCollection({
  loader: glob({ 
    pattern: "**/*.md", 
    base: `${path}/portfolio` 
  }),
  schema: portfolioSchema,
});
```

## Pagination Settings

Control entries per page for each collection.

### Configuration

Edit `src/constants.ts`:

```typescript
const contentCollections: Record<CollectionName, Meta> = {
  blog: {
    // ...
    entriesPerPage: 10,  // Show 10 posts per page
  },
  projects: {
    // ...
    entriesPerPage: 6,   // Show 6 projects per page
  },
  about: {
    // ...
    entriesPerPage: 0,   // No pagination (single page)
  },
};
```

### Rules

- **> 0**: Enable pagination with specified number per page
- **0**: Disable pagination (show all entries on one page)
- **Default**: Set a sensible default (e.g., 10) for most collections

### Implementation

Pagination is handled in `src/lib/collections.ts`:

```typescript
export async function getCollectionEntries(
  collectionName: CollectionName,
  page = 1
) {
  const { entriesPerPage } = contentCollections[collectionName];
  
  if (entriesPerPage === 0) {
    // Return all entries
    return allEntries;
  }
  
  // Paginate
  const start = (page - 1) * entriesPerPage;
  const end = start + entriesPerPage;
  return allEntries.slice(start, end);
}
```

## Navigation Tree

The site structure and navigation is defined in `src/constants.ts`.

### Structure

```typescript
export type Tree = {
  content: Record<string, Meta>;
  pages?: Record<string, Meta>;
};

const tree: Tree = {
  content: {
    home: contentCollections.home,
    blog: contentCollections.blog,
    wiki: contentCollections.wiki,
    projects: contentCollections.projects,
  },
  pages: {
    music: contentCollections.music,
    bookmarks: contentCollections.bookmarks,
    reading: contentCollections.reading,
    tags: contentCollections.tags,
  },
};
```

### Adding to Navigation

To show a page in navigation:

```typescript
const tree: Tree = {
  content: {
    // ...
    newPage: contentCollections.newPage,
  },
};
```

### Navigation Order

The order in the `tree` object determines navigation order (top to bottom).

### Hidden Pages

Pages not in the tree are still accessible by URL but won't appear in navigation.

## Astro Configuration

Advanced Astro settings are in `astro.config.ts`.

### Site URL

```typescript
export default defineConfig({
  site: 'https://yoursite.com',
  // ...
});
```

**Important**: Update this to your production URL for:
- Correct sitemap URLs
- Proper canonical links
- Accurate RSS feed URLs
- Social sharing previews

### Integrations

```typescript
export default defineConfig({
  integrations: [
    sitemap({
      serialize(item) {
        // Custom sitemap logic
      }
    }),
    pagefind(),
    svelte(),
    // Add more integrations
  ],
});
```

### Markdown Settings

```typescript
export default defineConfig({
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
    rehypePlugins: [
      rehypeRemoveH1,
      elementArrow,
      // Add more plugins
    ],
  },
});
```

## RSS Feed Configuration

Customize RSS feed in `src/pages/rss.xml.ts`.

### Feed Metadata

```typescript
export async function GET(context: APIContext) {
  return rss({
    title: site.name,
    description: site.description,
    site: context.site || site.url,
    language: site.lang,
    managingEditor: `${site.email} (${site.author})`,
    webMaster: `${site.email} (${site.author})`,
    // ...
  });
}
```

### Custom Item Fields

```typescript
items: allEntries.map((entry) => ({
  title: entry.data.title,
  description: entry.data.description,
  link: `${site.url}${entry.slug}`,
  pubDate: entry.data.date,
  updated: entry.data.mod,
  categories: entry.data.tags || [],
  author: `${site.email} (${site.author})`,
  // Add custom fields
}))
```

## Sitemap Configuration

Customize sitemap priorities in `src/lib/sitemap.ts`.

### Priority Rules

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
  
  // Add custom rules
  if (path.startsWith('/your-collection/')) {
    return { ...item, priority: 0.8, changefreq: 'weekly' };
  }
  
  return item;
}
```

## Configuration Checklist

Before deploying:

- [ ] Update `site.json` with your information
- [ ] Set production URL in `astro.config.ts`
- [ ] Configure environment variables in hosting provider
- [ ] Customize collection metadata in `constants.ts`
- [ ] Adjust pagination settings
- [ ] Update navigation tree
- [ ] Set sitemap priorities
- [ ] Customize RSS feed metadata
- [ ] Test all integrations work
