import { encode } from "@msgpack/msgpack";
import type { APIContext } from "astro";
import * as cheerio from "cheerio";
import getSymbolFromCurrency from "currency-symbol-map";

import redis from "@/redis";

export interface Donation {
    amount: string;
    avatar?: string;
    currency: string;
    id: string;
    name: string;
}

export async function GET(_: APIContext) {
    const donation = (await redis.get("donation")) as Donation;
    return new Response(encode(donation), {
        headers: {
            "Content-Type": "application/json",
        },
        status: 200,
    });
}

export async function POST({ request }: APIContext) {
    const success = false;

    try {
        const formData = (await request.formData()).get("data");
        if (formData) {
            const data = JSON.parse(formData.toString());
            if (data.verification_token === import.meta.env.KOFI_SECRET) {
                const {
                    amount,
                    currency,
                    from_name: name,
                    kofi_transaction_id: id,
                } = data;
                const $ = await fetch(`https://ko-fi.com/isitreallyalive`)
                    .then((res) => res.text())
                    .then(cheerio.load);
                const avatar = $("img#profilePicture").get(0)?.attribs.src;
                const donation: Donation = {
                    amount,
                    avatar,
                    currency: getSymbolFromCurrency(currency)!,
                    id,
                    name,
                };
                await redis.set("donation", JSON.stringify(donation));
            }
        }
    } catch (error) {
        console.error("Error processing donation:", error);
    }

    return new Response(JSON.stringify({ success }), {
        headers: {
            "Content-Type": "application/json",
        },
        status: 200,
    });
}
