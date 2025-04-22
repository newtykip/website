import fs from "fs/promises";
import sharp from "sharp";
import sharpIco from "sharp-ico";

import { BASE, UUID } from "@/consts/scripts";

/**
 * Fetches a resource and returns it as an ArrayBuffer.
 */
async function getBuffer(url: string): Promise<ArrayBuffer> {
    return await fetch(url, {
        headers: {
            "User-Agent": "newty.dev",
        },
    }).then((res) => res.arrayBuffer());
}

/**
 * Downloads an image from a URL and returns it as a sharp instance.
 */
async function downloadImage(url: string): Promise<sharp.Sharp> {
    const buffer = await getBuffer(url);
    return sharp(buffer);
}

/**
 * Saves a sharp image to a file.
 */
async function saveImage(image: sharp.Sharp, path: string) {
    const dir = path.split("/").slice(0, -1).join("/");
    await fs.mkdir(dir, { recursive: true });
    await image.toFile(path);
}

// download head
const head = await downloadImage(
    `${BASE.CRAFATAR}/avatars/${UUID}?overlay&size=256`,
);
head.resize(48, 48);
await saveImage(head, "content/images/head.png");
head.resize(32, 32);
sharpIco.sharpsToIco([head], "public/favicon.ico");

// skin
const skin = await downloadImage(`${BASE.VISAGE}/processedskin/${UUID}`);
await saveImage(skin, "public/mc/skin.png");

// skin render
const skinRender = await downloadImage(
    `${BASE.VISAGE}/frontfull/832/${UUID}.webp?no=ears`,
);
await saveImage(skinRender, "public/mc/render.webp ");

// cape
const capeUrl = await fetch(`${BASE.CAPES}/load/${UUID}/optifine`)
    .then((res) => res.json())
    .then((data) => data.imageUrl as string);
const cape = await downloadImage(capeUrl);
await saveImage(cape, "public/mc/cape.png");
