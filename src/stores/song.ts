import { atom } from "nanostores";

import type { Song } from "@/api/song";

export default atom<Song | undefined>();
