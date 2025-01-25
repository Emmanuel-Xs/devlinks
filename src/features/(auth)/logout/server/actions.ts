"use server";

import { redirect } from "next/navigation";

import "server-only";

import {
  invalidateSession,
  invalidateUserSessionsExcept,
} from "@/drizzle/query/sessions";
import { globalPOSTRateLimit } from "@/lib/server/request";
import {
  deleteSessionTokenCookie,
  getCurrentSession,
} from "@/lib/server/sessions";

type FormState = {
  success: boolean;
  errors?: Record<string, string[]>;
};

export async function logoutAction(): Promise<FormState> {
  if (!globalPOSTRateLimit()) {
    return {
      success: false,
      errors: { message: ["Too many requests"] },
    };
  }

  const { session } = await getCurrentSession();

  if (session === null) {
    return {
      success: false,
      errors: { message: ["Not authenticated"] },
    };
  }

  await invalidateSession(session.id);
  await deleteSessionTokenCookie();

  redirect("/");
}

export async function logoutOfOtherDevicesAction(): Promise<FormState> {
  if (!globalPOSTRateLimit()) {
    return {
      success: false,
      errors: { message: ["Too many requests"] },
    };
  }

  const { session } = await getCurrentSession();

  if (session === null) {
    return {
      success: false,
      errors: { message: ["Not authenticated"] },
    };
  }

  await invalidateUserSessionsExcept(session.id);

  return {
    success: true,
  };
}
