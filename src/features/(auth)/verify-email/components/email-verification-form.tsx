"use client";

import Form from "next/form";
import { useActionState, useEffect } from "react";

import LoadingButton from "@/components/loading-button";
import { CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import AuthOTP from "../../components/auth-otp";
import { verifyEmailAction } from "../server/actions";

export default function EmailVerificationForm() {
  const [formState, formAction, isPending] = useActionState(verifyEmailAction, {
    success: false,
  });

  useEffect(() => {
    localStorage.removeItem("links-store");
    localStorage.removeItem("links-sync-warning");
    sessionStorage.removeItem("profile-storage");
  }, []);

  return (
    <div
      className={cn(
        "mx-auto max-w-[500px] space-y-12 sm:rounded-xl sm:border sm:bg-card sm:p-8 sm:text-card-foreground sm:shadow"
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
        <AuthOTP />
        <LoadingButton text="Verify" />
        {formState?.errors && !formState.success && !isPending ? (
          <p className="text text-pretty text-center text-destructive">
            {formState?.errors?.message}
          </p>
        ) : null}
      </Form>
    </div>
  );
}
