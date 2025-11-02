
# 📝 Content Management

Learn how to create and manage content for your site.

## Frontmatter Format

Each content type has specific frontmatter requirements defined in `src/content.config.ts`. All frontmatter uses YAML format.

### Blog Post Example

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

### Required Fields

Common required fields across all content types:

- **title**: The title of your content
- **description**: A brief description (used for SEO and previews)
- **date**: Publication date (YYYY-MM-DD format)
- **mod**: Last modification date (YYYY-MM-DD format)
- **published**: Boolean flag to control visibility (`true` or `false`)

### Optional Fields

- **tags**: Array of tags for categorization
- **image**: Custom Open Graph image (overrides default)
- **author**: Override default author

## Publishing Content

### Draft vs. Published

Control content visibility with the `published` field:

```markdown
---
published: false  # Draft - won't appear on site
---
```

```markdown
---
published: true   # Published - visible to everyone
---
```

### Content Collections

Create content in the appropriate collection folder:

```
src/content/
├── blog/              # Blog posts
├── wiki/              # Wiki articles
├── projects/          # Project showcases
├── about.md           # About page
├── uses.md            # Tools and setup
├── now.md             # Current activities
└── blogroll.md        # Blog recommendations
```

## Wiki Organization

The wiki supports nested folders for hierarchical content organization.

### Folder Structure

```
wiki/
├── development/
│   ├── web/
│   │   ├── frameworks.md
│   │   └── tooling.md
│   └── devtools.md
├── ai/
│   └── agentes.md
└── index.md
```

### Automatic Navigation

Navigation is automatically generated from your folder structure using the tree node system. No manual configuration needed!

### Best Practices

1. **Use descriptive folder names** - They appear in navigation
2. **Keep hierarchy shallow** - 2-3 levels max for better UX
3. **Add index.md files** - For category overviews
4. **Use consistent naming** - kebab-case for files and folders

## Tag System

Tags are automatically aggregated and made searchable.

### Adding Tags

```markdown
---
tags: [astro, web-development, tutorial]
---
```

### Tag Best Practices

- Use lowercase for consistency
- Separate words with hyphens (`web-development`)
- Keep tags specific but not too granular
- Reuse existing tags when possible

### Tag Pages

All tags are automatically:

- Slugified and normalized
- Aggregated across all content
- Made available at `/tags`
- Linked from individual posts

## Writing in Markdown

### Supported Markdown Features

- **Headings**: H1-H6 (H1 is auto-removed, use frontmatter title)
- **Lists**: Ordered and unordered
- **Code blocks**: With syntax highlighting
- **Tables**: Full GFM table support
- **Links**: Internal and external (external get icons automatically)
- **Images**: Optimized with Astro Image
- **Blockquotes**: Standard markdown blockquotes
- **Emphasis**: Bold, italic, strikethrough

### Code Blocks

Use triple backticks with language identifier: 

```javascript
const greeting = "Hello, world!";
console.log(greeting);
```

### Images

Reference images from your assets folder:

```markdown
![Alt text](../../assets/images/my-image.webp)
```

Or use absolute paths from public:

```markdown
![Alt text](/assets/images/my-image.jpg)
```

### Internal Links

Link to other content using relative paths:

```markdown
[Check out this post](../other-post.md)
```

The rehype plugin will convert these to proper routes automatically.

### External Links

External links automatically get an icon indicator:

```markdown
[Visit Astro](https://astro.build)
```

## Content Workflow

### Recommended Workflow

1. **Create**: Add a new markdown file in the appropriate collection
2. **Draft**: Set `published: false` while writing
3. **Write**: Add your content using markdown
4. **Review**: Preview locally with `npm run dev`
5. **Publish**: Set `published: true`
6. **Deploy**: Push to trigger automatic deployment

### Using Obsidian

If you're using Obsidian for content management:

1. Open the repository as an Obsidian vault
2. Install recommended community plugins
3. Write content with full Obsidian features (backlinks, graph, etc.)
4. Let Obsidian Git auto-commit and sync
5. GitHub Actions handles conversion and deployment

See [Obsidian & Deployment documentation](12-obsidian-deployment.md) for detailed setup.

## Validation

Content is automatically validated against Zod schemas defined in `src/content.config.ts`. Build will fail if:

- Required frontmatter fields are missing
- Field types don't match schema
- Dates are invalid
- Published content has invalid structure

Check build logs for specific validation errors.
