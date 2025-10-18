import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

//import { pageSiteGraphSchema } from 'starlight-site-graph/schema';

const path = "./src/content";

/**
 * Common Schemas
 */
const seoSchema = z.object({
  title: z.string(),
  description: z.string().min(10).optional(),
});

const metaSchema = seoSchema.extend({
  entriesPerPage: z.number().min(0).max(50).default(10),
  url: z.string().optional(),
  blank: z.boolean().default(false).optional(),
  published: z.boolean().default(false).optional(),
});

const commonSchema = seoSchema
  .extend({
    tags: z.array(z.string()).optional(),
    date: z.date().optional(),
    mod: z.date().optional(),
    index: z.boolean().default(false).optional(),
  })
  .merge(metaSchema.pick({ published: true }));

/**
 * Collections
 */

/**
 * Uses Collection
 */
const usesSchema = commonSchema.merge(
  z.object({
    index: z.boolean().default(true).optional(),
  }),
);

const uses = defineCollection({
  loader: glob({ pattern: "uses.md", base: path }),
  schema: usesSchema,
});

/**
 * About Collection
 */

const aboutSchema = commonSchema.merge(
  z.object({
    index: z.boolean().default(true).optional(),
  }),
);

const about = defineCollection({
  loader: glob({ pattern: "about.md", base: path }),
  schema: aboutSchema,
});

/**
 * Blog Roll Collection
 */

const blogRollSchema = commonSchema.merge(
  z.object({
    index: z.boolean().default(true).optional(),
  }),
);

const blogroll = defineCollection({
  loader: glob({ pattern: "blogroll.md", base: path }),
  schema: blogRollSchema,
});

/**
 * Now Collection
 */

const nowSchema = commonSchema.merge(
  z.object({
    index: z.boolean().default(true).optional(),
  }),
);

const now = defineCollection({
  loader: glob({ pattern: "now.md", base: path }),
  schema: nowSchema,
});

/**
 * Projects Collection
 */
const projectsSchema = commonSchema;

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: `${path}/projects` }),
  schema: projectsSchema,
});

/**
 * Blog Collection
 */

const blogSchema = commonSchema;

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: `${path}/blog` }),
  schema: blogSchema,
});

/**
 * Wiki Collection
 */

const wikiSchema = commonSchema;

const wiki = defineCollection({
  loader: glob({ pattern: "**/*.md", base: `${path}/wiki` }),
  schema: wikiSchema,
});

export const collections = {
  blog,
  now,
  projects,
  about,
  blogroll,
  uses,
  wiki,
};

export const collectionNames = Object.keys(collections);
export type CollectionName = keyof typeof collections;
export type Entry = z.infer<
  | typeof blogSchema
  | typeof nowSchema
  | typeof projectsSchema
  | typeof aboutSchema
  | typeof blogRollSchema
  | typeof usesSchema
  | typeof wikiSchema
>;
export type Meta = z.infer<typeof metaSchema>;
