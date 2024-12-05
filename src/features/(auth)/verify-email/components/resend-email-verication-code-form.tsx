"use client";
import { resendEmailVerificationCodeAction } from "../server/actions";
import { useActionState } from "react";
import Form from "next/form";
import LoadingButton from "@/components/loading-button";

export function ResendEmailVerificationCodeForm() {
  const [formState, formAction] = useActionState(
    resendEmailVerificationCodeAction,
    {
      success: false,
    },
  );
  return (
    <Form action={formAction} className="grid justify-center gap-4">
      <LoadingButton
        text="Resend code"
        variant="outline"
        size="md"
        className="w-[300px]"
      />
      {formState?.errors && !formState.success ? (
        <p className="text text-pretty text-center text-destructive">
          {formState?.errors?.message}
        </p>
      ) : null}

      {formState.success ? (
        <p className="text text-pretty text-center">
          {formState?.errors?.message}
        </p>
      ) : null}
    </Form>
  );
}
