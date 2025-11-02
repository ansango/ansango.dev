
# 🚀 Installation & Getting Started

Get your personal website up and running in minutes.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js 18+** - [Download](https://nodejs.org/)
- **npm, pnpm, or bun** - Package manager (npm comes with Node.js)
- **(Optional)** [Raindrop.io](https://raindrop.io) account for bookmarks integration
- **(Optional)** [Last.fm](https://last.fm) account for music integration

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/your-repo.git
cd your-repo
```

### 2. Install Dependencies

```bash
npm install
```

Or with your preferred package manager:

```bash
pnpm install
# or
bun install
```

### 3. Configure Environment Variables

Copy the sample environment file:

```bash
cp .env.sample .env
```

Edit `.env` and add your API keys (optional but recommended):

```env
# Raindrop.io (for bookmarks and reading)
RAINDROP_ACCESS_TOKEN=your_raindrop_access_token_here

# Last.fm (for music integration)
PUBLIC_LASTFM_API_KEY=your_api_key_here
PUBLIC_LASTFM_APPNAME=ansango.dev
PUBLIC_LASTFM_API_BASE_URL=https://ws.audioscrobbler.com/2.0
LASTFM_SHARED_SECRET=your_shared_secret_here

# GoatCounter (optional analytics)
PUBLIC_GOATCOUNTER_CODE=yoursite
```

> **Note**: Variables prefixed with `PUBLIC_` are exposed to the client-side code.

### 4. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:4321` to see your site in action! 🎉

## Available Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Install dependencies                              |
| `npm run dev`             | Start local dev server at `localhost:4321`        |
| `npm run build`           | Build your production site to `./dist/`           |
| `npm run preview`         | Preview your build locally, before deploying      |
| `npm run astro`           | Run Astro CLI commands directly                   |
| `npm run format`          | Format code with Prettier (Astro + Tailwind)      |

## Development Checklist

Quick checklist to ensure everything is set up correctly:

- ✅ Node.js 18+ is installed (`node --version`)
- ✅ Dependencies installed (`npm install`)
- ✅ Environment variables configured (`.env` file created)
- ✅ Development server running (`npm run dev`)
- ✅ Site accessible at `http://localhost:4321`

## Next Steps

Now that your site is running:

1. **Customize Site Metadata**: Edit `src/site.json` with your information
2. **Create Your First Post**: Add a markdown file to `src/content/blog/`
3. **Update About Page**: Edit `src/content/about.md`
4. **Configure Integrations**: Set up Raindrop.io and Last.fm (see [Integrations documentation](./06-integrations.md))
5. **Customize Styling**: Modify theme variables in `src/styles/theme.css`

## Troubleshooting

### Image Optimization Issues

Ensure images are placed in:

- `public/assets/` for static images referenced in content
- `src/assets/` for images imported in components

For more help, check the [Astro documentation](https://docs.astro.build) or open an issue.
