
# 🎯 Indie Web Features

Embrace the independent web with features that promote decentralization, ownership, and community.

## Overview

The indie web is a movement to keep the web open and independent. This template includes several features aligned with indie web principles:

- Personal ownership of content
- Cross-site connections (blogroll)
- Content syndication (RSS)
- Bookmarking and curation
- Personal expression (Now page, Uses page)
- Music taste sharing

## Blogroll

Curate and share a list of blogs you follow and recommend.

### Setup

Edit `src/content/blogroll.md`:

```markdown
---
title: "Blogroll"
description: "Blogs I follow and recommend"
published: true
---

## Web Development

- [Astro Blog](https://astro.build/blog) - Official Astro news and updates
- [CSS-Tricks](https://css-tricks.com) - Web design and development articles
- [Smashing Magazine](https://www.smashingmagazine.com) - For web designers and developers

## Technology

- [Hacker News](https://news.ycombinator.com) - Tech news and discussion
- [Ars Technica](https://arstechnica.com) - Technology news and analysis

## Personal Blogs

- [Tom MacWright](https://macwright.com) - Maps, code, and writing
- [Robin Rendle](https://www.robinrendle.com) - Design and typography
```

### Features

- **Organized by category**: Group blogs by topic
- **Descriptions**: Add context for each blog
- **Markdown formatting**: Use standard markdown
- **Links**: Direct links to blogs

### Best Practices

1. **Keep it current**: Remove dead blogs
2. **Add descriptions**: Help readers understand what to expect
3. **Categorize**: Group similar blogs together
4. **Update regularly**: Add new discoveries
5. **Be selective**: Quality over quantity

### Discover Blogrolls

Find more blogs through blogrolls:

- Look for "Blogroll" pages on blogs you follow
- Check [IndieWeb Blogroll](https://indieweb.org/blogroll)
- Join the [IndieWeb webring](https://indieweb.org/webring)

## Bookmarks

Share your curated bookmarks powered by Raindrop.io.

### Features

- **Dynamic**: Fetched from Raindrop.io at build time
- **Organized**: Automatically grouped by collections
- **Up-to-date**: Rebuild to sync latest bookmarks
- **Public sharing**: Share your research and discoveries

### Setup

See [Raindrop Integration](./06-integrations.md#raindropio-integration) for setup instructions.

### Collections

Organize bookmarks by topic:

- `ansango.work` → Work resources
- `ansango.daily` → Daily reading
- `ansango.tools` → Useful tools

### Usage

1. Save bookmarks in Raindrop.io
2. Organize into collections
3. Follow naming convention (`sitename.category`)
4. Rebuild site to sync

### Pages

- `/bookmarks` - All your bookmark collections
- `/bookmarks/work` - Specific collection

### Public vs Private

Only public Raindrop collections appear on your site. Keep private collections for personal use.

## Reading List

Share articles you're reading or have read.

### Features

- **Powered by Raindrop.io**: Uses "reading" collection
- **Paginated**: Easy navigation through many items
- **Metadata**: Shows tags, descriptions, dates
- **Cover images**: Visual preview when available

### Setup

1. Create a "reading" collection in Raindrop.io
2. Add articles you want to share
3. Make collection public
4. Rebuild site

### Page

Available at `/reading` with pagination at `/reading/[page]`

### Best Practices

1. **Add notes**: Use Raindrop notes for your thoughts
2. **Tag appropriately**: Help readers find related content
3. **Trim regularly**: Remove read articles or archive
4. **Highlight favorites**: Use Raindrop's favorite feature

## Now Page

Share what you're currently focused on, inspired by [Derek Sivers' Now page movement](https://nownownow.com/).

### Concept

A "Now" page tells visitors what you're doing right now, answering:

- What are you working on?
- What are you learning?
- What's important to you currently?
- Where is your focus?

### Setup

Edit `src/content/now.md`:

```markdown
---
title: "What I'm Doing Now"
description: "Current projects and focus areas"
date: 2025-11-02
mod: 2025-11-02
published: true
---

## Current Projects

I'm currently working on:
- Building a personal knowledge base with Astro
- Learning Rust programming language
- Writing about web performance

## Learning

- **Svelte 5**: Exploring the new runes API
- **TypeScript**: Deep diving into advanced types
- **System design**: Reading "Designing Data-Intensive Applications"

## Focus

My main focus this month is improving my writing consistency and shipping more side projects.

---

*Last updated: November 2, 2025*
```

### Update Frequency

- Update when your focus changes (weekly, monthly, or as needed)
- Change the `mod` date in frontmatter
- No need for perfect consistency

### Join the Movement

1. Create your Now page
2. Submit to [nownownow.com](https://nownownow.com/submit)
3. Browse other people's Now pages for inspiration

## Uses Page

Document your tools, setup, and workflow.

### Concept

A "Uses" page shares:

- Hardware and gear
- Software and tools
- Development setup
- Productivity systems

Inspired by [uses.tech](https://uses.tech/)

### Setup

Edit `src/content/uses.md`:

```markdown
---
title: "Uses"
description: "Tools and setup I use daily"
date: 2025-11-02
mod: 2025-11-02
published: true
---

## Hardware

### Computer
- **MacBook Pro 16"** (M1 Max, 32GB RAM)
- **LG 27" 4K Monitor**

### Peripherals
- **Keychron K8** mechanical keyboard
- **Logitech MX Master 3** mouse
- **Audio-Technica ATH-M50x** headphones

## Software

### Development
- **Editor**: VS Code with Copilot
- **Terminal**: Warp
- **Version control**: Git + GitHub
- **Browser**: Arc

### Design
- **Figma** for UI/UX design
- **Excalidraw** for diagrams
- **ColorSlurp** for color picking

### Productivity
- **Obsidian** for notes
- **Things** for tasks
- **Raycast** for everything

## Services

- **Hosting**: Cloudflare Pages
- **Email**: Fastmail
- **Analytics**: GoatCounter
- **Bookmarks**: Raindrop.io
```

### Update Regularly

- Keep it current as you change tools
- Update `mod` date when making changes
- Add new discoveries

### Join the Directory

Submit to [uses.tech](https://uses.tech/) to be listed in the directory.

## Music

Share your music taste with real-time Last.fm integration.

### Features

- **Current Track**: What you're listening to right now
- **Recent Tracks**: Your last 10 plays
- **Top Artists**: Most listened artists (7 days)
- **Top Albums**: Favorite albums (30 days)
- **Auto-refresh**: Updates every 5 minutes

### Setup

See [Last.fm Integration](./06-integrations.md#lastfm-integration) for setup instructions.

### Pages

- `/music` - Full music page with all stats
- `/music-lite` - Lightweight version

### Components

- `PlayNow` - Full music player component
- `PlayNow Mini` - Compact sidebar version

### Privacy

Last.fm data is public by default. Check your Last.fm privacy settings if you want to limit what's shared.

## RSS Feed

Syndicate your content for easy following.

### Features

- **All content**: Blog, wiki, projects
- **Full metadata**: Dates, authors, tags
- **Standards compliant**: RSS 2.0
- **Auto-discovery**: Easy subscription

See [RSS Documentation](./11-rss.md) for details.

### Subscribe Link

Add a prominent subscribe link:

```astro
<a href="/rss.xml" class="rss-link">
  <RssIcon /> Subscribe via RSS
</a>
```

## Indie Web Principles

This template embraces core indie web principles:

### Own Your Content

- **Your domain**: Content lives on your domain
- **Your data**: Markdown files you control
- **Portable**: Easy to move and backup
- **Forever**: No platform lock-in

### Publish on Your Own Site First (POSSE)

Workflow:

1. Publish on your site first
2. Syndicate to social media
3. Link back to your site

### Connect Across Sites

- **Blogroll**: Link to other blogs
- **Webmentions**: (Can be added) Reply to posts on other sites
- **RSS**: Subscribe to independent blogs
- **Backlinks**: Build the independent web

### Long-term Ownership

- **Static files**: Pure HTML, CSS, JS
- **Markdown source**: Future-proof format
- **Git versioned**: Full history
- **Exportable**: Take your content anywhere

## Webmentions (Optional)

Not implemented by default, but easy to add.

### What are Webmentions?

A way to notify another website that you've mentioned them.

### Adding Webmentions

1. Sign up for [webmention.io](https://webmention.io)
2. Add to `<head>`:

   ```html
   <link rel="webmention" href="https://webmention.io/yoursite.com/webmention" />
   <link rel="pingback" href="https://webmention.io/yoursite.com/xmlrpc" />
   ```

3. Display received webmentions on posts

### Tools

- **webmention.io**: Hosted webmention service
- **Bridgy**: Connect webmentions to social media
- **webmention.js**: Display webmentions

## Microformats (Optional)

Add semantic HTML for better indie web integration.

### h-entry Markup

Mark up blog posts:

```html
<article class="h-entry">
  <h1 class="p-name">Post Title</h1>
  <time class="dt-published" datetime="2025-11-02">Nov 2, 2025</time>
  <div class="p-author h-card">
    <img class="u-photo" src="/avatar.jpg" alt="Author" />
    <span class="p-name">Author Name</span>
  </div>
  <div class="e-content">
    Post content...
  </div>
</article>
```

### Benefits

- Better syndication
- Webmention compatibility
- Semantic structure
- IndieWeb integration

## Community

Join the indie web community:

### Resources

- **IndieWeb.org**: Main community site
- **IndieWeb Wiki**: Documentation and guides
- **IndieWeb Chat**: Real-time discussion
- **Homebrew Website Club**: Local meetups

### Events

- **IndieWebCamp**: Annual conference
- **Homebrew Website Club**: Weekly meetups
- **IndieWebCamp Create Day**: Hack days

### Getting Started

1. Create your site (✅ done!)
2. Add h-card to your homepage
3. Join the IndieWeb chat
4. Attend a Homebrew Website Club
5. Add webmentions
6. Implement POSSE

## Best Practices

### Content Ownership

1. **Markdown source**: Keep content in version control
2. **Regular backups**: Backup your repository
3. **Export options**: Know how to export your data
4. **Portable format**: Use standard formats

### Discoverability

1. **RSS feed**: Make it easy to subscribe
2. **Clear navigation**: Help visitors explore
3. **About page**: Introduce yourself
4. **Contact info**: Make it easy to connect

### Community

1. **Link to others**: Build connections via blogroll
2. **Reply thoughtfully**: Engage with content
3. **Share generously**: Curate bookmarks and reading
4. **Be authentic**: Share your real interests (Now, Uses, Music)

## Related Documentation

- [RSS Feed](./11-rss.md)
- [Integrations](./06-integrations.md)
- [Content Management](./04-content-management.md)

## External Resources

- [IndieWeb](https://indieweb.org/)
- [nownownow.com](https://nownownow.com/)
- [uses.tech](https://uses.tech/)
- [webmention.io](https://webmention.io/)
- [Raindrop.io](https://raindrop.io/)
- [Last.fm](https://www.last.fm/)
