
# 🚢 Deployment

Deploy your site to production with confidence.

## Overview

This site can be deployed to any static hosting provider that supports:

- Node.js 18+
- npm/pnpm/bun
- Environment variables
- Static file serving

## Cloudflare Pages

**Best for**: Global CDN, edge network, great performance
#### Setup

1. **Connect Repository**:
   - Go to Cloudflare Pages dashboard
   - Click "Create a project"
   - Connect your GitHub repository
   - **Important**: Disable automatic deployments (we use GitHub Actions)

2. **Configure Build**:
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Node version: 18 or higher

3. **Set Environment Variables**:
   - Settings → Environment variables
   - Add all required variables (see below)
   - Set for both Production and Preview

4. **Deploy**:
   - GitHub Actions handles deployment
   - Manual deploy available in Cloudflare dashboard

#### Custom Domain

1. Pages project → Custom domains
2. Add your domain
3. Follow DNS setup instructions
4. SSL certificate auto-provisioned

## Environment Variables

Set these in your hosting provider's dashboard:

#### Raindrop.io

```env
RAINDROP_ACCESS_TOKEN=your_token_here
```

**Get token**: [raindrop.io/settings/integrations](https://raindrop.io/settings/integrations)

#### Last.fm

```env
PUBLIC_LASTFM_API_KEY=your_api_key_here
PUBLIC_LASTFM_APPNAME=ansango.dev
PUBLIC_LASTFM_API_BASE_URL=https://ws.audioscrobbler.com/2.0
LASTFM_SHARED_SECRET=your_secret_here
```

**Get credentials**: [last.fm/api/account/create](https://www.last.fm/api/account/create)

#### GoatCounter Analytics (Optional)

```env
PUBLIC_GOATCOUNTER_CODE=yoursite
```

**Sign up**: [goatcounter.com](https://www.goatcounter.com)

#### Cloudflare Pages (For GitHub Actions)

```env
CLOUDFLARE_API_TOKEN=your_token
CLOUDFLARE_ACCOUNT_ID=your_account_id
```

**Get credentials**: See [Obsidian & Deployment](12-obsidian-deployment.md)

## Pre-deployment Checklist

Before deploying to production:

### Configuration

- [ ] Update `site.json` with production URL
- [ ] Set correct `author` and `email`
- [ ] Add social media handles
- [ ] Verify environment variables

### Content

- [ ] At least one published post/page
- [ ] All required frontmatter fields present
- [ ] Images optimized and accessible
- [ ] Internal links working
- [ ] No broken external links

### SEO

- [ ] Verify `site` URL in `astro.config.ts`
- [ ] Create default OG image (1200x630px)
- [ ] Test meta tags with validators
- [ ] Check robots.txt
- [ ] Verify sitemap generation

### Testing

- [ ] Build locally: `npm run build`
- [ ] Preview: `npm run preview`
- [ ] Test all pages load
- [ ] Check responsive design
- [ ] Verify integrations work
- [ ] Test search functionality
- [ ] Check RSS feed

## Build Command

All platforms use the same build command:

```bash
npm run build
```

Or with alternative package managers:

```bash
pnpm build
bun run build
```

## Output Directory

All platforms serve from the same output directory:

```
dist/
```

## Node Version

Specify Node.js version:

### package.json

```json
{
  "engines": {
    "node": ">=18.0.0"
  }
}
```

## Custom Headers

Configure security and caching headers.

### Cloudflare Pages

Create `public/_headers`:

```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: interest-cohort=()

/_astro/*
  Cache-Control: public, max-age=31536000, immutable

/pagefind/*
  Cache-Control: public, max-age=604800
```


## Redirects

Configure URL redirects if needed.

### Cloudflare Pages

In `public/_redirects`:

```
/old-page /new-page 301
/blog/old-post /blog/new-post 301
```

## Continuous Deployment

### GitHub Actions (Recommended)

See [Obsidian & Deployment](12-obsidian-deployment.md) for full GitHub Actions workflow.

**Benefits**:
- Content conversion with obsidian-export
- Scheduled rebuilds for dynamic content
- Full control over build process
- Caching for faster builds

### Platform Auto-Deploy

**Cloudflare Pages**:
- Disable if using GitHub Actions
- Enable for direct Git deployments
### Build Status

- **GitHub Actions**: Check Actions tab
- **Cloudflare**: Build log in dashboard

### Performance Monitoring

- **Lighthouse CI**: Automated Lighthouse audits
- **WebPageTest**: https://www.webpagetest.org
- **Google PageSpeed Insights**: https://pagespeed.web.dev

## Troubleshooting

### Build Fails

**Check**:
- Build logs for specific errors
- Environment variables are set
- Dependencies install correctly
- Node version is compatible

**Common fixes**:
- Clear cache and rebuild
- Update dependencies
- Check for typos in config
- Verify file paths are correct

### Site Not Loading

**Check**:
- Deployment completed successfully
- DNS configured correctly (for custom domains)
- CDN propagation finished (can take minutes)
- No redirect loops

### Missing Content

**Check**:
- Content has `published: true`
- Build logs show content being processed
- No errors in content frontmatter
- Collections configured correctly

### Slow Performance

**Check**:
- Image optimization working
- Unused JS/CSS purged
- CDN caching configured
- Lighthouse suggestions

### Integration Failures

**Check**:
- Environment variables set correctly
- API keys valid and not expired
- API rate limits not exceeded
- Network access not blocked
## Related Documentation

- [Obsidian & Deployment](12-obsidian-deployment.md)
- [Configuration](./08-configuration.md)

## External Resources

- [Astro Deployment Guide](https://docs.astro.build/en/guides/deploy/)
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com/)
