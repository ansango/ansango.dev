import rehypeAstroRelativeMarkdownLinks from "astro-rehype-relative-markdown-links";
import rehypeExternalLinks from "rehype-external-links";

const rehypePlugins = [rehypeAstroRelativeMarkdownLinks, [
  rehypeExternalLinks,
  {
    target: "_blank",
    rel: ["noopener", "noreferrer"],
    properties: {
      className: ["external-link"],
    },
    content: {
      type: 'element', tagName: 'svg', properties: {
        xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 24 24"
      },
      children: [
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
],
  "rehype-slug",
  [
    "rehype-autolink-headings",
    {
      behavior: "append"
    },
  ],
  [
    'rehype-toc',
    {
      headings: ['h2'],
      customizeTOC: function (toc) {
        toc.properties = {
          className: 'toc text-md',
        };
        toc.children.map((child => {
          if (child.tagName === 'ol') {
            child.properties.className = 'rounded-md p-4 bg-background-50 dark:bg-background-100';
          }
        }))
        toc.children.unshift({
          type: 'element',
          tagName: 'h2',
          properties: {
            id: 'table-of-contents',
            className: 'text-muted !m-0 !mb-4 !text-base',
          },
          children: [
            {
              type: 'text',
              value: 'Índice',
            },
          ],
        });
        return toc;
      },
    }
  ]
]

export default rehypePlugins;