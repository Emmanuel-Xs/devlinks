/* eslint-disable @typescript-eslint/no-explicit-any */
import { EmailVerificationRequest } from "@/drizzle/schema";
import { cookies } from "next/headers";
import { getCurrentSession } from "./sessions";
import { getUserEmailVerificationRequest } from "@/drizzle/query/email-verifcation";
import { render } from "@react-email/components";
import nodemailer from "nodemailer";
import EmailVerification from "@/emails/email-verification";
import { env } from "./serverEnv";

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

// Create a transporter using Gmail SMTP
export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "devlinks.abc@gmail.com",
    pass: env.EMAIL_AUTH_PASS,
  },
});

export async function sendVerificationEmail(email: string, code: string) {
  const emailHtml = await render(EmailVerification({ code }));

  const options = {
    from: "devlinks.abc@gmail.com",
    to: email,
    subject: "Verify your email address",
    html: emailHtml,
  };

  console.log(`To ${email}: Your verification code is ${code}`);

  // return await transporter.sendMail(options);
  transporter.sendMail(options, (error: any, info: { response: any }) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
}
