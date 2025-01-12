import DevlinksLogo from "@/features/(auth)/components/auth-devlinks-logo";
import ForgetPasswordForm from "@/features/(auth)/forgot-password/components/forget-password-form";

export default function Page() {
  return (
    <main className="grid h-svh place-items-center p-6 min-[375px]:p-8 sm:p-0">
      <div className="w-full max-w-[496px] space-y-[51px]">
        <DevlinksLogo className="mx-auto" />
        <ForgetPasswordForm />
      </div>
    </main>
  );
}
