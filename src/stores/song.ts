import type { Song } from "@/pages/api/song";
import { persistentMsgpack } from "@/utils/client";

export default persistentMsgpack<Song | undefined>("song", undefined);
