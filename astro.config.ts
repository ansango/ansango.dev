// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import relativeMdLinks from "astro-rehype-relative-markdown-links";
import externalLinks from "rehype-external-links";
import pagefind from "astro-pagefind";

import sitemap from "@astrojs/sitemap";
import site from "./src/site.json";
import { rehypeRemoveH1, elementArrow } from "./src/lib/rehype";

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  site: site.url,
  prefetch: true,
  integrations: [pagefind(), sitemap(), svelte({ extensions: [".svelte"] })],
  markdown: {
    rehypePlugins: [
      relativeMdLinks,
      [externalLinks, elementArrow],
      rehypeRemoveH1,
    ],
    shikiConfig: {
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
