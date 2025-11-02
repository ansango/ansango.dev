/**
 * 🧩 Breadcrumb Navigation Utilities
 * 
 * @description Generates breadcrumb navigation and JSON-LD structured data.
 * Creates hierarchical navigation trails from URL paths with SEO-friendly markup.
 * 
 * @module lib/breadcrumbs
 * 
 * @compatible
 * - 🔍 Improves site navigation and UX
 * - 🎯 Used in Head component for SEO
 * - 📄 Supports nested wiki pages
 * - 🌐 Generates schema.org BreadcrumbList
 */

import { site } from "@/constants";

export type BreadcrumbItem = {
  name: string;
  url: string;
};

/**
 * Generate breadcrumb items from a URL path
 * @param pathname - Current page pathname (e.g., "/wiki/tooling/docker")
 * @param title - Current page title
 * @returns Array of breadcrumb items
 */
export function getBreadcrumbs(
  pathname: string,
  title?: string,
): BreadcrumbItem[] {
  const breadcrumbs: BreadcrumbItem[] = [
    {
      name: "Inicio",
      url: site.url,
    },
  ];

  const parts = pathname.split("/").filter(Boolean);

  // Build breadcrumbs from path parts
  parts.forEach((part, index) => {
    const url = `${site.url}/${parts.slice(0, index + 1).join("/")}`;
    const isLast = index === parts.length - 1;

    // Use title for the last item if provided, otherwise format the part
    const name = isLast && title ? title : formatBreadcrumbName(part);

    breadcrumbs.push({ name, url });
  });

  return breadcrumbs;
}

/**
 * Format a URL part into a readable breadcrumb name
 * @param part - URL segment (e.g., "docker", "tooling")
 * @returns Formatted name
 */
function formatBreadcrumbName(part: string): string {
  return part
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Generate BreadcrumbList JSON-LD structured data
 * @param breadcrumbs - Array of breadcrumb items
 * @returns JSON-LD object for BreadcrumbList
 */
export function getBreadcrumbsJsonLd(breadcrumbs: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
