import mdx from "@astrojs/mdx";
import node from "@astrojs/node";
import svelte from "@astrojs/svelte";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import icon from "astro-icon";
import mailObfuscation from "astro-mail-obfuscation";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

import expressiveCode from "./config/expressiveCode";
import remarkReadingTime from "./plugins/remarkReadingTime";

const previewBuild = process.env.PREVIEW !== undefined;

// https://astro.build/config
export default defineConfig({
    adapter: previewBuild ? node({ mode: "standalone" }) : vercel(),
    integrations: [
        svelte(),
        expressiveCode(),
        mdx(),
        icon(),
        mailObfuscation(),
    ],

    markdown: {
        rehypePlugins: [rehypeKatex],
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
