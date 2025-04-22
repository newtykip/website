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

<!-- svelte-ignore a11y_no_static_element_interactions -->
<span
    onmouseenter={() =>
        (accent = accents[Math.floor(Math.random() * accents.length)])}
    onmouseleave={() => (accent = "text")}
    class={[`text-${accent}`, ...classList]}
>
    {@render children()}
</span>
