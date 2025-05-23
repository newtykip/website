import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import removeMarkdown from "remove-markdown";

import { DESCRIPTION } from "@/consts";
import { getPosts } from "@/utils/server";

export const prerender = true;

export async function GET(context: APIContext) {
    const posts = await getPosts();

    return rss({
        description: DESCRIPTION,
        items: posts.map(({ data: { description, title, ...data }, id }) => ({
            ...data,
            description: description
                ? removeMarkdown(description)
                : description,
            link: `/blog/${id}/`,
            title: removeMarkdown(title),
        })),
        site: context.site as URL,
        title: "newty.dev",
    });
}
