
# ⚡ Performance

The site is optimized for exceptional performance with fast load times and high Lighthouse scores.

## Performance Overview

This template achieves excellent performance through:

- **Mostly Static Output**: Minimal JavaScript overhead
- **Selective Hydration**: Interactive components load only when needed
- **Efficient CSS**: Tailwind's optimization and purging
- **Image Optimization**: Astro's built-in image processing
- **Code Splitting**: Automatic bundle optimization
- **Fast Load Times**: Sub-second initial page loads

## Core Web Vitals

Google's Core Web Vitals are key performance metrics.

### Target Metrics

| Metric | Target | Status |
|--------|--------|--------|
| LCP (Largest Contentful Paint) | < 2.5s | ✅ |
| FID (First Input Delay) | < 100ms | ✅ |
| CLS (Cumulative Layout Shift) | < 0.1 | ✅ |

### Largest Contentful Paint (LCP)

**Target**: < 2.5 seconds

**Optimizations**:
- Static HTML generation
- Preload critical fonts
- Optimized images with proper sizing
- CDN delivery
- Minimal render-blocking resources

### First Input Delay (FID)

**Target**: < 100 milliseconds

**Optimizations**:
- Minimal JavaScript
- Deferred non-critical scripts
- Efficient event handlers
- No long-running tasks on main thread

### Cumulative Layout Shift (CLS)

**Target**: < 0.1

**Optimizations**:
- Image dimensions specified
- Font loading optimized with `font-display: swap`
- No injected content above fold
- Reserved space for dynamic content

## Performance Features

### Static Generation

**Benefit**: Near-instant page loads

```typescript
// Astro generates static HTML
export default defineConfig({
  output: 'static',
});
```

**Result**:
- No server rendering delay
- Served directly from CDN
- Fast TTFB (Time to First Byte)

### Selective Hydration

**Benefit**: Minimal JavaScript execution

```astro
<!-- Only hydrate when visible -->
<Component client:visible />

<!-- Only hydrate on interaction -->
<Component client:idle />

<!-- Load immediately -->
<Component client:load />
```

**Strategy**:
- Most components: No hydration (static HTML)
- Music player: `client:visible` (loads when scrolled to)
- Search: `client:idle` (loads after page interactive)

### Code Splitting

**Benefit**: Smaller initial bundles

**Automatic**:
- Astro splits code per page
- Dynamic imports for heavy components
- Shared chunks for common dependencies

**Result**:
- Faster initial load
- Better caching
- Progressive enhancement

### Image Optimization

**Benefit**: Faster image loading, smaller files

**Implementation**:

```astro
<Image
  src={imageSrc}
  alt="Description"
  width={800}
  height={600}
  loading="lazy"
  decoding="async"
/>
```

**Features**:
- Automatic format conversion (WebP, AVIF)
- Responsive images with srcset
- Lazy loading by default
- Size optimization
- Blur placeholder (optional)

### Font Optimization

**Benefit**: Reduced layout shift, faster text rendering

**Implementation**:

```css
@import '@fontsource-variable/inter';

:root {
  --font-family-base: 'Inter Variable', system-ui, sans-serif;
}

@font-face {
  font-family: 'Inter Variable';
  font-display: swap;
}
```

**Strategy**:
- Variable fonts (smaller file size)
- `font-display: swap` (show fallback immediately)
- Self-hosted fonts (no external requests)
- Subset fonts if possible

### CSS Optimization

**Benefit**: Smaller CSS bundles

**Tailwind v4**:
- Automatic purging of unused classes
- Minimal runtime overhead
- Critical CSS inlined
- Lazy-loaded non-critical styles

**Result**:
- < 20KB CSS for typical page
- No unused styles shipped
- Fast stylesheet parsing

## Performance Budgets

Set performance budgets to maintain standards.

### File Size Budgets

| Resource | Budget | Current |
|----------|--------|---------|
| Initial JavaScript | < 50 KB | ~30 KB |
| Initial CSS | < 20 KB | ~15 KB |
| Images per page | < 500 KB | ~200 KB |
| Total page weight | < 1 MB | ~400 KB |

### Timing Budgets

| Metric | Budget |
|--------|--------|
| TTFB | < 200ms |
| FCP | < 1.8s |
| LCP | < 2.5s |
| TTI | < 3.8s |

## Monitoring Performance

### Lighthouse

Run audits regularly:

```bash
# Chrome DevTools
# 1. Open DevTools
# 2. Lighthouse tab
# 3. Generate report

# CLI
npx lighthouse https://yoursite.com --view
```

**Target Scores**:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

### WebPageTest

Detailed performance analysis:

1. Visit [webpagetest.org](https://www.webpagetest.org)
2. Enter your URL
3. Choose test location
4. Run test

**Check**:
- Speed Index
- Time to Interactive
- Total Blocking Time
- Waterfall chart

### Chrome DevTools

**Performance Panel**:
- Record page load
- Analyze main thread activity
- Identify bottlenecks
- Check long tasks

**Coverage Panel**:
- Show unused CSS/JS
- Identify optimization opportunities

**Network Panel**:
- Check resource sizes
- Verify compression
- Analyze load times

## Optimization Techniques

### Preloading Critical Resources

Preload fonts and critical assets:

```html
<link 
  rel="preload" 
  href="/fonts/inter-variable.woff2" 
  as="font" 
  type="font/woff2" 
  crossorigin 
/>
```

### Lazy Loading

Defer non-critical resources:

```astro
<!-- Images -->
<img loading="lazy" ... />

<!-- Components -->
<Component client:visible />

<!-- Scripts -->
<script defer src="..." />
```

### Resource Hints

Help browser prioritize:

```html
<!-- DNS prefetch -->
<link rel="dns-prefetch" href="https://api.example.com" />

<!-- Preconnect -->
<link rel="preconnect" href="https://fonts.googleapis.com" />

<!-- Prefetch -->
<link rel="prefetch" href="/next-page" />
```

### View Transitions

Smooth, instant page navigation:

```astro
---
import { ViewTransitions } from 'astro:transitions';
---

<head>
  <ViewTransitions />
</head>
```

**Benefits**:
- Instant perceived navigation
- Preserve state across pages
- Smooth animations
- Better UX

### Compression

Enable compression on server:

**Cloudflare**: Automatic Brotli/Gzip  
**Vercel**: Automatic compression  
**Netlify**: Automatic compression  

**Verify**:

```bash
curl -H "Accept-Encoding: br,gzip" -I https://yoursite.com
# Look for: content-encoding: br
```

## Caching Strategy

### Static Assets

```
/_astro/*
  Cache-Control: public, max-age=31536000, immutable
```

**Why**: Hashed filenames never change, cache forever.

### HTML Pages

```
/*.html
  Cache-Control: public, max-age=0, must-revalidate
```

**Why**: Always check for updates, serve stale while revalidating.

### Search Index

```
/pagefind/*
  Cache-Control: public, max-age=604800
```

**Why**: Updates weekly, cache for 7 days.

### API Data

Client-side caching with TanStack Query:

```typescript
{
  staleTime: 5 * 60 * 1000,  // 5 minutes
  cacheTime: 30 * 60 * 1000, // 30 minutes
}
```

## Bundle Analysis

Analyze JavaScript bundles:

### Astro Build Output

Check build logs:

```bash
npm run build

# Look for:
# dist/_astro/[hash].js  10 kB
# Total: 150 kB
```

### Detailed Analysis

Use bundle analyzer:

```bash
# Add to package.json
"scripts": {
  "analyze": "astro build --analyze"
}

npm run analyze
```

## Real User Monitoring (RUM)

Track real-world performance:

### Web Vitals

```javascript
import { getCLS, getFID, getLCP } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getLCP(console.log);
```

### Google Analytics 4

Automatically tracks Core Web Vitals if configured.

### Custom Metrics

```javascript
// Measure custom timing
performance.mark('component-start');
// ... component renders
performance.mark('component-end');
performance.measure('component', 'component-start', 'component-end');
```

## Mobile Performance

Optimize for mobile devices:

### Mobile-First

- Design for mobile first
- Progressive enhancement
- Responsive images
- Touch-friendly interactions

### Network Conditions

Test on slow networks:

**Chrome DevTools**:
1. Network tab
2. Throttling dropdown
3. Select "Slow 3G" or "Fast 3G"

### Battery Efficiency

- Minimize JavaScript execution
- Avoid animations on scroll
- Lazy load images
- Defer analytics

## Performance Checklist

Before deployment:

### Images

- [ ] All images optimized (WebP/AVIF)
- [ ] Proper dimensions specified
- [ ] Lazy loading enabled
- [ ] Responsive images with srcset

### Fonts

- [ ] Variable fonts used
- [ ] `font-display: swap` set
- [ ] Fonts self-hosted (no external requests)
- [ ] Font subsetting applied if needed

### JavaScript

- [ ] Minimal JS shipped
- [ ] Code splitting enabled
- [ ] Tree shaking working
- [ ] No unused dependencies

### CSS

- [ ] Unused styles purged
- [ ] Critical CSS inlined
- [ ] Minified and compressed
- [ ] No render-blocking CSS

### Caching

- [ ] Proper cache headers set
- [ ] Static assets cached long-term
- [ ] HTML revalidated on each request
- [ ] CDN caching configured

### Build

- [ ] Production build tested
- [ ] Lighthouse score 90+
- [ ] Core Web Vitals pass
- [ ] Bundle sizes within budget

## Common Performance Issues

### Large JavaScript Bundles

**Symptom**: Slow initial load, high TTI

**Fix**:
- Remove unused dependencies
- Code split large components
- Lazy load non-critical features
- Use lighter alternatives

### Render-Blocking Resources

**Symptom**: Slow FCP, blank page delay

**Fix**:
- Inline critical CSS
- Defer non-critical CSS
- Async/defer scripts
- Preload critical fonts

### Layout Shifts

**Symptom**: High CLS, jumping content

**Fix**:
- Specify image dimensions
- Reserve space for dynamic content
- Use `font-display: swap`
- Avoid injecting content above fold

### Slow Images

**Symptom**: Slow LCP, large page weight

**Fix**:
- Optimize images (WebP, proper sizes)
- Lazy load below-fold images
- Use responsive images
- Consider blur placeholders

## Advanced Optimizations

### Service Worker

Cache assets offline:

```javascript
// Not implemented by default
// Can be added with Workbox
```

### HTTP/2 Server Push

Push critical resources:

```
Link: </critical.css>; rel=preload; as=style
```

### Resource Prioritization

Control loading priority:

```html
<link rel="preload" as="image" href="hero.jpg" fetchpriority="high" />
<img src="thumbnail.jpg" fetchpriority="low" />
```

### Edge Computing

Move computation closer to users:

- Cloudflare Workers
- Vercel Edge Functions
- Netlify Edge Functions

## Testing Performance

### Local Testing

```bash
# Production build
npm run build

# Preview
npm run preview

# Test with throttling
# Chrome DevTools → Network → Throttling
```

### Continuous Integration

Add Lighthouse CI to GitHub Actions:

```yaml
- name: Lighthouse CI
  uses: treosh/lighthouse-ci-action@v9
  with:
    urls: |
      https://yoursite.com
    uploadArtifacts: true
```

### Performance Regression

Monitor for regressions:

- Set performance budgets
- Fail builds if budgets exceeded
- Track metrics over time

## Results

With all optimizations applied:

### Lighthouse Scores

- **Performance**: 95-100
- **Accessibility**: 95-100
- **Best Practices**: 95-100
- **SEO**: 100

### Core Web Vitals

- **LCP**: 0.8-1.5s
- **FID**: < 10ms
- **CLS**: < 0.05

### Page Weight

- **Initial load**: ~400 KB
- **JavaScript**: ~30 KB
- **CSS**: ~15 KB
- **Images**: ~200 KB (optimized)

## Related Documentation

- [Deployment](./14-deployment.md)
- [SEO Optimization](./09-seo.md)
- [Configuration](./08-configuration.md)

## External Resources

- [Web.dev Performance](https://web.dev/performance/)
- [Astro Performance Guide](https://docs.astro.build/en/guides/performance/)
- [Core Web Vitals](https://web.dev/vitals/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
