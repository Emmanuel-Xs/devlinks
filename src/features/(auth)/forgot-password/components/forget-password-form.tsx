"use client";

import Form from "next/form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState } from "react";

import { Mail } from "lucide-react";

import LoadingButton from "@/components/loading-button";
import { CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import EmailInput from "../../../../components/email-input";
import { forgetPasswordAction } from "../server/action";

export default function ForgetPasswordForm() {
  const [formState, formAction, isPending] = useActionState(
    forgetPasswordAction,
    {
      success: false,
    }
  );

  const router = useRouter();

  return (
    <div
      className={cn(
        "mx-auto max-w-[500px] space-y-10 sm:rounded-xl sm:border sm:bg-card sm:p-8 sm:text-card-foreground sm:shadow"
      )}
    >
      <CardHeader className="space-y-2 text-center">
        <h1 className="heading">Forgot your Password?</h1>
        <p className="text">Enter Your email address to reset your password.</p>
      </CardHeader>
      <CardContent className="grid gap-6">
        {formState?.errors?.message && !formState.success && !isPending ? (
          <p className="text text-pretty text-center text-destructive">
            {formState?.errors?.message}
          </p>
        ) : null}
        <Form action={formAction} className="grid gap-7">
          <EmailInput
            icon={<Mail width={24} height={24} className="text-foreground" />}
            placeholder="m@example.com"
            name="email"
            error={formState?.errors?.email?.join(", ")}
            defaultValue={formState.fields?.email}
            required
          />
          <LoadingButton text="Send" />
        </Form>
        <div className="flex flex-row justify-center gap-1">
          <Link
            href="#"
            onClick={() => router.back()}
            className="text text-center hover:underline focus:underline"
          >
            Go Back
          </Link>
        </div>
      </CardContent>
    </div>
  );
}
