import {
  PasswordResetSessionValidationResult,
  validatePasswordResetSessionToken,
} from "@/drizzle/query/password-reset";
import { PasswordReset } from "@/emails/password-reset";
import { render } from "@react-email/components";
import { cookies } from "next/headers";
import { transporter } from "./email";
import { cache } from "react";

export async function validatePasswordResetSessionRequest(): Promise<PasswordResetSessionValidationResult> {
  const cookieStore = await cookies();
  const token = cookieStore.get("password_reset_session")?.value ?? null;
  if (token === null) {
    return { session: null, user: null };
  }
  const result = await validatePasswordResetSessionToken(token);
  if (result.session === null) {
    deletePasswordResetSessionTokenCookie();
  }
  return result;
}

export const getCurrentPasswordSession = cache(
  async (): Promise<PasswordResetSessionValidationResult> => {
    const cookieStore = await cookies();
    const token = cookieStore.get("password_reset_session")?.value ?? null;
    console.log(token);
    if (token === null) {
      return { session: null, user: null };
    }
    const result = await validatePasswordResetSessionToken(token);
    return result;
  },
);

export async function setPasswordResetSessionTokenCookie(
  token: string,
  expiresAt: Date,
) {
  const cookieStore = await cookies();
  console.log("Setting cookie:");
  console.log({ token, expiresAt });
  cookieStore.set("password_reset_session", token, {
    expires: expiresAt,
    sameSite: "lax",
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
  });
  console.log("Cookie set successfully");
}

export async function deletePasswordResetSessionTokenCookie() {
  console.log("Deleting cookie:");
  const cookieStore = await cookies();
  cookieStore.set("password_reset_session", "", {
    maxAge: 0,
    sameSite: "lax",
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
  });
  console.log("Cookie deleted successfully");
}

export async function sendPasswordResetEmail(email: string, code: string) {
  const emailHtml = await render(PasswordReset({ code }));

  const options = {
    from: `"devlinks" <devlinks.abc@gmail.com>`,
    to: email,
    subject: "Password Reset Code",
    html: emailHtml,
  };

  console.log(`To ${email}: Your reset code is ${code}`);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transporter.sendMail(options, (error: any, info: { response: any }) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
}
