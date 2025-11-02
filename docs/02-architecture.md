
# 🏗️ Architecture

Understanding the architecture of this template will help you customize and extend it effectively.

## Content Collections

The site is built around 8 content types, all defined in `src/content.config.ts`:

- **blog**: Technology articles and posts
- **wiki**: Hierarchical knowledge base with nested folder support
- **projects**: Portfolio and project showcases
- **about**: Personal information
- **uses**: Tools and setup
- **now**: Current activities (inspired by [nownownow.com](https://nownownow.com/))
- **blogroll**: Curated list of blogs you follow
- **bookmarks**: Saved links and resources (powered by Raindrop.io)
- **reading**: Reading list (powered by Raindrop.io collection named "reading")

> **Note**: Both `bookmarks` and `reading` pages are dynamically generated from Raindrop.io collections, not local content files.

## Configuration System

All site behavior is controlled through three main files:

### `site.json`

Global site metadata (title, description, author, social links, etc.)

```json
{
  "url": "https://ansango.com",
  "name": "ansango",
  "description": "Notas de tecnología y desarrollo web.",
  "image": "/avatar.jpeg",
  "email": "anibalsantosgo@gmail.com",
  "lang": "es",
  "author": "Anibal Santos"
}
```

### `src/content.config.ts`

Content collection schemas using Zod. Defines frontmatter structure for each collection type with common schemas for SEO, metadata, and publishing status.

### `src/constants.ts`

Collection metadata, pagination settings, URLs, site structure, and navigation tree. This file exports the `site` object which contains all pages metadata and the navigation hierarchy.

## Content Structure

```
src/content/
├── blog/              # Blog posts
├── wiki/              # Hierarchical wiki
│   ├── ai/
│   │   └── agentes.md
│   └── development/
│       └── web/
├── projects/          # Project showcases
├── about.md           # About page
├── uses.md            # Uses page
├── now.md             # Now page
├── blogroll.md        # Blogroll
└── bookmarks.md       # Bookmarks (now backed by Raindrop collections)
```

## Data Flow

### Static Content (Build Time)

1. Content collections loaded from `src/content/`
2. Zod schemas validate frontmatter
3. Markdown processed with rehype plugins
4. Static pages generated

### Dynamic Content (Build Time + Runtime)

1. **Build Time**: Raindrop.io and Last.fm data fetched and cached
2. **Runtime**: Client-side components poll for real-time updates (music player)
3. TanStack Query manages caching and refetching

## Routing

The site uses Astro's file-based routing:

- `/` → `src/pages/index.astro`
- `/blog` → `src/pages/[collection]/index.astro`
- `/blog/post-slug` → `src/pages/[collection]/[…slug].astro`
- `/music` → `src/pages/music.astro`
- `/bookmarks` → `src/pages/bookmarks/index.astro`
- `/reading` → `src/pages/reading/index.astro`
- `/tags` → `src/pages/tags/index.astro`
- `/archive` → `src/pages/archive/index.astro`
