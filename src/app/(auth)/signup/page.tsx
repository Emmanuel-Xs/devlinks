import { Metadata } from "next";

import DevlinksLogo from "@/features/(auth)/components/auth-devlinks-logo";
import { SignupForm } from "@/features/(auth)/signup/components/signup-form";
import { goToEmailVerifyOrLinks } from "@/lib/server/auth-checks";

export const metadata: Metadata = {
  title: "sign up",
};

export default async function Page() {
  await goToEmailVerifyOrLinks();

  return (
    <main className="grid min-h-svh place-items-center p-6 min-[375px]:p-8 sm:p-0">
      <div className="w-full max-w-124 space-y-10">
        <DevlinksLogo className="mx-auto" />
        <SignupForm />
      </div>
    </main>
  );
}
