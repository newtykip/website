export { CAPE_SOURCES, type CapeSource, PLAYERS } from "@/build/consts";

/**
 * Skin controls for the skin viewer
 */
export enum Controls {
    RotateVert = 1 << 0,
    RotateHori = 1 << 1,
    Zoom = 1 << 2,

    Rotate = RotateVert | RotateHori,
}

export function isControlEnabled(control: Controls, check?: Controls) {
    if (check === undefined) return true;
    return (check & control) === control;
}
