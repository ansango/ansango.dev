# 🌐 Personal Blog & Wiki Template

A modern, content-first personal website built with [Astro](https://astro.build), designed for technology articles, wikis, projects, and indie web principles. Write in [Obsidian](https://obsidian.md), publish with ease.

## ✨ Features

- 📝 **Multiple Content Collections**: Blog, Wiki, Projects, and standalone pages (About, Now, Uses, Blogroll, Bookmarks, Reading)
- 🌳 **Hierarchical Wiki**: Nested folder structure with automatic tree navigation
- 🎨 **Tailwind CSS v4**: Centralized styling system with custom properties
- 🔍 **Full-text Search**: Powered by [Pagefind](https://pagefind.app/) with keyboard shortcuts (Cmd/Ctrl + K)
- 🌓 **Theme Switching**: Built-in dark/light mode toggle with persistent preference
- 📱 **Fully Responsive**: Mobile-first design
- 🚀 **Mostly Static**: Lightning-fast performance with minimal JavaScript for interactive features
- 🔗 **Indie Web Ready**: Blogroll, bookmarks, and RSS feed support
- 📊 **Privacy-focused Analytics**: GoatCounter integration (optional, lightweight, no cookies)
- 🎵 **Music Integration**: Live Last.fm integration showing current playing track and listening history
- 🔖 **Raindrop.io Integration**: Dynamic bookmarks and reading lists from your Raindrop collections
- ⚡ **Interactive Components**: Svelte 5 components with TanStack Query for real-time data
- ✍️ **Obsidian Integration**: Write content in Obsidian, sync via GitHub Actions (see TODO section)
- 🏷️ **Smart Tagging**: Automatic tag aggregation and filtering
- 📄 **SEO Optimized**: Comprehensive meta tags, Open Graph, Twitter Cards, JSON-LD structured data, breadcrumbs, sitemap with priorities, and enhanced RSS feed
- 🎯 **Custom Rehype Plugins**: Automatic external link icons, H1 removal, and relative link conversion

## 🏗️ Architecture

### Content Collections

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

> Note: Both `bookmarks` and `reading` pages are dynamically generated from Raindrop.io collections, not local content files.

### Configuration System

All site behavior is controlled through three main files:

#### `site.json`

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

#### `src/content.config.ts`

Content collection schemas using Zod. Defines frontmatter structure for each collection type with common schemas for SEO, metadata, and publishing status.

#### `src/constants.ts`

Collection metadata, pagination settings, URLs, site structure, and navigation tree. This file exports the `site` object which contains all pages metadata and the navigation hierarchy.

### Content Structure

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

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, pnpm, or bun
- (Optional) Raindrop.io account for bookmarks integration
- (Optional) Last.fm account for music integration

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/your-repo.git
cd your-repo

# Install dependencies
npm install

# Copy environment variables
cp .env.sample .env

# Edit .env and add your API keys (optional but recommended):
# - RAINDROP_ACCESS_TOKEN for bookmarks/reading integration
# - PUBLIC_LASTFM_API_KEY for music integration

# Start development server
npm run dev
```

Visit `http://localhost:4321` to see your site.

### Available Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run astro        # Run Astro CLI commands
npm run format       # Format code with Prettier
```

Quick checklist:

- Ensure Node.js 18+ is installed
- Copy `.env.sample` to `.env` and fill required tokens (see 'Environment Variables' section)
- Install dependencies with `npm install`
- Run `npm run dev` while developing

## 📝 Content Management

### Frontmatter Format

Each content type has specific frontmatter requirements. Example for a blog post:

```markdown
---
title: "My First Post"
description: "A great introduction to my blog"
date: 2025-10-11
mod: 2025-10-11
published: true
tags: [astro, web-development]
---

Your content here...
```

### Publishing Content

- Set `published: true` in frontmatter to make content visible
- Use `published: false` to keep drafts hidden
- The `mod` field tracks last modification date
- Tags are automatically slugified and aggregated

### Wiki Organization

The wiki supports nested folders for hierarchical content:

```
wiki/
├── development/
│   ├── web/
│   │   └── frameworks.md
│   └── devtools.md
```

Navigation is automatically generated from folder structure.

## 🎨 Styling

### Tailwind CSS v4

The project uses Tailwind CSS v4 with a centralized styling approach:

- Global styles in `src/styles/global.css`
- Component-specific styles in individual style files (`content.css`, `headings.css`, `tables.css`, `theme.css`)
- Theme tokens defined in CSS custom properties
- Dark mode support via class strategy with automatic theme detection and toggle
- Font family: Inter Variable from `@fontsource-variable/inter`

### Layout System

Layouts are modular and composable:

```
src/layout/
├── default.astro           # Base layout wrapper
└── elements/
    ├── head.astro          # SEO and meta tags
    ├── header.astro        # Site header with navigation and search
    ├── footer.astro        # Site footer
    ├── theme.astro         # Theme toggle component
    ├── theme.script.astro  # Theme switching logic
    └── clipboard.script.astro  # Code copy functionality
```

### Component Architecture

Components are organized by atomic design principles:

```
src/components/
├── atoms/              # Basic building blocks (Container, Link, Tag, etc.)
├── molecules/          # Composed components (Pagination, Searcher, Tree-node)
├── organisms/          # Complex sections (Archive, Bookmarks, Reading, Wiki, Music)
├── templates/          # Page templates for collections and entries
├── icons/              # SVG icon components
└── layout/             # Layout wrapper components
```

## 🔌 Integrations

### Astro Integrations

- **@astrojs/sitemap**: Automatic XML sitemap generation with custom priorities and change frequencies
- **astro-pagefind**: Full-text search indexing with zero-config setup
- **@astrojs/svelte**: Svelte 5 integration for interactive components
- **@astrojs/rss**: RSS feed generation with full metadata and structured content

### Svelte 5 Components

The project uses Svelte 5 for interactive features:

- **PlayNow**: Real-time Last.fm current track display with auto-refresh
- **PlayNow Mini**: Compact version of the music player
- Uses TanStack Query (Svelte Query) for data fetching and caching

### Rehype Plugins

Custom plugins in `src/lib/rehype.ts`:

- **rehypeRemoveH1**: Removes H1 tags (titles come from frontmatter)
- **elementArrow**: Adds visual arrow icons to external links

### Third-party Rehype Plugins

- **astro-rehype-relative-markdown-links**: Converts relative MD links to proper routes
- **rehype-external-links**: Enhanced external link handling with `target="_blank"` and security attributes

### GoatCounter Analytics

Privacy-focused, lightweight analytics integration with zero cookies and GDPR compliance.

#### Quick Setup

1. Sign up for a free account at: https://www.goatcounter.com/
2. Choose your site code (e.g., `yoursite` for `yoursite.goatcounter.com`)
3. Add it to your `.env`:

```env
PUBLIC_GOATCOUNTER_CODE=yoursite
```

#### Features

- **Lightweight**: Only ~3.5KB, minimal performance impact
- **No cookies**: GDPR compliant by default, no consent banner needed
- **Privacy-first**: Doesn't track users, only page views
- **Auto-detects**: Referrers, screen size, location (country only)
- **Bot filtering**: Automatically filters out bots and crawlers
- **Real-time**: Live dashboard updates
- **Free hosting**: No cost for reasonable usage on goatcounter.com

#### Implementation

The script is conditionally loaded in `src/components/layout/elements/head.astro`:
- Only loads if `PUBLIC_GOATCOUNTER_CODE` is set
- Async loading for zero render blocking
- Works seamlessly with Astro view transitions
- Script source: `//gc.zgo.at/count.js` (official CDN)

#### Dashboard

Access your analytics at:
```
https://yoursite.goatcounter.com
```

#### Self-hosting (Optional)

GoatCounter can be self-hosted if you prefer full control:
1. Download the Go binary from: https://github.com/arp242/goatcounter
2. Run with SQLite (no external database needed)
3. Update script URL in `head.astro` to your domain

#### Troubleshooting

- If analytics don't appear, verify:
  - `PUBLIC_GOATCOUNTER_CODE` is set correctly
  - Code matches your GoatCounter account (check dashboard URL)
  - Site is publicly accessible (GoatCounter can't track localhost)
  - Check browser console for script loading errors

### Raindrop.io Integration

This project integrates with Raindrop.io to power the Bookmarks and Reading sections. These are implemented as dynamic pages that fetch data from your Raindrop collections at build time.

#### Quick Setup

1. Create a Raindrop API access token at: https://raindrop.io/settings/integrations
2. Copy `.env.sample` to `.env` and set your token:

```env
RAINDROP_ACCESS_TOKEN=your_raindrop_access_token_here
```

3. Ensure your environment (local development and deployment) provides the `RAINDROP_ACCESS_TOKEN` environment variable.

#### Implementation Details

- **Services**: Located in `src/lib/raindrop/` with utilities for fetching collections and bookmarks
- **Caching**: Implements in-memory caching to avoid redundant API calls during build
- **Mapping**: Automatically maps Raindrop data to site-specific format
- **Collection Filtering**: Excludes "reading" collection from bookmarks list

#### Collection Naming Conventions

- Collections are filtered by site name prefix (e.g., `ansango.`)
- The mapper strips the prefix from collection titles
- Name collections like `ansango.work`, `ansango.daily` for bookmarks
- The `reading` collection should be named exactly `reading` (without site prefix)
- The site automatically excludes the "reading" collection from the bookmarks page

#### Pages Powered by Raindrop

- `/bookmarks`: Lists all your Raindrop collections (excluding "reading")
- `/bookmarks/[collection]`: Shows bookmarks from a specific collection
- `/reading`: Displays items from your "reading" collection with pagination

#### Deployment

Set `RAINDROP_ACCESS_TOKEN` in your hosting provider's environment variables before building.

#### Troubleshooting

- If bookmarks or reading pages are empty, verify:
  - `RAINDROP_ACCESS_TOKEN` is valid and set in the environment
  - Collections exist in Raindrop and follow naming conventions
  - Check server logs for fetch errors during build

### Last.fm Integration

The site features a live music integration powered by Last.fm, displaying your current playing track and listening history.

#### Quick Setup

1. Create a Last.fm API account at: https://www.last.fm/api/account/create
2. Get your API key and add it to `.env`:

```env
PUBLIC_LASTFM_API_KEY=your_api_key_here
PUBLIC_LASTFM_APPNAME=ansango.dev
PUBLIC_LASTFM_API_BASE_URL=https://ws.audioscrobbler.com/2.0
LASTFM_SHARED_SECRET=your_shared_secret_here
```

#### Implementation Details

- **Services**: Located in `src/lib/lastfm/` with methods for user data, recent tracks, top artists, and top albums
- **Real-time Updates**: Uses TanStack Query with 5-minute polling intervals for current track
- **Caching**: Server-side caching for build-time data (recent tracks, top artists, top albums)
- **Components**: Svelte 5 components (`PlayNow`, `PlayNow Mini`) for interactive music display

#### Features

- **Current Track**: Shows what you're currently listening to with album art
- **Recent Tracks**: Displays your last 10 listened tracks
- **Top Artists**: Shows your top 10 artists from the last 7 days
- **Top Albums**: Displays your top 12 albums from the last month
- **Auto-refresh**: Updates every 5 minutes to show current listening status

#### Pages Using Last.fm

- `/music`: Full music page with all listening data
- `/music-lite`: Lightweight version of the music page
- Components can be embedded in any page to show current track

#### Data Fetching

The integration provides two data fetching strategies:

1. **Build-time**: `getLastfmData()` fetches and caches data during build for static pages
2. **Client-side**: `useGetCurrentTrack()` query for real-time current track updates

#### Troubleshooting

- If music data doesn't load, verify:
  - `PUBLIC_LASTFM_API_KEY` is set correctly
  - Your Last.fm username matches in the queries (default: "ansango")
  - API key has sufficient permissions
  - Check browser console for API errors

## 📦 Project Structure

```
/
├── public/                 # Static assets
│   ├── browserconfig.xml
│   ├── robots.txt
│   └── site.webmanifest
├── src/
│   ├── components/         # Reusable Astro & Svelte components
│   │   ├── atoms/         # Basic UI elements (Container, Link, Tag, etc.)
│   │   ├── molecules/     # Composed components (Pagination, Searcher, PlayNow)
│   │   ├── organisms/     # Complex sections (Archive, Bookmarks, Music, etc.)
│   │   ├── templates/     # Page templates for collections
│   │   ├── icons/         # SVG icon components
│   │   └── layout/        # Layout wrapper components
│   ├── content/           # Content collections
│   │   ├── blog/
│   │   ├── wiki/
│   │   ├── projects/
│   │   ├── bookmarks/     # (Note: now powered by Raindrop.io)
│   │   ├── about.md
│   │   ├── blogroll.md
│   │   ├── now.md
│   │   └── uses.md
│   ├── layout/            # Page layouts
│   │   ├── default.astro
│   │   └── elements/      # Layout sub-components
│   ├── lib/               # Utilities and helpers
│   │   ├── collections.ts # Content fetching & pagination
│   │   ├── tree-node.ts   # Wiki tree generation
│   │   ├── rehype.ts      # Custom rehype plugins
│   │   ├── music.ts       # Last.fm data fetching
│   │   ├── lastfm/        # Last.fm API client
│   │   ├── raindrop/      # Raindrop.io API client
│   │   └── queries/       # TanStack Query setup
│   ├── pages/             # Astro pages & routing
│   │   ├── index.astro
│   │   ├── music.astro
│   │   ├── music-lite.astro
│   │   ├── rss.xml.ts
│   │   ├── [collection]/
│   │   ├── archive/
│   │   ├── bookmarks/
│   │   ├── reading/
│   │   └── tags/
│   ├── styles/            # Global styles
│   │   ├── global.css     # Main styles & Tailwind imports
│   │   ├── content.css    # Markdown content styles
│   │   ├── headings.css   # Typography
│   │   ├── tables.css     # Table styles
│   │   ├── theme.css      # Theme variables
│   │   └── main.css       # Additional styles
│   ├── constants.ts       # Site configuration & metadata
│   ├── content.config.ts  # Collection schemas
│   └── site.json          # Site metadata
├── .env.sample            # Environment variables template
├── astro.config.ts        # Astro configuration
├── svelte.config.js       # Svelte configuration
├── package.json
└── tsconfig.json
```

## 🔧 Configuration

### Environment Variables

The project uses environment variables for API integrations. Create a `.env` file based on `.env.sample`:

```env
# Raindrop.io Integration (for bookmarks and reading)
RAINDROP_ACCESS_TOKEN=your_raindrop_access_token_here

# Last.fm Integration (for music)
PUBLIC_LASTFM_API_KEY=your_api_key_here
PUBLIC_LASTFM_APPNAME=ansango.dev
PUBLIC_LASTFM_API_BASE_URL=https://ws.audioscrobbler.com/2.0
LASTFM_SHARED_SECRET=your_shared_secret_here
```

**Note**: Variables prefixed with `PUBLIC_` are exposed to the client-side code.

### Adding a New Collection

1. **Define schema in `src/content.config.ts`**:

```typescript
const newCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: `${path}/new-collection` }),
  schema: commonSchema, // or create custom schema
});

// Add to collections export
export const collections = {
  // ... existing collections
  newCollection,
};
```

2. **Add metadata in `src/constants.ts`**:

```typescript
const contentCollections: Record<CollectionName, Meta> = {
  // ... existing collections
  newCollection: {
    title: "New Collection",
    description: "Description here",
    entriesPerPage: 10,
    url: "/new-collection",
    published: true,
  },
};
```

3. **Create content folder**:

```bash
mkdir src/content/new-collection
```

4. **Add to site tree** (optional, for navigation):

```typescript
const tree: Tree = {
  content: {
    // ... existing entries
    newCollection: contentCollections.newCollection,
  },
};
```

### Customizing Site Metadata

Edit `src/site.json`:

```json
{
  "title": "Your Site Name",
  "description": "Your site description",
  "author": "Your Name",
  "url": "https://yoursite.com",
  "social": {
    "github": "yourusername",
    "twitter": "yourusername"
  }
}
```

### Pagination Settings

Adjust entries per page in `src/constants.ts`:

```typescript
const contentCollections: Record<CollectionName, Meta> = {
  blog: {
    // ...
    entriesPerPage: 10, // Change this value
  },
};
```

Set `entriesPerPage: 0` for single-page collections without pagination (like About, Now, Uses).

## � SEO Optimization

The site is fully optimized for search engines and social sharing with comprehensive SEO features:

### Meta Tags & Social Cards

- **Complete Meta Tags**: Author, description, keywords, robots directives, googlebot settings
- **Open Graph**: Full Open Graph protocol support for Facebook, LinkedIn sharing
  - Type (website/article), title, description, URL, image
  - Locale, site name, image alt text
  - Article metadata (published/modified times, tags, author)
- **Twitter Cards**: Summary large image cards with creator/site handles
- **Canonical URLs**: Proper canonical URL for each page

### Structured Data (JSON-LD)

Automatic JSON-LD structured data using Schema.org vocabulary:

- **Article schema**: For blog posts, wiki entries, and projects
  - Headline, description, image, author, publisher
  - Published and modified dates
  - Keywords from tags
- **WebSite schema**: For static pages and indexes
- **Breadcrumbs**: Hierarchical navigation for nested content (3+ path segments)
  - Auto-generated from URL structure
  - Proper position indexing
  - Full URL paths for each breadcrumb

### Sitemap

Advanced XML sitemap at `/sitemap.xml` with intelligent prioritization:

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

Implementation in `src/lib/sitemap.ts` with custom `serializeSitemap()` function.

### Implementation Files

- **`src/components/layout/elements/head.astro`**: Main SEO component with all meta tags and JSON-LD
- **`src/lib/breadcrumbs.ts`**: Breadcrumb generation and JSON-LD formatting
- **`src/lib/sitemap.ts`**: Sitemap serialization with priorities
- **`src/pages/rss.xml.ts`**: Enhanced RSS feed generation
- **`src/components/layout/default.astro`**: Layout with SEO props interface

### SEO Checklist

When deploying, verify:
- [ ] Set correct `url` in `src/site.json` (production domain)
- [ ] Update `author` and `email` in `src/site.json`
- [ ] Set `twitter` handle if using Twitter Cards
- [ ] Create OG image at `/public/og-default.jpg` (1200x630px recommended)
- [ ] Test structured data with [Google Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Validate Open Graph with [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [ ] Check sitemap at `/sitemap.xml`
- [ ] Submit sitemap to Google Search Console

### Testing Tools

- **Google Search Console**: Monitor indexation and Core Web Vitals
- **Rich Results Test**: Validate JSON-LD structured data
- **Facebook Sharing Debugger**: Test Open Graph tags
- **Twitter Card Validator**: Verify Twitter Cards (if using)
- **Lighthouse**: SEO audit score and best practices

## �🔍 Search

Search is powered by Pagefind and automatically indexes all published content during build:

- Searches titles, descriptions, and content
- Fuzzy matching support
- Zero-config setup
- Lightweight client (~10kb gzipped)
- Keyboard shortcut: `Cmd/Ctrl + K` to open search dialog
- Integrated in site header for easy access
- Custom dialog UI with modal overlay

### Search Implementation

- **Component**: `src/components/molecules/searcher.astro`
- **Script**: `src/components/molecules/searcher.script.astro`
- **Integration**: `astro-pagefind` generates search index at `/pagefind/`
- **Dialog**: Native `<dialog>` element with JavaScript for keyboard shortcuts
- **Events**: Supports Astro view transitions (`astro:page-load`, `astro:after-swap`)

## 📡 RSS Feed

RSS feed is automatically generated at `/rss.xml` with comprehensive metadata:

### Features

- **All published content**: Includes blog posts, wiki entries, and projects
- **Full metadata**: Title, description, author, categories (tags)
- **Timestamps**: Publication date (`pubDate`) and modification date (`updated`)
- **Channel information**: Language, managing editor, webmaster
- **Feed image**: Site logo/default OG image
- **Sorted by date**: Newest content first
- **Author format**: Email (Name) for proper RSS client display
- **Standards compliant**: Follows RSS 2.0 specification

### Feed Structure

```xml
<rss version="2.0">
  <channel>
    <title>Site Name</title>
    <description>Site description</description>
    <link>https://yoursite.com</link>
    <language>es</language>
    <lastBuildDate>...</lastBuildDate>
    <managingEditor>email@example.com (Author Name)</managingEditor>
    <webMaster>email@example.com (Author Name)</webMaster>
    <image>
      <url>https://yoursite.com/og-default.jpg</url>
      <title>Site Name</title>
      <link>https://yoursite.com</link>
    </image>
    <item>
      <title>Article Title</title>
      <description>Article description</description>
      <link>https://yoursite.com/blog/article-slug</link>
      <pubDate>...</pubDate>
      <updated>...</updated>
      <category>tag1</category>
      <category>tag2</category>
      <author>email@example.com (Author Name)</author>
    </item>
  </channel>
</rss>
```

### Implementation

The RSS feed is generated in `src/pages/rss.xml.ts` using:
- `@astrojs/rss` for RSS generation
- `getAllCollectionsByCategory()` to fetch all published content
- Automatic sorting by publication date
- Custom metadata injection for enhanced reader support

### Usage

Readers can subscribe to your feed at:
```
https://yoursite.com/rss.xml
```

Compatible with all major RSS readers (Feedly, Inoreader, NetNewsWire, etc.)

## 🎯 Indie Web Features

### Blogroll

Curate a list of blogs you follow in `src/content/blogroll.md`:

```markdown
---
title: "Blogroll"
description: "Blogs I follow and recommend"
published: true
---

## Web Development

- [Blog Name](https://example.com) - Description
```

### Bookmarks

Powered by Raindrop.io, showing all your saved bookmarks organized by collections. See the Raindrop.io Integration section for setup.

### Reading List

Also powered by Raindrop.io, displaying items from your "reading" collection. Perfect for sharing articles you've saved to read or reference.

### Now Page

Share what you're currently working on in `src/content/now.md` (inspired by [Derek Sivers' Now page movement](https://nownownow.com/)).

### Uses

Document your tools and setup in `src/content/uses.md`.

### Music

Share your music taste with real-time Last.fm integration showing what you're currently listening to and your listening history.

## 📋 Obsidian Integration & Deployment

This site is managed as an Obsidian vault with content stored in `src/content/`. The deployment pipeline uses GitHub Actions to convert Obsidian markdown to Astro-compatible format using `obsidian-export` and deploy directly to Cloudflare Pages.

### Obsidian Configuration

The repository includes an `.obsidian/` folder with recommended plugins and settings for an optimized writing experience:

#### Community Plugins

The following plugins are configured to automate content management tasks:

- **obsidian-git**: Automatic git commits and syncing with GitHub
- **obsidian-linter**: Automatically formats and validates markdown files
- **obsidian-local-images-plus**: Downloads and converts external images to local WebP format
- **obsidian-metadata-links**: Manages frontmatter and metadata
- **file-explorer-plus**: Enhanced file organization

#### Plugin Benefits

- **Automatic Frontmatter**: Linter auto-generates required frontmatter fields (date, mod, published)
- **Image Optimization**: Local Images Plus converts images to WebP and stores them in `src/assets/`
- **Git Automation**: Obsidian Git handles commits and pushes on file save
- **Content Validation**: Linter ensures markdown follows project conventions

#### Setup in Obsidian

1. Open this repository as an Obsidian vault
2. Install community plugins when prompted (or manually enable them in Settings → Community Plugins)
3. Configure Obsidian Git with your credentials (Settings → Obsidian Git)
4. Adjust Linter rules if needed (Settings → Linter)

### Deployment Pipeline

The site deploys automatically via GitHub Actions when content changes are pushed.

#### Architecture

- **Repository**: `ansango/ansango.dev` - Single repository for content and code
- **Build Tool**: `obsidian-export` v22.11.0 converts Obsidian markdown → Astro-compatible markdown
- **Deployment**: Cloudflare Pages via Wrangler CLI
- **Schedule**: Automatic rebuilds every 2 days at 9 AM UTC (for dynamic content updates)

#### Workflow Triggers

```yaml
on:
  workflow_dispatch:           # Manual trigger
  push:
    branches: [main]
    paths:
      - "src/content/**"      # Auto-deploy on content changes
  schedule:
    - cron: "0 9 */2 * *"     # Every 2 days at 9 AM UTC
```

#### Pipeline Steps

1. **Checkout Repository**: Fetches the latest code
2. **Prepare Content**: Copies `src/content/` and `public/assets/` for conversion
3. **Convert with obsidian-export**: Processes Obsidian markdown to standard markdown
4. **Replace Content**: Overwrites `src/content/` and `src/assets/` with converted files
5. **Build Site**: Builds Astro site with Bun (includes API data fetching)
6. **Deploy**: Pushes `dist/` to Cloudflare Pages

#### Key Features

- ✅ **Concurrency Control**: Cancels in-progress builds when new push occurs
- ✅ **Timeout Safety**: 15-minute timeout prevents hanging builds
- ✅ **Dependency Caching**: Caches Bun dependencies and obsidian-export binary
- ✅ **Environment Variables**: Secure API credentials via GitHub Secrets
- ✅ **Build Summaries**: Success/failure notifications in GitHub Actions UI

### Required GitHub Secrets

Configure these in repository settings: `Settings → Secrets and variables → Actions`

**Required**:
- `CLOUDFLARE_API_TOKEN`: Cloudflare API token for Pages deployment
- `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare account ID

**Optional** (for integrations):
- `RAINDROP_ACCESS_TOKEN`: Raindrop.io API token for bookmarks/reading
- `PUBLIC_LASTFM_API_KEY`: Last.fm API key for music integration
- `LASTFM_SHARED_SECRET`: Last.fm shared secret
- `PUBLIC_GOATCOUNTER_CODE`: GoatCounter analytics site code

### Content Structure

```
src/content/
├── blog/              # Blog posts
│   └── my-post.md
├── wiki/              # Hierarchical wiki
│   └── development/
│       └── astro.md
├── projects/          # Project showcases
│   └── my-project.md
├── about.md           # About page
├── uses.md            # Uses page
├── now.md             # Now page
├── blogroll.md        # Blogroll
└── bookmarks/         # Placeholder (backed by Raindrop)
    └── daily.md

public/assets/         # Images referenced in content
└── images/
    └── photo.webp
```

**Note**: Images are moved to `src/assets/` during build for Astro optimization.

### Obsidian → Astro Conversion

`obsidian-export` handles:

- **Wikilinks**: `[[note]]` → `[note](./note.md)`
- **Image paths**: Preserves relative paths for Astro processing
- **Frontmatter**: Maintains YAML frontmatter structure
- **Nested folders**: Preserves folder hierarchy for wiki navigation

### Local Testing

Test the conversion pipeline locally before deploying:

```bash
# Run the test script
bun run obsidian

# This will:
# 1. Create obsidian_test/ directory
# 2. Copy content and assets
# 3. Run obsidian-export conversion
# 4. Show before/after comparison
# 5. Clean up temporary files
```

Script commands:
```bash
bun run obsidian:test           # Run conversion test
bun run obsidian:clean          # Clean test directory
bun run obsidian:clean:export   # Remove obsidian-export binary
```

### Cloudflare Pages Configuration

**Important**: Disable automatic Git deployments in Cloudflare Pages settings to prevent duplicate builds.

1. Go to Cloudflare Pages → Your project → Settings → Builds & deployments
2. **Disable** "Automatic deployments" (we deploy via GitHub Actions instead)
3. Keep "Production branch" set to `main` (for manual deployments if needed)

This ensures:
- Only GitHub Actions triggers deploys (for proper content conversion)
- No conflicts between Cloudflare's auto-deploy and workflow deploys
- Faster deployments (Cloudflare doesn't waste time on failed direct builds)

### Deployment Workflow

Typical content update flow:

1. **Write in Obsidian**: Create/edit markdown files in `src/content/`
2. **Auto-format**: Linter adds frontmatter, formats content
3. **Optimize images**: Local Images Plus converts to WebP
4. **Git sync**: Obsidian Git commits and pushes changes
5. **Auto-deploy**: GitHub Actions converts content and deploys
6. **Live site**: Changes appear on Cloudflare Pages (~2-3 minutes)

### Performance Optimizations

- **~60% faster builds** with Bun dependency caching
- **Instant obsidian-export** with binary caching (no redownload)
- **Cancel-in-progress** prevents wasted compute on obsolete builds
- **15-minute timeout** prevents hanging builds
- **Scheduled rebuilds** keep dynamic content (music, bookmarks) fresh

### Troubleshooting

**Build Failures**:
- Check GitHub Actions logs for conversion errors
- Verify environment variables are set correctly
- Ensure frontmatter includes `published: true`
- Check obsidian-export conversion logs

**Image Issues**:
- Ensure images are in `public/assets/` before build
- Verify image paths are relative (e.g., `../../assets/image.webp`)
- Check Astro build logs for image optimization errors

**Deployment Issues**:
- Verify Cloudflare API token hasn't expired
- Check Cloudflare Pages project name matches workflow
- Ensure automatic Git deployments are disabled in Cloudflare

**Cache Issues**:
```bash
# Clear GitHub Actions cache
# Go to: Actions → Caches → Delete cache entries
```

### Migration Notes

This project uses a **single repository** approach (content + code together). If you prefer separation:

1. Move `src/content/` to a separate vault repository
2. Update workflow to checkout both repos
3. Follow the two-repo pattern from previous versions

### Benefits

✅ **Obsidian Native**: Write with full Obsidian features (backlinks, graph, plugins)  
✅ **Automatic Deployment**: Push → auto-convert → live site  
✅ **Version Control**: Full git history for content changes  
✅ **Automated Formatting**: Linter handles frontmatter and markdown  
✅ **Image Optimization**: Auto-convert images to WebP  
✅ **Fast Builds**: Caching reduces build time significantly  
✅ **Scheduled Rebuilds**: Keep dynamic content fresh

## 🚢 Deployment

1. **Environment Variables**: Set up environment variables in your hosting provider:
   - `RAINDROP_ACCESS_TOKEN` (if using Raindrop integration)
   - `PUBLIC_LASTFM_API_KEY` (if using Last.fm integration)
   - `LASTFM_SHARED_SECRET` (if using Last.fm integration)
   - `PUBLIC_GOATCOUNTER_CODE` (if using analytics)

2. **Build Command**: `npm run build`g Raindrop integration)
   - `PUBLIC_LASTFM_API_KEY` (if using Last.fm integration)
   - `LASTFM_SHARED_SECRET` (if using Last.fm integration)

2. **Build Command**: `npm run build`

3. **Output Directory**: `dist/`

### Recommended Platforms

- **Vercel**: Zero-config deployment, automatic preview URLs
- **Netlify**: Built-in form handling, serverless functions support
- **Cloudflare Pages**: Global CDN, fast edge network

### Deployment Checklist

- [ ] Set all required environment variables
- [ ] Verify `site.url` in `src/site.json` matches your domain
- [ ] Test build locally with `npm run build && npm run preview`
- [ ] Ensure Raindrop collections follow naming conventions
- [ ] Verify Last.fm API key has necessary permissions

## ⚡ Performance

The site is optimized for performance with:

- Mostly static output with minimal JavaScript
- Selective hydration for interactive components (Svelte islands)
- Efficient CSS with Tailwind's built-in optimization
- Lazy loading for images and heavy components
- Client-side caching with TanStack Query for API data
- Fast load times and high Lighthouse scores
- Optimized font loading with variable fonts

### Performance Features

- **View Transitions**: Smooth page transitions with Astro's view transitions
- **Prefetch**: Automatic link prefetching for faster navigation
- **Code Splitting**: Automatic code splitting for optimal bundle sizes
- **Image Optimization**: Astro's built-in image optimization
- **Minimal Runtime**: Only interactive components ship JavaScript

![alt text](performance.png)

## 📄 License

MIT License - feel free to use this template for your own personal site!

## 🙏 Acknowledgments

- Built with [Astro](https://astro.build)
- Styled with [Tailwind CSS v4](https://tailwindcss.com)
- Search powered by [Pagefind](https://pagefind.app)
- Interactive components with [Svelte 5](https://svelte.dev)
- Data fetching with [TanStack Query](https://tanstack.com/query)
- Music data from [Last.fm API](https://www.last.fm/api)
- Bookmarks from [Raindrop.io API](https://raindrop.io)
- Typography with [Inter Variable](https://rsms.me/inter/)
- Inspired by the [IndieWeb](https://indieweb.org/) movement

## 🤝 Contributing

This is a personal website template, but suggestions and improvements are welcome! Feel free to:

- Open an issue for bugs or feature requests
- Submit a pull request with improvements
- Share your own implementation or customizations
- Suggest new integrations or features

When contributing:

- Follow the existing code style (use `npm run format` with Prettier)
- Test your changes locally with `npm run dev`
- Update documentation as needed
- Ensure all environment-dependent features are well documented

---

Made with ❤️ using [Astro](https://astro.build), [Svelte 5](https://svelte.dev), and [Tailwind CSS v4](https://tailwindcss.com)

---
