import { InferSelectModel } from "drizzle-orm";
import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

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
  userId: integer()
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  expiresAt,
});

export const emailVerificationRequest = pgTable("email_verification_requests", {
  id: text().primaryKey(),
  userId: integer()
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  email: text().notNull().unique(),
  code: text().notNull(),
  expiresAt,
});

export const returningUserData = {
  id: usersTable.id,
  firstName: usersTable.firstName,
  lastName: usersTable.lastName,
  username: usersTable.username,
  email: usersTable.email,
  avatarUrl: usersTable.avatarUrl,
  emailVerified: usersTable.emailVerified,
};

export type User = Pick<
  InferSelectModel<typeof usersTable>,
  keyof typeof returningUserData
>;
export type Session = InferSelectModel<typeof sessionsTable>;

export type EmailVerificationRequest = InferSelectModel<
  typeof emailVerificationRequest
>;
