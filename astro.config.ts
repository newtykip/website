import mdx from "@astrojs/mdx";
import node from "@astrojs/node";
import svelte from "@astrojs/svelte";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

const previewBuild = process.env.PREVIEW !== undefined;

// https://astro.build/config
export default defineConfig({
    adapter: previewBuild ? node({ mode: "standalone" }) : vercel(),
    integrations: [svelte(), mdx()],
    output: "server",

    site: "https://newty.dev",

    vite: {
        plugins: [tailwindcss()],
        server: {
            allowedHosts: [".ngrok-free.app"],
        },
    },
});
