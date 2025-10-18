import { visit } from "unist-util-visit";
import type { Plugin } from "unified";
import type { Root, Element } from "hast";

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
