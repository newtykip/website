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
    image: string;
    name: string;
    url: string;
}

export async function GET(_: APIContext) {
    // fetch the most recent track from Last.fm
    const lastfm = await fetch(
        `http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${USERNAMES.LASTFM}&api_key=${LASTFM_SECRET}&format=json&limit=1`,
    )
        .then((res) => res.json())
        .then((res) => res?.["recenttracks"]["track"][0])
        .then((track): Song => {
            return {
                albumName: track?.album["#text"],
                artist: track?.artist["#text"],
                image: track?.image[0]["#text"],
                name: track?.name,
                url: track?.url,
            };
        });
    const { artist } = lastfm;

    // find the track on Spotify for more relevant information
    const spotify = await spotifyClient.search
        .get(`artist:${artist} ${lastfm.name}`, {
            include: {
                track: true,
            },
            limit: 1,
            market: "GB",
        })
        .then((res) => res.tracks.items[0]);

    // if the artists don't match, we have to disregard spotify data
    const artistMatch =
        spotify?.artists.some(
            (spotifyArtist) =>
                spotifyArtist.name.toLowerCase() === artist.toLowerCase(),
        ) || false;

    let payload: Song;

    if (!artistMatch) {
        payload = lastfm;
    } else {
        const {
            album: { images, name: albumName },
        } = spotify;
        const image = images[images.length - 1].url;

        payload = {
            albumName,
            artist: lastfm.artist,
            image,
            name: spotify.name,
            url: spotify.external_urls.spotify,
        };
    }

    return new Response(encode(payload), {
        headers: {
            "Content-Type": "application/x-msgpack",
        },
        status: 200,
    });
}
