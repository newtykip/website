<script lang="ts">
    import { theme, themes } from "@/stores/theme";
</script>

{#each themes as name (name)}
    <button on:click={() => theme.set(name)}>{name}</button>
{/each}
