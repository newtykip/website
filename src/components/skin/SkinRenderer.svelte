<script lang="ts">
    import {
        NameTagObject,
        SkinViewer,
        type SkinViewerOptions,
        WalkingAnimation,
    } from "skinview3d";

    // @ts-expect-error can't import from .astro
    import { Controls, isControlEnabled } from "@/components/skin/Skin.astro";
    import { BASE, UUID } from "@/consts/scripts";
    import { isWebGL } from "@/utils/client";

    type CapeSource =
        | "minecraft"
        | "optifine"
        | "minecraftcapes"
        | "labymod"
        | "5zig"
        | "tlauncher";
    export interface Props
        extends Omit<
            Omit<Partial<SkinViewerOptions>, "enableControls">,
            "cape"
        > {
        cape?: false | CapeSource;
        controls?: Controls;
        height: number;
        username?: string;
        uuid: string;
        walking?: boolean;
    }

    const {
        cape: hasCape = "optifine",
        controls,
        height,
        username,
        uuid,
        walking = false,
        ...options
    }: Props = $props();
    console.log(controls);
    const isNewt = uuid === UUID;
    const render = isNewt
        ? "/mc/render.png"
        : `${BASE.VISAGE}/frontfull/${height}/${UUID}.png`;
    // svelte-ignore non_reactive_update
    let canvas: HTMLCanvasElement;
    const webgl = isWebGL();

    if (webgl) {
        $effect(() => {
            (async () => {
                const capeUrl = hasCape
                    ? await fetch(`${BASE.CAPES}/load/${uuid}/${hasCape}`)
                          .then((res) => res.json())
                          .then((data) => data.imageUrl as string)
                    : undefined;

                const viewer = new SkinViewer({
                    animation: walking ? new WalkingAnimation() : undefined,
                    canvas,
                    cape: hasCape
                        ? isNewt
                            ? "/mc/cape.png"
                            : capeUrl
                        : undefined,
                    height,
                    nameTag: new NameTagObject(username, {
                        font: "24px Minecraft",
                    }),
                    skin: isNewt
                        ? "/mc/skin.png"
                        : `${BASE.CRAFATAR}/skins/${uuid}`,
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
            })();
        });
    }
</script>

{#if webgl}
    <canvas bind:this={canvas}></canvas>
{:else}
    <figure class="flex flex-col items-center text-center">
        <img src={render} alt={username} {height} class="block" />
        <figcaption class="mt-4 text-subtext0 text-sm">
            If you enable WebGL this render will become interactive!
        </figcaption>
    </figure>
{/if}
