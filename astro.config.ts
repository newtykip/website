import mdx from "@astrojs/mdx";
import node from "@astrojs/node";
import partytown from "@astrojs/partytown";
import svelte from "@astrojs/svelte";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import autoImport from "astro-auto-import";
import icon from "astro-icon";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

import expressiveCode from "./src/build/config/expressiveCode";
import rehypeHeadings from "./src/build/plugins/rehypeHeadings";
import remarkReadingTime from "./src/build/plugins/remarkReadingTime";

const previewBuild = process.env.PREVIEW !== undefined;

// https://astro.build/config
export default defineConfig({
    adapter: previewBuild ? node({ mode: "standalone" }) : vercel(),
    integrations: [
        svelte(),
        autoImport({
            imports: ["@/components/Heading.astro"],
        }),
        expressiveCode(),
        icon(),
        partytown(),
        mdx(),
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
        plugins: [tailwindcss()],
        server: {
            allowedHosts: [".ngrok-free.app"],
        },
    },
});
