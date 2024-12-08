"use server";
import { createEmailVerificationRequest } from "@/drizzle/query/email-verifcation";
import { createSession } from "@/drizzle/query/sessions";
import { createUser, isEmailTaken } from "@/drizzle/query/users";
import { signupSchema } from "@/lib/auth-validation";
import {
  sendVerificationEmail,
  setEmailVerificationRequestCookie,
} from "@/lib/server/email";
import { checkPasswordSecurity, hashPassword } from "@/lib/server/password";
import {
  generateSessionToken,
  setSessionTokenCookie,
} from "@/lib/server/sessions";
import { generateDefaultUsername } from "@/lib/server/users";
import { redirect } from "next/navigation";
import "server-only";

type FormState = {
  success: boolean;
  fields?: Record<string, string>;
  errors?: Record<string, string[]>;
};

export async function signUpAction(
  _prevState: FormState,
  data: FormData,
): Promise<FormState> {
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
  const password = parsed.data.password;

  const isEmailAvailable = await isEmailTaken(email);

  if (isEmailAvailable) {
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

  const username = await generateDefaultUsername(email);
  const passwordHash = await hashPassword(password);

  const user = await createUser(username, email, passwordHash);

  const emailVerificationRequest = await createEmailVerificationRequest(
    user[0].id,
    user[0].email,
  );
  sendVerificationEmail(
    emailVerificationRequest[0].email,
    emailVerificationRequest[0].code,
  );
  setEmailVerificationRequestCookie(emailVerificationRequest[0]);

  const sessionToken = generateSessionToken();
  const session = createSession(sessionToken, user[0].id);
  setSessionTokenCookie(sessionToken, (await session).expiresAt);

  return redirect("/verify-email");
}
