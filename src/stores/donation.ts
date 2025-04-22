import type { Donation } from "@/pages/api/donation";
import { persistentMsgpack } from "@/utils/client";

export default persistentMsgpack<Donation | undefined>("donation", undefined);
