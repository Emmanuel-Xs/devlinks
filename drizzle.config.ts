import { env } from "@/lib/server/serverEnv";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./src/drizzle/migrations",
  schema: "./src/drizzle/schema.ts",
  dialect: "postgresql",
  verbose: true,
  strict: true,
  casing: "snake_case",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
});
