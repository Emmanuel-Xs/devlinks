"use client";
"use no memo";

import Form from "next/form";
import Link from "next/link";
import {
  FormEvent,
  startTransition,
  useActionState,
  useCallback,
  useEffect,
  useRef,
} from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { LockKeyhole, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import LoadingButton from "@/components/loading-button";
import { CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { signupSchema } from "@/lib/validation";

import EmailInput from "../../../../components/email-input";
import PasswordInput from "../../../../components/password-input";
import DashWith from "../../components/dash-with";
import OAuthButtons from "../../components/oauth-buttons";
import { signUpAction } from "../server/action";

export function SignupForm() {
  const [formState, formAction, isPending] = useActionState(signUpAction, {
    success: false,
  });

  const formRef = useRef<HTMLFormElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    setFocus,
    formState: { errors: rhfErrors, isSubmitSuccessful },
  } = useForm<z.output<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      ...(formState?.fields ?? {}),
    },
    mode: "onTouched",
  });

  const rhfSubmitHandler = useCallback(
    (evt: FormEvent<HTMLFormElement>) => {
      evt.preventDefault();
      handleSubmit(() => {
        startTransition(() => formAction(new FormData(formRef.current!)));
      })(evt);
    },
    [formAction, handleSubmit]
  );

  useEffect(() => {
    if (isSubmitSuccessful && formState.success) {
      reset();
    }
  }, [reset, isSubmitSuccessful, formState.success]);

  // email taken or password compromised
  useEffect(() => {
    if (formState.errors?.email) {
      setError("email", {
        message: formState.errors.email.join(", "),
      });
      setFocus("email");
    }
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
        "mx-auto max-w-[496px] space-y-8 sm:rounded-xl sm:border sm:bg-card sm:p-10 sm:py-7 sm:text-card-foreground sm:shadow"
      )}
    >
      <CardHeader className="space-y-2">
        <h1 className="heading">Create account</h1>
        <p className="text">Let&apos;s get you started sharing your links!</p>
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
          onSubmit={rhfSubmitHandler}
        >
          <EmailInput
            icon={<Mail width={24} height={24} className="text-foreground" />}
            placeholder="e.g. alex@email.com"
            error={
              rhfErrors.email?.message || formState?.errors?.email?.join(", ")
            }
            required
            defaultValue={formState.fields?.email}
            {...register("email")}
          />
          <PasswordInput
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
            defaultValue={formState.fields?.password}
            autoComplete="new-password"
            {...register("password")}
          />
          <PasswordInput
            id="confirm-password"
            placeholder="Must match the above"
            icon={
              <LockKeyhole width={24} height={24} className="text-foreground" />
            }
            label="Confirm Password"
            error={
              rhfErrors.confirmPassword?.message ||
              formState?.errors?.confirmPassword?.join(", ")
            }
            defaultValue={formState.fields?.confirmPassword}
            autoComplete="new-password"
            {...register("confirmPassword")}
          />
          <LoadingButton text="Create new account" isPending={isPending} />
        </Form>
      </CardContent>
      <CardFooter className="grid gap-6">
        <DashWith what="OR SIGNUP WITH" />
        <OAuthButtons />
        <p className="text text-center">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-primary hover:underline focus-visible:underline"
          >
            Login
          </Link>
        </p>
      </CardFooter>
    </div>
  );
}
