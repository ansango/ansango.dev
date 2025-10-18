
export { default as Image } from "./image.astro";
export { default as Placeholder } from "./placeholder.astro";

export interface ImageProps {
  className?: string;
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  loading?: "eager" | "lazy";
}