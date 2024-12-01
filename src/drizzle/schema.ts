import { InferSelectModel } from "drizzle-orm";
import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";

const userId = integer()
  .notNull()
  .references(() => usersTable.id);
const createdAt = timestamp({ withTimezone: true, mode: "date" })
  .defaultNow()
  .notNull();
const updatedAt = timestamp({ withTimezone: true, mode: "date" });
const expiresAt = timestamp({ withTimezone: true, mode: "date" }).notNull();

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  email: text().notNull().unique(),
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
  createdAt,
  updatedAt,
});

export const sessionsTable = pgTable("sessions", {
  id: text().primaryKey(),
  userId,
  expiresAt,
});

export const emailVerificationRequest = pgTable("email_verification_requests", {
  id: text().primaryKey(),
  userId,
  email: text().notNull().unique(),
  code: text().notNull(),
  expiresAt,
});

export const selectUserSchema = createSelectSchema(usersTable).pick({
  id: true,
  firstName: true,
  lastName: true,
  username: true,
  email: true,
  avatarUrl: true,
  emailVerified: true,
});

export type User = z.infer<typeof selectUserSchema>;
export type Session = InferSelectModel<typeof sessionsTable>;
