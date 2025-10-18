# Copilot Instructions for ansango.dev

This guide helps AI coding agents work productively in the `ansango.dev` codebase. It covers architecture, workflows, conventions, and integration points unique to this project.

## 🏗️ Architecture Overview

- **Framework:** Built with [Astro](https://astro.build) and [Tailwind CSS v4].
- **Content Collections:** Defined in `src/content.config.ts` and managed in `src/content/`. Types: blog, wiki, projects, about, uses, now, blogroll, bookmarks.
- **Site Metadata:** Centralized in `src/site.json` and `src/constants.ts`.
- **Layouts:** Modular layouts in `src/layout/` (e.g., `default.astro`, `archive.astro`, `collection/`).
- **Components:** Reusable Astro components in `src/components/` (UI, layout, searcher, theme).
- **Utilities:** Custom logic in `src/lib/` (content fetching, wiki tree, rehype plugins).

## 🚦 Developer Workflows

- **Install:** `npm install`
- **Dev Server:** `npm run dev` (http://localhost:4321)
- **Build:** `npm run build`
- **Preview:** `npm run preview`
- **Astro CLI:** `npm run astro`
- **Content:** Add markdown files to `src/content/` with required frontmatter. Set `published: true` to publish.
- **Add Collection:**
  1. Define schema in `src/content.config.ts`
  2. Add metadata in `src/constants.ts`
  3. Create folder in `src/content/`

## 📝 Project Conventions

- **Frontmatter:** Each content type has strict frontmatter requirements (see `src/content.config.ts`).
- **Wiki:** Supports nested folders; navigation auto-generated from structure.
- **Styling:** Use Tailwind classes; global styles in `src/styles/global.css`.
- **Theme:** Dark/light mode via class strategy; theme switcher in `src/components/theme/`.
- **Pagination:** Controlled in `src/constants.ts` per collection.
- **Tagging:** Tags are slugified and aggregated automatically.

## 🔌 Integrations & Plugins

- **Astro Integrations:**
  - `@astrojs/sitemap` for sitemap
  - `astro-pagefind` for search
- **Rehype Plugins:** Custom plugins in `src/lib/rehype.ts` (e.g., removeH1, external link enhancement).
- **Third-party:** `astro-rehype-relative-markdown-links`, `rehype-external-links`.

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
