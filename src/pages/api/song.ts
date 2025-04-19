import { encode } from "@msgpack/msgpack";
import { SpotifyAPI } from "@statsfm/spotify.js";
import type { APIContext } from "astro";

import { USERNAMES } from "@/consts";

const { LASTFM_SECRET, SPOTIFY_ID, SPOTIFY_SECRET } = import.meta.env;
const spotifyClient = new SpotifyAPI({
    clientCredentials: {
        clientId: SPOTIFY_ID,
        clientSecret: SPOTIFY_SECRET,
    },
});

export interface Song {
    albumName?: string;
    artist: string;
    icon: string;
    name: string;
    url: string;
}

export async function GET(_: APIContext) {
    // fetch the most recent track from Last.fm
    const { artist, name } = await fetch(
        `http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${USERNAMES.LASTFM}&api_key=${LASTFM_SECRET}&format=json&limit=1`,
    )
        .then((res) => res.json())
        .then((res) => res?.["recenttracks"]["track"][0])
        .then((track) => {
            return {
                artist: track?.artist["#text"] || "",
                name: track?.name || "",
            };
        });

    // find the track on Spotify for more relevant information
    const {
        album: { images, name: albumName },
        external_urls: { spotify: url },
    } = await spotifyClient.search
        .get(`artist:${artist} ${name}`, {
            include: {
                track: true,
            },
            limit: 1,
            market: "GB",
        })
        .then((res) => res.tracks.items[0]);
    const icon = images[images.length - 1].url;

    // reply
    const payload = encode({
        albumName,
        artist,
        icon,
        name,
        url,
    } satisfies Song);

    return new Response(payload, {
        headers: {
            "Content-Type": "application/x-msgpack",
        },
        status: 200,
    });
}
