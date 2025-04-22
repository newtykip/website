import { decode, encode } from "@msgpack/msgpack";
import { persistentAtom } from "@nanostores/persistent";

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

/**
 * Creates a persistent atom that uses msgpack for encoding and decoding.
 */
export function persistentMsgpack<T>(name: string, initial?: T) {
    return persistentAtom(name, initial, {
        decode: (value) => {
            const binaryString = atob(value);
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }
            return decode(bytes) as T;
        },
        encode: (value) => {
            const encoded = encode(value);
            let binaryString = "";
            for (let i = 0; i < encoded.length; i++) {
                binaryString += String.fromCharCode(encoded[i]);
            }
            return btoa(binaryString);
        },
    });
}
