<script lang="ts">
    import type { AccentName } from "@catppuccin/palette";
    import type { Snippet } from "svelte";

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

    interface Props {
        children: Snippet;
        class?: string;
    }

    const { children, class: clazz }: Props = $props();
    const classList = clazz?.split(" ") ?? [];
    let accent: AccentName | "text" = $state("text");
</script>

<span
    role="button"
    tabindex={-1}
    onmouseenter={() =>
        (accent = accents[Math.floor(Math.random() * accents.length)])}
    onmouseleave={() => (accent = "text")}
    class={[`text-${accent}`, ...classList]}
>
    {@render children()}
</span>
