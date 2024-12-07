import { LoginForm } from "@/features/(auth)/login/components/login-form";
import DevlinksLogo from "@/features/(auth)/components/auth-devlinks-logo";
import { Metadata } from "next";
import { goToEmailVerifyOrLinks } from "@/lib/server/sessions";

export const metadata: Metadata = {
  title: "login",
};

export default async function Page() {
  await goToEmailVerifyOrLinks();

  return (
    <main className="grid h-svh place-items-center p-6 min-[375px]:p-8 sm:p-0">
      <div className="w-full max-w-[496px] space-y-[51px]">
        <DevlinksLogo className="mx-auto" />
        <LoginForm />
      </div>
    </main>
  );
}
