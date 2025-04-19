import svelte from "@astrojs/svelte";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
    adapter: vercel(),
    integrations: [svelte()],
    output: "server",

    vite: {
        plugins: [tailwindcss()],
        server: {
            allowedHosts: [".ngrok-free.app"],
        },
    },
});
