"use client";
import LoadingButton from "@/components/loading-button";
import { CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React, { useActionState } from "react";
import AuthEmail from "../../components/auth-email";
import { Mail } from "lucide-react";
import Link from "next/link";
import { forgetPasswordAction } from "../server/action";
import Form from "next/form";

export default function ForgetPasswordForm() {
  const [formState, formAction, isPending] = useActionState(
    forgetPasswordAction,
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
        <h1 className="heading">Forgot your Password?</h1>
        <p className="text">Enter Your email address to reset your password.</p>
      </CardHeader>
      <Form action={formAction} className="grid justify-center gap-6">
        <AuthEmail
          icon={<Mail width={24} height={24} className="text-foreground" />}
          placeholder="m@example.com"
          name="email"
          error={formState?.errors?.email?.join(", ")}
          required
        />
        <LoadingButton text="Send" />
        {formState?.errors?.message && !formState.success && !isPending ? (
          <p className="text text-pretty text-center text-destructive">
            {formState?.errors?.message}
          </p>
        ) : null}
      </Form>
      <Link href="/login">Back to Login</Link>
    </div>
  );
}
