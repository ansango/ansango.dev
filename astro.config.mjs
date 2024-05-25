import { defineConfig } from "astro/config";

import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import pagefind from "astro-pagefind";
import markdown from "./src/lib/plugins/markdown"
// https://astro.build/config
export default defineConfig({
  site: "https://dev.ansango.com",
  integrations: [sitemap(), tailwind(), pagefind()],
  markdown
});


