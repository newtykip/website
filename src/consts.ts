import type { Donation } from "@/pages/api/donation";
import type { Song } from "@/pages/api/song";

export const USERNAMES = {
    LASTFM: "newtykip",
};

const SECOND = 1000;
export const INTERVAL = {
    SONG: SECOND * 10,
};

export const DUMMY: { DONATION: Donation; SONG: Song } = {
    DONATION: {
        amount: "10.00",
        avatar: "https://storage.ko-fi.com/cdn/useruploads/44111973-037b-49a4-890f-af78b510bead_aa5740df-76a8-4143-bd22-1aba85a2f27f.png",
        currency: "£",
        id: "d72cb809-15ad-4acf-ba51-8fedaf81d929",
        name: "ElocinDev",
    },
    SONG: {
        albumName: "Wallsocket",
        artist: "Underscores",
        icon: "https://i.scdn.co/image/ab67616d0000485147b648a27c23040d19a045e9",
        name: "Cops and robbers",
        url: "https://open.spotify.com/track/08AznbP5RLxjaFOZTqOI9w",
    },
};
