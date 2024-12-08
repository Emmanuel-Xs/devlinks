import { and, eq } from "drizzle-orm";
import { db } from "../db";
import { EmailVerificationRequest, emailVerificationRequest } from "../schema";
import { generateRandomOTP } from "@/lib/server/utils";
import { encodeBase32 } from "@oslojs/encoding";

export async function getUserEmailVerificationRequest(
  userId: number,
  id: string,
): Promise<EmailVerificationRequest[]> {
  return await db
    .select()
    .from(emailVerificationRequest)
    .where(
      and(
        eq(emailVerificationRequest.id, id),
        eq(emailVerificationRequest.userId, userId),
      ),
    );
}

export async function createEmailVerificationRequest(
  userId: number,
  email: string,
): Promise<EmailVerificationRequest[]> {
  await deleteUserEmailVerificationRequest(userId);
  const idBytes = new Uint8Array(20);
  crypto.getRandomValues(idBytes);
  const id = encodeBase32(idBytes).toLowerCase();

  const code = generateRandomOTP();
  const expiresAt = new Date(Date.now() + 1000 * 60 * 10);

  return await db
    .insert(emailVerificationRequest)
    .values({ id, userId, code, email, expiresAt })
    .returning();
}

export async function deleteUserEmailVerificationRequest(userId: number) {
  await db
    .delete(emailVerificationRequest)
    .where(eq(emailVerificationRequest.userId, userId));
}
