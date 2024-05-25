import { defineConfig } from "astro/config";
import rehypeAstroRelativeMarkdownLinks from "astro-rehype-relative-markdown-links";
import rehypeExternalLinks from "rehype-external-links";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import pagefind from "astro-pagefind";

// https://astro.build/config
export default defineConfig({
  site: "https://dev.ansango.com",
  integrations: [sitemap(), tailwind(), pagefind()],
  markdown: {
    rehypePlugins: [rehypeAstroRelativeMarkdownLinks, [
      rehypeExternalLinks,
      {
        target: "_blank",
        rel: ["noopener", "noreferrer"],
        properties: {
          className: ["external-link"],
        },
        content: {
          type: 'element', tagName: 'svg', properties: {
            xmlns: "http://www.w3.org/2000/svg"
            , width: "20"
            , height: "20"
            , viewBox: "0 0 24 24"
          }, children: [
            {
              type: 'element', tagName: 'g', properties: { fill: "currentColor" }, children: [

                {
                  type: 'element', tagName: 'path', properties: {
                    d: "M15.64 7.025h-3.622v-2h7v7h-2v-3.55l-4.914 4.914l-1.414-1.414z"
                  }
                },
                {
                  type: 'element', tagName: 'path', properties: {
                    d: "M10.982 6.975h-6v12h12v-6h-2v4h-8v-8h4z"
                  }
                }
              ]
            }
          ],

        },
      },
    ],],
    shikiConfig: {
      themes: {
        light: "vitesse-light",
        dark: "vitesse-dark",
      }
    },
  },

});


