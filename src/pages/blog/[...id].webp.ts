import type { IconifyJSON } from "@iconify/types";
import { getIconData, iconToHTML, iconToSVG, replaceIDs } from "@iconify/utils";
import lucide from "@iconify-json/lucide/icons.json";
import type { APIContext, GetStaticPathsItem } from "astro";
import { getEntry, render } from "astro:content";
import fs from "fs/promises";
import satori from "satori";
import { html } from "satori-html";
import sharp from "sharp";

import { formatDate } from "@/utils";
import { getPosts } from "@/utils/server";

export const prerender = true;

function getIconHtml(set: IconifyJSON, icon: string) {
    const data = getIconData(set, icon)!;
    const render = iconToSVG(data, {});
    return iconToHTML(replaceIDs(render.body), { ...render.attributes });
}

const width = 1200;
const height = 675;
const calendar = getIconHtml(lucide, "calendar")!;
const clock = getIconHtml(lucide, "clock")!;

const jetbrainsMono = {
    600: await fs.readFile(
        "node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-500-normal.woff",
    ),
    700: await fs.readFile(
        "node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-700-normal.woff",
    ),
};
const head = (await fs.readFile(`src/images/head.png`)).toString("base64");

export async function getStaticPaths() {
    const posts = await getPosts(false);
    const paths: GetStaticPathsItem[] = posts.map(({ id }) => ({
        params: { id },
    }));
    return paths;
}

export async function GET({ params }: APIContext) {
    const { id } = params;
    const post = await getEntry("blog", id!)!;
    const {
        data: { published, title },
    } = post;
    const {
        remarkPluginFrontmatter: { minutesRead },
    } = await render(post);

    let cover: Buffer;
    try {
        cover = await fs.readFile(`public/hero/${id}.webp`);
    } catch {
        cover = await sharp({
            create: {
                background: { b: 0, g: 0, r: 0 },
                channels: 3,
                height,
                width,
            },
        })
            .png()
            .toBuffer();
    }

    const svg = await satori(
        html(`
            <div class="h-full w-full flex flex-col items-center justify-center" style="background: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8));">
                <h1 class="text-white -mb-2 text-5xl font-bold" style="text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);">${title}</h1>
                <div class="flex">
                    <div class="flex items-center">
                        <span class="text-white mr-2">${calendar}</span>
                        <p class="text-white text-lg font-semibold" style="text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);">${formatDate(published!)}</p>
                    </div>
                    <div class="flex items-center ml-4">
                        <span class="text-white mr-2">${clock}</span>
                        <p class="text-white text-lg font-semibold" style="text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);">${minutesRead}</p>
                    </div>
                </div>
                <div class="flex absolute bottom-0 right-4 items-center">
                    <img src="data:image/png;base64,${head}" class="mr-2 h-4" />
                    <p class="text-white font-bold">newty.dev/blog/${id}</p>
                </div>
            </div>
        `),
        {
            fonts: [
                {
                    data: jetbrainsMono[700],
                    name: "JetBrains Mono",
                    weight: 700,
                },
                {
                    data: jetbrainsMono[600],
                    name: "JetBrains Mono",
                    weight: 600,
                },
            ],
            height: 675,
            width: 1200,
        },
    );
    const webp = await sharp(cover)
        .resize(1200)
        .blur(2)
        .composite([
            { input: Buffer.from(svg) },
            { input: Buffer.from(calendar) },
        ])
        .toFormat("webp")
        .toBuffer();
    return new Response(webp, { status: 200 });
}
