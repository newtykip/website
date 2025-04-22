import { decode } from "@msgpack/msgpack";
import type { AstroGlobal } from "astro";

/**
 * Fetches data from the API and decodes it using msgpack.
 */
export async function fetchApi<T>(
    endpoint: string,
    Astro?: AstroGlobal,
): Promise<T> {
    return (await fetch(`${Astro ? Astro.url.origin : ""}/api/${endpoint}`)
        .then((res) => res.arrayBuffer())
        .then(decode)) as T;
}

/**
 * Formats a date to a human-readable string.
 */
export function formatDate(date: Date): string {
    const addOrdinalSuffix = (day: number) => {
        const suffixes = ["th", "st", "nd", "rd"];
        const value = day % 100;
        return (
            day +
            (suffixes[(value - 20) % 10] || suffixes[value] || suffixes[0])
        );
    };

    const day = date.getDate();
    const month = date.toLocaleString("en-gb", { month: "long" });
    const year = date.getFullYear();

    return `${addOrdinalSuffix(day)} ${month} ${year}`;
}
