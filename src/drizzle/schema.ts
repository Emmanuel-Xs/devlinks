import { InferSelectModel, relations } from "drizzle-orm";
import {
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  unique,
} from "drizzle-orm/pg-core";

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
  blurDataUrl: text("blur-data-url"),
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
  blurDataUrl: usersTable.blurDataUrl,
  emailVerified: usersTable.emailVerified,
};

export const passwordResetSessions = pgTable("password_reset_sessions", {
  id: text().primaryKey(),
  userId: integer()
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  email: text().notNull().unique(),
  code: text().notNull(),
  expiresAt,
});

export const platformEnum = pgEnum("platforms", [
  "github",
  "frontendmentor",
  "twitter",
  "linkedin",
  "youtube",
  "facebook",
  "twitch",
  "dev.to",
  "codewars",
  "codepen",
  "freecodecamp",
  "gitlab",
  "hashnode",
  "stackoverflow",
  "portfolio",
  "others",
]);

export const links = pgTable(
  "links",
  {
    id: text().primaryKey(),
    userId: integer()
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    sequence: integer().notNull(),
    url: text().notNull(),
    platform: platformEnum().default("github").notNull(),
    createdAt,
    updatedAt,
  },
  (table) => [
    unique().on(table.userId, table.sequence),
    index("links_platform_idx").on(table.platform),
  ]
);

export const returningLink = {
  id: links.id,
  userId: links.userId,
  sequence: links.sequence,
  url: links.url,
  platform: links.platform,
};

// DB TYPES

export type User = Pick<
  InferSelectModel<typeof usersTable>,
  keyof typeof returningUserData
>;
export type Session = InferSelectModel<typeof sessionsTable>;

export type EmailVerificationRequest = InferSelectModel<
  typeof emailVerificationRequest
>;

export type PasswordResetSession = InferSelectModel<
  typeof passwordResetSessions
>;

export type Link = Pick<
  InferSelectModel<typeof links>,
  keyof typeof returningLink
>;
// In your schema file
export type PlatformKey = (typeof platformEnum.enumValues)[number];

// RELATIONS

export const usersRelations = relations(usersTable, ({ many }) => ({
  sessions: many(sessionsTable),
  emailVerificationRequests: many(emailVerificationRequest),
  passwordResetSessions: many(passwordResetSessions),
  links: many(links),
}));

export const sessionsRelations = relations(sessionsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [sessionsTable.userId],
    references: [usersTable.id],
  }),
}));

export const emailVerificationRequestRelations = relations(
  emailVerificationRequest,
  ({ one }) => ({
    user: one(usersTable, {
      fields: [emailVerificationRequest.userId],
      references: [usersTable.id],
    }),
  })
);

export const passwordResetSessionsRelations = relations(
  passwordResetSessions,
  ({ one }) => ({
    user: one(usersTable, {
      fields: [passwordResetSessions.userId],
      references: [usersTable.id],
    }),
  })
);

export const linksRelations = relations(links, ({ one }) => ({
  user: one(usersTable, {
    fields: [links.userId],
    references: [usersTable.id],
  }),
}));
