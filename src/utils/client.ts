export * from "@/utils";

/**
 * Is WebGL supported in the current browser?
 */
export function isWebGL(): boolean {
    const canvas = document.createElement("canvas");
    const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    return gl instanceof WebGLRenderingContext;
}
