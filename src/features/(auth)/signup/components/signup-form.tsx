"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { LockKeyhole, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import AuthEmail from "../../components/auth-email";
import AuthPassword from "../../components/auth-password";
import DashWith from "../../components/dash-with";
import OAuthButtons from "../../components/oauth-buttons";

export function SignupForm() {
  return (
    <div
      className={cn(
        "mx-auto max-w-[496px] space-y-8 sm:rounded-xl sm:border sm:bg-card sm:p-10 sm:py-7 sm:text-card-foreground sm:shadow",
      )}
    >
      <CardHeader className="space-y-2">
        <h1 className="heading">Create account</h1>
        <p className="text">Let&apos;s get you started sharing your links!</p>
      </CardHeader>
      <CardContent className="grid gap-6">
        <form className="grid gap-6">
          <AuthEmail
            icon={<Mail width={24} height={24} className="text-foreground" />}
            placeholder="e.g. alex@email.com"
            // error="wrong email address"
          />
          <AuthPassword
            id="password"
            placeholder="At least 8 characters"
            icon={
              <LockKeyhole width={24} height={24} className="text-foreground" />
            }
            label="Create Password"
          />
          <AuthPassword
            id="confirm-password"
            placeholder="Password must match the ones above"
            icon={
              <LockKeyhole width={24} height={24} className="text-foreground" />
            }
            label="Confirm Password"
          />
          <Button type="submit" className="w-full">
            Create new account
          </Button>
        </form>
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
