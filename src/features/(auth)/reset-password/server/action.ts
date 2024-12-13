import { invalidateUserPasswordResetSessions } from "@/drizzle/query/password-reset";
import {
  createSession,
  invalidateUserSessions,
} from "@/drizzle/query/sessions";
import {
  updateUserEmailAndSetEmailAsVerified,
  updateUserPassword,
} from "@/drizzle/query/users";
import { passwordResetSchema } from "@/lib/auth-validation";
import { checkPasswordSecurity, hashPassword } from "@/lib/server/password";
import {
  deletePasswordResetSessionTokenCookie,
  validatePasswordResetSessionRequest,
} from "@/lib/server/password-reset";
import {
  generateSessionToken,
  setSessionTokenCookie,
} from "@/lib/server/sessions";
import { redirect } from "next/navigation";
import "server-only";

type FormState = {
  success: boolean;
  fields?: Record<string, string>;
  errors?: Record<string, string[]>;
};

export async function resetPasswordAction(
  _prevState: FormState,
  data: FormData,
): Promise<FormState> {
  const { session: passwordResetSession, user } =
    await validatePasswordResetSessionRequest();

  if (passwordResetSession === null) {
    return {
      success: false,
      errors: { message: ["Not authenticated"] },
    };
  }

  if (!(data instanceof FormData)) {
    return {
      success: false,
      errors: { message: ["Invalid Form Data"] },
    };
  }

  const submittedFormData = Object.fromEntries(data);
  const parsedForm = passwordResetSchema.safeParse(submittedFormData);

  if (!parsedForm.success) {
    const errors = parsedForm.error.flatten().fieldErrors;
    return {
      success: false,
      errors,
      fields: parsedForm.data,
    };
  }

  const password = parsedForm.data.password;
  const passwordHash = await hashPassword(password);

  const isPasswordSecure = await checkPasswordSecurity(password);

  if (!isPasswordSecure) {
    return {
      success: false,
      errors: { password: ["Password compromised"] },
      fields: parsedForm.data,
    };
  }

  if (user.emailVerified < 1) {
    await updateUserEmailAndSetEmailAsVerified(user.id, user.email);
  }

  await invalidateUserPasswordResetSessions(passwordResetSession.userId);
  await invalidateUserSessions(passwordResetSession.userId);
  await updateUserPassword(passwordResetSession.userId, passwordHash);

  const sessionToken = generateSessionToken();
  const session = await createSession(sessionToken, user.id);
  await setSessionTokenCookie(sessionToken, session.expiresAt);
  await deletePasswordResetSessionTokenCookie();

  redirect("/login");
}
