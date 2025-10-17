
import { type Meta, type CollectionName } from "@/content.config"
import metasite from "@/site.json";

export type ExternalLink = Pick<Meta, 'title' | 'url' | 'blank' | 'published'>;
export type TreeNode = Record<string, Meta | ExternalLink>;
export type Tree = Record<string, TreeNode>;

const home: Meta = {
    title: "Inicio",
    description: "Esta es mi página de notas de tecnología.",
    entriesPerPage: 15,
    url: "/",
    published: true,
}

const tags: Meta = {
    title: "Tags",
    description: "Aquí puedes encontrar todas las etiquetas.",
    entriesPerPage: 20,
    url: "/tags",
    published: true,
}

const archive: Meta = {
    title: "Archivo",
    description: "Archivo de todas las publicaciones.",
    entriesPerPage: 20,
    url: "/archive",
    published: true,
}

const reading: Meta = {
    title: "Reading",
    description: "Estos son algunos de los artículos, posts y recursos que he guardado para leer más tarde o para referencia futura.",
    entriesPerPage: 20,
    url: "/reading",
    published: true,
}

const bookmarks: Meta =  {
        title: "Bookmarks",
        description: "Aquí encontrarás todos mis marcadores organizados por etiquetas y colecciones.",
        entriesPerPage: 50,
        url: "/bookmarks",
        published: true,
    }

const wiki: Meta = {
    title: "Wiki",
    description: "Una colección de artículos y recursos técnicos.",
    entriesPerPage: 10,
    url: "/wiki",
    published: true,
}

const contentCollections: Record<CollectionName, Meta> = {
    blog: {
        title: "Blog",
        description: "Aquí encontrarás todos los artículos del blog.",
        entriesPerPage: 10,
        url: "/blog",
        published: true,
    },
    now: {
        title: "Now",
        description: "Aquí encontrarás las últimas actualizaciones y noticias.",
        entriesPerPage: 0,
        url: "/now",
        published: true,

    },
    projects: {
        title: "Proyectos",
        description: "Aquí encontrarás mis proyectos personales y colaborativos.",
        entriesPerPage: 5,
        url: "/projects",
        published: true,
    },
    about: {
        title: "About",
        description: "Sobre mí y este sitio web.",
        entriesPerPage: 0,
        url: "/about",
        published: true,
    },
    blogroll: {
        title: "Blog Roll",
        description: "Una lista de blogs que recomiendo.",
        entriesPerPage: 0,
        url: "/blogroll",
        published: true,
    },
    uses: {
        title: "Uses",
        description: "Las herramientas y tecnologías que utilizo.",
        entriesPerPage: 0,
        url: "/uses",
        published: true,
    },
    bookmarks,
    wiki
}

const pages = {
    home,
    tags,
    archive,
    reading,
    ...contentCollections,
}

const social: TreeNode = {
    github: {
        title: "GitHub",
        url: "https://github.com/ansango",
        blank: true,
        published: true,
    },
    linkedin: {
        title: "LinkedIn",
        url: "https://www.linkedin.com/in/ansango/",
        blank: true,
        published: true,
    }
}

const explore: TreeNode = {
    tags,
    wiki,
    archive,
    feed: {
        title: "Feed",
        description: "Suscríbete para recibir las últimas actualizaciones.",
        entriesPerPage: 0,
        url: "/rss.xml",
        blank: true,
        published: true,
    },
}

const tree: Tree = {
    personal: {
        home,
        now: contentCollections.now,
        uses: contentCollections.uses,
        about: contentCollections.about,
    },
    content: {
        blog: contentCollections.blog,
        projects: contentCollections.projects,
        blogroll: contentCollections.blogroll,
        bookmarks: contentCollections.bookmarks,
        reading: reading,
    },
    explore,
    social,
}

export const site = {
    ...metasite,
    pages,
    tree,
}