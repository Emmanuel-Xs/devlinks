"use client";
"use no memo";

import { CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LockKeyhole } from "lucide-react";
import Form from "next/form";
import React, {
  startTransition,
  useActionState,
  useEffect,
  useRef,
} from "react";
import AuthPassword from "../../components/auth-password";
import { resetPasswordAction } from "../server/action";
import LoadingButton from "@/components/loading-button";
import { passwordResetSchema } from "@/lib/auth-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { env } from "@/lib/client-env";

export default function PasswordResetForm() {
  const [formState, formAction, isPending] = useActionState(
    resetPasswordAction,
    {
      success: false,
    },
  );

  const formRef = useRef<HTMLFormElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    setFocus,
    formState: { errors: rhfErrors, isSubmitSuccessful },
  } = useForm<z.output<typeof passwordResetSchema>>({
    resolver: zodResolver(passwordResetSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
      ...(formState?.fields ?? {}),
    },
    mode: "onTouched",
  });

  useEffect(() => {
    if (isSubmitSuccessful && formState.success) {
      reset();
    }
  }, [reset, isSubmitSuccessful, formState.success]);

  // password compromised
  useEffect(() => {
    if (formState.errors?.password) {
      setError("password", {
        message: formState.errors.password.join(", "),
      });
      setFocus("password");
    }
  }, [reset, formState.errors, setError, setFocus]);
  return (
    <div
      className={cn(
        "mx-auto max-w-[496px] space-y-10 sm:rounded-xl sm:border sm:bg-card sm:p-10 sm:text-card-foreground sm:shadow",
      )}
    >
      <CardHeader className="space-y-2 text-center">
        <h1 className="heading">Enter your new Password</h1>
        <p className="text">Enter a password you won&apos;t easily.</p>
      </CardHeader>
      <CardContent className="grid gap-6">
        {formState?.errors?.message && !formState.success && !isPending ? (
          <p className="text text-pretty text-center text-destructive">
            {formState?.errors?.message}
          </p>
        ) : null}
        <Form
          action={formAction}
          className="grid gap-6"
          ref={formRef}
          onSubmit={(evt) => {
            evt.preventDefault();
            handleSubmit(() => {
              startTransition(() => formAction(new FormData(formRef.current!)));
            })(evt);
          }}
        >
          <AuthPassword
            id="password"
            placeholder="At least 8 characters"
            icon={
              <LockKeyhole width={24} height={24} className="text-foreground" />
            }
            label="Create Password"
            error={
              rhfErrors.password?.message ||
              formState?.errors?.password?.join(", ")
            }
            required
            defaultValue={formState.fields?.password}
            {...register("password")}
          />
          <AuthPassword
            id="confirm-password"
            placeholder="Passwords must match"
            icon={
              <LockKeyhole width={24} height={24} className="text-foreground" />
            }
            label="Confirm Password"
            error={
              rhfErrors.confirmPassword?.message ||
              formState?.errors?.confirmPassword?.join(", ")
            }
            required
            defaultValue={formState.fields?.confirmPassword}
            {...register("confirmPassword")}
          />
          <LoadingButton text="Reset Password" isPending={isPending} />
        </Form>
        {!formState?.errors && !formState.success && !isPending ? (
          <p className="text text-pretty text-center text-sm text-foreground">
            the code only last for
            <strong>
              {env.NEXT_PUBLIC_PASSWORD_RESET_EXPIRES_IN_MINS} minutes{" "}
            </strong>
            remember to go back to forget password to request another code.
          </p>
        ) : null}
      </CardContent>
    </div>
  );
}
