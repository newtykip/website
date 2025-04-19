import { decode } from "@msgpack/msgpack";

import type { Song } from "@/pages/api/song";

export async function fetchSong(baseUrl = ""): Promise<Song> {
    return (await fetch(`${baseUrl}/api/song`)
        .then((res) => res.arrayBuffer())
        .then(decode)) as Song;
}
