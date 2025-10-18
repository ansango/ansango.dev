---
title: "ansango — Personal Blog & Wiki Template"
description: "A modern, content-first personal website template built with Astro."
tags: ["project", "astro", "static-site"]
date: 2025-10-01
published: true
---

# 🌐 ansango — Personal Blog & Wiki Template

A modern, content-first personal website built with [Astro](https://astro.build), designed for technology articles, wikis, projects, and indie web principles. Write in [Obsidian](https://obsidian.md), publish with ease.

## ✨ Features

- 📝 **Multiple Content Collections**: Blog, Wiki, Projects, and standalone pages (About, Now, Uses, Blogroll, Bookmarks)
- 🌳 **Hierarchical Wiki**: Nested folder structure with automatic tree navigation
- 🎨 **Tailwind CSS v4**: Centralized styling system, minimal class repetition
- 🔍 **Full-text Search**: Powered by [Pagefind](https://pagefind.app/)
- 🌓 **Theme Switching**: Built-in dark/light mode toggle
- 📱 **Fully Responsive**: Mobile-first design
- 🚀 **100% Static**: Lightning-fast performance with zero JavaScript overhead (except for interactive features)
- 🔗 **Indie Web Ready**: Blogroll, bookmarks, and RSS feed support
- ✍️ **Obsidian Integration**: Write content in Obsidian, sync via GitHub Actions (see TODO section)
- 🏷️ **Smart Tagging**: Automatic tag aggregation and filtering
- 📄 **SEO Optimized**: Sitemap, RSS feed, and semantic HTML

## 🏗️ Architecture

### Content Collections

The site is built around 8 content types, all defined in `src/content.config.ts`:

- **blog**: Technology articles and posts
- **wiki**: Hierarchical knowledge base
- **projects**: Portfolio and project showcases
- **about**: Personal information
- **uses**: Tools and setup
- **now**: Current activities (inspired by [nownownow.com](https://nownownow.com/))
- **blogroll**: Curated list of blogs you follow
- **bookmarks**: Saved links and resources

### Configuration System

All site behavior is controlled through three main files:

#### `site.json`

Global site metadata (title, description, author, social links, etc.)

#### `src/content.config.ts`

Content collection schemas using Zod. Defines frontmatter structure for each collection.

#### `src/constants.ts`

Collection metadata, pagination settings, URLs, and site structure.

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
└── bookmarks.md       # Bookmarks
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/your-repo.git
cd your-repo

# Install dependencies
npm install

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
```

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
- Component-specific styles are minimal
- Theme tokens defined in CSS custom properties
- Dark mode support via class strategy

### Layout System

Layouts are modular and composable:

```
src/layout/
├── default.astro           # Base layout
├── single.astro            # Single pages (About, Uses, etc.)
├── archive.astro           # Archive/listing pages
├── tag.astro               # Tag pages
└── collection/
    ├── collection.astro           # Collection wrapper
    ├── collection.default.astro   # Standard collection layout
    ├── collection.entry.astro     # Single entry layout
    └── collection.wiki.astro      # Wiki-specific layout
```

## 🔌 Integrations

### Astro Integrations

- **@astrojs/sitemap**: Automatic XML sitemap generation
- **astro-pagefind**: Full-text search indexing

### Rehype Plugins

Custom plugins in `src/lib/rehype.ts`:

- **removeH1Plugin**: Removes H1 tags (titles come from frontmatter)
- **External link enhancement**: Adds icons and `target="_blank"` to external links

### Third-party Plugins

- **astro-rehype-relative-markdown-links**: Converts relative MD links to proper routes
- **rehype-external-links**: Enhanced external link handling

## 📦 Project Structure

```
/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable Astro components
│   │   ├── layout/        # Layout components
│   │   ├── ui/            # UI components
│   │   ├── searcher/      # Search functionality
│   │   └── theme/         # Theme switcher
│   ├── content/           # Content collections
│   ├── layout/            # Page layouts
│   ├── lib/               # Utilities and helpers
│   │   ├── collections.ts # Content fetching & pagination
│   │   ├── wikis.ts       # Wiki tree generation
│   │   └── rehype.ts      # Custom rehype plugins
│   ├── pages/             # Astro pages
│   ├── styles/            # Global styles
│   ├── constants.ts       # Site configuration
│   ├── content.config.ts  # Collection schemas
│   └── site.json          # Site metadata
├── astro.config.ts        # Astro configuration
└── package.json
```

## 🔧 Configuration

### Adding a New Collection

1. **Define schema in `src/content.config.ts`**:

```typescript
const newCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    published: z.boolean().default(false),
    // ... more fields
  }),
});
```

2. **Add metadata in `src/constants.ts`**:

```typescript
export const COLLECTION_METADATA = {
  // ... existing collections
  "new-collection": {
    title: "New Collection",
    description: "Description here",
    url: "/new-collection",
    entriesPerPage: 10,
  },
};
```

3. **Create content folder**:

```bash
mkdir src/content/new-collection
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
export const COLLECTION_METADATA = {
  blog: {
    // ...
    entriesPerPage: 10, // Change this value
  },
};
```

## 🔍 Search

Search is powered by Pagefind and automatically indexes all published content during build:

- Searches titles, descriptions, and content
- Fuzzy matching support
- Zero-config setup
- Lightweight client (~10kb gzipped)

## 📡 RSS Feed

RSS feed is automatically generated at `/feed.xml` and includes:

- All published blog posts
- Full content for each entry
- Proper timestamps and metadata

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

### Now Page

Share what you're currently working on in `src/content/now.md` (inspired by [Derek Sivers' Now page movement](https://nownownow.com/)).

### Uses

Document your tools and setup in `src/content/uses.md`.

## 📋 TODO: Obsidian Integration via GitHub Actions

To sync content from an Obsidian vault stored in a separate GitHub repository, you'll need to create a GitHub Action workflow. Below is a template structure:

### Workflow Overview

1. **Trigger**: On push to your Obsidian repository or on schedule
2. **Action**: Clone Obsidian repo, copy markdown files to this repo
3. **Commit**: Auto-commit and push changes

### Template Workflow File

TODO

### Setup Instructions

1. Create a Personal Access Token (PAT) with `repo` scope
2. Add it as `OBSIDIAN_PAT` secret in your site repository settings
3. Structure your Obsidian vault to match the content structure
4. Customize the `rsync` commands based on your folder structure
5. Optional: Add content validation or frontmatter checks before committing

### Advanced Options

- **Image sync**: Add steps to copy images from Obsidian to `public/`
- **Link conversion**: Process Obsidian-style `[[wikilinks]]` to markdown links
- **Frontmatter validation**: Add a step to validate frontmatter before pushing
- **Trigger deployment**: Add a step to trigger Vercel/Netlify deployment

You can implement this workflow after setting up your Obsidian vault structure to match your content collections.

## 🚢 Deployment

TODO

## 📄 License

MIT License - feel free to use this template for your own personal site!

## 🙏 Acknowledgments

- Built with [Astro](https://astro.build)
- Styled with [Tailwind CSS](https://tailwindcss.com)
- Search powered by [Pagefind](https://pagefind.app)
- Inspired by the [IndieWeb](https://indieweb.org/) movement
