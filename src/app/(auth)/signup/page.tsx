import DevlinksLogo from "@/features/(auth)/components/auth-devlinks-logo";
import { SignupForm } from "@/features/(auth)/signup/components/signup-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "sign up",
};

export default function Page() {
  return (
    <main className="grid min-h-svh place-items-center p-6 min-[375px]:p-8 sm:p-0">
      <div className="w-full max-w-[496px] space-y-[51px]">
        <DevlinksLogo className="mx-auto" />
        <SignupForm />
      </div>
    </main>
  );
}
