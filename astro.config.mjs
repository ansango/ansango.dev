import { defineConfig } from "astro/config";

import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import pagefind from "astro-pagefind";
import markdown from "./src/lib/plugins/markdown"
import partytown from '@astrojs/partytown'
// https://astro.build/config
export default defineConfig({
  site: "https://dev.ansango.com",
  integrations: [
    sitemap(),
    tailwind(),
    pagefind(),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      }
    }),
  ],
  markdown,
});


