
# 🔍 Search

Full-text search powered by Pagefind with zero-config setup.

## Features

- **Full-text Search**: Searches titles, descriptions, and content
- **Fuzzy Matching**: Finds results even with typos
- **Instant Results**: Fast client-side search
- **Keyboard Shortcuts**: `Cmd/Ctrl + K` to open search
- **Zero Config**: Automatic indexing during build
- **Lightweight**: ~10kb gzipped client bundle
- **Highlighted Results**: Search terms highlighted in results

## Implementation

### Integration

Search is powered by `astro-pagefind` integration.

**Configuration** in `astro.config.ts`:

```typescript
import { defineConfig } from 'astro/config';
import pagefind from 'astro-pagefind';

export default defineConfig({
  integrations: [
    pagefind(),
    // ...
  ],
});
```

### Components

#### Search Dialog

Located in `src/components/molecules/searcher.astro`:

```astro
<dialog id="search-dialog">
  <div id="search">
    <!-- Pagefind UI injected here -->
  </div>
</dialog>
```

#### Search Script

Logic in `src/components/molecules/searcher.script.astro`:

```typescript
// Initialize Pagefind UI
const pagefind = await import('/pagefind/pagefind.js');
await pagefind.options({
  excerptLength: 15,
});

// Keyboard shortcut
document.addEventListener('keydown', (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault();
    dialog.showModal();
  }
});
```

## Usage

### Opening Search

**Keyboard**: Press `/` 

**Click**: Click the search icon in the site header
### Searching

1. Type your search query
2. Results appear instantly as you type
3. Click a result to navigate to that page
4. Press `Esc` to close the dialog

### Search Query Tips

- **Single word**: Searches all content for that word
- **Multiple words**: Searches for pages containing all words
- **Phrases**: Use quotes for exact phrases: `"exact phrase"`
- **Fuzzy**: Automatically handles typos and variations

## What Gets Indexed

### Indexed Content

Pagefind automatically indexes:

- ✅ All published blog posts
- ✅ All published wiki entries
- ✅ All published projects
- ✅ Static pages (about, uses, now, blogroll)
- ✅ Page titles and headings
- ✅ Meta descriptions
- ✅ Markdown content
- ✅ Tags

### Excluded Content

Not indexed by Pagefind:

- ❌ Drafts (`published: false`)
- ❌ Navigation elements
- ❌ Footer content
- ❌ Code blocks (by default)
- ❌ Comments

### Controlling Indexing

Mark content as non-searchable with `data-pagefind-ignore`:

```html
<div data-pagefind-ignore>
  This content won't be indexed
</div>
```

Include specific content with `data-pagefind-body`:

```html
<div data-pagefind-body>
  This content will be indexed
</div>
```

## Customization

### UI Customization

Pagefind UI can be customized with CSS variables.

**Location**: `src/components/molecules/searcher.astro`

```css
#search {
  --pagefind-ui-scale: 1;
  --pagefind-ui-primary: #your-color;
  --pagefind-ui-text: #your-text-color;
  --pagefind-ui-background: #your-bg-color;
  --pagefind-ui-border: #your-border-color;
  --pagefind-ui-tag: #your-tag-color;
}
```

### Dark Mode Support

Theme-aware search styling:

```css
#search {
  --pagefind-ui-primary: #3b82f6;
  --pagefind-ui-text: #1f2937;
  --pagefind-ui-background: #ffffff;
}

.dark #search {
  --pagefind-ui-primary: #60a5fa;
  --pagefind-ui-text: #f3f4f6;
  --pagefind-ui-background: #1f2937;
}
```

### Search Options

Configure search behavior in `searcher.script.astro`:

```typescript
await pagefind.options({
  excerptLength: 15,           // Length of result excerpt
  showSubResults: true,        // Show multiple results per page
  showImages: false,           // Show images in results
  highlightParam: 'highlight', // URL param for highlighting
  ranking: {
    pageLength: 0.5,           // Weight for page length
    termFrequency: 1.0,        // Weight for term frequency
    termSaturation: 1.2,       // Weight for term saturation
  },
});
```

### Excerpt Length

Control how much context is shown:

```typescript
excerptLength: 15,  // Default: 15 words
```

### Result Filtering

Filter results by collection or tag:

```typescript
await pagefind.options({
  filters: {
    collection: 'blog',  // Only show blog results
    tag: 'tutorial',     // Only show tutorial posts
  },
});
```


## Build Integration

### Automatic Indexing

Pagefind runs automatically during production builds:

```bash
npm run build
# Astro builds site
# Pagefind indexes content
# Output: dist/pagefind/
```

### Output Files

```
dist/
└── pagefind/
    ├── pagefind.js              # Search client
    ├── pagefind-ui.js           # UI component
    ├── pagefind-ui.css          # UI styles
    ├── pagefind.{hash}.pf_meta  # Metadata
    └── pagefind.{hash}.pf_index # Search index
```

### Index Size

Typical index sizes:

- **50 pages**: ~100KB
- **500 pages**: ~500KB
- **5000 pages**: ~2MB

Index is split into chunks and loaded on-demand.

## Performance

### Client Bundle

- **Initial**: ~3KB (pagefind.js)
- **UI**: ~7KB (pagefind-ui.js + css)
- **Index**: Loaded on first search

Total: ~10KB gzipped before searching.

## Related Documentation

- [Pagefind Documentation](https://pagefind.app/)
- [Astro Pagefind Integration](https://github.com/shishkin/astro-pagefind)
- [Content Management](./04-content-management.md)
- [SEO Optimization](./09-seo.md)
