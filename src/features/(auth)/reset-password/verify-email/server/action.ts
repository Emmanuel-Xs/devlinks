"use server";

import { verifyPasswordResetEmailSchema } from "@/lib/auth-validation";

import { validatePasswordResetSessionRequest } from "@/lib/server/password-reset";
import { redirect } from "next/navigation";
import "server-only";

type FormState = {
  success: boolean;
  errors?: Record<string, string[]>;
};

export async function verifyPasswordResetEmailAction(
  _prevState: FormState,
  data: FormData,
): Promise<FormState> {
  const { session } = await validatePasswordResetSessionRequest();

  if (session === null) {
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

  if (session.code !== code) {
    return {
      success: false,
      errors: { message: ["Incorrect code"] },
    };
  }

  return redirect("/reset-password");
}
