import { redirect } from "next/navigation";
import React from "react";

import DevlinksLogo from "@/features/(auth)/components/auth-devlinks-logo";
import PasswordResetEmailVerificationForm from "@/features/(auth)/reset-password/verify-email/components/password-reset-email-verification-form";
import { getCurrentPasswordSession } from "@/lib/server/password-reset";

export default async function Page() {
  const { session } = await getCurrentPasswordSession();
  if (session === null) {
    redirect("/forgot-password");
  }

  return (
    <main className="grid h-svh place-items-center p-6 min-[375px]:p-8 sm:p-0">
      <div className="w-full max-w-[496px] space-y-[51px]">
        <DevlinksLogo className="mx-auto" />
        <PasswordResetEmailVerificationForm />
      </div>
    </main>
  );
}
