import type { Donation } from "@/api/donation";

/**
 * Site description
 */
export const DESCRIPTION = "18 y/o developer based in Scotland";

/**
 * Usernames for various platforms
 */
export const USERNAMES = {
    DISCORD: "isitreallyalive",
    GITLAB: "newt",
    KOFI: "isitreallyalive",
    LASTFM: "newtykip",
    MODRINTH: "newty",
    SIGNAL: "isitreallyalive.77",
    TWITTER: "isitreallyalive",
};

export const DISCORD_ID = "1269669249056510026";
export const SIGNAL_URL =
    "https://signal.me/#eu/oI2LyHYNd0E7j5OTZ3DEZe5vuwF0CNcemU5K7l-X_BaIbnw1bRZFC5-rRVELppxs";
export const HOMESERVER = "redstone.observer";

const SECOND = 1000;

/**
 * Refresh intervals
 */
export const INTERVAL = {
    SONG: import.meta.env.PROD ? SECOND * 10 : SECOND * 60,
};

/**
 * A dummy donation object for development
 */
export const DUMMY_DONATION: Donation = {
    amount: "10.00",
    avatar: "https://storage.ko-fi.com/cdn/useruploads/44111973-037b-49a4-890f-af78b510bead_aa5740df-76a8-4143-bd22-1aba85a2f27f.png",
    currency: "£",
    id: "d72cb809-15ad-4acf-ba51-8fedaf81d929",
    name: "ElocinDev",
};

/**
 * Umami analytics configuration
 */
export const UMAMI = {
    ID: "d524f4e3-ebaf-4b95-9de7-b0ac8961736f",
    URL: "https://analytics.redstone.observer",
};
