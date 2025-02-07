"use client";

import Form from "next/form";
import { useActionState } from "react";

import { LoaderIcon, LogOutIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { logoutAction } from "../features/(auth)/logout/server/actions";

export default function LogoutButton({ className }: { className?: string }) {
  const [, formAction, isPending] = useActionState(logoutAction, {
    success: false,
  });

  return (
    <Form action={formAction}>
      <button
        disabled={isPending}
        className={cn(
          "flex w-full items-center gap-1 rounded-sm bg-primary px-2 py-1 font-semibold text-primary-foreground hover:bg-accent hover:text-foreground focus:bg-accent focus:text-foreground",
          className
        )}
      >
        <LogOutIcon size={20} />
        <span className="font-semibold">Logout</span>
        {isPending ? (
          <LoaderIcon
            className={cn("animate-spin text-card-foreground")}
            size={20}
          />
        ) : null}
      </button>
    </Form>
  );
}
