<script lang="ts">
    import {
        NameTagObject,
        SkinViewer,
        type SkinViewerOptions,
        WalkingAnimation,
    } from "skinview3d";

    import {
        type CapeSource,
        Controls,
        isControlEnabled,
    } from "@/components/skin";
    import { isWebGL } from "@/utils/client";

    export interface Props
        extends Omit<
            Partial<SkinViewerOptions>,
            "enableControls" | "cape" | "renderPaused"
        > {
        cape?: CapeSource;
        controls?: Controls;
        height: number;
        username?: string;
        uuid: string;
        walking?: boolean;
    }

    const {
        cape,
        controls,
        height,
        username,
        uuid,
        walking = false,
        ...options
    }: Props = $props();
    const width = (height / 832) * 512;

    // svelte-ignore non_reactive_update
    let canvas: HTMLCanvasElement;
    const webgl = isWebGL();
    let loading = $state(webgl);
    if (webgl) {
        $effect(() => {
            (async () => {
                const viewer = new SkinViewer({
                    animation: walking ? new WalkingAnimation() : undefined,
                    canvas,
                    cape: cape ? `/mc/cape/${uuid}.webp` : undefined,
                    height,
                    nameTag: new NameTagObject(username, {
                        font: "24px Minecraft",
                    }),
                    renderPaused: true,
                    skin: `/mc/skin/${uuid}.webp`,
                    width,
                    zoom: 0.75,
                    ...options,
                });

                // controls
                if (!isControlEnabled(Controls.RotateVert, controls)) {
                    viewer.controls.minPolarAngle = Math.PI / 2;
                    viewer.controls.maxPolarAngle = Math.PI / 2;
                }

                if (!isControlEnabled(Controls.RotateHori, controls)) {
                    viewer.controls.minAzimuthAngle = 0;
                    viewer.controls.maxAzimuthAngle = 0;
                }

                if (!isControlEnabled(Controls.Zoom, controls)) {
                    viewer.controls.enableZoom = false;
                }

                function render() {
                    viewer.render();
                    if (loading) loading = false;
                    requestAnimationFrame(render);
                }

                render();
            })();
        });
    }
</script>

{#if webgl}
    <canvas bind:this={canvas} class={loading ? "hidden" : ""}></canvas>
{/if}

{#if !webgl || loading}
    <figure class="flex flex-col items-center text-center">
        <img
            src={`/mc/render/${uuid}.webp`}
            alt={username}
            {height}
            {width}
            class="block"
        />
        <figcaption class="mt-4 text-subtext0 text-sm">
            {#if !webgl}
                If you enable WebGL this render will become interactive!
            {:else}
                Loading skin renderer...
            {/if}
        </figcaption>
    </figure>
{/if}
