import fs from "fs/promises";
import sharp from "sharp";
import sharpIco from "sharp-ico";

import { BASE, PLAYERS } from "./consts";

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
    return sharp(buffer).toFormat("webp");
}

/**
 * Saves a sharp image to a file.
 */
async function saveImage(image: sharp.Sharp, path: string) {
    const dir = path.split("/").slice(0, -1).join("/");
    await fs.mkdir(dir, { recursive: true });
    await image.toFile(path);
}

/**
 * Downloads the assets for a player and saves them to disk.
 */
export async function downloadAssets(player: keyof typeof PLAYERS) {
    const { cape, uuid } = PLAYERS[player];

    // download head
    if (player === "newt") {
        const head = await downloadImage(
            `${BASE.CRAFATAR}/avatars/${uuid}?overlay&size=256`,
        );
        head.resize(48, 48);
        await saveImage(head, "content/images/head.webp");
        head.resize(32, 32);
        sharpIco.sharpsToIco([head], "public/favicon.ico");
    }

    // skin
    const skin = await downloadImage(`${BASE.VISAGE}/processedskin/${uuid}`);
    await saveImage(skin, `public/mc/skin/${uuid}.webp`);

    // skin render
    const skinRender = await downloadImage(
        `${BASE.VISAGE}/frontfull/832/${uuid}.png?no=ears`,
    );
    await saveImage(skinRender, `public/mc//render/${uuid}.webp`);

    // cape
    if (cape) {
        const capeUrl = await fetch(`${BASE.CAPES}/load/${uuid}/${cape}`)
            .then((res) => res.json())
            .then((data) => data.imageUrl as string);
        if (!capeUrl) {
            throw new Error(`${cape} cape not found for ${player} (${uuid})`);
        }
        const capeImage = await downloadImage(capeUrl);
        await saveImage(capeImage, `public/mc/cape/${uuid}.webp`);
    }
}
