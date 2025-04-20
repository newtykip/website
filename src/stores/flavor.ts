import { type FlavorName } from "@catppuccin/palette";
import { persistentAtom } from "@nanostores/persistent";

const flavor = persistentAtom<FlavorName>("flavor");

export default flavor;
