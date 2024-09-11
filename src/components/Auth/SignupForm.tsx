"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { CardContent, CardHeader } from "@/components/ui/card";
import { LockKeyhole, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import AuthEmail from "./AuthEmail";
import AuthPassword from "./AuthPassword";

export function SignupForm() {
  return (
    <div
      className={cn(
        "mx-auto max-w-[496px] space-y-10 sm:rounded-xl sm:border sm:bg-card sm:p-10 sm:text-card-foreground sm:shadow",
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
            placeholder="At least 8 characters"
            icon={
              <LockKeyhole width={24} height={24} className="text-foreground" />
            }
            label="Confirm Password"
          />
          <p className="text text-sm">
            Password must contain at least 8 characters
          </p>
          <Button type="submit" className="w-full">
            Create new account
          </Button>
        </form>
        <p className="text text-center">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-primary hover:underline focus-visible:underline"
          >
            Login
          </Link>
        </p>
      </CardContent>
    </div>
  );
}
