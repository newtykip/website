<script lang="ts">
    import { flavorEntries } from "@catppuccin/palette";
    import Icon from "@iconify/svelte";

    import RandomAccent from "@/components/RandomAccent.svelte";
    import flavor from "@/stores/flavor";

    let open = $state(false);
</script>

<div class="relative">
    <button
        onclick={() => (open = !open)}
        class="absolute inset-0 mt-0.5 cursor-pointer"
    >
        <RandomAccent>
            <Icon icon="lucide:palette" class="text-xl" />
        </RandomAccent>
    </button>

    {#if open}
        <div
            role="menu"
            class={[
                "top-full",
                "left-0",
                "absolute",
                "w-max",
                "translate-y-3",
                open ? null : "hidden",
            ]}
        >
            <div
                class="flex flex-col gap-1 bg-base shadow-md p-4 border-2 border-mantle"
            >
                {#each flavorEntries as [name, { emoji, name: display }] (name)}
                    <div class="flex items-center gap-2">
                        <input
                            type="radio"
                            name="theme"
                            id={name}
                            value={name}
                            class="peer hidden"
                            bind:group={$flavor}
                        />
                        <label
                            for={name}
                            class="flex justify-center items-center peer-checked:bg-text border-2 border-text rounded-full w-5 h-5 transition cursor-pointer"
                        >
                            <div
                                class="bg-text rounded-full scale-0 peer-checked:scale-100"
                            ></div>
                        </label>
                        <span>{emoji} {display.toLowerCase()}</span>
                    </div>
                {/each}
            </div>
        </div>
    {/if}
</div>
