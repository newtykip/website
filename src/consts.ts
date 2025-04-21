import type { Donation } from "@/pages/api/donation";

export const DESCRIPTION = "18 y/o developer based in Scotland";

export const USERNAMES = {
    GITLAB: "newt",
    KOFI: "isitreallyalive",
    LASTFM: "newtykip",
    MODRINTH: "newty",
    TWITTER: "isitreallyalive",
};

const SECOND = 1000;
export const INTERVAL = {
    SONG: import.meta.env.PROD ? SECOND * 10 : SECOND * 60,
};

export const DUMMY_DONATION: Donation = {
    amount: "10.00",
    avatar: "https://storage.ko-fi.com/cdn/useruploads/44111973-037b-49a4-890f-af78b510bead_aa5740df-76a8-4143-bd22-1aba85a2f27f.png",
    currency: "£",
    id: "d72cb809-15ad-4acf-ba51-8fedaf81d929",
    name: "ElocinDev",
};
