import { type Meta, type CollectionName } from "@/content.config";
import metasite from "@/site.json";

export type ExternalLink = Pick<Meta, "title" | "url" | "blank" | "published">;
export type TreeNode = Record<string, Meta | ExternalLink>;
export type Tree = Record<string, TreeNode>;

const home: Meta = {
  title: "Inicio",
  description:
    "Notas sobre tecnología, desarrollo web y aprendizajes del día a día.",
  entriesPerPage: 15,
  url: "/",
  published: true,
};

const tags: Meta = {
  title: "Tags",
  description:
    "Explora contenido organizado por temas: desarrollo web, herramientas, arquitectura y más.",
  entriesPerPage: 20,
  url: "/tags",
  published: true,
};

const archive: Meta = {
  title: "Archivo",
  description:
    "Cronología completa de artículos, notas y proyectos publicados en este sitio.",
  entriesPerPage: 20,
  url: "/archive",
  published: true,
};

const reading: Meta = {
  title: "Reading",
  description:
    "Artículos, posts y recursos que he guardado para leer, aprender y consultar.",
  entriesPerPage: 20,
  url: "/reading",
  published: true,
};

const bookmarks: Meta = {
  title: "Bookmarks",
  description:
    "Colección curada de enlaces útiles sobre desarrollo, diseño y tecnología.",
  entriesPerPage: 50,
  url: "/bookmarks",
  published: true,
};

const wiki: Meta = {
  title: "Wiki",
  description:
    "Base de conocimiento técnico: guías, referencias y apuntes de desarrollo.",
  entriesPerPage: 10,
  url: "/wiki",
  published: true,
};

const music: Meta = {
  title: "Music",
  description:
    "Lo que escucho mientras programo: estadísticas y últimas reproducciones de Last.fm.",
  entriesPerPage: 0,
  url: "/music",
  published: true,
};

const contentCollections: Record<CollectionName, Meta> = {
  blog: {
    title: "Blog",
    description:
      "Artículos sobre desarrollo web, tecnología y experiencias construyendo software.",
    entriesPerPage: 10,
    url: "/blog",
    published: true,
  },
  now: {
    title: "Now",
    description:
      "En qué estoy trabajando ahora: proyectos actuales, aprendizajes y prioridades.",
    entriesPerPage: 0,
    url: "/now",
    published: true,
  },
  projects: {
    title: "Proyectos",
    description:
      "Proyectos personales, experimentos y cosas que estoy construyendo o he construido.",
    entriesPerPage: 5,
    url: "/projects",
    published: true,
  },
  about: {
    title: "About",
    description:
      "Quién soy, qué hago y por qué existe este sitio. Un poco sobre mí y mi trabajo.",
    entriesPerPage: 0,
    url: "/about",
    published: true,
  },
  blogroll: {
    title: "Blog Roll",
    description:
      "Blogs y sitios personales que leo y recomiendo. Gente interesante haciendo cosas interesantes.",
    entriesPerPage: 0,
    url: "/blogroll",
    published: true,
  },
  uses: {
    title: "Uses",
    description:
      "Herramientas, software y setup que uso para programar y trabajar cada día.",
    entriesPerPage: 0,
    url: "/uses",
    published: true,
  },

  wiki,
};

const pages = {
  home,
  tags,
  archive,
  reading,
  bookmarks,
  music,
  ...contentCollections,
};

const social: TreeNode = {
  github: {
    title: "GitHub",
    url: `https://github.com/${metasite.github}`,
    blank: true,
    published: true,
  },
  linkedin: {
    title: "LinkedIn",
    url: `https://www.linkedin.com/in/${metasite.linkedin}/`,
    blank: true,
    published: true,
  },
};

const explore: TreeNode = {
  tags,
  wiki,
  archive,
  feed: {
    title: "Feed",
    description:
      "Suscríbete al RSS feed para recibir nuevos artículos en tu lector favorito.",
    entriesPerPage: 0,
    url: "/rss.xml",
    blank: true,
    published: true,
  },
};

const tree: Tree = {
  personal: {
    home,
    now: contentCollections.now,
    uses: contentCollections.uses,
    about: contentCollections.about,
    music,
  },
  content: {
    blog: contentCollections.blog,
    projects: contentCollections.projects,
    blogroll: contentCollections.blogroll,
    bookmarks,
    reading,
  },
  explore,
  social,
};

export const site = {
  ...metasite,
  pages,
  tree,
};
