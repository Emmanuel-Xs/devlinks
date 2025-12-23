"use client";

import Form from "next/form";
import { useActionState } from "react";

import { LoaderIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { logoutAction } from "../features/(auth)/logout/server/actions";

import { LogoutIcon } from "./ui/logout-icon";

export default function LogoutButton({ className }: { className?: string }) {
  const [, formAction, isPending] = useActionState(logoutAction, {
    success: false,
  });

  return (
    <Form action={formAction}>
      <button
        disabled={isPending}
        className={cn(
          "bg-primary text-primary-foreground hover:bg-accent hover:text-foreground focus:bg-accent focus:text-foreground flex w-full items-center gap-1 rounded-sm px-2 py-1 font-semibold",
          className
        )}
      >
        <LogoutIcon size={20} />
        <span className="font-semibold">Logout</span>
        {isPending ? (
          <LoaderIcon
            className={cn("text-card-foreground animate-spin")}
            size={20}
          />
        ) : null}
      </button>
    </Form>
  );
}
