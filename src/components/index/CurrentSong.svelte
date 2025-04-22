<script lang="ts" module>
    export async function updateSong() {
        song.set(await fetchApi("song"));
    }
</script>

<script lang="ts">
    import { INTERVAL } from "@/consts";
    import song from "@/stores/song";
    import { fetchApi } from "@/utils";

    $effect(() => {
        if (import.meta.env.PROD) {
            const interval = setInterval(updateSong, INTERVAL.SONG);
            return () => clearInterval(interval);
        }
    });
</script>

{#if $song !== undefined}
    <a
        href={$song?.url}
        class="text-text hover:!text-green"
        target="_blank"
        rel="noopener noreferrer"
        >{$song?.artist} - {$song?.name}
    </a>
{:else}
    loading...
{/if}
