import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
    loader: glob({ base: "./content/blog", pattern: "**/*.mdx" }),
    schema: z.object({
        published: z.coerce.date().optional(),
        title: z.string(),
    }),
});

export const collections = { blog };
