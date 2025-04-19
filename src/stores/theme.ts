import { type FlavorName, flavors } from "@catppuccin/palette";
import { persistentAtom } from "@nanostores/persistent";
import { computed } from "nanostores";

export const themes: FlavorName[] = ["latte", "frappe", "macchiato", "mocha"];

export const theme = persistentAtom<FlavorName>("theme");
export const colours = computed(theme, (theme) => {
    const { colors } = flavors[theme];
    return Object.fromEntries(
        Object.entries(colors).map(([key, value]) => [key, value.hex]),
    );
});
