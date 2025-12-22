import ForgetPasswordForm from "@/features/(auth)/forgot-password/components/forget-password-form";
import DevlinksLogo from "@/features/(auth)/components/auth-devlinks-logo";

export default function Page() {
  return (
    <main className="grid h-svh place-items-center p-6 min-[375px]:p-8 sm:p-0">
      <div className="w-full max-w-124 space-y-12.75">
        <DevlinksLogo className="mx-auto" />
        <ForgetPasswordForm />
      </div>
    </main>
  );
}
