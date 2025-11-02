
# README

## 🌐 Personal Blog & Wiki Template

A modern, content-first personal website built with [Astro](https://astro.build), designed for technology articles, wikis, projects, and indie web principles. Write in [Obsidian](https://obsidian.md), publish with ease.

## ✨ Features

Modern template for bloggers, developers, and indie web enthusiasts with:

- 📝 **Content Collections**: Blog, Wiki, Projects, and standalone pages
- 🔍 **Full-text Search**: Powered by Pagefind with keyboard shortcuts
- 🎵 **Live Integrations**: Last.fm music and Raindrop.io bookmarks
- 🌓 **Dark Mode**: Theme switching with persistent preference
- 📄 **SEO Optimized**: Complete meta tags, structured data, and sitemap
- ✍️ **Obsidian Integration**: Write in Obsidian, deploy automatically
- ⚡ **Fast Performance**: Static generation with Lighthouse 95+ scores

See [full feature list →](./docs/01-features.md)

## 🛠️ Tech Stack

Built with modern, production-ready technologies:

### Core

- **[Astro](https://astro.build)** - Static site generator
- **[Svelte 5](https://svelte.dev)** - Interactive components
- **[Tailwind CSS v4](https://tailwindcss.com)** - Styling system
- **[TypeScript](https://www.typescriptlang.org)** - Type safety

### Integrations

- **[Pagefind](https://pagefind.app)** - Full-text search
- **[Last.fm API](https://www.last.fm/api)** - Music integration
- **[Raindrop.io API](https://raindrop.io)** - Bookmarks & reading list
- **[TanStack Query](https://tanstack.com/query)** - Data fetching

### Deployment

- **[Obsidian](https://obsidian.md)** - Content writing
- **[GitHub Actions](https://github.com/features/actions)** - CI/CD pipeline
- **[Cloudflare Pages](https://pages.cloudflare.com)** - Hosting

See [architecture details →](./docs/02-architecture.md)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm, pnpm, or bun

### Installation

```bash
# Clone repository
git clone https://github.com/ansango/ansango.dev.git
cd ansango.dev

# Install dependencies
npm install

# Configure environment (optional), 
# Edit .env with your API keys for integrations
cp .env.sample .env

# Start development server and http://localhost:4321 🎉
npm run dev
```

See [installation guide →](./docs/03-installation.md)

## ✍️ Writing Content with Obsidian

This template is designed to work seamlessly with Obsidian:

1. **Open as Vault**: Open this repository in Obsidian
2. **Install Plugins**: Enable recommended community plugins:
   - \`obsidian-git\` - Auto-commit and sync
   - \`obsidian-linter\` - Auto-format frontmatter
   - \`obsidian-local-images-plus\` - Optimize images to WebP
3. **Write Content**: Create markdown files in \`src/content/\`
4. **Auto-Deploy**: Push to GitHub → Automatic conversion and deployment

### Content Structure

```
src/content/
├── blog/ # Blog posts
├── wiki/ # Hierarchical knowledge base
├── projects/ # Portfolio items
├── about.md # About page
├── uses.md # Tools & setup
└── now.md # Current activities
```

See [Obsidian integration →](12-obsidian-deployment.md) | [Content management →](./docs/04-content-management.md)

## 📦 Available Commands

All commands run from the project root:

| Command | Action |
|---------|--------|
| \`npm install\` | Install dependencies |
| \`npm run dev\` | Start dev server at \`localhost:4321\` |
| \`npm run build\` | Build production site to \`./dist/\` |
| \`npm run preview\` | Preview production build locally |
| \`npm run format\` | Format code with Prettier |
| \`npm run astro\` | Run Astro CLI commands |

## 📚 Documentation

Complete documentation available in the \`/docs\` directory:

### Getting Started

- [Features](./docs/01-features.md) - Full feature overview
- [Architecture](./docs/02-architecture.md) - System design and structure
- [Installation](./docs/03-installation.md) - Setup and requirements

### Development

- [Content Management](./docs/04-content-management.md) - Writing and organizing content
- [Styling](./docs/05-styling.md) - Theme customization and CSS
- [Integrations](./docs/06-integrations.md) - Third-party services (Last.fm, Raindrop, etc.)
- [Project Structure](./docs/07-project-structure.md) - File organization
- [Configuration](./docs/08-configuration.md) - Site configuration options

### Optimization & SEO

- [SEO](./docs/09-seo.md) - Search engine optimization
- [Search](./docs/10-search.md) - Full-text search implementation
- [RSS Feed](./docs/11-rss.md) - RSS configuration and usage
### Deployment

- [Obsidian & Deployment](12-obsidian-deployment.md) - Obsidian workflow and GitHub Actions
- [Deployment](13-deployment.md) - Hosting on Cloudflare Pages, Vercel, Netlify
### Contributing

- [Contributing](14-contributing.md) - How to contribute to this project

## 🔧 Environment Variables

Optional API integrations require environment variables:

```bash
## Raindrop.io (for bookmarks and reading)
RAINDROP_ACCESS_TOKEN=your_token

## Last.fm (for music integration)
PUBLIC_LASTFM_API_KEY=your_key
LASTFM_SHARED_SECRET=your_secret

## GoatCounter (optional analytics)
PUBLIC_GOATCOUNTER_CODE=yoursite
```

Copy `.env.sample` to `.env` and add your credentials.

See [configuration guide →](./docs/08-configuration.md)

## Performance

![results](performance.png)

## 📄 License

MIT License - feel free to use this template for your own site!

## 🙏 Acknowledgments

Built with:

- [Astro](https://astro.build) - Static site framework
- [Svelte 5](https://svelte.dev) - Interactive components
- [Tailwind CSS v4](https://tailwindcss.com) - Styling
- [TanStack Query](https://tanstack.com/query) - Data fetching

Inspired by the [IndieWeb](https://indieweb.org/) movement.

## 🤝 Contributing

Contributions welcome! See [Contributing Guide](14-contributing.md) for details.

---

Made with ❤️ using Astro, Svelte 5, and Tailwind CSS v4
