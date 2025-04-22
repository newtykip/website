import { getClient } from "@umami/api-client";
import type { APIContext } from "astro";

import { UMAMI } from "@/consts";

export const prerender = false;

const umami = getClient({
    apiEndpoint: `${UMAMI.URL}/api`,
    secret: import.meta.env.UMAMI_SECRET,
    userId: import.meta.env.UMAMI_USER,
});

export async function GET({ params: { id } }: APIContext) {
    const stats = await umami.getWebsiteStats(UMAMI.ID, {
        endAt: new Date().getTime(),
        startAt: 0,
        url: `/blog/${id}`,
    });

    return new Response(JSON.stringify(stats.data!.visitors.value || 1), {
        headers: {
            "Content-Type": "application/json",
        },
        status: 200,
    });
}
