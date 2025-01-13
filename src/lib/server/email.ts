/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from "next/headers";

import { render } from "@react-email/components";
import dns from "dns";
import nodemailer from "nodemailer";

import { getUserEmailVerificationRequest } from "@/drizzle/query/email-verifcation";
import { EmailVerificationRequest } from "@/drizzle/schema";
import EmailVerification from "@/emails/email-verification";

import { env } from "./server-env";
import { getCurrentSession } from "./sessions";

export async function setEmailVerificationRequestCookie(
  request: EmailVerificationRequest
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
    from: `"devlinks" <devlinks.abc@gmail.com>`,
    to: email,
    subject: "Email Verification Code",
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

export const verifyEmailDomain = (
  email: string
): Promise<{ success: boolean; message: string }> => {
  return new Promise((resolve) => {
    const domain = email.split("@")[1];
    dns.resolveMx(domain, (err, addresses) => {
      if (err || !addresses || addresses.length === 0) {
        console.error("Invalid domain or no MX records found.");
        resolve({
          success: false,
          message: "Invalid domain or no MX records found",
        });
      } else {
        console.log("Valid domain:", addresses);
        resolve({
          success: true,
          message: "Valid domain",
        });
      }
    });
  });
};
