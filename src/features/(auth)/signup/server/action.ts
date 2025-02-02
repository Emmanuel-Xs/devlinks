"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import "server-only";

import { createEmailVerificationRequest } from "@/drizzle/query/email-verifcation";
import { createSession } from "@/drizzle/query/sessions";
import { createUser, isEmailTaken } from "@/drizzle/query/users";
import {
  sendVerificationEmail,
  setEmailVerificationRequestCookie,
  verifyEmailDomain,
} from "@/lib/server/email";
import { checkPasswordSecurity, hashPassword } from "@/lib/server/password";
import { RefillingTokenBucket } from "@/lib/server/rate-limit";
import { globalPOSTRateLimit } from "@/lib/server/request";
import {
  generateSessionToken,
  setSessionTokenCookie,
} from "@/lib/server/sessions";
import { generateDefaultUsername } from "@/lib/server/users";
import { signupSchema } from "@/lib/validation";

type FormState = {
  success: boolean;
  fields?: Record<string, string>;
  errors?: Record<string, string[]>;
};

const ipBucket = new RefillingTokenBucket<string>(3, 10);

export async function signUpAction(
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

  const parsed = signupSchema.safeParse(formData);

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

  const result = await verifyEmailDomain(email);

  if (!result.success) {
    console.error("Email domain verification failed:", result.message);
    return {
      success: result.success,
      errors: { message: [result.message] },
    };
  }

  console.log("Valid domain: ", result.message);

  const password = parsed.data.password;

  const isEmailAlreadyTaken = await isEmailTaken(email);

  if (isEmailAlreadyTaken) {
    return {
      success: false,
      errors: { email: ["email taken"] },
      fields: parsed.data,
    };
  }

  const isPasswordSecure = await checkPasswordSecurity(password);

  if (!isPasswordSecure) {
    return {
      success: false,
      errors: { password: ["Password compromised"] },
      fields: parsed.data,
    };
  }

  if (clientIP !== null && !ipBucket.consume(clientIP, 1)) {
    return {
      success: false,
      errors: { message: ["Too many requests"] },
    };
  }

  const username = await generateDefaultUsername(email);
  const passwordHash = await hashPassword(password);

  const user = await createUser(username, email, passwordHash);

  const emailVerificationRequest = await createEmailVerificationRequest(
    user[0].id,
    user[0].email
  );

  sendVerificationEmail(
    emailVerificationRequest[0].email,
    emailVerificationRequest[0].code
  );

  // console.log("res data", res.data);
  // console.log("res error", res.error);
  setEmailVerificationRequestCookie(emailVerificationRequest[0]);

  const sessionToken = generateSessionToken();
  const session = createSession(sessionToken, user[0].id);
  setSessionTokenCookie(sessionToken, (await session).expiresAt);

  return redirect("/verify-email");
}
