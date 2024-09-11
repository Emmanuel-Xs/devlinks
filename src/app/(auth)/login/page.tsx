import { LoginForm } from "@/components/Auth/LoginForm";
import DevlinksLogo from "@/components/ui/devlinks-logo";

export default function Page() {
  return (
    <main className="grid h-svh place-items-center p-6 min-[375px]:p-8 sm:p-0">
      <div className="w-full max-w-[496px] space-y-[51px]">
        <DevlinksLogo className="mx-auto" />
        <LoginForm />
      </div>
    </main>
  );
}
