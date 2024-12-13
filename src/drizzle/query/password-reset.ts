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

export type PasswordResetSessionValidationResult =
  | { session: PasswordResetSession; user: User }
  | { session: null; user: null };

export function createPasswordResetSession(
  token: string,
  userId: number,
  email: string,
): PasswordResetSession {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const session: PasswordResetSession = {
    id: sessionId,
    userId,
    email,
    expiresAt: new Date(Date.now() + 1000 * 60 * 10),
    code: generateRandomOTP(),
  };

  db.insert(passwordResetSessions).values(session);
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
    return { session: null, user: null };
  }

  const { user, session } = result[0];

  const currentTime = Date.now();

  if (currentTime >= session.expiresAt.getTime()) {
    await db
      .delete(passwordResetSessions)
      .where(eq(passwordResetSessions.id, session.id));
    return { session: null, user: null };
  }

  return { session, user };
}

export async function invalidateUserPasswordResetSessions(userId: number) {
  await db
    .delete(passwordResetSessions)
    .where(eq(passwordResetSessions.userId, userId));
}
