import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";
import type { CustomErrorParams } from "astro:schema";

/**
 * Only require a property if the post is published.
 */
function requireIfPublished<T extends { published?: Date }>(
    property: keyof T,
): [(arg: T) => boolean, CustomErrorParams] {
    function refine(data: T) {
        return (
            !data.published || (data.published && data[property] !== undefined)
        );
    }

    const error: CustomErrorParams = {
        message: `The property "${String(property)}" is required if the post is published.`,
        path: [String(property)],
    };

    return [refine, error];
}

const rawBlogSchema = z.object({
    description: z.string().optional(),
    hero: z.string().optional(),
    heroAlt: z.string().optional(),
    published: z.coerce.date().optional(),
    tags: z.array(z.string()).min(1).max(5),
    title: z.string(),
});
type BlogData = z.infer<typeof rawBlogSchema>;

const blog = defineCollection({
    loader: glob({ base: "./content/posts", pattern: "**/*.mdx" }),
    schema: rawBlogSchema
        .refine(...requireIfPublished<BlogData>("heroAlt"))
        .refine(...requireIfPublished<BlogData>("description")),
});

export const collections = { blog };
