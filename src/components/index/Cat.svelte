<script lang="ts">
    import { writable } from "svelte/store";

    let enabled = writable(true);
    let open = $state(true);
    let interval: ReturnType<typeof setInterval>;

    enabled.subscribe((value) => {
        if (value) {
            interval = setInterval(() => {
                open = !open;
            }, 1000);
        } else {
            clearInterval(interval);
            open = true;
        }
    });
</script>

<button
    class="*:font-bold *:text-xl text-center *:whitespace-pre hover:cursor-pointer select-none"
    onclick={() => enabled.update((value) => !value)}
    aria-label="Toggle cat"
>
    <div>&nbsp;/\_/\</div>
    <div>
        &nbsp;{#if open}
            ( o.o )
        {:else}
            ( -.- )
        {/if}
    </div>
    <div>&nbsp;&gt; ^ &lt;</div>
</button>
