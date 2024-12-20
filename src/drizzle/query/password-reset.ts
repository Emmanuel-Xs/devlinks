import { encodeHexLowerCase } from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";
import {
  PasswordResetSession,
  passwordResetSessions,
  returningUserData,
  User,
  usersTable,
} from "../schema";
import { generateRandomOTP } from "@/lib/server/utils";
import { db } from "../db";
import { eq } from "drizzle-orm";
import { env } from "@/lib/server/server-env";

export type PasswordResetSessionValidationResult =
  | { session: PasswordResetSession; user: User }
  | { session: null; user: null };

export async function createPasswordResetSession(
  token: string,
  userId: number,
  email: string,
) {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

  const session: PasswordResetSession = {
    id: sessionId,
    userId,
    email,
    expiresAt: new Date(
      Date.now() + 1000 * 60 * parseInt(env.PASSWORD_RESET_EXPIRES_IN_MINS, 10),
    ),
    code: generateRandomOTP(),
  };

  await db.insert(passwordResetSessions).values(session).returning();

  return session;
}

export async function validatePasswordResetSessionToken(
  token: string,
): Promise<PasswordResetSessionValidationResult> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

  const result = await db
    .select({ user: returningUserData, session: passwordResetSessions })
    .from(passwordResetSessions)
    .innerJoin(usersTable, eq(passwordResetSessions.userId, usersTable.id))
    .where(eq(passwordResetSessions.id, sessionId));

  if (result.length < 1) {
    console.warn("No session found for token:", sessionId, "token", token);
    return { session: null, user: null };
  }

  const { user, session } = result[0];

  const currentTime = Date.now();

  if (currentTime >= session.expiresAt.getTime()) {
    await db
      .delete(passwordResetSessions)
      .where(eq(passwordResetSessions.id, session.id));
    console.log("deleting expired session from db", session);

    return { session: null, user: null };
  }

  console.log("password session in db", token);

  return { session, user };
}

export async function invalidateUserPasswordResetSessions(userId: number) {
  await db
    .delete(passwordResetSessions)
    .where(eq(passwordResetSessions.userId, userId));
}
