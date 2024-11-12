"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { CardContent, CardHeader } from "@/components/ui/card";
import { LockKeyhole, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import AuthEmail from "../../components/auth-email";
import AuthPassword from "../../components/auth-password";

export function LoginForm() {
  return (
    <div
      className={cn(
        "mx-auto max-w-[496px] space-y-10 sm:rounded-xl sm:border sm:bg-card sm:p-10 sm:text-card-foreground sm:shadow",
      )}
    >
      <CardHeader className="space-y-2">
        <h1 className="heading">Login</h1>
        <p className="text">Add your details below to get back into the app </p>
      </CardHeader>
      <CardContent className="grid gap-6">
        <form className="grid gap-6">
          <AuthEmail
            icon={<Mail width={24} height={24} className="text-foreground" />}
            placeholder="m@example.com"
            // error="wrong email address"
          />
          <AuthPassword
            id="password"
            placeholder="Enter your password"
            icon={
              <LockKeyhole width={24} height={24} className="text-foreground" />
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
          />
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
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
