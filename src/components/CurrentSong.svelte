<script lang="ts">
    import { INTERVAL } from "@/consts";
    import type { Song } from "@/pages/api/song";
    import { fetchApi } from "@/utils";

    interface Props {
        song: Song;
    }

    const { song: initialSong }: Props = $props();
    let song = $state(initialSong);

    if (import.meta.env.PROD) {
        $effect(() => {
            const interval = setInterval(
                async () => (song = await fetchApi("song")),
                INTERVAL.SONG,
            );
            return () => clearInterval(interval);
        });
    }
</script>

{#if song !== undefined}
    <span class="stat">
        <img src={song.icon} class="animate-spin" alt={song.albumName} />
        <a href={song.url} target="_blank" rel="noopener noreferrer">
            {song.artist.toLowerCase()} - {song.name.toLowerCase()}
        </a>
    </span>
{/if}
