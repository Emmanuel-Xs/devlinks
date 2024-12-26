"use server";

import { verifyPasswordResetEmailSchema } from "@/lib/auth-validation";

import { validatePasswordResetSessionRequest } from "@/lib/server/password-reset";
import { ExpiringTokenBucket } from "@/lib/server/rate-limit";
import { globalPOSTRateLimit } from "@/lib/server/request";
import { redirect } from "next/navigation";
import "server-only";

type FormState = {
  success: boolean;
  errors?: Record<string, string[]>;
};

const emailVerificationBucket = new ExpiringTokenBucket<number>(5, 60 * 30);

export async function verifyPasswordResetEmailAction(
  _prevState: FormState,
  data: FormData,
): Promise<FormState> {
  if (!globalPOSTRateLimit()) {
    return {
      success: false,
      errors: { message: ["Too many requests"] },
    };
  }

  const { session } = await validatePasswordResetSessionRequest();

  if (session === null) {
    return {
      success: false,
      errors: { message: ["Not authenticated"] },
    };
  }

  if (!emailVerificationBucket.check(session.userId, 1)) {
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
  const parsedForm =
    verifyPasswordResetEmailSchema.safeParse(submittedFormData);

  if (!parsedForm.success) {
    const errors = parsedForm.error.flatten().fieldErrors;
    return {
      success: false,
      errors,
    };
  }

  const code = parsedForm.data.code;

  if (!emailVerificationBucket.consume(session.userId, 1)) {
    return {
      success: false,
      errors: { message: ["Too many requests"] },
    };
  }

  if (session.code !== code) {
    return {
      success: false,
      errors: { message: ["Incorrect code"] },
    };
  }

  emailVerificationBucket.reset(session.userId);
  return redirect("/reset-password");
}
