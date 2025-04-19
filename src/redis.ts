import { Redis } from "@upstash/redis";

const { KV_REST_API_TOKEN: token, KV_REST_API_URL: url } = import.meta.env;

export default new Redis({ token, url });
