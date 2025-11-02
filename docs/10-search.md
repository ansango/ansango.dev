---
title: 🔍 Search
description: descripcion
date: 2025-11-02
mod: 2025-11-02
published: false
tags: [tag]
---

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

**Keyboard**: Press `Cmd + K` (Mac) or `Ctrl + K` (Windows/Linux)

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

## Keyboard Shortcuts

### Global Shortcuts

- **`Cmd/Ctrl + K`**: Open search dialog
- **`Esc`**: Close search dialog
- **`/`**: Alternative shortcut (optional, not implemented by default)

### Within Search

- **Arrow keys**: Navigate results
- **Enter**: Open selected result
- **Tab**: Cycle through results
- **Esc**: Close dialog

### Adding Custom Shortcuts

Edit `searcher.script.astro`:

```typescript
document.addEventListener('keydown', (e) => {
  // Add "/" as alternative shortcut
  if (e.key === '/' && !isInputFocused()) {
    e.preventDefault();
    dialog.showModal();
  }
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

### Search Speed

- **First search**: 100-300ms (loads index)
- **Subsequent**: < 50ms (cached index)

### Optimization

- **Lazy loading**: Index loaded only when needed
- **Chunking**: Large indexes split into smaller files
- **Compression**: Brotli/Gzip on CDN
- **Caching**: Index cached in browser

## Troubleshooting

### No Results

If search returns no results:

1. **Check build**: Ensure production build ran
2. **Verify content**: Check content has `published: true`
3. **Inspect index**: Look for `/pagefind/` in `dist/`
4. **Check console**: Browser console for errors
5. **Test query**: Try broader search terms

### Search Not Loading

If search dialog doesn't open:

1. **Check script**: Verify `searcher.script.astro` is loaded
2. **Check import**: Ensure `/pagefind/pagefind.js` exists
3. **Browser console**: Check for import errors
4. **Dialog support**: Verify browser supports `<dialog>` element

### Styling Issues

If search doesn't match your theme:

1. **CSS variables**: Update Pagefind UI variables
2. **Dark mode**: Add `.dark` styles
3. **Z-index**: Check dialog z-index conflicts
4. **Custom styles**: Add overrides in component

### Build Warnings

If Pagefind shows warnings during build:

1. **Invalid HTML**: Check for unclosed tags
2. **Large pages**: Consider splitting very long pages
3. **Missing meta**: Ensure pages have titles and descriptions

## Advanced Features

### Custom Metadata

Add custom metadata to search results:

```html
<meta name="pagefind:tag" content="tutorial" />
<meta name="pagefind:category" content="web-development" />
```

### Weighted Content

Boost importance of certain content:

```html
<h1 data-pagefind-weight="10">Most Important</h1>
<p data-pagefind-weight="5">Important</p>
<p>Normal weight (1)</p>
```

### Multi-language

Support multiple languages:

```typescript
await pagefind.options({
  language: 'en',  // or 'es', 'fr', etc.
});
```

### Custom Sort

Custom result sorting:

```typescript
await pagefind.options({
  sort: {
    date: 'desc',     // Sort by date descending
    title: 'asc',     // Then by title ascending
  },
});
```

## Best Practices

### Content Structure

1. **Clear headings**: Use descriptive headings
2. **Meaningful titles**: Unique, descriptive page titles
3. **Meta descriptions**: Write clear descriptions
4. **Tag appropriately**: Use relevant tags

### Search UX

1. **Easy access**: Keep search in header/navigation
2. **Keyboard shortcuts**: Highlight shortcut hints
3. **Quick feedback**: Show loading states
4. **No results**: Provide helpful empty state

### Performance

1. **Production builds**: Test search in production mode
2. **Index size**: Monitor index growth
3. **Lazy loading**: Don't load search until needed
4. **Caching**: Leverage browser caching

## Testing

Test search thoroughly before deploying:

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Test search functionality
# - Open search (Cmd/Ctrl + K)
# - Try various queries
# - Check result relevance
# - Verify keyboard navigation
# - Test on mobile
```

## Related Documentation

- [Pagefind Documentation](https://pagefind.app/)
- [Astro Pagefind Integration](https://github.com/shishkin/astro-pagefind)
- [Content Management](./04-content-management.md)
- [SEO Optimization](./09-seo.md)
