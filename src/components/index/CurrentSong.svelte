<script lang="ts">
    import type { Song } from "@/api/song";
    import { INTERVAL } from "@/consts";
    import song from "@/stores/song";
    import { fetchApi } from "@/utils";

    interface Props {
        song: Song;
    }
    const { song: initial }: Props = $props();
    song.set(initial);

    if (import.meta.env.PROD) {
        $effect(() => {
            const interval = setInterval(
                async () => song.set(await fetchApi("song")),
                INTERVAL.SONG,
            );
            return () => clearInterval(interval);
        });
    }
</script>

{#if $song !== undefined}
    <a
        href={$song!.url}
        class="text-text hover:!text-green"
        target="_blank"
        rel="noopener noreferrer"
        >{$song!.artist} - {$song!.name}
    </a>
{:else}
    loading...
{/if}
