import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const beritaCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: "./src/content/berita" }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    summary: z.string(),
    image: z.string().optional(),
  }),
});

export const collections = {
  'berita': beritaCollection,
};
