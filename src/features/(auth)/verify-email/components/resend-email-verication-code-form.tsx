"use client";
import { resendEmailVerificationCodeAction } from "../server/actions";
import { useActionState } from "react";
import Form from "next/form";
import LoadingButton from "@/components/loading-button";
import { useCoolDown } from "@/hooks/use-cool-down";

export function ResendEmailVerificationCodeForm({ initialCountDown = true }) {
  const [formState, formAction, isPending] = useActionState(
    resendEmailVerificationCodeAction,
    {
      success: false,
    },
  );
  let shouldCount = initialCountDown;

  if (formState.success) {
    shouldCount = false;
  }

  const { coolDown, startCoolDown } = useCoolDown(
    shouldCount || formState?.success,
  );

  return (
    <Form
      action={formAction}
      className="grid justify-center gap-4"
      onSubmit={() => startCoolDown()}
    >
      <LoadingButton
        text={coolDown > 0 ? `Resend code (${coolDown}s)` : "Resend code"}
        variant="outline"
        size="md"
        className="w-[300px]"
        outline
        disabled={coolDown > 0}
      />
      {formState?.errors && !formState.success ? (
        <p className="text text-pretty text-center text-destructive">
          {formState?.errors?.message}
        </p>
      ) : null}

      {formState.success && !isPending ? (
        <p className="text text-pretty text-center text-green-700">
          {formState?.errors?.message}
        </p>
      ) : null}
    </Form>
  );
}
