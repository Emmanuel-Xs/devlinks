// import { env } from "@/data/env/server";
// import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
// import * as schema from "./schema";
import { env } from "@/lib/server/serverEnv";

// const sql = neon(env.DATABASE_URL);
export const db = drizzle(env.DATABASE_URL, {
  logger: true,
  casing: "snake_case",
});
