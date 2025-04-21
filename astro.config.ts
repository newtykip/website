import mdx from "@astrojs/mdx";
import node from "@astrojs/node";
import partytown from "@astrojs/partytown";
import svelte from "@astrojs/svelte";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import autoImport from "astro-auto-import";
import compressor from "astro-compressor";
import icon from "astro-icon";
import mailObfuscation from "astro-mail-obfuscation";
import min from "astro-min";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

import expressiveCode from "./src/config/expressiveCode";
import rehypeHeadings from "./src/plugins/rehypeHeadings";
import remarkReadingTime from "./src/plugins/remarkReadingTime";

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
        mailObfuscation(),
        mdx(),
        min(),
        compressor(),
    ],

    markdown: {
        rehypePlugins: [rehypeKatex, rehypeHeadings],
        remarkPlugins: [remarkMath, remarkReadingTime],
    },

    output: "server",
    site: "https://newty.dev",

    vite: {
        plugins: [tailwindcss()],
        server: {
            allowedHosts: [".ngrok-free.app"],
        },
    },
});
