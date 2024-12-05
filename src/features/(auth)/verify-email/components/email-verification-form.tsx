import { CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useActionState } from "react";
import { verifyEmailAction } from "../server/actions";
import Form from "next/form";
import LoadingButton from "@/components/loading-button";

export default function EmailVerificationForm() {
  const [formState, formAction] = useActionState(verifyEmailAction, {
    success: false,
  });
  return (
    <div
      className={cn(
        "mx-auto max-w-[500px] space-y-12 sm:rounded-xl sm:border sm:bg-card sm:p-8 sm:text-card-foreground sm:shadow",
      )}
    >
      <CardHeader className="space-y-2 text-center">
        <h1 className="heading">Verify your email address</h1>
        <p className="text">
          We sent an 8-digit code to Your email check your Inbox.
        </p>
      </CardHeader>
      <Form action={formAction} className="grid justify-center gap-6">
        <InputOTP maxLength={8} id="form-otp" required autoFocus>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
            <InputOTPSlot index={6} />
            <InputOTPSlot index={7} />
          </InputOTPGroup>
        </InputOTP>
        <LoadingButton text="Verify" />
        {formState?.errors && !formState.success ? (
          <p className="text text-pretty text-center text-destructive">
            {formState?.errors?.message}
          </p>
        ) : null}
      </Form>
    </div>
  );
}
