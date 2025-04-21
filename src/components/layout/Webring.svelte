<script>
    import Icon from "@iconify/svelte";

    import Accent from "../Accent.svelte";
</script>

<div class="flex justify-between items-center gap-4">
    <a href="https://ctp-webr.ing/newt/previous" class="mt-0.5">
        <Accent>
            <Icon icon="lucide:arrow-left" class="text-xl" />
        </Accent>
    </a>
    <a href="https://ctp-webr.ing" target="_blank" rel="noopener">
        <Accent class="flex items-center gap-2">
            <img
                src="/catppuccin.png"
                alt="Catppuccin logo"
                class="mt-0.5 w-6 h-6"
            />
            catppuccin webring :3
        </Accent>
    </a>
    <a href="https://ctp-webr.ing/newt/next" class="mt-0.5">
        <Accent>
            <Icon icon="lucide:arrow-right" class="text-xl" />
        </Accent>
    </a>
</div>
