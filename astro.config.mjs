import { defineConfig } from "astro/config";
import rehypeAstroRelativeMarkdownLinks from "astro-rehype-relative-markdown-links";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import pagefind from "astro-pagefind";


// https://astro.build/config
export default defineConfig({
  site: "https://example.com",
  integrations: [sitemap(), tailwind(), pagefind()],
  markdown: {
    rehypePlugins: [rehypeAstroRelativeMarkdownLinks],
    shikiConfig: {
      themes: {
        light: "vitesse-light",
        dark: "vitesse-dark",
      }
    },
  },
});