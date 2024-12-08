import { EmailVerificationRequest } from "@/drizzle/schema";
import { cookies } from "next/headers";
import { getCurrentSession } from "./sessions";
import { getUserEmailVerificationRequest } from "@/drizzle/query/email-verifcation";
import { Resend } from "resend";
import EmailVerification from "../../../emails/email-verification";

export async function setEmailVerificationRequestCookie(
  request: EmailVerificationRequest,
): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set("email_verification", request.id, {
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: request.expiresAt,
  });
}

export async function deleteEmailVerificationRequestCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set("email_verification", "", {
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
  });
}

export async function getUserEmailVerificationRequestFromRequest() {
  const { user } = await getCurrentSession();
  if (user === null) {
    return null;
  }
  const cookieStore = await cookies();
  const id = cookieStore.get("email_verification")?.value ?? null;
  if (id === null) {
    return null;
  }
  const request = await getUserEmailVerificationRequest(user.id, id);
  if (request === null) {
    deleteEmailVerificationRequestCookie();
  }
  return request;
}

export async function sendVerificationEmail(email: string, code: string) {
  const resend = new Resend();

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Verify your email address",
    react: EmailVerification({ code }),
  });

  console.log(`To ${email}: Your verification code is ${code}`);
}
