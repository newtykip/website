import mdx from "@astrojs/mdx";
import node from "@astrojs/node";
import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import { threeMinifier } from "@yushijinhun/three-minifier-rollup";
import { defineConfig } from "astro/config";
import autoImport from "astro-auto-import";
import icon from "astro-icon";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import { visualizer } from "rollup-plugin-visualizer";

import expressiveCode from "./src/build/config/expressiveCode";
import rehypeHeadings from "./src/build/plugins/rehypeHeadings";
import remarkReadingTime from "./src/build/plugins/remarkReadingTime";

const previewBuild = process.env.PREVIEW !== undefined;

// https://astro.build/config
export default defineConfig({
    adapter: previewBuild ? node({ mode: "standalone" }) : vercel(),
    image: {
        domains: ["storage.ko-fi.com"],
    },

    integrations: [
        svelte(),
        autoImport({
            imports: ["@/components/Heading.astro"],
        }),
        expressiveCode(),
        icon(),
        partytown(),
        mdx(),
        sitemap(),
    ],

    markdown: {
        rehypePlugins: [rehypeKatex, rehypeHeadings],
        remarkPlugins: [remarkMath, remarkReadingTime],
    },
    output: "server",

    site: "https://newty.dev",

    vite: {
        css: {
            transformer: "lightningcss",
        },
        plugins: [
            tailwindcss(),
            threeMinifier(),
            visualizer({
                emitFile: true,
                filename: "stats.html",
            }),
        ],
        server: {
            allowedHosts: [".ngrok-free.app"],
        },
    },
});
