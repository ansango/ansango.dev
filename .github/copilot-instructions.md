# Copilot Instructions for ansango.dev

This guide helps AI coding agents work productively in the `ansango.dev` codebase. It covers architecture, workflows, conventions, and integration points unique to this project.

## 🏗️ Architecture Overview

- **Framework:** Built with [Astro](https://astro.build), [Svelte 5](https://svelte.dev), and [Tailwind CSS v4](https://tailwindcss.com).
- **Content Collections:** Defined in `src/content.config.ts` and managed in `src/content/`. Types: blog, wiki, projects, about, uses, now, blogroll.
- **Dynamic Pages:** Bookmarks and Reading pages powered by Raindrop.io API.
- **Music Integration:** Live Last.fm integration with Svelte 5 components and TanStack Query.
- **Site Metadata:** Centralized in `src/site.json` and `src/constants.ts`.
- **Layouts:** Modular layouts in `src/layout/` with reusable elements (head, header, footer, theme).
- **Components:** Organized by atomic design (atoms, molecules, organisms, templates). Mix of Astro and Svelte 5 components.
## 🚦 Developer Workflows

- **Install:** `npm install`
- **Dev Server:** `npm run dev` (http://localhost:4321)
- **Build:** `npm run build`
- **Preview:** `npm run preview`
- **Astro CLI:** `npm run astro`
- **Format:** `npm run format` (Prettier with Astro and Tailwind plugins)
- **Environment:** Copy `.env.sample` to `.env` and configure API keys:
  - `RAINDROP_ACCESS_TOKEN` for bookmarks/reading
  - `PUBLIC_LASTFM_API_KEY` and `LASTFM_SHARED_SECRET` for music
- **Content:** Add markdown files to `src/content/` with required frontmatter. Set `published: true` to publish.
- **Add Collection:**
  1. Define schema in `src/content.config.ts` with glob loader
  2. Add metadata in `src/constants.ts` (contentCollections object)
## 📝 Project Conventions

- **Frontmatter:** Each content type has strict frontmatter requirements using Zod schemas (see `src/content.config.ts`).
- **Wiki:** Supports nested folders; navigation auto-generated from structure using `src/lib/tree-node.ts`.
- **Styling:** Use Tailwind CSS v4 classes; styles in `src/styles/` (global.css, content.css, headings.css, tables.css, theme.css).
- **Theme:** Dark/light mode via class strategy; theme logic in `src/layout/elements/theme.script.astro`.
- **Pagination:** Controlled in `src/constants.ts` per collection via `entriesPerPage`. Set to 0 for no pagination.
- **Tagging:** Tags are slugified and aggregated automatically.
- **Component Organization:** Atomic design (atoms → molecules → organisms → templates).
## 🔌 Integrations & Plugins

- **Astro Integrations:**
  - `@astrojs/sitemap` for XML sitemap generation
  - `astro-pagefind` for full-text search
  - `@astrojs/svelte` for Svelte 5 components
  - `@astrojs/rss` for RSS feed
- **Svelte & Data:**
## 🛠️ Key Files & Directories

- `src/content.config.ts`: Collection schemas with Zod and glob loaders
- `src/constants.ts`: Site/collection metadata, navigation tree, pagination settings
- `src/site.json`: Global site info (url, name, author, description, etc.)
- `.env.sample`: Environment variables template
- `src/layout/`: Page layouts and elements (head, header, footer, theme)
- `src/components/`: Organized by atomic design
  - `atoms/`: Container, Link, Tag, Image, etc.
  - `molecules/`: Pagination, Searcher, PlayNow, Tree-node
  - `organisms/`: Archive, Bookmarks, Music, Reading, Wiki, Tags
## 🧩 Patterns & Examples

- **Layout Usage:**
  - `src/layout/default.astro` is the base layout wrapper
  - Import layout elements from `src/layout/elements/`
  - Pass metadata props for SEO (title, description, etc.)

- **Content Example:**

  ```markdown
  ---
  title: "My First Post"
  description: "Intro to my blog"
  date: 2025-10-11
  mod: 2025-10-11
  published: true
  tags: [astro, web-development]
  ---

  Your content here...
  ```

## ⚡ Productivity Tips

- Reference `README.md` for full architecture, deployment, and integration details.
- Follow existing folder and naming conventions for new features.
- Use modular layouts and components for consistency.
- Validate frontmatter and content structure before publishing.
- Use `npm run format` before committing to ensure code style consistency.
- For interactive features, prefer Svelte 5 components with TanStack Query.
- Test API integrations locally with proper environment variables set.
- Check browser console for client-side errors and server logs for build-time issues.

## 🔐 Environment Variables

Required for full functionality (copy from `.env.sample`):

```env
# Raindrop.io (for bookmarks and reading)
RAINDROP_ACCESS_TOKEN=your_token_here

# Last.fm (for music integration)
PUBLIC_LASTFM_API_KEY=your_api_key_here
PUBLIC_LASTFM_APPNAME=ansango.dev
PUBLIC_LASTFM_API_BASE_URL=https://ws.audioscrobbler.com/2.0
LASTFM_SHARED_SECRET=your_secret_here
```

**Note:** Variables with `PUBLIC_` prefix are exposed to client-side code.

## 🎯 Common Tasks

- **Add a blog post:** Create MD file in `src/content/blog/` with proper frontmatter
- **Update music username:** Change "ansango" in `src/lib/music.ts` and `src/lib/queries/current-track.ts`
- **Customize Raindrop collections:** Follow naming convention in Raindrop (e.g., `ansango.work`)
- **Add search:** Already integrated; works automatically for published content
- **Customize theme colors:** Edit CSS custom properties in `src/styles/theme.css`
- **Add new page:** Create file in `src/pages/` following Astro's file-based routing

---

If any section is unclear or missing, please provide feedback to improve these instructions.
    newCollection,
  };

  // 2. In src/constants.ts
  const contentCollections: Record<CollectionName, Meta> = {
    // ...existing
    newCollection: {
      title: "New Collection",
      description: "Description here",
      entriesPerPage: 10,
      url: "/new-collection",
      published: true,
    },
  };

  // 3. Create folder
  // mkdir src/content/new-collection
  ```

- **Svelte Component Example:**
  ```svelte
  <script lang="ts">
    import { useQuery } from '@tanstack/svelte-query';
    
    let { data } = $props();
    let count = $state(0);
    let doubled = $derived(count * 2);
  </script>
  ```

- **API Client Usage:**
  ```typescript
  // Server-side (build time)
  import { getRaindropData } from '@/lib/raindrop';
  import { getLastfmData } from '@/lib/music';
  
  const { bookmarks, collections } = await getRaindropData();
  const { tracks, artists, albums } = await getLastfmData();
  
  // Client-side (runtime)
  import { useGetCurrentTrack } from '@/lib/queries';
  const query = useGetCurrentTrack();
  ```
## 🛠️ Key Files & Directories

- `src/content.config.ts`: Collection schemas
- `src/constants.ts`: Site/collection metadata
- `src/site.json`: Global site info
- `src/layout/`: Page layouts
- `src/components/`: UI and layout components
- `src/lib/`: Utilities and plugins
- `src/styles/`: CSS
- `public/`: Static assets

## 🧩 Patterns & Examples

- **Layout Usage:**
  - `src/layout/default.astro` wraps pages with `<Head>`, `<Header>`, `<Container>`, `<Footer>`.
- **Content Example:**

  ```markdown
  ---
  title: "My First Post"
  description: "Intro to my blog"
  date: 2025-10-11
  mod: 2025-10-11
  published: true
  tags: [astro, web-development]
  ---

  ...
  ```

- **Add New Collection:**
  - Update schema, metadata, and create folder as above.

## ⚡ Productivity Tips

- Reference `README.md` for full architecture and workflow details.
- Follow existing folder and naming conventions for new features.
- Use modular layouts and components for consistency.
- Validate frontmatter and content structure before publishing.

---

If any section is unclear or missing, please provide feedback to improve these instructions.
