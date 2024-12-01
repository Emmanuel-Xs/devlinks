import { InferSelectModel } from "drizzle-orm";
import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

// export const timestamps = {
//   updated_at: timestamp(),
//   created_at: timestamp().defaultNow().notNull(),
//   deleted_at: timestamp(),
// };

const expiresAt = timestamp({ withTimezone: true, mode: "date" }).notNull();
const email = text().notNull().unique();
const userId = integer()
  .notNull()
  .references(() => usersTable.id);

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  email,
  emailVerified: integer()
    .notNull()
    .$default(() => 0),
  githubId: integer().unique(),
  googleId: text().unique(),
  firstName: text(),
  lastName: text(),
  password: text(),
  username: text().notNull().unique(),
  avatarUrl: text(),
});

export const sessionsTable = pgTable("session", {
  id: text().primaryKey(),
  userId,
  expiresAt,
});

export const emailVerificationRequest = pgTable("email_verification_request", {
  id: text().primaryKey(),
  userId,
  email,
  code: text().notNull(),
  expiresAt,
});

export type User = InferSelectModel<typeof usersTable>;
export type Session = InferSelectModel<typeof sessionsTable>;
