import { sha256 } from "@oslojs/crypto/sha2";
import { encodeHexLowerCase } from "@oslojs/encoding";
import { eq, not } from "drizzle-orm";

import { db } from "@/drizzle/db";
import { Session, sessionsTable, usersTable } from "@/drizzle/schema";
import { SessionValidationResult } from "@/lib/server/sessions";

export async function createSession(
  token: string,
  userId: number
): Promise<Session> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const session: Session = {
    id: sessionId,
    userId,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
  };
  await db.insert(sessionsTable).values(session);
  return session;
}

export async function validateSessionToken(
  token: string
): Promise<SessionValidationResult> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

  const result = await db
    .select({ user: usersTable, session: sessionsTable })
    .from(sessionsTable)
    .innerJoin(usersTable, eq(sessionsTable.userId, usersTable.id))
    .where(eq(sessionsTable.id, sessionId));

  if (result.length < 1) {
    return { session: null, user: null };
  }

  const { user, session } = result[0];

  const currentTime = Date.now();

  if (currentTime >= session.expiresAt.getTime()) {
    await db.delete(sessionsTable).where(eq(sessionsTable.id, session.id));
    return { session: null, user: null };
  }

  const timeRemaining = session.expiresAt.getTime() - currentTime;
  const extensionThreshold = 1000 * 60 * 60 * 24 * 7;

  if (timeRemaining <= extensionThreshold) {
    session.expiresAt = new Date(currentTime + 1000 * 60 * 60 * 24 * 30);
    await db
      .update(sessionsTable)
      .set({
        expiresAt: session.expiresAt,
      })
      .where(eq(sessionsTable.id, session.id));
  }

  return { session, user };
}

export async function invalidateSession(sessionId: string): Promise<void> {
  await db.delete(sessionsTable).where(eq(sessionsTable.id, sessionId));
}

export async function invalidateUserSessions(userId: number): Promise<void> {
  await db.delete(sessionsTable).where(eq(sessionsTable.userId, userId));
}

export async function invalidateUserSessionsExcept(
  sessionId: string
): Promise<void> {
  await db.delete(sessionsTable).where(not(eq(sessionsTable.id, sessionId)));
}

export async function getAllUserSessions(userId: number) {
  return await db.query.sessionsTable.findMany({
    where: eq(sessionsTable.userId, userId),
  });
}
