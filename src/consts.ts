import type { Site } from "@/types";
import { seoContentCollection } from "./content/config";

export const site: Site = {
  url: "https://dev.ansango.com",
  name: "dev.ansango",
  email: "anibalsantosgo@gmail.com",
  lang: "es",
  pages: {
    home: {
      description: "Esta es mi página de notas de tecnología.",
      entriesPerPage: 15,
    },
    tags: {
      title: "Tags",
      description: "Aquí puedes encontrar todas las etiquetas.",
      entriesPerPage: 20,
    },
    ...seoContentCollection,
  },
};

export const baseLongDateOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};
