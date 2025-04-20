import { type CollectionEntry, getCollection } from "astro:content";

export * from "@/utils";

/**
 * Get all blog posts.
 */
export async function getPosts(
    published: boolean = true,
): Promise<CollectionEntry<"blog">[]> {
    const posts = await getCollection("blog");
    return posts.filter((post) =>
        import.meta.env.PROD || published ? post.data.published : true,
    );
}
