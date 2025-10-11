# Copilot Instructions for ansango.com

This is an **Astro-based personal website** featuring a content management system with multiple collections (blog, wiki, projects, etc.) and a hierarchical content organization system.

## 🏗️ Architecture Overview

### Content-First Design
- **Collections**: 8 content types defined in `src/content.config.ts` (blog, wiki, projects, about, uses, etc.)
- **Schema-driven**: Zod schemas enforce consistent frontmatter across collections
- **Hierarchical organization**: Wiki content supports nested folder structures with automatic tree navigation

### Key Architectural Patterns
- **Static generation**: All content is statically generated using Astro's content collections
- **Unified entry system**: `src/lib/collections.ts` provides centralized content fetching with filtering, sorting, and pagination
- **Layout composition**: Modular layout system in `src/layout/` with collection-specific variants
- **Type-safe configuration**: Central configuration in `src/constants.ts` defines site structure and metadata

## 📁 Critical File Patterns

### Content Structure
```
src/content/
├── [collection-name]/     # Collection folders (blog, wiki, projects, etc.)
├── [single-pages].md      # Standalone pages (about.md, uses.md, now.md, etc.)
└── wiki/                  # Hierarchical wiki with nested folders
```

### Component Organization
- **Index exports**: Every component folder exports through `index.ts` for clean imports
- **Astro components**: Mix of `.astro` components and TypeScript utilities
- **Layout composition**: `src/layout/collection/` contains collection-specific layouts

### Content Processing
- **Custom rehype plugins**: `src/lib/rehype.ts` removes H1 tags and adds external link icons
- **Wiki tree generation**: `src/lib/wikis.ts` creates hierarchical navigation from folder structure
- **Pagination logic**: Centralized in `src/lib/collections.ts` with configurable entries per page

## 🔧 Development Workflows

### Content Management
- **Published flag**: Use `published: true/false` in frontmatter to control visibility
- **Index pages**: Set `index: true` for collection root pages that don't use the filename as slug
- **Tags system**: Automatic tag aggregation and filtering across all collections
- **Date handling**: Supports both `date` and `mod` (modified) dates with automatic sorting

### Adding New Content
1. Create `.md` file in appropriate `src/content/[collection]/` folder
2. Include required frontmatter (title, description, published, etc.)
3. For wiki content, use folder nesting for hierarchical organization
4. Tags are automatically slugified and aggregated site-wide

### Build Commands
```bash
npm run dev       # Development server with hot reload
npm run build     # Production build
npm run preview   # Preview production build
```

## 🎯 Project-Specific Conventions

### Collection Configuration
- Collections defined in `src/content.config.ts` with Zod schemas
- Metadata in `src/constants.ts` defines URLs, pagination, and site structure
- Each collection has configurable `entriesPerPage` for pagination

### URL Structure
- Collections: `/[collection]/` (e.g., `/blog/`, `/wiki/`)
- Entries: `/[collection]/[slug]` (e.g., `/blog/my-post`)
- Pagination: `/[collection]/[page-number]` (e.g., `/blog/2`)
- Tags: `/tags/[tag-name]`

### Wiki-Specific Features
- **Tree navigation**: Automatic sidebar generation from folder structure
- **Breadcrumbs**: Generated from file path
- **Sorting**: Files first, then folders, alphabetically within each type

### Styling & Theming
- **TailwindCSS v4**: Modern Tailwind with Vite plugin
- **Theme switching**: Built-in dark/light mode toggle
- **Inter font**: Variable font loaded from Fontsource

## 🔍 Key Integration Points

### Astro Integrations
- **Pagefind**: Site-wide search functionality
- **Sitemap**: Automatic XML sitemap generation
- **RSS feed**: Available at `/feed.xml`

### Content Processing Pipeline
1. Markdown files → Astro content collections
2. Frontmatter validation via Zod schemas
3. Custom rehype plugins for link processing
4. Static generation with pagination support

### External Dependencies
- **astro-rehype-relative-markdown-links**: Converts relative MD links to proper routes
- **rehype-external-links**: Adds target="_blank" and icons to external links

## 🚨 Important Gotchas

- **H1 removal**: Custom rehype plugin automatically removes H1 tags (page titles come from frontmatter)
- **Index pages**: Use `index: true` for collection root pages, not filename-based routing
- **Published flag**: Content is filtered by `published: true` in production
- **Wiki navigation**: Tree structure is generated from actual folder hierarchy, not frontmatter
- **Collection types**: TypeScript types are auto-generated from Zod schemas in `content.config.ts`

When working on this project, focus on the content-first approach and understand that most functionality revolves around the collection system and hierarchical content organization.