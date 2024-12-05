"use server";
import {
  createEmailVerificationRequest,
  deleteUserEmailVerificationRequest,
  sendVerificationEmail,
} from "@/drizzle/query/email-verifcation";
import { updateUserEmailAndSetEmailAsVerified } from "@/drizzle/query/users";
import { verifyEmailSchema } from "@/lib/auth-validation";
import {
  deleteEmailVerificationRequestCookie,
  getUserEmailVerificationRequestFromRequest,
  setEmailVerificationRequestCookie,
} from "@/lib/server/email-verifcation";
import { getCurrentSession } from "@/lib/server/sessions";
import { headers } from "next/headers";
import { permanentRedirect } from "next/navigation";
import "server-only";

type FormState = {
  success: boolean;
  errors?: Record<string, string[]>;
};

export async function verifyEmailAction(
  _prevState: FormState,
  data: FormData,
): Promise<FormState> {
  const { user } = await getCurrentSession();

  if (user === null) {
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

  const verificationRequest =
    await getUserEmailVerificationRequestFromRequest();

  if (verificationRequest === null) {
    return {
      success: false,
      errors: { message: ["Not authenticated"] },
    };
  }

  const submittedFormData = Object.fromEntries(data);
  const parsedForm = verifyEmailSchema.safeParse(submittedFormData);

  if (!parsedForm.success) {
    const errors = parsedForm.error.flatten().fieldErrors;
    return {
      success: false,
      errors,
    };
  }

  const code = parsedForm.data.code;
  const request = verificationRequest[0];

  if (Date.now() >= request.expiresAt.getTime()) {
    return await handleExpiredVerificationCode(request.userId, request.email);
  }

  if (request.code !== code) {
    return {
      success: false,
      errors: { message: ["Incorrect code"] },
    };
  }

  await Promise.all([
    deleteUserEmailVerificationRequest(user.id),
    updateUserEmailAndSetEmailAsVerified(user.id, request.email),
    deleteEmailVerificationRequestCookie(),
  ]);

  const header = await headers();

  const redirectUrl = header.get("redirect") || "links";

  permanentRedirect(redirectUrl);
}

async function handleExpiredVerificationCode(userId: number, email: string) {
  const newRequest = await createEmailVerificationRequest(userId, email);
  sendVerificationEmail(email, newRequest[0].code);
  return {
    success: false,
    errors: {
      message: [
        "The verification code expired. A new code has been sent to your email.",
      ],
    },
  };
}

export async function resendEmailVerificationCodeAction(): Promise<FormState> {
  const { user } = await getCurrentSession();

  if (user === null) {
    return {
      success: false,
      errors: { message: ["Not authenticated"] },
    };
  }
  let verificationRequest = await getUserEmailVerificationRequestFromRequest();

  if (verificationRequest === null) {
    if (user.emailVerified) {
      return {
        success: false,
        errors: { message: ["Forbidden"] },
      };
    }
    verificationRequest = await createEmailVerificationRequest(
      user.id,
      user.email,
    );
  } else {
    verificationRequest = await createEmailVerificationRequest(
      user.id,
      user.email,
    );
  }
  sendVerificationEmail(
    verificationRequest[0].email,
    verificationRequest[0].code,
  );
  setEmailVerificationRequestCookie(verificationRequest[0]);
  return {
    success: true,
    errors: { message: ["A new code was sent to your inbox."] },
  };
}
