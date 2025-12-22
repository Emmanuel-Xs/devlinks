import { Metadata } from "next";

import DevlinksLogo from "@/features/(auth)/components/auth-devlinks-logo";
import { LoginForm } from "@/features/(auth)/login/components/login-form";
import { goToEmailVerifyOrLinks } from "@/lib/server/auth-checks";

export const metadata: Metadata = {
  title: "login",
};

export default async function Page() {
  await goToEmailVerifyOrLinks();

  return (
    <main className="grid h-svh place-items-center p-6 min-[375px]:p-8 sm:p-0">
      <div className="w-full max-w-124 space-y-12.75">
        <DevlinksLogo className="mx-auto" />
        <LoginForm />
      </div>
    </main>
  );
}
