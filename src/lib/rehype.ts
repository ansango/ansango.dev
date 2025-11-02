/**
 * 🔧 Rehype Plugin Utilities
 * 
 * @description Custom rehype plugins for markdown transformation.
 * Removes H1 tags and adds external link icons to outbound links.
 * 
 * @module lib/rehype
 * 
 * @compatible
 * - 📝 Used in Astro markdown rendering
 * - 🌐 Enhances external links with icons
 * - ♿ Improves accessibility and UX
 * - 🎨 Maintains consistent heading hierarchy
 */

import { visit } from "unist-util-visit";
import type { Plugin } from "unified";
import type { Root, Element } from "hast";

/**
 * Rehype plugin to remove the first-level heading (<h1>) nodes from the HAST tree.
 *
 * This is useful when the page layout provides a title and you want to avoid
 * duplicated H1 elements inside the rendered Markdown content.
 *
 * The plugin visits all elements and removes nodes where tagName === 'h1'.
 * It uses visit.SKIP to avoid visiting removed nodes further.
 *
 * @type {Plugin<[], Root>} unified plugin that mutates the HAST root.
 */
export const rehypeRemoveH1: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, "element", (node: Element, index, parent) => {
      if (node.tagName === "h1" && parent && typeof index === "number") {
        parent.children.splice(index, 1);
        //@ts-expect-error
        return [visit.SKIP, index];
      }
    });
  };
};

/**
 * Element representation used to augment external links with an inline SVG arrow.
 * This object contains HAST element meta describing the svg icon and additional
 * properties to apply to anchor elements.
 *
 * Example usage: use with `rehype` transforms to add this `content` node after
 * external links and set `target` / `rel` attributes.
 */
export const elementArrow = {
  target: "_blank",
  rel: ["noopener", "noreferrer"],
  properties: {
    className: ["external-link"],
  },
  content: {
    type: "element",
    tagName: "svg",
    properties: {
      xmlns: "http://www.w3.org/2000/svg",
      width: "20",
      height: "20",
      viewBox: "0 0 24 24",
      className: ["size-4 inline-flex items-center"],
    },
    children: [
      {
        type: "element",
        tagName: "path",
        properties: {
          fill: "none",
          stroke: "currentColor",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: "2",
          d: "M7 7h10v10M7 17L17 7",
        },
        children: [],
      },
    ],
  },
};
