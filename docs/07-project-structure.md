
# 📦 Project Structure

Understanding the project structure helps you navigate and extend the codebase effectively.

## Directory Overview

```
/
├── public/                 # Static assets
├── src/                    # Source code
├── docs/                   # Documentation
├── .github/                # GitHub workflows and instructions
├── .obsidian/              # Obsidian vault configuration
├── astro.config.ts         # Astro configuration
├── svelte.config.js        # Svelte configuration
├── tsconfig.json           # TypeScript configuration
├── package.json            # Dependencies and scripts
├── .env.sample             # Environment variables template
└── README.md               # Main documentation
```

## Public Directory

Static assets served as-is without processing.

```
public/
├── _headers                # Cloudflare Pages headers
├── browserconfig.xml       # Browser configuration
├── robots.txt              # Search engine directives
├── site.webmanifest        # PWA manifest
└── assets/                 # Static images and files
    ├── images/
    ├── fonts/
    └── ...
```

### When to Use Public

- Favicon and app icons
- `robots.txt` and `sitemap.xml` (generated)
- Files referenced directly by URL
- Third-party scripts or assets
- Downloads and static files

## Source Directory

All application code lives in `src/`.

### Components

```
src/components/
├── atoms/                  # Basic UI elements
│   ├── container.astro
│   ├── link.astro
│   ├── tag.astro
│   ├── image.astro
│   └── index.ts
├── molecules/              # Composed components
│   ├── pagination.astro
│   ├── searcher.astro
│   ├── playnow.svelte
│   ├── playnow-mini.svelte
│   ├── tree-node.astro
│   └── index.ts
├── organisms/              # Complex sections
│   ├── archive/
│   ├── bookmarks/
│   ├── home/
│   ├── music/
│   ├── reading/
│   ├── tags/
│   └── wiki/
├── templates/              # Page templates
│   ├── collection/
│   └── entry/
├── icons/                  # SVG icon components
│   ├── check.icon.astro
│   ├── chevron.icon.astro
│   ├── external-link-icon.astro
│   └── index.ts
└── layout/                 # Layout wrapper
    ├── default.astro
    └── elements/
        ├── head.astro
        ├── header.astro
        ├── footer.astro
        └── theme.astro
```

**Atomic Design Principles**:
- **Atoms**: Single-purpose, reusable
- **Molecules**: Combination of atoms
- **Organisms**: Feature-complete sections
- **Templates**: Page-level layouts

### Content

All markdown content and collections.

```
src/content/
├── blog/                   # Blog posts
│   ├── post-1.md
│   └── post-2.md
├── wiki/                   # Hierarchical wiki
│   ├── development/
│   │   ├── web/
│   │   │   └── frameworks.md
│   │   └── devtools.md
│   └── ai/
│       └── agentes.md
├── projects/               # Project showcases
│   └── project-1.md
├── bookmarks/              # Placeholder (Raindrop-powered)
│   └── daily.md
├── about.md                # About page
├── uses.md                 # Tools and setup
├── now.md                  # Current activities
└── blogroll.md             # Blog recommendations
```

**Collection Types**:
- Dynamic collections: Blog, Wiki, Projects
- Static pages: About, Uses, Now, Blogroll
- External data: Bookmarks, Reading (Raindrop.io)

### Layout

Modular layout system with reusable elements.

```
src/layout/
├── default.astro           # Base page wrapper
└── elements/
    ├── head.astro          # SEO, meta tags, scripts
    ├── header.astro        # Navigation, search
    ├── footer.astro        # Footer content
    ├── theme.astro         # Theme toggle
    ├── theme.script.astro  # Theme logic
    └── clipboard.script.astro  # Code copy
```

**Usage**:

```astro
import DefaultLayout from '@/layout/default.astro';

<DefaultLayout title="Page Title">
  <!-- Content -->
</DefaultLayout>
```

### Library

Utilities, helpers, and integrations.

```
src/lib/
├── collections.ts          # Content fetching & pagination
├── tree-node.ts            # Wiki tree generation
├── breadcrumbs.ts          # Breadcrumb navigation
├── rehype.ts               # Custom rehype plugins
├── sitemap.ts              # Sitemap serialization
├── utils.ts                # Utility functions
├── music.ts                # Last.fm data fetching
├── lastfm/                 # Last.fm API client
│   ├── config.ts
│   ├── index.ts
│   └── services/
│       ├── user.ts
│       ├── recent-tracks.ts
│       ├── top-artists.ts
│       └── top-albums.ts
├── raindrop/               # Raindrop.io API client
│   ├── index.ts
│   ├── services.ts
│   ├── mappers.ts
│   └── utils.ts
└── queries/                # TanStack Query setup
    ├── client.ts
    ├── current-track.ts
    └── index.ts
```

**Key Files**:
- **collections.ts**: Content fetching, pagination, filtering
- **tree-node.ts**: Wiki navigation tree builder
- **music.ts**: Last.fm integration facade
- **queries/**: Client-side data fetching

### Pages

File-based routing with dynamic routes.

```
src/pages/
├── index.astro             # Homepage
├── music.astro             # Music page (full)
├── music-lite.astro        # Music page (lite)
├── rss.xml.ts              # RSS feed
├── [collection]/           # Dynamic collection routes
│   ├── index.astro         # Collection listing
│   └── [...slug].astro     # Individual entries
├── archive/                # Blog archive
│   ├── index.astro
│   └── [page].astro        # Paginated archive
├── bookmarks/              # Bookmarks
│   ├── index.astro
│   └── [collection]/
│       └── index.astro
├── reading/                # Reading list
│   ├── index.astro
│   └── [page].astro
└── tags/                   # Tag pages
    ├── index.astro
    └── [tag]/
        ├── index.astro
        └── [page].astro
```

**Route Patterns**:
- Static: `/about`, `/music`
- Dynamic: `/blog`, `/wiki`, `/projects`
- Nested: `/blog/post-slug`
- Paginated: `/archive/2`, `/reading/3`
- Filtered: `/tags/astro/1`

### Styles

Global and component-specific styles.

```
src/styles/
├── global.css              # Tailwind imports, base styles
├── content.css             # Markdown content styles
├── headings.css            # Typography hierarchy
├── tables.css              # Table formatting
├── theme.css               # CSS custom properties
└── main.css                # Additional utilities
```

**Import Order** (in `global.css`):
1. Font imports
2. Tailwind directives
3. Content styles
4. Headings
5. Tables
6. Theme variables
7. Additional utilities

### Configuration Files

#### astro.config.ts

Main Astro configuration:

- Site URL
- Integrations (Sitemap, Pagefind, Svelte, RSS)
- Markdown settings
- Rehype plugins
- Build options

#### src/content.config.ts

Content collection schemas:

- Zod validation schemas
- Glob loaders for each collection
- Common schema definitions
- Frontmatter structure

#### src/constants.ts

Site-wide constants:

- Collection metadata
- Pagination settings
- Navigation tree
- URL patterns
- Site structure

#### src/site.json

Global site metadata:

- Site name and URL
- Author information
- Social links
- Language and locale
- Default descriptions

## Import Aliases

TypeScript path aliases for cleaner imports:

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

**Usage**:

```typescript
import { Container } from '@/components/atoms';
import { getLastfmData } from '@/lib/music';
import site from '@/site.json';
```

## File Naming Conventions

### Components

- **Astro**: `kebab-case.astro` (e.g., `tree-node.astro`)
- **Svelte**: `kebab-case.svelte` (e.g., `playnow-mini.svelte`)
- **Icons**: `*.icon.astro` (e.g., `check.icon.astro`)
- **Scripts**: `*.script.astro` (e.g., `theme.script.astro`)

### Content

- **Markdown**: `kebab-case.md` (e.g., `getting-started.md`)
- **Folders**: `kebab-case` (e.g., `web-development/`)

### Library Files

- **TypeScript**: `kebab-case.ts` (e.g., `tree-node.ts`)
- **Services**: `*.services.ts` or inside `services/` folder

### Pages

- **Static**: `kebab-case.astro` (e.g., `music-lite.astro`)
- **Dynamic**: `[param].astro` (e.g., `[collection].astro`)
- **Catch-all**: `[…slug].astro`

## Code Organization Best Practices

### Component Organization

1. **Group related components** in folders (organisms)
2. **Export from index.ts** for cleaner imports
3. **Keep components small** and focused
4. **Separate logic and presentation** when complex

### Content Organization

1. **One file per entry** in collections
2. **Folders for hierarchy** in wiki
3. **Consistent frontmatter** across collection
4. **Descriptive filenames** matching title slug

### Library Organization

1. **Single responsibility** per file
2. **Group by feature** (lastfm/, raindrop/)
3. **Shared utilities** in root lib/
4. **Type definitions** co-located with code

### Style Organization

1. **Global styles** in global.css
2. **Component styles** in component files
3. **Theme tokens** in theme.css
4. **Content styles** separately in content.css

## Adding New Features

### New Component

1. Create in appropriate atomic level
2. Add to `index.ts` export
3. Write TypeScript interfaces
4. Document props and usage

### New Collection

1. Define schema in `content.config.ts`
2. Add metadata in `constants.ts`
3. Create content folder
4. Add to site tree if needed
5. Create page route

### New Integration

1. Create service folder in `lib/`
2. Add environment variables to `.env.sample`
3. Implement API client
4. Add documentation
5. Update integration docs

### New Page

1. Create route in `pages/`
2. Use appropriate layout
3. Fetch data as needed
4. Add to navigation if public
5. Update sitemap priorities

## Build Output

### Development

```
node_modules/.astro/        # Dev cache
.astro/                     # Build artifacts
```

### Production

```
dist/                       # Production build
├── index.html
├── _astro/                 # Hashed assets
├── pagefind/               # Search index
├── sitemap.xml
├── rss.xml
└── ...
```

**Optimizations**:
- Minified HTML, CSS, JS
- Optimized images
- Hashed filenames for caching
- Code splitting
- Tree shaking

## Environment Files

```
.env                        # Local environment (gitignored)
.env.sample                 # Template for required variables
```

**Best Practices**:
- Never commit `.env`
- Document all variables in `.env.sample`
- Use `PUBLIC_` prefix for client-side variables
- Set in hosting provider for production
