import { redirect } from "next/navigation";
import React from "react";

import PasswordResetForm from "@/features/(auth)/reset-password/components/password-reset-form";
import DevlinksLogo from "@/features/(auth)/components/auth-devlinks-logo";
import { getCurrentPasswordSession } from "@/lib/server/password-reset";

export default async function Page() {
  const { session } = await getCurrentPasswordSession();
  if (session === null) {
    redirect("/forgot-password");
  }
  return (
    <main className="grid h-svh place-items-center p-6 min-[375px]:p-8 sm:p-0">
      <div className="w-full max-w-124 space-y-12.75">
        <DevlinksLogo className="mx-auto" />
        <PasswordResetForm />
      </div>
    </main>
  );
}
