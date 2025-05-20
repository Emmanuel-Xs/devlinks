"use server";

import { headers } from "next/headers";

import "server-only";

import { getUserPasswordHash, updateUserPassword } from "@/drizzle/query/users";
import {
  errorResponse,
  fieldErrors,
  successResponse,
  tooManyRequests,
} from "@/lib/server/form-response";
import {
  checkPasswordSecurity,
  hashPassword,
  verifyPasswordHash,
} from "@/lib/server/password";
import { RefillingTokenBucket } from "@/lib/server/rate-limit";
import { globalPOSTRateLimit } from "@/lib/server/request";
import { getCurrentSession } from "@/lib/server/sessions";
import { changePasswordSchema } from "@/lib/validation";

type FormState = {
  success: boolean;
  fields?: Record<string, string>;
  errors?: Record<string, string[]>;
};

const ipBucket = new RefillingTokenBucket<string>(3, 10);

export async function changePasswordAction(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
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

  if (!(formData instanceof FormData)) {
    return errorResponse("Invalid form data");
  }

  const submittedFormData = Object.fromEntries(formData);
  const parsedForm = changePasswordSchema.safeParse(submittedFormData);

  if (!parsedForm.success) {
    const errors = parsedForm.error.flatten().fieldErrors;
    const fields: Record<string, string> = {};

    for (const key of Object.keys(formData)) {
      fields[key] = submittedFormData[key].toString();
    }
    return fieldErrors(errors, fields);
  }

  const oldPassword = parsedForm.data.oldPassword;
  const newPassword = parsedForm.data.newPassword;
  const confirmPassword = parsedForm.data.confirmPassword;

  if (newPassword !== confirmPassword) {
    return fieldErrors(
      {
        confirmPassword: ["Passwords do not match"],
      },
      parsedForm.data
    );
  }

  if (clientIP !== null && !ipBucket.consume(clientIP, 1)) {
    return tooManyRequests();
  }
  const dbPasswordHash = (await getUserPasswordHash(user.id))[0].password;

  if (dbPasswordHash !== null) {
    const isOldPasswordCorrect = await verifyPasswordHash(
      dbPasswordHash,
      oldPassword
    );
    if (!isOldPasswordCorrect) {
      return fieldErrors(
        {
          oldPassword: ["Incorrect password"],
        },
        parsedForm.data
      );
    }
    if (oldPassword === newPassword) {
      return fieldErrors(
        {
          newPassword: ["New password must be different from old password"],
        },
        parsedForm.data
      );
    }
  }

  const isPasswordSecure = await checkPasswordSecurity(newPassword);

  if (!isPasswordSecure) {
    return fieldErrors(
      {
        newPassword: ["Password is not secure"],
      },
      parsedForm.data
    );
  }

  const newPasswordHash = await hashPassword(newPassword);

  await updateUserPassword(user.id, newPasswordHash);

  return successResponse();
}
