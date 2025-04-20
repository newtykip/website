<script lang="ts">
    import { type AccentName, flavorEntries } from "@catppuccin/palette";
    import Icon from "@iconify/svelte";

    import flavor from "@/stores/flavor";

    const accents: AccentName[] = [
        "rosewater",
        "flamingo",
        "pink",
        "mauve",
        "red",
        "maroon",
        "peach",
        "yellow",
        "green",
        "teal",
        "sky",
        "sapphire",
        "blue",
        "lavender",
    ];

    let open = $state(false);
    let accent: AccentName | "text" = $state("text");
</script>

<div class="relative">
    <button
        onclick={() => (open = !open)}
        onmouseenter={() =>
            (accent = accents[Math.floor(Math.random() * accents.length)])}
        onmouseleave={() => (accent = "text")}
        class={[
            "absolute",
            "inset-0",
            "mt-0.5",
            "cursor-pointer",
            `text-${accent}`,
        ]}
    >
        <Icon icon="lucide:palette" class="text-xl" />
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
