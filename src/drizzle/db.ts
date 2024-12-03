import * as schema from "./schema";
import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
// import { env } from "@/lib/server/serverEnv";
// import { drizzle } from "drizzle-orm/node-postgres";
// import { Pool } from "pg";

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: true,
//   max: 10,
//   idleTimeoutMillis: 30000,
//   connectionTimeoutMillis: 2000,
// });

export const db = drizzle({
  client: sql,
  casing: "snake_case",
  schema,
  logger: true,
});
