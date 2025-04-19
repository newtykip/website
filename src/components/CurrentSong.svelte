<script lang="ts">
    import { INTERVAL } from "@/consts";
    import type { Song } from "@/pages/api/song";
    import { fetchSong } from "@/utils";

    interface Props {
        song: Song;
    }

    const { song: initialSong }: Props = $props();
    let song = $state(initialSong);

    $effect(() => {
        const interval = setInterval(async () => song = await fetchSong(), INTERVAL.SONG);
        return () => clearInterval(interval);
    });
</script>

{#if song !== undefined}
    <span class="flex items-center gap-1">
        <img src={song.icon} class="rounded-full w-6 h-6 animate-spin" alt={song.albumName} />
        <span class="mb-0.5 leading-none">{song.artist.toLowerCase()} - {song.name.toLowerCase()}</span>
    </span>
{/if}