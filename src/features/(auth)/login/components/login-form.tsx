"use client";
"use no memo";
import Link from "next/link";
import Form from "next/form";

import { Button } from "@/components/ui/button";
import { CardContent, CardHeader } from "@/components/ui/card";
import { LockKeyhole, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import AuthEmail from "../../components/auth-email";
import AuthPassword from "../../components/auth-password";
import { loginAction } from "../server/action";
import { startTransition, useActionState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/auth-validation";
import { z } from "zod";

export function LoginForm() {
  const [formState, formAction] = useActionState(loginAction, {
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
  } = useForm<z.output<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      ...(formState?.fields ?? {}),
    },
    mode: "onTouched",
  });

  console.log(formState);
  console.log("fields returned: ", { ...(formState?.fields ?? {}) });

  useEffect(() => {
    if (isSubmitSuccessful && formState.success) {
      reset();
    }
  }, [reset, isSubmitSuccessful, formState.success]);

  useEffect(() => {
    if (formState.errors?.email) {
      setError("email", {
        message: formState.errors.email.join(", "),
      });
      setFocus("email");
    }
  }, [reset, isSubmitSuccessful, formState.errors, setError, setFocus]);

  return (
    <div
      className={cn(
        "mx-auto max-w-[496px] space-y-10 sm:rounded-xl sm:border sm:bg-card sm:p-10 sm:text-card-foreground sm:shadow",
      )}
    >
      <CardHeader className="space-y-2">
        <h1 className="heading">Login</h1>
        <p className="text">Add your details below to get back into the app</p>
      </CardHeader>
      <CardContent className="grid gap-6">
        <Form
          ref={formRef}
          className="grid gap-6"
          action={formAction}
          onSubmit={(evt) => {
            evt.preventDefault();
            handleSubmit(() => {
              startTransition(() => formAction(new FormData(formRef.current!)));
            })(evt);
          }}
        >
          <AuthEmail
            icon={<Mail width={24} height={24} className="text-foreground" />}
            placeholder="m@example.com"
            error={
              rhfErrors.email?.message || formState?.errors?.email?.join(", ")
            }
            required
            defaultValue={formState.fields?.email}
            {...register("email")}
          />
          <AuthPassword
            id="password"
            placeholder="Enter your password"
            icon={
              <LockKeyhole width={24} height={24} className="text-foreground" />
            }
            error={
              rhfErrors.password?.message ||
              formState?.errors?.password?.join(", ")
            }
            forgetPassword={
              <Link
                href="/forget-password"
                className="ml-auto inline-block text-sm underline"
              >
                Forgot your password?
              </Link>
            }
            label="Password"
            required
            defaultValue={formState.fields?.password}
            {...register("password")}
          />
          <Button type="submit" className="w-full">
            Login
          </Button>
        </Form>
        <p className="text text-center">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="text-primary hover:underline focus-visible:underline"
          >
            Create account
          </Link>
        </p>
      </CardContent>
    </div>
  );
}
