import { decode } from "@msgpack/msgpack";
import type { AstroGlobal } from "astro";

/**
 * Fetches data from the API and decodes it using msgpack.
 */
export async function fetchApi<T>(
    endpoint: string,
    Astro: AstroGlobal | undefined = undefined,
): Promise<T> {
    return (await fetch(`${Astro ? Astro.url.origin : ""}/api/${endpoint}`)
        .then((res) => res.arrayBuffer())
        .then(decode)) as T;
}
