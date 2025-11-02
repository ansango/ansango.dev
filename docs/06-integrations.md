
# 🔌 Integrations

This template integrates seamlessly with third-party services and tools.

## Astro Integrations

### @astrojs/sitemap

Automatic XML sitemap generation with custom priorities and change frequencies.

**Configuration**: `astro.config.ts`

```typescript
sitemap({
  serialize(item) {
    // Custom priority and change frequency logic
  }
})
```

**Output**: `/sitemap.xml`

See [SEO Documentation](./09-seo.md) for priority settings.

### astro-pagefind

Full-text search indexing with zero-config setup.

**Features**:
- Automatic indexing during build
- Fuzzy matching support
- Lightweight (~10kb gzipped)
- Keyboard shortcuts (Cmd/Ctrl + K)

**Implementation**: `src/components/molecules/searcher.astro`

See [Search Documentation](./10-search.md) for details.

### @astrojs/svelte

Svelte 5 integration for interactive components.

**Usage**: Create `.svelte` files in `src/components/`

```svelte
<script lang="ts">
  let count = $state(0);
</script>

<button onclick={() => count++}>
  Clicks: {count}
</button>
```

**Hydration**: Use `client:*` directives for selective hydration.

### @astrojs/rss

RSS feed generation with full metadata.

**Configuration**: `src/pages/rss.xml.ts`

**Output**: `/rss.xml`

See [RSS Documentation](./11-rss.md) for feed structure.

## Svelte 5 Components

Interactive features powered by Svelte 5 with modern reactivity.
### Features

- **Runes**: `$state`, `$derived`, `$effect` for reactive state
- **Snippets**: Reusable component fragments
- **TypeScript**: Full type safety
- **TanStack Query**: Data fetching and caching

### Example Components

#### PlayNow (Music Player)

Real-time Last.fm current track display with auto-refresh.

**File**: `src/components/molecules/playnow.svelte`

**Features**:
- 5-minute polling interval
- Automatic refresh when track changes
- Album art display
- Loading and error states

#### PlayNow Mini

Compact version for sidebar or footer placement.

**File**: `src/components/molecules/playnow-mini.svelte`

### TanStack Query Integration

Client-side data fetching with smart caching.

**Setup**: `src/lib/queries/client.ts`

```typescript
import { QueryClient } from '@tanstack/svelte-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});
```

**Usage**: `src/lib/queries/current-track.ts`

```typescript
export function useGetCurrentTrack() {
  return createQuery({
    queryKey: ['currentTrack'],
    queryFn: getCurrentTrack,
    refetchInterval: 5 * 60 * 1000,
  });
}
```

## Rehype Plugins

Custom and third-party rehype plugins enhance markdown processing.

### Custom Plugins

Located in `src/lib/rehype.ts`:

#### rehypeRemoveH1

Removes H1 tags from markdown (titles come from frontmatter).

**Why**: Prevents duplicate H1 tags for better SEO.

#### elementArrow

Adds visual arrow icons to external links.

**Implementation**:

```typescript
// Automatically adds → icon to external links
<a href="https://external.com">Link</a>
// Becomes: Link →
```

### Third-party Plugins

#### astro-rehype-relative-markdown-links

Converts relative markdown links to proper Astro routes.

**Example**:

```markdown
[Other post](../other-post.md)
// Becomes: /blog/other-post
```

#### rehype-external-links

Enhanced external link handling.

**Features**:
- `target="_blank"` for external links
- `rel="noopener noreferrer"` for security
- Automatic external link detection

## GoatCounter Analytics

Privacy-focused, lightweight analytics with zero cookies.

### Quick Setup

1. Sign up at [goatcounter.com](https://www.goatcounter.com/)
2. Choose your site code (e.g., `yoursite`)
3. Add to `.env`:

```env
PUBLIC_GOATCOUNTER_CODE=yoursite
```

### Features

- **Lightweight**: Only ~3.5KB
- **No cookies**: GDPR compliant by default
- **Privacy-first**: No user tracking, only page views
- **Auto-detects**: Referrers, screen size, location (country only)
- **Bot filtering**: Automatic bot detection
- **Real-time dashboard**: Live analytics updates
- **Free hosting**: No cost for reasonable usage

### Implementation

Located in `src/components/layout/elements/head.astro`:

```astro
{import.meta.env.PUBLIC_GOATCOUNTER_CODE && (
  <script async src="//gc.zgo.at/count.js"
    data-goatcounter={`https://${import.meta.env.PUBLIC_GOATCOUNTER_CODE}.goatcounter.com/count`}>
  </script>
)}
```

### Dashboard Access

```
https://yoursite.goatcounter.com
```

### Troubleshooting

- Verify `PUBLIC_GOATCOUNTER_CODE` is set correctly
- Check dashboard URL matches your code
- Site must be publicly accessible (doesn't track localhost)
- Check browser console for script loading errors

### Self-hosting (Optional)

Download from [github.com/arp242/goatcounter](https://github.com/arp242/goatcounter) and run with SQLite.

## Raindrop.io Integration

Dynamic bookmarks and reading lists powered by Raindrop.io.

### Quick Setup

1. Create access token at [raindrop.io/settings/integrations](https://raindrop.io/settings/integrations)
2. Add to `.env`:

```env
RAINDROP_ACCESS_TOKEN=your_token_here
```

### Implementation

**Services**: `src/lib/raindrop/`

```
raindrop/
├── index.ts        # Main API client
├── services.ts     # API methods
├── mappers.ts      # Data transformation
└── utils.ts        # Helpers
```

**Features**:
- Build-time data fetching
- In-memory caching
- Automatic collection filtering
- Error handling

### Collection Naming

Collections should follow the pattern: `sitename.category`

**Example**:
- `ansango.work` → Displayed as "Work"
- `ansango.daily` → Displayed as "Daily"
- `reading` → Reading list (no prefix)

### Pages

- `/bookmarks` - All collections (excluding "reading")
- `/bookmarks/[collection]` - Specific collection
- `/reading` - Reading list with pagination

### API Methods

```typescript
// Get all collections
const collections = await getRaindropCollections();

// Get bookmarks from collection
const bookmarks = await getRaindropItems(collectionId);

// Get reading list
const reading = await getRaindropReading();
```

### Deployment

Set `RAINDROP_ACCESS_TOKEN` in your hosting environment before building.

## Last.fm Integration

Live music integration showing current playing track and listening history.

### Quick Setup

1. Create API account at [last.fm/api/account/create](https://www.last.fm/api/account/create)
2. Add to `.env`:

```env
PUBLIC_LASTFM_API_KEY=your_api_key_here
PUBLIC_LASTFM_APPNAME=ansango.dev
PUBLIC_LASTFM_API_BASE_URL=https://ws.audioscrobbler.com/2.0
LASTFM_SHARED_SECRET=your_secret_here
```

### Implementation

**Services**: `src/lib/lastfm/`

```
lastfm/
├── config.ts       # API configuration
├── index.ts        # Main exports
└── services/       # API methods
    ├── user.ts
    ├── recent-tracks.ts
    ├── top-artists.ts
    └── top-albums.ts
```

### Data Fetching Strategies

#### Build-time (Server-side)

```typescript
import { getLastfmData } from '@/lib/music';

const { tracks, artists, albums } = await getLastfmData();
```

#### Client-side (Runtime)

```typescript
import { useGetCurrentTrack } from '@/lib/queries';

const query = useGetCurrentTrack();
```

### Customization

Update username in:

- `src/lib/music.ts`
- `src/lib/queries/current-track.ts`

Change from default `"ansango"` to your username.

## Integration Checklist

When deploying with integrations:

- [ ] GoatCounter code matches dashboard
- [ ] Raindrop token is valid and has access to collections
- [ ] Last.fm API key is valid
- [ ] Last.fm username is updated in code
- [ ] All environment variables are set in hosting provider
- [ ] Collections/data exist before build
- [ ] Test integrations work in preview build

## Performance Considerations

### Build-time Fetching

All third-party data is fetched at build time and cached:

```typescript
// Cached for duration of build
const data = await getLastfmData();
```

### Client-side Polling

Only current track polls in real-time:

```typescript
// Refetches every 5 minutes
refetchInterval: 5 * 60 * 1000
```

### Error Handling

All integrations fail gracefully:

- Missing tokens → Features disabled
- API errors → Cached data or empty states
- Network issues → Retry with exponential backoff
