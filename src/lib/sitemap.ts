/**
 * 🗺️ Sitemap Serialization
 * 
 * @description Customizes sitemap generation with priorities and change frequencies.
 * Assigns SEO-optimized values based on content type and page hierarchy.
 * 
 * @module lib/sitemap
 * 
 * @compatible
 * - 🔍 Used by @astrojs/sitemap integration
 * - 🎯 Prioritizes homepage and blog posts
 * - 📄 Handles pagination appropriately
 * - 🔢 Customizable change frequency per content type
 */

import type { SitemapItem } from "@astrojs/sitemap";
import { ChangeFreqEnum } from "@astrojs/sitemap";
import siteData from "../site.json";

const site = siteData as {
  url: string;
  name: string;
  description: string;
  image: string;
  email: string;
  lang: string;
  author: string;
  twitter: string;
};

/**
 * Serialize sitemap items with custom priorities and change frequencies
 * based on the type of page (homepage, blog, wiki, pagination, etc.)
 */
export function serializeSitemap(item: SitemapItem): SitemapItem {
  // Homepage has highest priority
  if (item.url === site.url + "/" || item.url === site.url) {
    return {
      ...item,
      priority: 1.0,
      changefreq: ChangeFreqEnum.DAILY,
    };
  }

  // Blog posts have high priority (excluding pagination)
  if (item.url.includes("/blog/") && !item.url.match(/\/\d+\/$/)) {
    return {
      ...item,
      priority: 0.9,
      changefreq: ChangeFreqEnum.MONTHLY,
    };
  }

  // Wiki entries
  if (item.url.includes("/wiki/") && !item.url.match(/\/\d+\/$/)) {
    return {
      ...item,
      priority: 0.8,
      changefreq: ChangeFreqEnum.MONTHLY,
    };
  }

  // Projects
  if (item.url.includes("/projects/") && !item.url.match(/\/\d+\/$/)) {
    return {
      ...item,
      priority: 0.8,
      changefreq: ChangeFreqEnum.MONTHLY,
    };
  }

  // Collection indexes
  if (
    item.url.endsWith("/blog/") ||
    item.url.endsWith("/wiki/") ||
    item.url.endsWith("/projects/") ||
    item.url.endsWith("/tags/") ||
    item.url.endsWith("/archive/")
  ) {
    return {
      ...item,
      priority: 0.7,
      changefreq: ChangeFreqEnum.WEEKLY,
    };
  }

  // Paginated pages have lower priority
  if (item.url.match(/\/\d+\/$/)) {
    return {
      ...item,
      priority: 0.5,
      changefreq: ChangeFreqEnum.WEEKLY,
    };
  }

  // Static pages (about, uses, now, blogroll)
  if (
    item.url.endsWith("/about/") ||
    item.url.endsWith("/uses/") ||
    item.url.endsWith("/now/") ||
    item.url.endsWith("/blogroll/")
  ) {
    return {
      ...item,
      priority: 0.6,
      changefreq: ChangeFreqEnum.MONTHLY,
    };
  }

  // Default for other pages (bookmarks, reading, music, individual tags)
  return {
    ...item,
    priority: 0.5,
    changefreq: ChangeFreqEnum.WEEKLY,
  };
}
