"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import "server-only";

import { createSession } from "@/drizzle/query/sessions";
import { getUserByEmail, getUserPasswordHash } from "@/drizzle/query/users";
import { verifyPasswordHash } from "@/lib/server/password";
import { RefillingTokenBucket, Throttler } from "@/lib/server/rate-limit";
import { globalPOSTRateLimit } from "@/lib/server/request";
import {
  generateSessionToken,
  setSessionTokenCookie,
} from "@/lib/server/sessions";
import { loginSchema } from "@/lib/validation";

type FormState = {
  success: boolean;
  fields?: Record<string, string>;
  errors?: Record<string, string[]>;
};

const throttler = new Throttler<number>([1, 2, 4, 8, 16, 30, 60, 180, 300]);
const ipBucket = new RefillingTokenBucket<string>(20, 1);

export async function loginAction(
  _prevState: FormState,
  data: FormData
): Promise<FormState> {
  if (!globalPOSTRateLimit()) {
    return {
      success: false,
      errors: { message: ["Too many requests"] },
    };
  }

  const requestHeaders = await headers();
  const clientIP = requestHeaders.get("x-forwarded-for");
  if (clientIP !== null && !ipBucket.check(clientIP, 1)) {
    return {
      success: false,
      errors: { message: ["Too many requests"] },
    };
  }

  if (!(data instanceof FormData)) {
    return {
      success: false,
      errors: { message: ["Invalid Form Data"] },
    };
  }
  const formData = Object.fromEntries(data);

  const parsed = loginSchema.safeParse(formData);

  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
    const fields: Record<string, string> = {};

    for (const key of Object.keys(formData)) {
      fields[key] = formData[key].toString();
    }
    return {
      success: false,
      fields,
      errors,
    };
  }

  const email = parsed.data.email;
  const password = parsed.data.password;

  const user = await getUserByEmail(email);

  if (!user.length) {
    return {
      success: false,
      errors: { message: ["Account does not exist"] },
      fields: undefined,
    };
  }

  if (clientIP !== null && !ipBucket.consume(clientIP, 1)) {
    return {
      success: false,
      errors: { message: ["Invalid Form Data"] },
    };
  }
  if (!throttler.consume(user[0].id)) {
    return {
      success: false,
      errors: { message: ["Invalid Form Data"] },
    };
  }

  const passwordHash = await getUserPasswordHash(user[0].id);
  const passwordHashNotNull = passwordHash[0].password;

  if (passwordHashNotNull === null) {
    return {
      success: false,
      errors: {
        message: [
          "Account does not have password, try forget password or login with any oauth options",
        ],
      },
      fields: undefined,
    };
  }

  const validPassword = await verifyPasswordHash(passwordHashNotNull, password);

  if (!validPassword) {
    return {
      success: false,
      errors: { message: ["Invalid credentials"] },
      fields: undefined,
    };
  }
  throttler.reset(user[0].id);

  const sessionToken = generateSessionToken();
  const session = await createSession(sessionToken, user[0].id);
  setSessionTokenCookie(sessionToken, session.expiresAt);

  if (!user[0].emailVerified) {
    redirect("/verify-email");
  }

  redirect("/links");
}
