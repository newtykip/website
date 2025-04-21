<script lang="ts">
    interface Props {
        id: string;
    }

    const { id }: Props = $props();
    let views = $state(1);

    async function fetchViews() {
        views = await fetch(`/blog/${id}/views`)
            .then((res) => res.text())
            .then((views) => parseInt(views));
    }

    $effect(() => {
        fetchViews();
    });
</script>

<span>{views} view{views !== 1 ? "s" : ""}</span>
