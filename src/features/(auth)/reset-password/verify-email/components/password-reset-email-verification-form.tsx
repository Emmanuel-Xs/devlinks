"use client";

import { CardHeader } from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";
import React, { useActionState } from "react";
import { verifyPasswordResetEmailAction } from "../server/action";
import LoadingButton from "@/components/loading-button";
import Form from "next/form";
import { env } from "@/lib/client-env";

export default function PasswordResetEmailVerificationForm() {
  const [formState, formAction, isPending] = useActionState(
    verifyPasswordResetEmailAction,
    {
      success: false,
    },
  );
  return (
    <div
      className={cn(
        "mx-auto max-w-[500px] space-y-12 sm:rounded-xl sm:border sm:bg-card sm:p-8 sm:text-card-foreground sm:shadow",
      )}
    >
      <CardHeader className="space-y-2 text-center">
        <h1 className="heading">Verify your email address</h1>
        <p className="text">
          We sent an 8-digit code to your email. Please check your inbox, and if
          you don&apos;t see it, be sure to check your spam folder.
        </p>
      </CardHeader>
      <Form action={formAction} className="grid justify-center gap-6">
        <InputOTP
          maxLength={8}
          id="form-otp"
          autoFocus
          required
          name="code"
          type="text"
          autoComplete="one-time-code"
        >
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
        {formState?.errors && !formState.success && !isPending ? (
          <p className="text text-pretty text-center text-destructive">
            {formState?.errors?.message}
          </p>
        ) : null}
        {!formState?.errors && !formState.success && !isPending ? (
          <p className="text text-pretty text-center text-sm text-foreground">
            the code only last for{" "}
            <strong>
              {env.NEXT_PUBLIC_PASSWORD_RESET_EXPIRES_IN_MINS} minutes{" "}
            </strong>{" "}
            remember to go back to forget password to request another code
          </p>
        ) : null}
      </Form>
    </div>
  );
}
