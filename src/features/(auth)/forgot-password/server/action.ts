"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import "server-only";

import {
  createPasswordResetSession,
  invalidateUserPasswordResetSessions,
} from "@/drizzle/query/password-reset";
import { getUserByEmail } from "@/drizzle/query/users";
import { passwordForgetSchema } from "@/lib/auth-validation";
import {
  sendPasswordResetEmail,
  setPasswordResetSessionTokenCookie,
} from "@/lib/server/password-reset";
import { RefillingTokenBucket } from "@/lib/server/rate-limit";
import { globalPOSTRateLimit } from "@/lib/server/request";
import { generateSessionToken } from "@/lib/server/sessions";

type FormState = {
  success: boolean;
  fields?: Record<string, string>;
  errors?: Record<string, string[]>;
};

const passwordResetEmailIPBucket = new RefillingTokenBucket<string>(3, 60);
const passwordResetEmailUserBucket = new RefillingTokenBucket<number>(3, 60);

export async function forgetPasswordAction(
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
  if (clientIP !== null && !passwordResetEmailIPBucket.check(clientIP, 1)) {
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

  const submittedFormData = Object.fromEntries(data);
  const parsedForm = passwordForgetSchema.safeParse(submittedFormData);

  if (!parsedForm.success) {
    const errors = parsedForm.error.flatten().fieldErrors;
    const fields: Record<string, string> = {};

    for (const key of Object.keys(submittedFormData)) {
      fields[key] = submittedFormData[key].toString();
    }

    return {
      success: false,
      fields,
      errors,
    };
  }

  const email = parsedForm.data.email;

  const user = await getUserByEmail(email);

  if (user.length < 1) {
    return {
      success: false,
      fields: { email },
      errors: { message: ["Account does not exist"] },
    };
  }

  if (clientIP !== null && !passwordResetEmailIPBucket.consume(clientIP, 1)) {
    return {
      success: false,
      errors: { message: ["Too many requests"] },
    };
  }
  if (!passwordResetEmailUserBucket.consume(user[0].id, 1)) {
    return {
      success: false,
      errors: { message: ["Too many requests"] },
    };
  }

  await invalidateUserPasswordResetSessions(user[0].id);

  const sessionToken = generateSessionToken();
  const session = await createPasswordResetSession(
    sessionToken,
    user[0].id,
    user[0].email
  );

  console.log("newly created session token", sessionToken);
  console.log("newly created session", session);

  await sendPasswordResetEmail(session.email, session.code);
  await setPasswordResetSessionTokenCookie(sessionToken, session.expiresAt);

  redirect("/reset-password/verify-email");
}
