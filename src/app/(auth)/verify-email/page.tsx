import DevlinksLogo from "@/features/(auth)/components/auth-devlinks-logo";
import EmailVerificationForm from "@/features/(auth)/verify-email/components/email-verification-form";
import { ResendEmailVerificationCodeForm } from "@/features/(auth)/verify-email/components/resend-email-verication-code-form";
import { getUserEmailVerificationRequestFromRequest } from "@/lib/server/email";
import { getCurrentSession } from "@/lib/server/sessions";
import { redirect } from "next/navigation";
import React from "react";

export default async function Page() {
  const { user } = await getCurrentSession();
  if (user === null) {
    redirect("/login");
  }

  const verificationRequest =
    await getUserEmailVerificationRequestFromRequest();
  if (verificationRequest === null && user.emailVerified) {
    redirect("/links");
  }

  return (
    <main className="grid h-svh place-items-center p-6 min-[375px]:p-8 sm:p-0">
      <div className="w-full max-w-[496px] space-y-[51px]">
        <DevlinksLogo className="mx-auto" />
        <EmailVerificationForm />
        <ResendEmailVerificationCodeForm />
      </div>
    </main>
  );
}
