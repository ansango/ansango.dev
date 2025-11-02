
# 🚢 Deployment

Deploy your site to production with confidence.

## Overview

This site can be deployed to any static hosting provider that supports:

- Node.js 18+
- npm/pnpm/bun
- Environment variables
- Static file serving

## Recommended Platforms

### Cloudflare Pages

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

### Vercel

**Best for**: Zero-config, automatic preview URLs, great DX

#### Setup

1. **Import Project**:
   - Go to Vercel dashboard
   - Click "Add New Project"
   - Import your GitHub repository

2. **Configure**:
   - Framework Preset: Astro
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Node Version: 18.x

3. **Environment Variables**:
   - Settings → Environment Variables
   - Add all required variables
   - Available for Production, Preview, and Development

4. **Deploy**:
   - Automatic on git push
   - Preview URLs for every PR

#### Custom Domain

1. Project Settings → Domains
2. Add your domain
3. Configure DNS (A/CNAME records)
4. SSL automatic

### Netlify

**Best for**: Form handling, serverless functions, plugins

#### Setup

1. **New Site**:
   - Netlify dashboard → Add new site
   - Import from Git
   - Select repository

2. **Build Settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 18 (in `netlify.toml` or environment)

3. **Environment Variables**:
   - Site settings → Build & deploy → Environment
   - Add all variables

4. **Deploy**:
   - Automatic on git push
   - Deploy previews for PRs

#### Custom Domain

1. Domain settings
2. Add custom domain
3. Configure DNS
4. HTTPS automatic

## Environment Variables

### Required for All Platforms

Set these in your hosting provider's dashboard:

#### Raindrop.io (Optional)

```env
RAINDROP_ACCESS_TOKEN=your_token_here
```

**Get token**: [raindrop.io/settings/integrations](https://raindrop.io/settings/integrations)

#### Last.fm (Optional)

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

**Get credentials**: See [Obsidian & Deployment](./13-obsidian-deployment.md)

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

### Performance

- [ ] Run Lighthouse audit
- [ ] Check Core Web Vitals
- [ ] Verify image optimization
- [ ] Test load times
- [ ] Check bundle sizes

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

### .nvmrc (for nvm users)

```
18
```

### netlify.toml (Netlify only)

```toml
[build.environment]
  NODE_VERSION = "18"
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

### Netlify

In `netlify.toml`:

```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[headers]]
  for = "/_astro/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

### Vercel

Create `vercel.json`:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    }
  ]
}
```

## Redirects

Configure URL redirects if needed.

### Cloudflare Pages

In `public/_redirects`:

```
/old-page /new-page 301
/blog/old-post /blog/new-post 301
```

### Netlify

In `netlify.toml`:

```toml
[[redirects]]
  from = "/old-page"
  to = "/new-page"
  status = 301
```

### Vercel

In `vercel.json`:

```json
{
  "redirects": [
    {
      "source": "/old-page",
      "destination": "/new-page",
      "permanent": true
    }
  ]
}
```

## Continuous Deployment

### GitHub Actions (Recommended)

See [Obsidian & Deployment](./13-obsidian-deployment.md) for full GitHub Actions workflow.

**Benefits**:
- Content conversion with obsidian-export
- Scheduled rebuilds for dynamic content
- Full control over build process
- Caching for faster builds

### Platform Auto-Deploy

**Cloudflare Pages**:
- Disable if using GitHub Actions
- Enable for direct Git deployments

**Vercel**:
- Auto-deploys on push to main
- Preview deployments for PRs
- Can configure in dashboard

**Netlify**:
- Auto-deploys on push
- Deploy previews for PRs
- Branch deploys configurable

## Deployment Strategies

### Production + Preview

**Recommended setup**:
- **Production**: Deploys from `main` branch
- **Preview**: Deploys from PRs and other branches

**Benefits**:
- Test changes before production
- Share previews with others
- Catch issues early

### Staging Environment

Create a staging environment:

1. **Separate deployment**:
   - Deploy from `staging` branch
   - Different environment variables
   - Test integrations

2. **Merge to production**:
   - Test thoroughly on staging
   - Merge `staging` → `main`
   - Automatic production deploy

## Monitoring

Track your deployment health.

### Build Status

- **GitHub Actions**: Check Actions tab
- **Vercel**: Deployments tab
- **Netlify**: Deploys tab
- **Cloudflare**: Build log in dashboard

### Uptime Monitoring

Free options:

- **UptimeRobot**: https://uptimerobot.com
- **Freshping**: https://www.freshworks.com/website-monitoring/
- **StatusCake**: https://www.statuscake.com

### Performance Monitoring

- **Lighthouse CI**: Automated Lighthouse audits
- **WebPageTest**: https://www.webpagetest.org
- **Google PageSpeed Insights**: https://pagespeed.web.dev

### Error Tracking

- **Sentry**: https://sentry.io (free tier)
- **LogRocket**: https://logrocket.com
- **Bugsnag**: https://www.bugsnag.com

## Post-Deployment

After deploying:

### Verify Deployment

1. Visit your site URL
2. Check all pages load correctly
3. Test navigation and links
4. Verify images display
5. Test search functionality
6. Check RSS feed
7. Verify integrations work

### Submit to Search Engines

- **Google Search Console**: Submit sitemap
- **Bing Webmaster Tools**: Submit sitemap
- **Yandex**: Submit sitemap (if targeting Russian audience)

### Analytics

- **GoatCounter**: Verify tracking script loads
- **Google Analytics**: If using alternative analytics
- **Plausible**: If using alternative analytics

### Social Sharing

- **Test OG tags**: Facebook Sharing Debugger
- **Test Twitter Cards**: Twitter Card Validator
- **Test LinkedIn**: LinkedIn Post Inspector

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

## Rollback

If deployment has issues:

### Vercel

1. Deployments → Previous deployment
2. Click three dots → Promote to Production

### Netlify

1. Deploys → Select working deploy
2. Publish deploy

### Cloudflare Pages

1. Select previous deployment
2. Rollback or redeploy

### GitHub

```bash
# Revert last commit
git revert HEAD
git push

# Or reset to previous commit (use carefully)
git reset --hard <commit-hash>
git push --force
```

## Cost Considerations

### Free Tiers

All recommended platforms have generous free tiers:

**Vercel**:
- 100 GB bandwidth/month
- Unlimited sites
- Automatic HTTPS

**Netlify**:
- 100 GB bandwidth/month
- 300 build minutes/month
- Unlimited sites

**Cloudflare Pages**:
- Unlimited bandwidth
- 500 builds/month
- Unlimited sites

### Paid Features

Consider paid tiers for:

- Higher bandwidth limits
- More build minutes
- Priority support
- Advanced analytics
- Team collaboration

## Related Documentation

- [Obsidian & Deployment](./13-obsidian-deployment.md)
- [Configuration](./08-configuration.md)
- [Performance](./15-performance.md)

## External Resources

- [Astro Deployment Guide](https://docs.astro.build/en/guides/deploy/)
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com/)
