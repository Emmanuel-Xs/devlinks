import { InferSelectModel } from "drizzle-orm";
import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const timestamps = {
  updated_at: timestamp(),
  created_at: timestamp().defaultNow().notNull(),
  deleted_at: timestamp(),
};

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  githubId: integer().unique(),
  firstName: text(),
  lastName: text(),
  password: text(),
  username: text().notNull().unique(),
  email: text().unique(),
});

export const sessionsTable = pgTable("session", {
  id: text().primaryKey(),
  userId: integer()
    .notNull()
    .references(() => usersTable.id),
  expiresAt: timestamp({ withTimezone: true, mode: "date" }).notNull(),
});

export type User = InferSelectModel<typeof usersTable>;
export type Session = InferSelectModel<typeof sessionsTable>;
