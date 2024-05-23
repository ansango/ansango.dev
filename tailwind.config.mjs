import typography from "@tailwindcss/typography";
import theme from "./src/lib/css";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  plugins: [typography(), theme()],
};
