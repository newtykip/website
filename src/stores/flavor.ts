import { type FlavorName } from "@catppuccin/palette";
import { persistentAtom } from "@nanostores/persistent";

export default persistentAtom<FlavorName>("flavor");
