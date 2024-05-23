import path from 'path';
import { defineCollection, z } from 'astro:content';
import type { Metadata } from '@/types';

export type SchemaCollections = Record<string, z.ZodObject<any, any, any>>;

export const commonSchema = z.object({
  title: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
  date: z.coerce.date(),
  mod: z.coerce.date().nullable().optional(),
  published: z.boolean().nullable().optional(),
});

export type CommonData = z.infer<typeof commonSchema>;

export const schemaCollections = {
  blog: commonSchema,
};

export type ContentCollection = "blog";
export type SeoCollections = Record<ContentCollection, Metadata>;
export const seoContentCollection: SeoCollections = {
  blog: {
    title: "Blog",
    description: "Aquí encontrarás todos los artículos del blog.",
    entriesPerPage: 10
  },
};

type AssignParams = { acc: Record<string, unknown>, name: string, schemaCollections: SchemaCollections }
const assignCollection = ({ acc, name, schemaCollections }: AssignParams) => Object.assign(acc, { [name]: defineCollection({ type: "content", schema: schemaCollections[name] }) });
const glob = import.meta.glob('./**'); /* vite */
export const collectionNames = Object.keys(glob).map((key) => key.split("/")[1]).filter((value, index, self) => self.indexOf(value) === index) as ContentCollection[];
export const collections = collectionNames.reduce((acc, name) => assignCollection({ acc, name, schemaCollections }), {});
