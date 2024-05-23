import plugin from "tailwindcss/plugin";

import { fontFamily } from "tailwindcss/defaultTheme";

const root = {
  "--font-sans": "Switzer, sans-serif",
};

const light = {
  ...root,
  "color-scheme": "light",
  "--color-primary": "#f59e0b",
  "--color-secondary": "#3b82f6",
  "--color-content": "#525252",
  "--color-content-100": "#404040",
  "--color-content-200": "#262626",
  "--color-content-300": "#171717",
  "--color-muted": "#737373",
  "--color-background": "#fafafa",
  "--color-background-100": "#e5e5e5",
  "--color-background-200": "#d4d4d4",
  "--color-background-300": "#a1a1aa",

}

const dark = {
  ...root,
  "color-scheme": "dark",
  "--color-primary": "#fbbf24",
  "--color-secondary": "#60a5fa",
  "--color-content": "#d4d4d4",
  "--color-content-100": "#e5e5e5",
  "--color-content-200": "#f5f5f5",
  "--color-content-300": "#fafafa",
  "--color-muted": "#737373",
  "--color-background": "#0a0a0a",
  "--color-background-100": "#171717",
  "--color-background-200": "#27272a",
  "--color-background-300": "#3f3f46",

}

const themes = {
  "html.light": light,
  "html.dark": dark
}

const defaultRoot = themes["html.light"];

const scrollbar = {
  "*::-webkit-scrollbar": {
    width: "0.5rem",
    height: "0.5rem",
  },
  "*::-webkit-scrollbar-track": {
    "background-color": "transparent",
  },
  "*::-webkit-scrollbar-thumb": {
    "background-color": "var(--color-background-200)",
    "border-radius": "9999px",
  },
  "*::-webkit-scrollbar-button": {
    display: "none",
  },
};

export const base = {
  ":root": defaultRoot,
  ...themes,
  ...scrollbar,

  "html.light .astro-code.astro-code-themes, html.light .astro-code.astro-code-themes span": {
    "color": "var(--shiki-dark) !important",
    "background-color": "var(--shiki-dark-bg) !important",
    /* Optional, if you also want font styles */
    "font-style": "var(--shiki-dark-font-style) !important",
    "font-weight": "var(--shiki-dark-font-weight) !important",
    "text-decoration": "var(--shiki-dark-text-decoration) !important",
  },
  "html.dark .astro-code.astro-code-themes, html.dark .astro-code.astro-code-themes span": {
    "color": "var(--shiki-dark) !important",
    "background-color": "var(--shiki-dark-bg) !important",
    /* Optional, if you also want font styles */
    "font-style": "var(--shiki-dark-font-style) !important",
    "font-weight": "var(--shiki-dark-font-weight) !important",
    "text-decoration": "var(--shiki-dark-text-decoration) !important",

  }

};

const typography = {
  css: {
    '--tw-prose-body': "var(--color-content)",
    '--tw-prose-headings': "var(--color-content-300)",
    '--tw-prose-lead': "var(--color-content)",
    '--tw-prose-links': "var(--color-content-100)",
    '--tw-prose-bold': "var(--color-content)",
    '--tw-prose-counters': "var(--color-content)",
    '--tw-prose-bullets': "var(--color-content)",
    '--tw-prose-hr': "var(--color-content)",
    '--tw-prose-quotes': "var(--color-content)",
    '--tw-prose-quote-borders': "var(--color-content)",
    '--tw-prose-captions': "var(--color-content)",
    '--tw-prose-kbd': "var(--color-content)",
    '--tw-prose-kbd-shadows': "var(--color-content)",
    '--tw-prose-code': "var(--color-content)",
    '--tw-prose-pre-code': "var(--color-content)",
    '--tw-prose-pre-bg': "var(--color-content)",
    '--tw-prose-th-borders': "var(--color-content)",
    '--tw-prose-td-borders': "var(--color-content)",

    '--tw-prose-invert-body': "var(--color-content)",
    '--tw-prose-invert-headings': "var(--color-primary)",
    '--tw-prose-invert-lead': "var(--color-content)",
    '--tw-prose-invert-links': "var(--color-content)",
    '--tw-prose-invert-bold': "var(--color-content)",
    '--tw-prose-invert-counters': "var(--color-content)",
    '--tw-prose-invert-bullets': "var(--color-content)",
    '--tw-prose-invert-hr': "var(--color-content)",
    '--tw-prose-invert-quotes': "var(--color-content)",
    '--tw-prose-invert-quote-borders': "var(--color-content)",
    '--tw-prose-invert-captions': "var(--color-content)",
    '--tw-prose-invert-kbd': "var(--color-content)",
    '--tw-prose-invert-kbd-shadows': "var(--color-content)",
    '--tw-prose-invert-code': "var(--color-content)",
    '--tw-prose-invert-pre-code': "var(--color-content)",
    '--tw-prose-invert-pre-bg': "var(--color-content)",
    '--tw-prose-invert-th-borders': "var(--color-content)",
    '--tw-prose-invert-td-borders': "var(--color-content)",

    fontWeight: 400,
    lineHeight: 1.5,
    margin: 0,
    letterSpacing: "0em",
    fontSize: "1.125rem",

    h1: {
      margin: 0,
      fontWeight: 500,
    },
    h2: {
      fontWeight: 500,
    },
    h3: {
      fontWeight: 500,
    },
    h4: {
      fontWeight: 500,
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
    a: {
      fontWeight: 400,
      textDecoration: "none",
      "&:hover": {
        color: "var(--color-secondary)"
      },


    },
    ul: {
      listStyleType: "none",
      paddingLeft: 0,
      "& li": {
        paddingLeft: "0.125em",
        margin: 0,
        "& > a": {
          textDecoration: "underline",
        }
      },
    },
    p: {
      margin: "0.75rem 0",
    },
    strong: {
      fontWeight: 500,
    },
  },

};


export default () => plugin(({ addBase }) => {
  addBase(base);
}, {
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        content: "var(--color-content)",
        "content-100": "var(--color-content-100)",
        "content-200": "var(--color-content-200)",
        "content-300": "var(--color-content-300)",
        muted: "var(--color-muted)",
        background: "var(--color-background)",
        "background-100": "var(--color-background-100)",
        "background-200": "var(--color-background-200)",
        "background-300": "var(--color-background-300)",

      },
      typography: () => {
        return {
          DEFAULT: typography,

        }
      },
    },
  }
});