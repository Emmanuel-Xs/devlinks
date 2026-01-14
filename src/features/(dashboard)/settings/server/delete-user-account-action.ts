"use server";

import { headers } from "next/headers";

import "server-only";

import { deleteUser } from "@/drizzle/query/users";
import {
  errorResponse,
  successResponse,
  tooManyRequests,
} from "@/lib/server/form-response";
import { RefillingTokenBucket } from "@/lib/server/rate-limit";
import { globalPOSTRateLimit } from "@/lib/server/request";
import { getCurrentSession } from "@/lib/server/sessions";
import { invalidateUserSessions } from "@/drizzle/query/sessions";

type FormState = {
  success: boolean;
  error?: string;
};

const ipBucket = new RefillingTokenBucket<string>(2, 10);

export async function deleteUserAccount(): Promise<FormState> {
  if (!globalPOSTRateLimit()) {
    return tooManyRequests();
  }

  const requestHeaders = await headers();
  const clientIP = requestHeaders.get("x-forwarded-for");
  if (clientIP !== null && !ipBucket.check(clientIP, 1)) {
    return tooManyRequests();
  }

  const { session, user } = await getCurrentSession();

  if (session === null) {
    return errorResponse("Not authenticated");
  }

  if (clientIP !== null && !ipBucket.consume(clientIP, 1)) {
    return tooManyRequests();
  }

  try {
    
    // Delete the user account
    await deleteUser(user.id);

    // Invalidate the current session
    await invalidateUserSessions(user.id);

    return successResponse();
  } catch (error) {
    console.error("Error deleting user account:", error);
    return errorResponse("Failed to delete account. Please try again.");
  }
}