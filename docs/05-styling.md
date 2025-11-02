
# 🎨 Styling System

Learn about the styling architecture and customization options.

## Tailwind CSS v4

The project uses Tailwind CSS v4 with a centralized styling approach.

### Style Files

All styles are organized in `src/styles/`:

- **global.css**: Main stylesheet with Tailwind imports and base styles
- **content.css**: Markdown content styling (typography, spacing)
- **headings.css**: Heading styles and hierarchy
- **tables.css**: Table formatting and responsive behavior
- **theme.css**: CSS custom properties and theme tokens
- **main.css**: Additional utility styles

### Theme Tokens

Theme variables are defined in `src/styles/theme.css` using CSS custom properties:

```css
:root {
  --color-primary: #...;
  --color-background: #...;
  --font-family-base: Inter Variable, sans-serif;
  /* ... more variables */
}
```

### Dark Mode

The site supports automatic dark mode detection with a manual toggle.

#### Implementation

- Uses class strategy (`class="dark"` on `<html>`)
- Automatic detection based on system preference
- Persistent user preference in localStorage
- Smooth transitions between themes

#### Theme Toggle

The theme toggle component is in `src/layout/elements/theme.astro` with logic in `theme.script.astro`.

#### Customizing Dark Mode

Override dark mode styles using Tailwind's `dark:` variant:

```html
<div class="bg-white dark:bg-gray-900">
  <!-- Content -->
</div>
```

Or use CSS custom properties that change based on theme:

```css
:root {
  --color-text: #000;
}

.dark {
  --color-text: #fff;
}
```

## Layout System

Layouts are modular and composable for maximum flexibility.

### Layout Structure

```
src/layout/
├── default.astro           # Base layout wrapper
└── elements/
    ├── head.astro          # SEO and meta tags
    ├── header.astro        # Site header with navigation
    ├── footer.astro        # Site footer
    ├── theme.astro         # Theme toggle component
    ├── theme.script.astro  # Theme switching logic
    └── clipboard.script.astro  # Code copy functionality
```

### Using Layouts

Import and wrap your content:

```astro
---
import DefaultLayout from '@/layout/default.astro';
---

<DefaultLayout
  title="Page Title"
  description="Page description"
>
  <h1>Your Content</h1>
</DefaultLayout>
```

### Layout Props

The default layout accepts:

- **title**: Page title (for `<title>` and meta tags)
- **description**: Page description
- **image**: Custom OG image path
- **type**: Content type (article, website, etc.)
- **publishedTime**: Publication date
- **modifiedTime**: Last modification date
- **tags**: Array of tags

## Component Architecture

Components follow atomic design principles for maintainability and reusability.

### Organization

```
src/components/
├── atoms/              # Basic building blocks
│   ├── Container.astro
│   ├── Link.astro
│   ├── Tag.astro
│   ├── Image.astro
│   └── ...
├── molecules/          # Composed components
│   ├── Pagination.astro
│   ├── Searcher.astro
│   ├── PlayNow.svelte
│   └── ...
├── organisms/          # Complex sections
│   ├── Archive/
│   ├── Bookmarks/
│   ├── Music/
│   └── ...
├── templates/          # Page templates
│   ├── collection/
│   └── entry/
└── icons/              # SVG icons
    └── ...
```

### Component Types

#### Atoms

Simple, single-purpose components:

- `Container.astro` - Layout container with max-width
- `Link.astro` - Enhanced anchor with external link detection
- `Tag.astro` - Tag badge component
- `Button.astro` - Button component

#### Molecules

Composed of multiple atoms:

- `Pagination.astro` - Pagination controls
- `Searcher.astro` - Search dialog
- `Tree-node.astro` - Wiki navigation tree

#### Organisms

Complex, feature-complete sections:

- `Archive` - Blog archive with filtering
- `Music` - Last.fm integration display
- `Bookmarks` - Raindrop.io bookmarks
- `Wiki` - Hierarchical wiki navigation

#### Templates

Page-level templates:

- `collection/index.astro` - Collection listing page
- `entry/index.astro` - Single entry page

## Typography

### Font Family

The site uses **Inter Variable** from `@fontsource-variable/inter`:

```css
@import '@fontsource-variable/inter';

:root {
  --font-family-base: 'Inter Variable', system-ui, sans-serif;
}
```

### Font Weights

Inter Variable supports all weights (100-900). Use Tailwind utilities:

```html
<p class="font-normal">Regular text</p>
<p class="font-medium">Medium text</p>
<p class="font-semibold">Semibold text</p>
<p class="font-bold">Bold text</p>
```

### Headings

Heading styles are defined in `src/styles/headings.css`:

```css
h1 { /* ... */ }
h2 { /* ... */ }
h3 { /* ... */ }
h4 { /* ... */ }
h5 { /* ... */ }
h6 { /* ... */ }
```

## Responsive Design

### Breakpoints

Tailwind's default breakpoints:

- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px
- **2xl**: 1536px

### Mobile-First Approach

Always start with mobile styles, then enhance for larger screens:

```html
<div class="text-sm md:text-base lg:text-lg">
  Responsive text size
</div>
```

## Customization Guide

### Changing Colors

Edit `src/styles/theme.css`:

```css
:root {
  --color-primary: #your-color;
  --color-accent: #your-accent;
}

.dark {
  --color-primary: #your-dark-color;
  --color-accent: #your-dark-accent;
}
```

### Custom Fonts

Replace Inter with your font:

1. Install the font package or add font files to `public/fonts/`
2. Import in `src/styles/global.css`
3. Update CSS variable in `theme.css`

```css
@font-face {
  font-family: 'Your Font';
  src: url('/fonts/your-font.woff2') format('woff2');
}

:root {
  --font-family-base: 'Your Font', sans-serif;
}
```

## Best Practices

### Component Styling

1. **Use Tailwind utilities first** - Avoid custom CSS when possible
2. **Scope styles to components** - Use Astro's `<style>` blocks
3. **Leverage CSS variables** - For theme consistency
4. **Keep specificity low** - Avoid deeply nested selectors

### Performance

1. **Minimize custom CSS** - Tailwind optimizes utility classes
2. **Use CSS containment** - For large lists and grids
3. **Avoid inline styles** - Use classes for reusability
4. **Optimize font loading** - Use `font-display: swap`

### Accessibility

1. **Maintain color contrast** - Check WCAG AA compliance
2. **Use semantic HTML** - Proper heading hierarchy
3. **Focus states** - Visible keyboard focus indicators
4. **Responsive text** - Readable on all screen sizes
