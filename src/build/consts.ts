export const BASE = {
    CAPES: "https://api.capes.dev",
    CRAFATAR: "https://crafatar.com",
    VISAGE: "https://vzge.me",
};

export const CAPE_SOURCES = [
    "minecraft",
    "optifine",
    "minecraftcapes",
    "labymod",
    "5zig",
    "tlauncher",
] as const;

export type CapeSource = Extract<
    (typeof CAPE_SOURCES)[keyof typeof CAPE_SOURCES],
    string
>;

interface Player {
    cape?: CapeSource;
    uuid: string;
}

/**
 * UUIDs for various Minecraft players
 */
export const PLAYERS: Record<string, Player> = {
    MumboJumbo: {
        uuid: "c7da90d56a054217b94a7d427cbbcad8",
    },
    newt: {
        cape: "optifine",
        uuid: "7e3661236beb48ecb6e147dbd319f41d",
    },
};
