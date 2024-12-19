"use server";

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
import { generateSessionToken } from "@/lib/server/sessions";
import { redirect } from "next/navigation";
import "server-only";

type FormState = {
  success: boolean;
  fields?: Record<string, string>;
  errors?: Record<string, string[]>;
};

export async function forgetPasswordAction(
  _prevState: FormState,
  data: FormData,
): Promise<FormState> {
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

  await invalidateUserPasswordResetSessions(user[0].id);

  const sessionToken = generateSessionToken();
  const session = await createPasswordResetSession(
    sessionToken,
    user[0].id,
    user[0].email,
  );

  console.log("newly created session token", sessionToken);
  console.log("newly created session", session);

  await sendPasswordResetEmail(session.email, session.code);
  await setPasswordResetSessionTokenCookie(sessionToken, session.expiresAt);

  redirect("/reset-password/verify-email");
}
